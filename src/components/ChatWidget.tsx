import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageCircle, X, Send, Users, Wifi, WifiOff, Smile,
  ChevronDown, Cross, Film, Heart, Bookmark, Reply,
  MoreHorizontal, Hash, Sparkles, Star,
  Clock, BookOpen
} from 'lucide-react';

type MessageType = 'text' | 'movie' | 'verse' | 'reaction';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  color: string;
  type: MessageType;
  movie?: {
    title: string;
    year: number;
    rating: number;
    image: string;
  };
  verse?: {
    text: string;
    reference: string;
  };
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyTo?: { user: string; text: string };
}

const userColors = [
  '#e6b733', '#60a5fa', '#f472b6', '#34d399', '#a78bfa',
  '#fb923c', '#38bdf8', '#f87171', '#4ade80', '#c084fc',
  '#fbbf24', '#2dd4bf', '#e879f9', '#fb7185', '#818cf8',
];

const quickVerses = [
  { text: 'O Senhor é meu pastor, nada me faltará.', ref: 'Salmos 23:1' },
  { text: 'Tudo posso naquele que me fortalece.', ref: 'Filipenses 4:13' },
  { text: 'Deus é amor.', ref: '1 João 4:8' },
  { text: 'Não temas, porque eu sou contigo.', ref: 'Isaías 41:10' },
  { text: 'Sede fortes e corajosos.', ref: 'Josué 1:9' },
  { text: 'A fé é a certeza daquilo que esperamos.', ref: 'Hebreus 11:1' },
  { text: 'Amai-vos uns aos outros.', ref: 'João 13:34' },
  { text: 'Orai sem cessar.', ref: '1 Tessalonicenses 5:17' },
];

const movieSuggestions = [
  { title: 'A Paixão de Cristo', year: 2004, rating: 4.9, image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=300&q=60' },
  { title: 'Ben-Hur', year: 1959, rating: 4.8, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=60' },
  { title: 'Os Dez Mandamentos', year: 1956, rating: 4.7, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=60' },
  { title: 'O Príncipe do Egito', year: 1998, rating: 4.6, image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=300&q=60' },
  { title: 'Cabrini', year: 2024, rating: 4.7, image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&q=60' },
  { title: 'Fátima', year: 2020, rating: 4.3, image: 'https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?w=300&q=60' },
];

const reactionEmojis = ['🙏', '❤️', '✝️', '🕊️', '⭐', '👏'];

const welcomeMessages: ChatMessage[] = [
  {
    id: 'welcome-1',
    user: '✝️ Fé Católica',
    text: 'Bem-vindo à comunidade! A paz de Cristo esteja com todos. 🙏',
    timestamp: Date.now() - 60000,
    color: '#e6b733',
    type: 'text',
  },
  {
    id: 'welcome-2',
    user: '✝️ Fé Católica',
    text: '',
    timestamp: Date.now() - 30000,
    color: '#e6b733',
    type: 'verse',
    verse: {
      text: 'Onde dois ou três estiverem reunidos em meu nome, ali estou eu no meio deles.',
      reference: 'Mateus 18:20',
    },
  },
];

const generateUserId = () => {
  const saints = ['Maria', 'José', 'Pedro', 'Paulo', 'Lucas', 'João', 'Marcos', 'Ana', 'Isabel', 'Teresa', 'Francisco', 'Clara', 'Antônio', 'Miguel', 'Rafael', 'Gabriel', 'Inês', 'Cecília', 'Catarina', 'Benedito'];
  const name = saints[Math.floor(Math.random() * saints.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  return `${name}${num}`;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(welcomeMessages);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(1);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoviePicker, setShowMoviePicker] = useState(false);
  const [showVersePicker, setShowVersePicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'info'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const userColor = useRef(userColors[Math.floor(Math.random() * userColors.length)]);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  const connectWebSocket = useCallback(() => {
    try {
      const channelId = 'fe-catolica-chat-global';
      const apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm';
      const ws = new WebSocket(
        `wss://free.blr2.piesocket.com/v3/${channelId}?api_key=${apiKey}&notify_self=1`
      );

      ws.onopen = () => {
        setIsConnected(true);
        setOnlineCount(prev => Math.max(prev, 1));
        if (username) {
          ws.send(JSON.stringify({ type: 'join', user: username }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'message' || data.type === 'movie' || data.type === 'verse') {
            const newMsg: ChatMessage = {
              id: data.id || `msg-${Date.now()}-${Math.random()}`,
              user: data.user,
              text: data.text || '',
              timestamp: data.timestamp || Date.now(),
              color: data.color || '#e6b733',
              type: data.type as MessageType,
              movie: data.movie,
              verse: data.verse,
              reactions: [],
              replyTo: data.replyTo,
            };
            setMessages(prev => [...prev, newMsg]);
            if (!isOpen) {
              setUnreadCount(prev => prev + 1);
            }
          } else if (data.type === 'typing') {
            if (data.user !== username) {
              setIsTyping(true);
              if (typingTimeout.current) clearTimeout(typingTimeout.current);
              typingTimeout.current = setTimeout(() => setIsTyping(false), 3000);
            }
          } else if (data.type === 'join') {
            setOnlineCount(prev => prev + 1);
          } else if (data.type === 'leave') {
            setOnlineCount(prev => Math.max(1, prev - 1));
          } else if (data.type === 'reaction') {
            setMessages(prev => prev.map(m => {
              if (m.id === data.messageId) {
                const reactions = m.reactions ? [...m.reactions] : [];
                const existing = reactions.find(r => r.emoji === data.emoji);
                if (existing) {
                  if (!existing.users.includes(data.user)) {
                    existing.count++;
                    existing.users.push(data.user);
                  }
                } else {
                  reactions.push({ emoji: data.emoji, count: 1, users: [data.user] });
                }
                return { ...m, reactions };
              }
              return m;
            }));
          }
        } catch {
          // ignore
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        reconnectTimeout.current = setTimeout(() => connectWebSocket(), 3000);
      };

      ws.onerror = () => {
        setIsConnected(false);
      };

      wsRef.current = ws;
    } catch {
      setIsConnected(false);
    }
  }, [username, isOpen]);

  useEffect(() => {
    if (isSetup && username) connectWebSocket();
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [isSetup, username, connectWebSocket]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => scrollToBottom(false), 100);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const handleSetup = () => {
    const name = usernameInput.trim() || generateUserId();
    setUsername(name);
    setIsSetup(true);
  };

  const sendMessage = (type: MessageType = 'text', extra?: Record<string, unknown>) => {
    const text = inputValue.trim();
    if (type === 'text' && !text) return;
    if (!wsRef.current) return;

    const msg: Record<string, unknown> = {
      type,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      user: username,
      text: type === 'text' ? text : '',
      timestamp: Date.now(),
      color: userColor.current,
      ...extra,
    };

    if (replyingTo) {
      msg.replyTo = { user: replyingTo.user, text: replyingTo.text || replyingTo.verse?.text || replyingTo.movie?.title || '' };
    }

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }

    setMessages(prev => {
      const alreadyExists = prev.find(m => m.id === msg.id);
      if (alreadyExists) return prev;
      return [...prev, msg as unknown as ChatMessage];
    });

    setInputValue('');
    setReplyingTo(null);
    setShowAttachMenu(false);
    setShowMoviePicker(false);
    setShowVersePicker(false);
  };

  const sendReaction = (messageId: string, emoji: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({
      type: 'reaction',
      messageId,
      emoji,
      user: username,
    }));
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        const reactions = m.reactions ? [...m.reactions] : [];
        const existing = reactions.find(r => r.emoji === emoji);
        if (existing) {
          if (!existing.users.includes(username)) {
            existing.count++;
            existing.users.push(username);
          }
        } else {
          reactions.push({ emoji, count: 1, users: [username] });
        }
        return { ...m, reactions };
      }
      return m;
    }));
    setShowEmojiPicker(false);
  };

  const handleTyping = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'typing', user: username }));
    }
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const [reactingMessageId, setReactingMessageId] = useState<string | null>(null);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-[60px] h-[60px] rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 cursor-pointer group ${
          isOpen
            ? 'bg-white/10 backdrop-blur-2xl border border-white/20 rotate-90 rounded-full scale-90'
            : 'bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 hover:scale-110 hover:shadow-gold-500/50'
        }`}
        style={!isOpen ? { boxShadow: '0 0 30px rgba(230,183,51,0.3), 0 8px 32px rgba(0,0,0,0.4)' } : {}}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white drop-shadow-lg" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-amber-600 shadow-sm" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-2xl border-2 border-gold-400/40 animate-ping pointer-events-none" />
          </>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-[100px] right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] transition-all duration-500 ${
        isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}>
        <div
          className="rounded-3xl overflow-hidden shadow-2xl border border-white/[0.08] flex flex-col"
          style={{
            height: '580px',
            background: 'linear-gradient(180deg, rgba(15,26,46,0.98) 0%, rgba(10,18,35,0.99) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Header */}
          <div className="relative px-5 py-4 border-b border-white/[0.06]"
            style={{ background: 'linear-gradient(135deg, rgba(230,183,51,0.08) 0%, rgba(15,26,46,0.5) 100%)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                    <Cross className="w-5 h-5 text-white" />
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0f1a2e] ${
                    isConnected ? 'bg-emerald-400 shadow-emerald-400/50 shadow-sm' : 'bg-red-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] tracking-tight">Comunidade de Fé</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {isConnected ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                        <Wifi className="w-3 h-3" />
                        Conectado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-[11px] font-medium">
                        <WifiOff className="w-3 h-3" />
                        Reconectando...
                      </span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1 text-white/40 text-[11px]">
                      <Users className="w-3 h-3" />
                      {onlineCount} {onlineCount === 1 ? 'membro' : 'membros'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            {isSetup && (
              <div className="flex items-center gap-1 mt-3 bg-white/[0.03] rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'chat' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'info' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <Hash className="w-3.5 h-3.5" />
                  Compartilhar
                </button>
              </div>
            )}
          </div>

          {!isSetup ? (
            /* Setup Screen */
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-gold-500/30">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2 text-center">
                Chat ao Vivo
              </h3>
              <p className="text-white/40 text-sm text-center mb-8 leading-relaxed max-w-[260px]">
                Converse com irmãos na fé, compartilhe versículos e recomende filmes católicos.
              </p>

              <div className="w-full space-y-3">
                <div className="relative">
                  <Smile className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSetup()}
                    placeholder={`Ex: ${generateUserId()}`}
                    maxLength={20}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/25 focus:outline-none focus:border-gold-500/40 focus:bg-white/[0.06] text-sm transition-all"
                  />
                </div>
                <button
                  onClick={handleSetup}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-sacred-900 font-bold text-sm hover:shadow-xl hover:shadow-gold-500/30 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
                >
                  Entrar na Comunidade
                </button>
              </div>
              <p className="text-white/20 text-[11px] mt-4 text-center">
                Vazio = nome de santo gerado automaticamente
              </p>
            </div>
          ) : activeTab === 'info' ? (
            /* Share Tab */
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Share Movies */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Film className="w-4 h-4 text-gold-400" />
                  <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Compartilhar Filme</h4>
                </div>
                <div className="space-y-2">
                  {movieSuggestions.map((movie, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sendMessage('movie', { movie });
                        setActiveTab('chat');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-gold-500/20 hover:bg-white/[0.06] transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-white text-sm font-medium truncate group-hover:text-gold-400 transition-colors">{movie.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-white/30 text-[11px]">{movie.year}</span>
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-gold-400" fill="currentColor" />
                            <span className="text-gold-400 text-[11px] font-bold">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Send className="w-4 h-4 text-white/20 group-hover:text-gold-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Share Verse */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-gold-400" />
                  <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider">Compartilhar Versículo</h4>
                </div>
                <div className="space-y-2">
                  {quickVerses.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sendMessage('verse', { verse: { text: v.text, reference: v.ref } });
                        setActiveTab('chat');
                      }}
                      className="w-full text-left px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-gold-500/20 hover:bg-white/[0.06] transition-all cursor-pointer group"
                    >
                      <p className="text-white/70 text-sm italic group-hover:text-white transition-colors">"{v.text}"</p>
                      <p className="text-gold-400/60 text-[11px] mt-1 font-medium">— {v.ref}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.map(msg => {
                  const isOwn = msg.user === username;
                  const isSystem = msg.user === '✝️ Fé Católica';

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in group/msg`}
                    >
                      <div className={`max-w-[85%] ${isSystem ? 'max-w-[92%]' : ''} relative`}>
                        {/* Reply context */}
                        {msg.replyTo && (
                          <div className={`flex items-center gap-2 mb-1 ml-1 ${isOwn ? 'justify-end mr-1' : ''}`}>
                            <Reply className="w-3 h-3 text-white/20 rotate-180" />
                            <span className="text-white/25 text-[11px] truncate max-w-[180px]">
                              {msg.replyTo.user}: {msg.replyTo.text}
                            </span>
                          </div>
                        )}

                        {!isOwn && !isSystem && (
                          <div className="flex items-center gap-2 mb-1 ml-2">
                            <div className="w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-bold text-white" style={{ background: msg.color }}>
                              {msg.user.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-[11px] font-semibold" style={{ color: msg.color }}>
                              {msg.user}
                            </span>
                          </div>
                        )}

                        {/* Message bubble */}
                        <div className={`relative rounded-[20px] overflow-hidden ${
                          isSystem
                            ? 'bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/15'
                            : isOwn
                              ? 'bg-gradient-to-br from-gold-500/20 to-amber-600/15 border border-gold-500/15'
                              : 'bg-white/[0.05] border border-white/[0.06]'
                        } ${isOwn ? 'rounded-tr-lg' : 'rounded-tl-lg'}`}>

                          {/* Movie card */}
                          {msg.type === 'movie' && msg.movie && (
                            <div className="p-1">
                              <div className="relative rounded-2xl overflow-hidden">
                                <img src={msg.movie.image} alt={msg.movie.title} className="w-full h-32 object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Film className="w-3 h-3 text-gold-400" />
                                    <span className="text-gold-400 text-[10px] font-bold uppercase tracking-wider">Filme</span>
                                  </div>
                                  <p className="text-white font-bold text-sm">{msg.movie.title}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-white/50 text-[11px]">{msg.movie.year}</span>
                                    <div className="flex items-center gap-0.5">
                                      <Star className="w-3 h-3 text-gold-400" fill="currentColor" />
                                      <span className="text-gold-400 text-[11px] font-bold">{msg.movie.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Verse card */}
                          {msg.type === 'verse' && msg.verse && (
                            <div className="px-4 py-3">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                                <span className="text-gold-400 text-[10px] font-bold uppercase tracking-wider">Versículo</span>
                              </div>
                              <p className="text-white/80 text-sm italic font-serif leading-relaxed">
                                "{msg.verse.text}"
                              </p>
                              <p className="text-gold-400/60 text-[11px] mt-2 font-semibold">
                                — {msg.verse.reference}
                              </p>
                            </div>
                          )}

                          {/* Text */}
                          {(msg.type === 'text' || (!msg.movie && !msg.verse)) && msg.text && (
                            <div className="px-4 py-2.5">
                              <p className={`text-sm leading-relaxed ${isSystem ? 'text-gold-200/80' : 'text-white/90'}`}>
                                {msg.text}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Reactions */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className={`flex items-center gap-1 mt-1 flex-wrap ${isOwn ? 'justify-end' : 'justify-start'} px-1`}>
                            {msg.reactions.map((r, ri) => (
                              <span key={ri} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] cursor-pointer hover:bg-white/10 transition-colors">
                                {r.emoji} <span className="text-white/40 font-medium">{r.count}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Timestamp + actions */}
                        <div className={`flex items-center gap-2 mt-0.5 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[10px] text-white/15">{formatTime(msg.timestamp)}</span>

                          {/* Actions that appear on hover */}
                          {isSetup && !isSystem && (
                            <div className="hidden group-hover/msg:flex items-center gap-0.5">
                              <button
                                onClick={() => setReplyingTo(msg)}
                                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                                title="Responder"
                              >
                                <Reply className="w-3 h-3 text-white/30 hover:text-white/60" />
                              </button>
                              <button
                                onClick={() => setReactingMessageId(reactingMessageId === msg.id ? null : msg.id)}
                                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                                title="Reagir"
                              >
                                <Heart className="w-3 h-3 text-white/30 hover:text-white/60" />
                              </button>
                              <button
                                className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                                title="Mais"
                              >
                                <Bookmark className="w-3 h-3 text-white/30 hover:text-white/60" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Reaction picker */}
                        {reactingMessageId === msg.id && (
                          <div className={`absolute ${isOwn ? 'right-0' : 'left-0'} -top-10 z-10 flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-[#1a2744] border border-white/10 shadow-xl animate-fade-in`}>
                            {reactionEmojis.map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => { sendReaction(msg.id, emoji); setReactingMessageId(null); }}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 hover:scale-125 transition-all cursor-pointer text-sm"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="px-4 py-3 rounded-[20px] bg-white/[0.05] border border-white/[0.06] rounded-tl-lg">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to bottom */}
              {showScrollBtn && (
                <div className="absolute bottom-[76px] left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => scrollToBottom()}
                    className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center cursor-pointer hover:bg-gold-500/30 transition-all shadow-lg"
                  >
                    <ChevronDown className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              )}

              {/* Reply bar */}
              {replyingTo && (
                <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.02] flex items-center gap-3">
                  <Reply className="w-4 h-4 text-gold-400 shrink-0 rotate-180" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gold-400 text-[11px] font-semibold">{replyingTo.user}</p>
                    <p className="text-white/30 text-[11px] truncate">
                      {replyingTo.text || replyingTo.verse?.text || replyingTo.movie?.title}
                    </p>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 text-white/30 hover:text-white/60 transition-colors" />
                  </button>
                </div>
              )}

              {/* Attach menus */}
              {showAttachMenu && (
                <div className="px-4 py-2 border-t border-white/[0.05] bg-white/[0.02] flex items-center gap-2 animate-fade-in">
                  <button
                    onClick={() => { setShowMoviePicker(!showMoviePicker); setShowVersePicker(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      showMoviePicker ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    Filme
                  </button>
                  <button
                    onClick={() => { setShowVersePicker(!showVersePicker); setShowMoviePicker(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      showVersePicker ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Versículo
                  </button>
                </div>
              )}

              {/* Movie picker */}
              {showMoviePicker && (
                <div className="px-3 py-2 border-t border-white/[0.05] bg-white/[0.02] max-h-[180px] overflow-y-auto animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    {movieSuggestions.map((movie, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sendMessage('movie', { movie });
                          setShowMoviePicker(false);
                          setShowAttachMenu(false);
                        }}
                        className="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-gold-500/20 transition-all cursor-pointer"
                      >
                        <img src={movie.image} alt={movie.title} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <div className="text-left min-w-0">
                          <p className="text-white text-[11px] font-medium truncate">{movie.title}</p>
                          <p className="text-white/30 text-[10px]">{movie.year}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Verse picker */}
              {showVersePicker && (
                <div className="px-3 py-2 border-t border-white/[0.05] bg-white/[0.02] max-h-[180px] overflow-y-auto animate-fade-in">
                  <div className="space-y-1.5">
                    {quickVerses.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sendMessage('verse', { verse: { text: v.text, reference: v.ref } });
                          setShowVersePicker(false);
                          setShowAttachMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-gold-500/20 transition-all cursor-pointer"
                      >
                        <p className="text-white/60 text-[11px] italic">"{v.text}"</p>
                        <p className="text-gold-400/50 text-[10px] mt-0.5">— {v.ref}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-white/[0.06]"
                style={{ background: 'linear-gradient(180deg, rgba(15,26,46,0.8) 0%, rgba(10,18,35,0.95) 100%)' }}
              >
                <div className="flex items-center gap-2">
                  {/* Attach button */}
                  <button
                    onClick={() => {
                      setShowAttachMenu(!showAttachMenu);
                      setShowMoviePicker(false);
                      setShowVersePicker(false);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      showAttachMenu
                        ? 'bg-gold-500/20 text-gold-400 rotate-45'
                        : 'bg-white/[0.04] text-white/30 hover:text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {/* Emoji */}
                  <div className="relative">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all cursor-pointer"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-12 left-0 flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-[#1a2744] border border-white/10 shadow-xl animate-fade-in z-20">
                        {['🙏', '❤️', '✝️', '🕊️', '😊', '🌟', '💒', '📖'].map(e => (
                          <button
                            key={e}
                            onClick={() => {
                              setInputValue(prev => prev + e);
                              setShowEmojiPicker(false);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 hover:scale-125 transition-all cursor-pointer text-base"
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Escreva uma mensagem..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-500/20 focus:bg-white/[0.06] transition-all min-w-0"
                  />

                  {/* Send */}
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold-500/30 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    <span className="text-white/15 text-[10px]">
                      {isConnected ? 'Criptografado' : 'Sem conexão'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/10" />
                    <span className="text-white/15 text-[10px]">{formatTime(Date.now())}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
