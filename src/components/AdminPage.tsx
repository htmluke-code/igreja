import { useState } from 'react';
import {
  Shield, Lock, Eye, EyeOff, Film, BookOpen, Landmark, Plus, Pencil, Trash2,
  X, Save, LogOut, LayoutDashboard, ChevronRight, Search, AlertTriangle,
  Check, Loader2, ExternalLink, Image
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
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [search, setSearch] = useState('');

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
      <div className="min-h-screen bg-sacred-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold-500/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white mb-1">Painel Admin</h1>
              <p className="text-white/40 text-sm">Acesso restrito — Digite a senha</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setLoginError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors`}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <p className="text-red-400 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Senha incorreta. Tente novamente.
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={loginLoading || !password}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 font-bold hover:shadow-lg hover:shadow-gold-500/25 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</> : 'Entrar'}
              </button>
            </div>

            <p className="text-center text-white/20 text-xs mt-6">
              Área restrita ao administrador
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== ADMIN DASHBOARD =====
  const tabs: { id: Tab; label: string; icon: typeof Film; count: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: 0 },
    { id: 'movies', label: 'Filmes', icon: Film, count: movies.length },
    { id: 'stories', label: 'Histórias', icon: BookOpen, count: stories.length },
    { id: 'churches', label: 'Igrejas', icon: Landmark, count: churches.length },
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

  return (
    <div className="min-h-screen bg-[#0c0f1a]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-4 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/90 text-white text-sm font-medium shadow-xl animate-fade-in">
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0c0f1a]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">Admin Panel</h1>
              <p className="text-white/30 text-[10px]">Fé Católica · Gerenciamento</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 min-h-[calc(100vh-64px)] bg-white/[0.02] border-r border-white/[0.06] p-3 gap-1 sticky top-16">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-md ${active ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/30'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0f1a]/95 backdrop-blur-xl border-t border-white/[0.06] flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-all cursor-pointer ${active ? 'text-gold-400' : 'text-white/40'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl">
              <h2 className="text-white font-bold text-xl mb-6">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Filmes', count: movies.length, icon: Film, color: 'from-blue-500 to-blue-600', onClick: () => setActiveTab('movies') },
                  { label: 'Histórias', count: stories.length, icon: BookOpen, color: 'from-purple-500 to-purple-600', onClick: () => setActiveTab('stories') },
                  { label: 'Igrejas', count: churches.length, icon: Landmark, color: 'from-amber-500 to-amber-600', onClick: () => setActiveTab('churches') },
                ].map(card => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.label}
                      onClick={card.onClick}
                      className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 hover:border-white/10 transition-all cursor-pointer text-left"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white/40 text-xs mb-0.5">{card.label}</p>
                      <p className="text-white text-2xl font-bold">{card.count}</p>
                      <ChevronRight className="absolute top-5 right-5 w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
                <h3 className="text-white font-semibold text-sm mb-3">Informações</h3>
                <div className="space-y-2 text-white/40 text-sm">
                  <p>• Gerencie filmes, histórias e igrejas do site.</p>
                  <p>• As alterações são refletidas em tempo real.</p>
                  <p>• Para persistência global, conecte a uma API MongoDB.</p>
                  <p className="text-white/20 text-xs mt-4">
                    Endpoint: Configure VITE_API_URL no arquivo .env para conectar ao backend MongoDB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== MOVIES TAB ===== */}
          {activeTab === 'movies' && (
            <div className="max-w-5xl">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <h2 className="text-white font-bold text-xl">Filmes ({movies.length})</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Buscar..."
                      className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold-500/50 w-48"
                    />
                  </div>
                  <button
                    onClick={() => { setEditingMovie(null); setShowMovieForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Filme
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {movies
                  .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
                  .map(movie => (
                    <div key={movie.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all group">
                      <img src={movie.image} alt={movie.title} className="w-12 h-16 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                        <p className="text-white/30 text-xs">{movie.director} · {movie.year} · {movie.duration}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditingMovie(movie); setShowMovieForm(true); }}
                          className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-blue-400 transition-all cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'movie', id: movie.id, name: movie.title })}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ===== STORIES TAB ===== */}
          {activeTab === 'stories' && (
            <div className="max-w-5xl">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <h2 className="text-white font-bold text-xl">Histórias ({stories.length})</h2>
                <button
                  onClick={() => { setEditingStory(null); setShowStoryForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Nova História
                </button>
              </div>
              <div className="space-y-2">
                {stories.map(story => (
                  <div key={story.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all">
                    <img src={story.image} alt={story.title} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm truncate">{story.title}</h3>
                      <p className="text-white/30 text-xs truncate">{story.description}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-white/5 text-white/40 text-[10px] shrink-0">{story.category}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingStory(story); setShowStoryForm(true); }} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-blue-400 transition-all cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm({ type: 'story', id: story.id, name: story.title })} className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== CHURCHES TAB ===== */}
          {activeTab === 'churches' && (
            <div className="max-w-5xl">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <h2 className="text-white font-bold text-xl">Igrejas ({churches.length})</h2>
                <button
                  onClick={() => { setEditingChurch(null); setShowChurchForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Nova Igreja
                </button>
              </div>
              <div className="space-y-2">
                {churches.map(church => (
                  <div key={church.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all">
                    <img src={church.image} alt={church.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm truncate">{church.name}</h3>
                      <p className="text-white/30 text-xs">{church.location} · {church.yearBuilt}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingChurch(church); setShowChurchForm(true); }} className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-blue-400 transition-all cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm({ type: 'church', id: church.id, name: church.name })} className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl bg-[#1a1d2e] border border-white/10 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Confirmar exclusão</h3>
                <p className="text-white/40 text-xs">Esta ação não pode ser desfeita</p>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Tem certeza que deseja remover <strong className="text-white">{deleteConfirm.name}</strong>?
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-all cursor-pointer">
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all cursor-pointer flex items-center justify-center gap-2"
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

// ===== MOVIE FORM MODAL COMPONENT =====
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
      title: form.title,
      year: Number(form.year),
      director: form.director,
      duration: form.duration,
      rating: Number(form.rating),
      genre: form.genre.split(',').map(g => g.trim()).filter(Boolean),
      description: form.description,
      image: form.image,
      trailer: form.trailer,
      platforms: form.platforms.split(',').map(p => p.trim()).filter(Boolean),
      featured: form.featured,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#1a1d2e] border-b border-white/[0.06]">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Film className="w-4 h-4 text-gold-400" />
            {movie ? 'Editar Filme' : 'Novo Filme'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/40 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Título" value={form.title} onChange={v => setForm({ ...form, title: v })} />
            <FormField label="Diretor" value={form.director} onChange={v => setForm({ ...form, director: v })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Ano" value={String(form.year)} onChange={v => setForm({ ...form, year: Number(v) })} type="number" />
            <FormField label="Duração" value={form.duration} onChange={v => setForm({ ...form, duration: v })} placeholder="2h 07min" />
            <FormField label="Rating" value={String(form.rating)} onChange={v => setForm({ ...form, rating: Number(v) })} type="number" />
          </div>
          <FormField label="Gêneros (separados por vírgula)" value={form.genre} onChange={v => setForm({ ...form, genre: v })} placeholder="Bíblico, Drama" />
          <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
          <div className="relative">
            <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="https://..." />
            {form.image && (
              <div className="mt-1 flex items-center gap-2">
                <img src={form.image} alt="Preview" className="w-10 h-14 object-cover rounded" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                <Image className="w-3 h-3 text-white/20" />
                <span className="text-white/20 text-[10px]">Preview</span>
              </div>
            )}
          </div>
          <FormField label="URL do Trailer (YouTube)" value={form.trailer} onChange={v => setForm({ ...form, trailer: v })} placeholder="https://youtube.com/watch?v=..." />
          <FormField label="Plataformas (separadas por vírgula)" value={form.platforms} onChange={v => setForm({ ...form, platforms: v })} placeholder="Netflix, Prime Video" />

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
            <span className="text-white/60 text-sm">Filme em destaque</span>
          </label>
        </div>

        <div className="sticky bottom-0 flex items-center gap-2 p-4 bg-[#1a1d2e] border-t border-white/[0.06]">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-all cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !form.title}
            className="flex-1 py-2.5 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#1a1d2e] border-b border-white/[0.06]">
          <h3 className="text-white font-bold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-400" />
            {story ? 'Editar História' : 'Nova História'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/40 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4 space-y-3">
          <FormField label="Título" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
          <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <div>
            <label className="text-white/40 text-xs mb-1 block">Categoria</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50"
            >
              <option value="Antigo Testamento">Antigo Testamento</option>
              <option value="Novo Testamento">Novo Testamento</option>
            </select>
          </div>
          <FormField label="Texto Completo" value={form.fullText} onChange={v => setForm({ ...form, fullText: v })} multiline />
        </div>
        <div className="sticky bottom-0 flex items-center gap-2 p-4 bg-[#1a1d2e] border-t border-white/[0.06]">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 cursor-pointer">Cancelar</button>
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.title}
            className="flex-1 py-2.5 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1a1d2e] border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#1a1d2e] border-b border-white/[0.06]">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Landmark className="w-4 h-4 text-gold-400" />
            {church ? 'Editar Igreja' : 'Nova Igreja'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/40 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4 space-y-3">
          <FormField label="Nome" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <FormField label="Localização" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          <FormField label="Descrição" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
          <FormField label="URL da Imagem" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <FormField label="Ano de Construção" value={String(form.yearBuilt || '')} onChange={v => setForm({ ...form, yearBuilt: parseInt(v) || 0 })} placeholder="1506-1626" />
        </div>
        <div className="sticky bottom-0 flex items-center gap-2 p-4 bg-[#1a1d2e] border-t border-white/[0.06]">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 cursor-pointer">Cancelar</button>
          <button
            onClick={() => onSave({ ...form, yearBuilt: Number(form.yearBuilt) || 0 })}
            disabled={saving || !form.name}
            className="flex-1 py-2.5 rounded-xl bg-gold-500 text-sacred-900 text-sm font-bold hover:bg-gold-400 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </button>
        </div>
      </div>
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
  const cls = "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors";
  return (
    <div>
      <label className="text-white/40 text-xs mb-1 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${cls} resize-none`} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
