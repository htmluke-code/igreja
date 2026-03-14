import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, BookOpen, List, Search,
  ChevronDown, ArrowLeft, Maximize2, Minimize2, ZoomIn, ZoomOut,
  Palette, X, Check, Bookmark, Settings2
} from 'lucide-react';
import { bibleBooks, generateChapterContent, type BibleBook, type BibleChapterContent } from '../data/bible';
import VerseRotator from './VerseRotator';

interface BibleReaderProps {
  onNavigate: (page: string) => void;
}

interface ThemeColors {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  text: string;
  headerBg: string;
  headerText: string;
  verseNum: string;
  borderColor: string;
  footerBg: string;
  accent: string;
  shadow: string;
  isDark: boolean;
}

const themes: ThemeColors[] = [
  {
    id: 'classic', name: 'Clássico', emoji: '📜',
    bg: '#fdf8ef', text: '#2c1810', headerBg: '#f5edd5', headerText: '#4a3728',
    verseNum: '#b8860b', borderColor: '#e0d0a8', footerBg: '#f5edd5',
    accent: '#b8860b', shadow: 'rgba(0,0,0,0.08)', isDark: false,
  },
  {
    id: 'sepia', name: 'Sépia', emoji: '🟤',
    bg: '#f4e4c1', text: '#5c4033', headerBg: '#e8d5a8', headerText: '#3e2723',
    verseNum: '#8b5e3c', borderColor: '#c9a96e', footerBg: '#e8d5a8',
    accent: '#8b5e3c', shadow: 'rgba(120,80,40,0.12)', isDark: false,
  },
  {
    id: 'cream', name: 'Creme', emoji: '🤍',
    bg: '#fffef5', text: '#333333', headerBg: '#f5f0e0', headerText: '#444444',
    verseNum: '#1d4ed8', borderColor: '#e0d8c0', footerBg: '#f5f0e0',
    accent: '#4a5568', shadow: 'rgba(0,0,0,0.06)', isDark: false,
  },
  {
    id: 'dark', name: 'Escuro', emoji: '🌙',
    bg: '#1a1f2e', text: '#e0e0e0', headerBg: '#252b3d', headerText: '#ffffff',
    verseNum: '#e6b733', borderColor: 'rgba(255,255,255,0.08)', footerBg: '#252b3d',
    accent: '#e6b733', shadow: 'rgba(0,0,0,0.3)', isDark: true,
  },
  {
    id: 'midnight', name: 'Meia-Noite', emoji: '🌌',
    bg: '#0d1117', text: '#c9d1d9', headerBg: '#161b22', headerText: '#e6edf3',
    verseNum: '#58a6ff', borderColor: '#30363d', footerBg: '#161b22',
    accent: '#58a6ff', shadow: 'rgba(0,0,0,0.5)', isDark: true,
  },
  {
    id: 'forest', name: 'Floresta', emoji: '🌿',
    bg: '#1a2e1a', text: '#d4e4d4', headerBg: '#243824', headerText: '#a8d8a8',
    verseNum: '#34d399', borderColor: 'rgba(52,211,153,0.2)', footerBg: '#243824',
    accent: '#34d399', shadow: 'rgba(0,50,0,0.3)', isDark: true,
  },
  {
    id: 'royal', name: 'Real', emoji: '👑',
    bg: '#1a1530', text: '#d4ccf0', headerBg: '#251e45', headerText: '#c8b8f0',
    verseNum: '#a78bfa', borderColor: 'rgba(167,139,250,0.2)', footerBg: '#251e45',
    accent: '#a78bfa', shadow: 'rgba(50,0,80,0.3)', isDark: true,
  },
  {
    id: 'ocean', name: 'Oceano', emoji: '🌊',
    bg: '#0f1e2e', text: '#b8d4e8', headerBg: '#162840', headerText: '#90c8e8',
    verseNum: '#38bdf8', borderColor: 'rgba(56,189,248,0.2)', footerBg: '#162840',
    accent: '#38bdf8', shadow: 'rgba(0,30,60,0.4)', isDark: true,
  },
];

export default function BibleReader({ onNavigate }: BibleReaderProps) {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(bibleBooks[0]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [content, setContent] = useState<BibleChapterContent | null>(null);
  const [showBookList, setShowBookList] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [pageTransition, setPageTransition] = useState('');
  const [testament, setTestament] = useState<'AT' | 'NT'>('AT');
  const [searchQuery, setSearchQuery] = useState('');
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(themes[0]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const chapterContent = generateChapterContent(selectedBook.name, currentChapter);
    setContent(chapterContent);
  }, [selectedBook, currentChapter]);

  const goToNextChapter = useCallback(() => {
    if (currentChapter < selectedBook.chapters) {
      setPageTransition('slide-left');
      setTimeout(() => {
        setCurrentChapter(prev => prev + 1);
        setPageTransition('');
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      const currentBookIndex = bibleBooks.findIndex(b => b.name === selectedBook.name);
      if (currentBookIndex < bibleBooks.length - 1) {
        setPageTransition('slide-left');
        setTimeout(() => {
          setSelectedBook(bibleBooks[currentBookIndex + 1]);
          setCurrentChapter(1);
          setPageTransition('');
          contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
    }
  }, [currentChapter, selectedBook]);

  const goToPrevChapter = useCallback(() => {
    if (currentChapter > 1) {
      setPageTransition('slide-right');
      setTimeout(() => {
        setCurrentChapter(prev => prev - 1);
        setPageTransition('');
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      const currentBookIndex = bibleBooks.findIndex(b => b.name === selectedBook.name);
      if (currentBookIndex > 0) {
        const prevBook = bibleBooks[currentBookIndex - 1];
        setPageTransition('slide-right');
        setTimeout(() => {
          setSelectedBook(prevBook);
          setCurrentChapter(prevBook.chapters);
          setPageTransition('');
          contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
      }
    }
  }, [currentChapter, selectedBook]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextChapter();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevChapter();
      } else if (e.key === 'Escape') {
        setShowBookList(false);
        setShowChapterList(false);
        setShowThemePanel(false);
        if (isFullscreen) setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextChapter, goToPrevChapter, isFullscreen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextChapter();
      else goToPrevChapter();
    }
  };

  const selectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setCurrentChapter(1);
    setShowBookList(false);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectChapter = (chapter: number) => {
    setCurrentChapter(chapter);
    setShowChapterList(false);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (verse: number) => {
    const key = `${selectedBook.name}-${currentChapter}-${verse}`;
    setBookmarkedVerses(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredBooks = bibleBooks.filter(b =>
    b.testament === testament &&
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalChaptersRead = bibleBooks
    .slice(0, bibleBooks.findIndex(b => b.name === selectedBook.name))
    .reduce((acc, b) => acc + b.chapters, 0) + currentChapter;
  const totalChapters = bibleBooks.reduce((acc, b) => acc + b.chapters, 0);
  const progress = (totalChaptersRead / totalChapters) * 100;

  const ct = currentTheme;

  return (
    <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50' : 'pt-20'}`}
         style={{ background: ct.isDark ? '#0c0f1a' : '#f0ebe0' }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: ct.isDark ? 'linear-gradient(135deg, #0c0f1a, #141824, #0c0f1a)' : 'linear-gradient(135deg, #f0ebe0, #e8e0d0, #f0ebe0)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: ct.accent, opacity: 0.04 }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: ct.accent, opacity: 0.03 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-colors cursor-pointer"
            style={{ color: ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Voltar</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <div className="relative z-50">
              <button
                onClick={() => { setShowThemePanel(!showThemePanel); setShowBookList(false); setShowChapterList(false); }}
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer"
                style={{
                  background: showThemePanel ? `${ct.accent}30` : ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  color: showThemePanel ? ct.accent : ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                  border: showThemePanel ? `1px solid ${ct.accent}50` : '1px solid transparent',
                }}
              >
                <Palette className="w-4.5 h-4.5" />
              </button>

              {/* Theme Panel - FIXED with inline styles */}
              {showThemePanel && (
                <div className="absolute right-0 top-14 w-80 sm:w-96 rounded-3xl overflow-hidden animate-fade-in"
                     style={{
                       background: ct.isDark ? 'rgba(20,24,36,0.98)' : 'rgba(255,255,255,0.98)',
                       backdropFilter: 'blur(24px)',
                       border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                       boxShadow: `0 25px 60px ${ct.shadow}`,
                       zIndex: 9999,
                     }}>
                  <div className="p-5" style={{ borderBottom: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                             style={{ background: `${ct.accent}20` }}>
                          <Settings2 className="w-4 h-4" style={{ color: ct.accent }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: ct.isDark ? '#fff' : '#1a1a1a' }}>
                            Tema de Leitura
                          </h3>
                          <p className="text-[11px] mt-0.5" style={{ color: ct.isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>
                            Personalizar aparência
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setShowThemePanel(false)} className="cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                              style={{ background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                        <X className="w-3.5 h-3.5" style={{ color: ct.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto">
                    {themes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTheme(theme);
                        }}
                        className="relative flex flex-col items-center gap-2.5 p-3.5 rounded-2xl transition-all cursor-pointer group"
                        style={{
                          border: currentTheme.id === theme.id
                            ? `2px solid ${theme.accent}`
                            : `1px solid ${ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                          background: currentTheme.id === theme.id
                            ? `${theme.accent}10`
                            : ct.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                          boxShadow: currentTheme.id === theme.id ? `0 0 20px ${theme.accent}20` : 'none',
                        }}
                      >
                        {/* Theme preview */}
                        <div className="w-full h-20 rounded-xl overflow-hidden"
                             style={{
                               background: theme.bg,
                               boxShadow: `0 2px 8px ${theme.shadow}`,
                               border: `1px solid ${theme.borderColor}`,
                             }}>
                          <div className="h-4 flex items-center px-2 gap-1"
                               style={{ background: theme.headerBg, borderBottom: `1px solid ${theme.borderColor}` }}>
                            <div className="w-1 h-1 rounded-full" style={{ background: theme.accent }} />
                            <div className="w-8 h-1 rounded-full" style={{ background: theme.headerText, opacity: 0.3 }} />
                          </div>
                          <div className="px-2.5 py-1.5 space-y-1">
                            <div className="flex items-start gap-1">
                              <span className="text-[6px] font-bold" style={{ color: theme.verseNum }}>1</span>
                              <div className="h-1 w-full rounded-full" style={{ background: theme.text, opacity: 0.3 }} />
                            </div>
                            <div className="flex items-start gap-1">
                              <span className="text-[6px] font-bold" style={{ color: theme.verseNum }}>2</span>
                              <div className="h-1 w-4/5 rounded-full" style={{ background: theme.text, opacity: 0.2 }} />
                            </div>
                            <div className="flex items-start gap-1">
                              <span className="text-[6px] font-bold" style={{ color: theme.verseNum }}>3</span>
                              <div className="h-1 w-5/6 rounded-full" style={{ background: theme.text, opacity: 0.25 }} />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm">{theme.emoji}</span>
                          <span className="text-xs font-semibold"
                                style={{ color: currentTheme.id === theme.id ? theme.accent : (ct.isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)') }}>
                            {theme.name}
                          </span>
                        </div>

                        {currentTheme.id === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                               style={{ background: theme.accent }}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="px-5 py-3" style={{ borderTop: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, background: ct.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                    <p className="text-[10px] text-center" style={{ color: ct.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}>
                      💡 Temas escuros são ideais para leitura noturna
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-5 hidden sm:block" style={{ background: ct.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

            <button
              onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer"
              style={{ background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', color: ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono hidden sm:block min-w-[28px] text-center text-xs" style={{ color: ct.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>{fontSize}</span>
            <button
              onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer"
              style={{ background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', color: ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-px h-5 hidden sm:block" style={{ background: ct.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer"
              style={{ background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', color: ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Book & Chapter Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <button
            onClick={() => { setShowBookList(!showBookList); setShowChapterList(false); setShowThemePanel(false); }}
            className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl transition-all cursor-pointer"
            style={{
              background: ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              color: ct.isDark ? '#fff' : '#1a1a1a',
            }}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" style={{ color: ct.accent }} />
              <span className="font-display font-semibold">{selectedBook.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showBookList ? 'rotate-180' : ''}`} style={{ opacity: 0.4 }} />
          </button>

          <button
            onClick={() => { setShowChapterList(!showChapterList); setShowBookList(false); setShowThemePanel(false); }}
            className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl transition-all cursor-pointer"
            style={{
              background: ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              color: ct.isDark ? '#fff' : '#1a1a1a',
            }}
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4" style={{ color: ct.accent }} />
              <span>Capítulo {currentChapter}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showChapterList ? 'rotate-180' : ''}`} style={{ opacity: 0.4 }} />
          </button>

          {/* Current Theme Chip */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl"
               style={{
                 background: ct.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                 border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
               }}>
            <span className="text-sm">{ct.emoji}</span>
            <span className="text-xs" style={{ color: ct.isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>{ct.name}</span>
          </div>

          {/* Progress */}
          <div className="flex-1 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                   style={{ background: ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ct.accent}, ${ct.accent}cc)` }}
                />
              </div>
              <span className="text-xs whitespace-nowrap" style={{ color: ct.isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
                {progress.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Book List Panel */}
        {showBookList && (
          <div className="mb-6 rounded-3xl overflow-hidden animate-fade-in"
               style={{
                 background: ct.isDark ? 'rgba(20,24,36,0.97)' : 'rgba(255,255,255,0.97)',
                 backdropFilter: 'blur(20px)',
                 border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
               }}>
            <div className="p-4" style={{ borderBottom: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setTestament('AT')}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: testament === 'AT' ? `${ct.accent}20` : 'transparent',
                    color: testament === 'AT' ? ct.accent : (ct.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                  }}
                >
                  Antigo Testamento
                </button>
                <button
                  onClick={() => setTestament('NT')}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: testament === 'NT' ? `${ct.accent}20` : 'transparent',
                    color: testament === 'NT' ? ct.accent : (ct.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                  }}
                >
                  Novo Testamento
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: ct.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }} />
                <input
                  type="text"
                  placeholder="Buscar livro..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none"
                  style={{
                    background: ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    color: ct.isDark ? '#fff' : '#1a1a1a',
                  }}
                />
              </div>
            </div>
            <div className="p-4 max-h-72 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredBooks.map(book => (
                <button
                  key={book.name}
                  onClick={() => selectBook(book)}
                  className="text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer"
                  style={{
                    background: selectedBook.name === book.name ? `${ct.accent}20` : 'transparent',
                    color: selectedBook.name === book.name ? ct.accent : (ct.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'),
                    border: selectedBook.name === book.name ? `1px solid ${ct.accent}40` : '1px solid transparent',
                  }}
                >
                  <span className="font-medium">{book.name}</span>
                  <span className="block text-xs mt-0.5" style={{ opacity: 0.4 }}>{book.chapters} cap.</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chapter List Panel */}
        {showChapterList && (
          <div className="mb-6 rounded-3xl overflow-hidden animate-fade-in"
               style={{
                 background: ct.isDark ? 'rgba(20,24,36,0.97)' : 'rgba(255,255,255,0.97)',
                 backdropFilter: 'blur(20px)',
                 border: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
               }}>
            <div className="p-4" style={{ borderBottom: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
              <h3 className="font-medium" style={{ color: ct.isDark ? '#fff' : '#1a1a1a' }}>{selectedBook.name} — Selecionar Capítulo</h3>
            </div>
            <div className="p-4 max-h-72 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => (
                <button
                  key={ch}
                  onClick={() => selectChapter(ch)}
                  className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: currentChapter === ch ? ct.accent : (ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                    color: currentChapter === ch ? '#fff' : (ct.isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                    boxShadow: currentChapter === ch ? `0 4px 14px ${ct.accent}44` : 'none',
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Reading Area */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Bible Page */}
          <div
            className={`relative ${pageTransition === 'slide-left' ? 'animate-slide-left' : pageTransition === 'slide-right' ? 'animate-slide-right' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="rounded-3xl overflow-hidden transition-all duration-500"
                 style={{
                   boxShadow: `0 20px 60px ${ct.shadow}`,
                   border: `1px solid ${ct.borderColor}`,
                 }}>
              {/* Page Header */}
              <div className="px-6 sm:px-10 py-4 transition-all duration-500"
                   style={{
                     background: ct.headerBg,
                     borderBottom: `1px solid ${ct.borderColor}`,
                   }}>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg sm:text-xl font-bold transition-colors duration-500"
                      style={{ color: ct.headerText }}>
                    {selectedBook.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium transition-colors duration-500"
                          style={{ color: ct.headerText, opacity: 0.6 }}>
                      Capítulo {currentChapter}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                ref={contentRef}
                className="px-6 sm:px-10 py-8 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto transition-all duration-500"
                style={{
                  background: ct.bg,
                  fontSize: `${fontSize}px`,
                }}
              >
                {content?.verses.map((verse) => {
                  const verseKey = `${selectedBook.name}-${currentChapter}-${verse.verse}`;
                  const isBookmarked = bookmarkedVerses.has(verseKey);
                  return (
                    <div key={verse.verse} className="group relative mb-4">
                      <p className="font-bible leading-relaxed transition-colors duration-500 pr-8"
                         style={{ color: ct.text }}>
                        <sup className="font-bold text-xs mr-1.5 select-none transition-colors duration-500"
                             style={{ color: ct.verseNum }}>
                          {verse.verse}
                        </sup>
                        {verse.text}
                      </p>
                      <button
                        onClick={() => toggleBookmark(verse.verse)}
                        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1"
                        style={{ color: isBookmarked ? ct.accent : (ct.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)') }}
                      >
                        <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Page Footer */}
              <div className="px-6 sm:px-10 py-4 transition-all duration-500"
                   style={{
                     background: ct.footerBg,
                     borderTop: `1px solid ${ct.borderColor}`,
                   }}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={goToPrevChapter}
                    disabled={currentChapter === 1 && bibleBooks[0].name === selectedBook.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm"
                    style={{ color: ct.isDark ? 'rgba(255,255,255,0.6)' : ct.text }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: ct.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
                      {currentChapter} / {selectedBook.chapters}
                    </span>
                  </div>

                  <button
                    onClick={goToNextChapter}
                    disabled={currentChapter === selectedBook.chapters && bibleBooks[bibleBooks.length-1].name === selectedBook.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm"
                    style={{ color: ct.isDark ? 'rgba(255,255,255,0.6)' : ct.text }}
                  >
                    <span className="hidden sm:inline">Próximo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Hint */}
            <p className="text-center text-xs mt-4 hidden sm:block" style={{ color: ct.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}>
              Use as setas ← → do teclado para navegar · Deslize no celular · 🎨 para trocar tema
            </p>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6">
            {/* Verse of reflection */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
                Versículo para Reflexão
              </h3>
              <VerseRotator variant="glass" showIcon={false} />
            </div>

            {/* Quick Navigation */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4">
                Leituras Populares
              </h3>
              <div className="space-y-2">
                {[
                  { book: 'Gênesis', ch: 1 },
                  { book: 'Salmos', ch: 23 },
                  { book: 'Salmos', ch: 91 },
                  { book: 'Mateus', ch: 5 },
                  { book: 'João', ch: 1 },
                  { book: 'Apocalipse', ch: 1 },
                ].map((item, i) => {
                  const book = bibleBooks.find(b => b.name === item.book);
                  return book ? (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedBook(book);
                        setCurrentChapter(item.ch);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    >
                      {item.book} {item.ch}
                    </button>
                  ) : null;
                })}
              </div>
            </div>

            {/* Current Theme Info */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                     style={{ background: `${ct.accent}15` }}>
                  {ct.emoji}
                </div>
                <div>
                  <p className="text-white/40 text-xs">Tema atual</p>
                  <p className="text-white text-sm font-semibold">{ct.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
           style={{
             background: ct.isDark ? 'rgba(12,15,26,0.95)' : 'rgba(240,235,224,0.95)',
             backdropFilter: 'blur(20px)',
             borderTop: `1px solid ${ct.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
           }}>
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button
            onClick={goToPrevChapter}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl transition-all cursor-pointer"
            style={{
              background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: ct.isDark ? '#fff' : '#1a1a1a',
            }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Anterior</span>
          </button>

          <div className="text-center">
            <p className="text-xs" style={{ color: ct.isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>{selectedBook.abbrev}</p>
            <p className="font-bold" style={{ color: ct.isDark ? '#fff' : '#1a1a1a' }}>{currentChapter}</p>
          </div>

          <button
            onClick={goToNextChapter}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl transition-all cursor-pointer"
            style={{
              background: ct.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: ct.isDark ? '#fff' : '#1a1a1a',
            }}
          >
            <span className="text-sm">Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overlays for closing panels */}
      {(showBookList || showChapterList) && (
        <button
          className="fixed inset-0 z-0 cursor-pointer"
          onClick={() => { setShowBookList(false); setShowChapterList(false); }}
          aria-label="Fechar"
        />
      )}

      <style>{`
        @keyframes slideLeft {
          0% { opacity: 1; transform: translateX(0); }
          50% { opacity: 0; transform: translateX(-30px); }
          51% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          0% { opacity: 1; transform: translateX(0); }
          50% { opacity: 0; transform: translateX(30px); }
          51% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left { animation: slideLeft 0.5s ease-in-out; }
        .animate-slide-right { animation: slideRight 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
