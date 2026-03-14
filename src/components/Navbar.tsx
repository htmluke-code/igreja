import { useState, useEffect } from 'react';
import { BookOpen, Home, Menu, X, Cross, Heart, HandHeart, Film, Landmark } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'bible', label: 'Bíblia Sagrada', icon: BookOpen },
    { id: 'stories', label: 'Histórias', icon: Heart },
    { id: 'churches', label: 'Igrejas', icon: Landmark },
    { id: 'movies', label: 'Filmes', icon: Film },
  ];

  const apoioItem = { id: 'apoio', label: 'Apoio', icon: HandHeart };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-sacred-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-gold-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20 relative">
          {/* Logo - Left */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:shadow-gold-500/50 transition-all duration-300 group-hover:scale-105">
                <Cross className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gold-300 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                Fé Católica
              </h1>
              <p className="text-[10px] sm:text-xs text-gold-400/80 tracking-widest uppercase -mt-0.5">
                Palavra de Deus
              </p>
            </div>
          </button>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-md rounded-2xl px-1.5 py-1.5 border border-white/[0.06]">
              {mainNavItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'text-gold-400 bg-gold-500/10 shadow-inner shadow-gold-500/5' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : ''}`} />
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apoio Button - Right */}
          <div className="hidden lg:flex items-center ml-auto">
            <button
              onClick={() => onNavigate('apoio')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === 'apoio'
                  ? 'text-sacred-900 bg-gradient-to-r from-gold-400 to-gold-500 shadow-lg shadow-gold-500/30'
                  : 'text-gold-300 bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/20 hover:from-gold-500/20 hover:to-gold-600/20 hover:shadow-lg hover:shadow-gold-500/10'
              }`}
            >
              <HandHeart className={`w-4 h-4 ${currentPage === 'apoio' ? 'text-sacred-900' : 'text-gold-400'}`} />
              {apoioItem.label}
              {currentPage !== 'apoio' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ml-auto"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-sacred-900/98 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
          {mainNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'text-gold-400 bg-gold-500/10' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          {/* Apoio button mobile */}
          <div className="pt-2 border-t border-white/5 mt-2">
            <button
              onClick={() => { onNavigate('apoio'); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === 'apoio'
                  ? 'text-sacred-900 bg-gradient-to-r from-gold-400 to-gold-500'
                  : 'text-gold-300 bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/20'
              }`}
            >
              <HandHeart className={`w-5 h-5 ${currentPage === 'apoio' ? 'text-sacred-900' : 'text-gold-400'}`} />
              Apoie este projeto
              {currentPage !== 'apoio' && (
                <span className="relative flex h-2 w-2 ml-auto">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
