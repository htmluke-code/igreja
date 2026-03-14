import { useState, useEffect } from 'react';
import {
  Shield, Lock, Eye, EyeOff, Film, BookOpen, Landmark, Plus, Pencil, Trash2,
  X, Save, LogOut, LayoutDashboard, Search, AlertTriangle,
  Check, Loader2, Image, TrendingUp, Clock, Activity, BarChart3,
  Users, Globe, Zap, ChevronDown, Star, Calendar, MapPin, Tag
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import type { Movie, Story, Church } from '../services/api';
import { loginAdmin, clearAuthToken, getAuthToken } from '../services/api';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

type Tab = 'dashboard' | 'movies' | 'stories' | 'churches';

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [authenticated, setAuthenticated] = useState(!!getAuthToken());
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    try {
      const saved = sessionStorage.getItem('admin_tab');
      if (saved && ['dashboard', 'movies', 'stories', 'churches'].includes(saved)) {
        return saved as Tab;
      }
    } catch { /* ignore */ }
    return 'dashboard';
  });
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Form states
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [showChurchForm, setShowChurchForm] = useState(false);
  const [editingChurch, setEditingChurch] = useState<Church | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { movies, stories, churches, createMovie, editMovie, removeMovie, createStory, editStory, removeStory, createChurch, editChurch, removeChurch } = useData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    try { sessionStorage.setItem('admin_tab', tab); } catch { /* ignore */ }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError(false);
    const result = await loginAdmin(password);
    if (result.success) {
      setAuthenticated(true);
    } else {
      setLoginError(true);
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    clearAuthToken();
    setAuthenticated(false);
    setPassword('');
  };

  // ===== LOGIN SCREEN =====
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1117 50%, #0a0a1a 100%)' }}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.03) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(168,85,247,0.03) 0%, transparent 50%)' }} />
          <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full blur-[120px] animate-pulse" style={{ background: 'rgba(212,175,55,0.04)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-[150px] animate-pulse" style={{ background: 'rgba(59,130,246,0.03)', animationDelay: '1s' }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative w-full max-w-[420px]">
          {/* Glow behind card */}
          <div className="absolute -inset-1 rounded-[28px] blur-xl opacity-20" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(59,130,246,0.2), rgba(168,85,247,0.2))' }} />

          <div className="relative rounded-[24px] border border-white/[0.08] p-8 overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(40px)' }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

            <div className="text-center mb-8">
              {/* Shield icon */}
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 rounded-2xl rotate-45 opacity-20" style={{ background: 'linear-gradient(135deg, #d4af37, #f5d76e)' }} />
                <div className="absolute inset-[3px] rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Shield className="w-9 h-9" style={{ color: '#d4af37' }} />
                </div>
                <div className="absolute -inset-2 rounded-2xl opacity-30 blur-lg" style={{ background: 'rgba(212,175,55,0.2)' }} />
              </div>

              <h1 className="font-display text-2xl font-bold text-white mb-2 tracking-tight">Painel Administrativo</h1>
              <p className="text-white/30 text-sm">Acesso restrito · Autenticação necessária</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs font-medium mb-2 block uppercase tracking-wider">Senha de acesso</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Lock className="w-4 h-4 text-white/25" />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setLoginError(false); }}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    placeholder="••••••••••"
                    className="w-full pl-14 pr-14 py-4 rounded-2xl text-white text-sm focus:outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: loginError ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: loginError ? '0 0 20px rgba(239,68,68,0.1)' : 'none'
                    }}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-red-400/80 text-xs">Credenciais inválidas. Verifique a senha e tente novamente.</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loginLoading || !password}
                className="w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2.5 group"
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #c5a028)',
                  color: '#0a0a1a',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.2)'
                }}
              >
                {loginLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Autenticando...</>
                ) : (
                  <><Shield className="w-4 h-4" /> Acessar Painel</>
                )}
              </button>
            </div>

            {/* Bottom info */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-center gap-4 text-[10px] text-white/15">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Criptografado</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Seguro</span>
                <span>•</span>
                <span>v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== ADMIN DASHBOARD =====
  const tabs: { id: Tab; label: string; icon: typeof Film; count: number; color: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: 0, color: '#d4af37' },
    { id: 'movies', label: 'Filmes', icon: Film, count: movies.length, color: '#3b82f6' },
    { id: 'stories', label: 'Histórias', icon: BookOpen, count: stories.length, color: '#a855f7' },
    { id: 'churches', label: 'Igrejas', icon: Landmark, count: churches.length, color: '#f59e0b' },
  ];

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setSaving(true);
    try {
      if (deleteConfirm.type === 'movie') await removeMovie(deleteConfirm.id);
      if (deleteConfirm.type === 'story') await removeStory(deleteConfirm.id);
      if (deleteConfirm.type === 'church') await removeChurch(deleteConfirm.id);
      showToast(`${deleteConfirm.name} removido com sucesso`);
    } catch { showToast('Erro ao remover'); }
    setSaving(false);
    setDeleteConfirm(null);
  };

  const totalItems = movies.length + stories.length + churches.length;

  return (
    <div className="min-h-screen" style={{ background: '#0a0b10' }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] animate-fade-in">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))', border: '1px solid rgba(34,197,94,0.2)', backdropFilter: 'blur(20px)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-white text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16" style={{ background: 'rgba(10,11,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.2)' }}>
              <Shield className="w-4.5 h-4.5" style={{ color: '#d4af37' }} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-sm leading-tight">Admin Panel</h1>
              <p className="text-white/25 text-[10px]">Fé Católica</p>
            </div>
          </div>

          {/* Center tabs - Desktop */}
          <div className="hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer"
                  style={{
                    background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.35)',
                    border: active ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: active ? tab.color : undefined }} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold" style={{
                      background: active ? `${tab.color}15` : 'rgba(255,255,255,0.04)',
                      color: active ? tab.color : 'rgba(255,255,255,0.25)',
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] text-white/20" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online · {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/40 text-xs hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
              style={{ color: 'rgba(239,68,68,0.6)', background: 'rgba(239,68,68,0.05)' }}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50" style={{ background: 'rgba(10,11,16,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className="flex-1 flex flex-col items-center gap-1 py-3 relative transition-all cursor-pointer"
              >
                {active && <div className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full" style={{ background: tab.color }} />}
                <Icon className="w-4 h-4" style={{ color: active ? tab.color : 'rgba(255,255,255,0.25)' }} />
                <span className="text-[9px] font-medium" style={{ color: active ? '#fff' : 'rgba(255,255,255,0.25)' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-24 md:pb-8 px-4 lg:px-8 max-w-7xl mx-auto">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-2xl mb-1">Dashboard</h2>
                <p className="text-white/30 text-sm">Visão geral do conteúdo do site</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs text-white/30" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Calendar className="w-3.5 h-3.5" />
                {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Total de Itens', value: totalItems, icon: BarChart3, color: '#d4af37', trend: '+3 este mês', bg: 'rgba(212,175,55,0.06)' },
                { label: 'Filmes', value: movies.length, icon: Film, color: '#3b82f6', trend: 'Atualizado', bg: 'rgba(59,130,246,0.06)', click: () => changeTab('movies') },
                { label: 'Histórias', value: stories.length, icon: BookOpen, color: '#a855f7', trend: 'Atualizado', bg: 'rgba(168,85,247,0.06)', click: () => changeTab('stories') },
                { label: 'Igrejas', value: churches.length, icon: Landmark, color: '#f59e0b', trend: 'Atualizado', bg: 'rgba(245,158,11,0.06)', click: () => changeTab('churches') },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <button
                    key={i}
                    onClick={stat.click}
                    className="relative group text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)` }} />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg, border: `1px solid ${stat.color}15` }}>
                          <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
                        <TrendingUp className="w-3.5 h-3.5 text-green-400/50" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-white/30 text-xs">{stat.label}</p>
                      <p className="text-[10px] mt-2 flex items-center gap-1" style={{ color: `${stat.color}80` }}>
                        <Activity className="w-3 h-3" /> {stat.trend}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Quick Actions */}
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: '#d4af37' }} />
                  Ações Rápidas
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Adicionar Filme', icon: Film, color: '#3b82f6', action: () => { changeTab('movies'); setEditingMovie(null); setShowMovieForm(true); } },
                    { label: 'Adicionar História', icon: BookOpen, color: '#a855f7', action: () => { changeTab('stories'); setEditingStory(null); setShowStoryForm(true); } },
                    { label: 'Adicionar Igreja', icon: Landmark, color: '#f59e0b', action: () => { changeTab('churches'); setEditingChurch(null); setShowChurchForm(true); } },
                  ].map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={i}
                        onClick={action.action}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-all cursor-pointer group"
                        style={{ border: '1px solid rgba(255,255,255,0.03)' }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${action.color}10` }}>
                          <Plus className="w-4 h-4" style={{ color: action.color }} />
                        </div>
                        <span className="text-white/60 text-sm group-hover:text-white transition-colors">{action.label}</span>
                        <Icon className="w-3.5 h-3.5 text-white/15 ml-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Items */}
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#d4af37' }} />
                  Conteúdo Recente
                </h3>
                <div className="space-y-2">
                  {movies.slice(0, 2).map((m, i) => (
                    <div key={`m${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <img src={m.image} alt={m.title} className="w-8 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{m.title}</p>
                        <p className="text-white/25 text-[10px]">Filme · {m.year}</p>
                      </div>
                      <Film className="w-3 h-3 text-blue-400/40" />
                    </div>
                  ))}
                  {stories.slice(0, 1).map((s, i) => (
                    <div key={`s${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <img src={s.image} alt={s.title} className="w-8 h-8 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{s.title}</p>
                        <p className="text-white/25 text-[10px]">História · {s.category}</p>
                      </div>
                      <BookOpen className="w-3 h-3 text-purple-400/40" />
                    </div>
                  ))}
                  {churches.slice(0, 1).map((c, i) => (
                    <div key={`c${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <img src={c.image} alt={c.name} className="w-8 h-8 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{c.name}</p>
                        <p className="text-white/25 text-[10px]">Igreja · {c.location}</p>
                      </div>
                      <Landmark className="w-3 h-3 text-amber-400/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: '#d4af37' }} />
                Informações do Sistema
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Status', value: 'Online', icon: Activity, color: '#22c55e' },
                  { label: 'Sessão', value: '24h', icon: Clock, color: '#3b82f6' },
                  { label: 'API', value: 'Ativa', icon: Zap, color: '#d4af37' },
                  { label: 'Versão', value: '2.0', icon: Star, color: '#a855f7' },
                ].map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                      <div>
                        <p className="text-white/25 text-[9px] uppercase tracking-wider">{info.label}</p>
                        <p className="text-white text-xs font-medium">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTENT TABS ===== */}
        {activeTab !== 'dashboard' && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-white font-bold text-2xl mb-1">
                  {activeTab === 'movies' && 'Filmes'}
                  {activeTab === 'stories' && 'Histórias Bíblicas'}
                  {activeTab === 'churches' && 'Igrejas'}
                </h2>
                <p className="text-white/30 text-sm">
                  {activeTab === 'movies' && `${movies.length} filmes cadastrados`}
                  {activeTab === 'stories' && `${stories.length} histórias cadastradas`}
                  {activeTab === 'churches' && `${churches.length} igrejas cadastradas`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2.5 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none w-52 transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (activeTab === 'movies') { setEditingMovie(null); setShowMovieForm(true); }
                    if (activeTab === 'stories') { setEditingStory(null); setShowStoryForm(true); }
                    if (activeTab === 'churches') { setEditingChurch(null); setShowChurchForm(true); }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #c5a028)', color: '#0a0a1a' }}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {activeTab === 'movies' && 'Novo Filme'}
                    {activeTab === 'stories' && 'Nova História'}
                    {activeTab === 'churches' && 'Nova Igreja'}
                  </span>
                </button>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Movies */}
              {activeTab === 'movies' && movies
                .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
                .map(movie => (
                  <div key={movie.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="flex gap-3 p-3">
                      <img src={movie.image} alt={movie.title} className="w-16 h-22 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0 py-1">
                        <h3 className="text-white font-semibold text-sm truncate mb-1">{movie.title}</h3>
                        <p className="text-white/25 text-xs mb-2">{movie.director}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(59,130,246,0.1)', color: 'rgba(59,130,246,0.7)' }}>
                            <Calendar className="w-2.5 h-2.5" /> {movie.year}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(245,158,11,0.1)', color: 'rgba(245,158,11,0.7)' }}>
                            <Star className="w-2.5 h-2.5" /> {movie.rating}
                          </span>
                          {movie.featured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(212,175,55,0.1)', color: 'rgba(212,175,55,0.7)' }}>
                              Destaque
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      <button
                        onClick={() => { setEditingMovie(movie); setShowMovieForm(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-blue-400 hover:bg-blue-400/5 transition-all cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" /> Editar
                      </button>
                      <div className="w-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      <button
                        onClick={() => setDeleteConfirm({ type: 'movie', id: movie.id, name: movie.title })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Excluir
                      </button>
                    </div>
                  </div>
                ))}

              {/* Stories */}
              {activeTab === 'stories' && stories
                .filter(s => s.title.toLowerCase().includes(search.toLowerCase()))
                .map(story => (
                  <div key={story.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="relative h-32 overflow-hidden">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,16,0.9), transparent)' }} />
                      <span className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(168,85,247,0.2)', color: 'rgba(168,85,247,0.8)', backdropFilter: 'blur(4px)' }}>
                        <Tag className="w-2.5 h-2.5 inline mr-1" />{story.category}
                      </span>
                      <h3 className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm truncate">{story.title}</h3>
                    </div>
                    <div className="p-3">
                      <p className="text-white/30 text-xs line-clamp-2">{story.description}</p>
                    </div>
                    <div className="flex border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      <button onClick={() => { setEditingStory(story); setShowStoryForm(true); }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-blue-400 hover:bg-blue-400/5 transition-all cursor-pointer">
                        <Pencil className="w-3 h-3" /> Editar
                      </button>
                      <div className="w-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      <button onClick={() => setDeleteConfirm({ type: 'story', id: story.id, name: story.title })} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer">
                        <Trash2 className="w-3 h-3" /> Excluir
                      </button>
                    </div>
                  </div>
                ))}

              {/* Churches */}
              {activeTab === 'churches' && churches
                .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                .map(church => (
                  <div key={church.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="relative h-32 overflow-hidden">
                      <img src={church.image} alt={church.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,16,0.9), transparent)' }} />
                      <span className="absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(245,158,11,0.2)', color: 'rgba(245,158,11,0.8)', backdropFilter: 'blur(4px)' }}>
                        <MapPin className="w-2.5 h-2.5 inline mr-1" />{church.location}
                      </span>
                      <h3 className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm truncate">{church.name}</h3>
                    </div>
                    <div className="p-3">
                      <p className="text-white/30 text-xs line-clamp-2">{church.description}</p>
                      {church.yearBuilt && (
                        <span className="inline-flex items-center gap-1 mt-2 text-[10px] px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.25)' }}>
                          <Clock className="w-2.5 h-2.5" /> {church.yearBuilt}
                        </span>
                      )}
                    </div>
                    <div className="flex border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      <button onClick={() => { setEditingChurch(church); setShowChurchForm(true); }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-blue-400 hover:bg-blue-400/5 transition-all cursor-pointer">
                        <Pencil className="w-3 h-3" /> Editar
                      </button>
                      <div className="w-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
                      <button onClick={() => setDeleteConfirm({ type: 'church', id: church.id, name: church.name })} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer">
                        <Trash2 className="w-3 h-3" /> Excluir
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty state */}
            {((activeTab === 'movies' && movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase())).length === 0) ||
              (activeTab === 'stories' && stories.filter(s => s.title.toLowerCase().includes(search.toLowerCase())).length === 0) ||
              (activeTab === 'churches' && churches.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).length === 0)) && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Search className="w-6 h-6 text-white/15" />
                </div>
                <p className="text-white/30 text-sm mb-1">Nenhum resultado encontrado</p>
                <p className="text-white/15 text-xs">Tente outra busca ou adicione um novo item</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===== MOVIE FORM MODAL ===== */}
      {showMovieForm && (
        <MovieFormModal
          movie={editingMovie}
          onClose={() => setShowMovieForm(false)}
          onSave={async (data) => {
            setSaving(true);
            try {
              if (editingMovie) {
                await editMovie(editingMovie.id, data);
                showToast('Filme atualizado com sucesso');
              } else {
                await createMovie(data as Omit<Movie, 'id'>);
                showToast('Filme adicionado com sucesso');
              }
            } catch { showToast('Erro ao salvar'); }
            setSaving(false);
            setShowMovieForm(false);
          }}
          saving={saving}
        />
      )}

      {/* ===== STORY FORM MODAL ===== */}
      {showStoryForm && (
        <StoryFormModal
          story={editingStory}
          onClose={() => setShowStoryForm(false)}
          onSave={async (data) => {
            setSaving(true);
            try {
              if (editingStory) {
                await editStory(editingStory.id, data);
                showToast('História atualizada');
              } else {
                await createStory(data as Omit<Story, 'id'>);
                showToast('História adicionada');
              }
            } catch { showToast('Erro ao salvar'); }
            setSaving(false);
            setShowStoryForm(false);
          }}
          saving={saving}
        />
      )}

      {/* ===== CHURCH FORM MODAL ===== */}
      {showChurchForm && (
        <ChurchFormModal
          church={editingChurch}
          onClose={() => setShowChurchForm(false)}
          onSave={async (data) => {
            setSaving(true);
            try {
              if (editingChurch) {
                await editChurch(editingChurch.id, data);
                showToast('Igreja atualizada');
              } else {
                await createChurch(data as Omit<Church, 'id'>);
                showToast('Igreja adicionada');
              }
            } catch { showToast('Erro ao salvar'); }
            setSaving(false);
            setShowChurchForm(false);
          }}
          saving={saving}
        />
      )}

      {/* ===== DELETE CONFIRM ===== */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
          <div className="relative w-full max-w-sm rounded-2xl p-6 overflow-hidden" style={{ background: '#12141f', border: '1px solid rgba(255,255,255,0.06)' }} onClick={e => e.stopPropagation()}>
            {/* Red accent line */}
            <div className="absolute top-0 left-6 right-6 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)' }} />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base">Excluir item</h3>
                <p className="text-white/30 text-xs">Esta ação é permanente</p>
              </div>
            </div>

            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Tem certeza que deseja excluir <strong className="text-white">&ldquo;{deleteConfirm.name}&rdquo;</strong>? Não será possível desfazer.
            </p>

            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl text-white/50 text-sm font-medium hover:bg-white/5 transition-all cursor-pointer" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={saving}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MOVIE FORM MODAL =====
function MovieFormModal({ movie, onClose, onSave, saving }: {
  movie: Movie | null;
  onClose: () => void;
  onSave: (data: Partial<Movie>) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: movie?.title || '',
    year: movie?.year || new Date().getFullYear(),
    director: movie?.director || '',
    duration: movie?.duration || '',
    rating: movie?.rating || 4.0,
    genre: movie?.genre?.join(', ') || '',
    description: movie?.description || '',
    image: movie?.image || '',
    trailer: movie?.trailer || '',
    platforms: movie?.platforms?.join(', ') || '',
    featured: movie?.featured || false,
  });

  const handleSubmit = () => {
    onSave({
      title: form.title, year: Number(form.year), director: form.director,
      duration: form.duration, rating: Number(form.rating),
      genre: form.genre.split(',').map(g => g.trim()).filter(Boolean),
      description: form.description, image: form.image, trailer: form.trailer,
      platforms: form.platforms.split(',').map(p => p.trim()).filter(Boolean),
      featured: form.featured,
    });
  };

  return (
    <ModalWrapper onClose={onClose} title={movie ? 'Editar Filme' : 'Novo Filme'} icon={<Film className="w-4 h-4" />} color="#3b82f6">
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Título" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <FormField label="Diretor" value={form.director} onChange={v => setForm({ ...form, director: v })} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="Ano" value={String(form.year)} onChange={v => setForm({ ...form, year: Number(v) })} type="number" />
          <FormField label="Duração" value={form.duration} onChange={v => setForm({ ...form, duration: v })} placeholder="2h 07min" />
          <FormField label="Rating" value={String(form.rating)} onChange={v => setForm({ ...form, rating: Number(v) })} type="number" />
        </div>
        <FormField label="Gêneros (vírgula)" value={form.genre} onChange={v => setForm({ ...form, genre: v })} placeholder="Bíblico, Drama" />
        <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
        <div>
          <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="https://..." />
          {form.image && (
            <div className="mt-2 flex items-center gap-2">
              <img src={form.image} alt="Preview" className="w-10 h-14 object-cover rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.06)' }} onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
              <span className="text-white/15 text-[10px] flex items-center gap-1"><Image className="w-3 h-3" /> Preview</span>
            </div>
          )}
        </div>
        <FormField label="URL do Trailer (YouTube)" value={form.trailer} onChange={v => setForm({ ...form, trailer: v })} placeholder="https://youtube.com/watch?v=..." />
        <FormField label="Plataformas (vírgula)" value={form.platforms} onChange={v => setForm({ ...form, platforms: v })} placeholder="Netflix, Prime Video" />
        <label className="flex items-center gap-3 cursor-pointer py-2">
          <div className="relative">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="sr-only" />
            <div className="w-10 h-5 rounded-full transition-colors" style={{ background: form.featured ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.06)' }}>
              <div className="w-4 h-4 rounded-full transition-transform mt-0.5" style={{ background: form.featured ? '#d4af37' : 'rgba(255,255,255,0.2)', transform: form.featured ? 'translateX(22px)' : 'translateX(2px)' }} />
            </div>
          </div>
          <span className="text-white/50 text-sm">Filme em destaque</span>
        </label>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSubmit} saving={saving} disabled={!form.title} />
    </ModalWrapper>
  );
}

// ===== STORY FORM MODAL =====
function StoryFormModal({ story, onClose, onSave, saving }: {
  story: Story | null;
  onClose: () => void;
  onSave: (data: Partial<Story>) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    title: story?.title || '',
    description: story?.description || '',
    image: story?.image || '',
    category: story?.category || 'Antigo Testamento',
    fullText: story?.fullText || '',
  });

  return (
    <ModalWrapper onClose={onClose} title={story ? 'Editar História' : 'Nova História'} icon={<BookOpen className="w-4 h-4" />} color="#a855f7">
      <div className="p-5 space-y-4">
        <FormField label="Título" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
        <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} />
        <div>
          <label className="text-white/35 text-[10px] font-medium mb-1.5 block uppercase tracking-wider">Categoria</label>
          <div className="relative">
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none appearance-none cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <option value="Antigo Testamento">Antigo Testamento</option>
              <option value="Novo Testamento">Novo Testamento</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
          </div>
        </div>
        <FormField label="Texto Completo" value={form.fullText} onChange={v => setForm({ ...form, fullText: v })} multiline />
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave(form)} saving={saving} disabled={!form.title} />
    </ModalWrapper>
  );
}

// ===== CHURCH FORM MODAL =====
function ChurchFormModal({ church, onClose, onSave, saving }: {
  church: Church | null;
  onClose: () => void;
  onSave: (data: Partial<Church>) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    name: church?.name || '',
    location: church?.location || '',
    description: church?.description || '',
    image: church?.image || '',
    yearBuilt: church?.yearBuilt || '',
  });

  return (
    <ModalWrapper onClose={onClose} title={church ? 'Editar Igreja' : 'Nova Igreja'} icon={<Landmark className="w-4 h-4" />} color="#f59e0b">
      <div className="p-5 space-y-4">
        <FormField label="Nome" value={form.name} onChange={v => setForm({ ...form, name: v })} />
        <FormField label="Localização" value={form.location} onChange={v => setForm({ ...form, location: v })} />
        <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
        <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} />
        <FormField label="Ano de Construção" value={String(form.yearBuilt || '')} onChange={v => setForm({ ...form, yearBuilt: parseInt(v) || 0 })} placeholder="1506" />
      </div>
      <ModalFooter onClose={onClose} onSave={() => onSave({ ...form, yearBuilt: Number(form.yearBuilt) || 0 })} saving={saving} disabled={!form.name} />
    </ModalWrapper>
  );
}

// ===== SHARED MODAL WRAPPER =====
function ModalWrapper({ children, onClose, title, icon, color }: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl" style={{ background: '#12141f', border: '1px solid rgba(255,255,255,0.06)' }} onClick={e => e.stopPropagation()}>
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

        <div className="sticky top-0 z-10 flex items-center justify-between p-5" style={{ background: '#12141f', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="text-white font-bold text-base flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12`, color }}>
              {icon}
            </div>
            {title}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-white/30 hover:text-white/60 cursor-pointer transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ===== SHARED MODAL FOOTER =====
function ModalFooter({ onClose, onSave, saving, disabled }: {
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  return (
    <div className="sticky bottom-0 flex items-center gap-2 p-5" style={{ background: '#12141f', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <button onClick={onClose} className="flex-1 py-3 rounded-xl text-white/50 text-sm font-medium hover:bg-white/5 transition-all cursor-pointer" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        Cancelar
      </button>
      <button
        onClick={onSave}
        disabled={saving || disabled}
        className="flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #d4af37, #c5a028)', color: '#0a0a1a' }}
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Salvar
      </button>
    </div>
  );
}

// ===== REUSABLE FORM FIELD =====
function FormField({ label, value, onChange, placeholder, type = 'text', multiline }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const style = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
  };
  return (
    <div>
      <label className="text-white/35 text-[10px] font-medium mb-1.5 block uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/15 focus:outline-none resize-none transition-all"
          style={style} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/15 focus:outline-none transition-all"
          style={style} />
      )}
    </div>
  );
}
