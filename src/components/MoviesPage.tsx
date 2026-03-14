import { useState } from 'react';
import {
  Star, Play, Clock, User, Filter, Sparkles,
  ArrowRight, Heart, X, ExternalLink, Tv, Monitor,
  ChevronRight, Eye, Bookmark, Share2
} from 'lucide-react';
import Footer from './Footer';
import { useData } from '../contexts/DataContext';
import type { Movie } from '../services/api';

const platformUrls: Record<string, (title: string) => string> = {
  "Netflix": (t) => `https://www.netflix.com/search?q=${encodeURIComponent(t)}`,
  "Prime Video": (t) => `https://www.primevideo.com/search?phrase=${encodeURIComponent(t)}`,
  "Apple TV": (t) => `https://tv.apple.com/search?term=${encodeURIComponent(t)}`,
  "Disney+": (t) => `https://www.disneyplus.com/search/${encodeURIComponent(t)}`,
  "HBO Max": (t) => `https://play.max.com/search?q=${encodeURIComponent(t)}`,
  "Paramount+": (t) => `https://www.paramountplus.com/search/?q=${encodeURIComponent(t)}`,
  "Star+": (t) => `https://www.starplus.com/search?q=${encodeURIComponent(t)}`,
  "Cinema": (t) => `https://www.google.com/search?q=${encodeURIComponent(t + ' cinema ingressos')}`,
  "Telecine": (t) => `https://www.telecineplay.com.br/search?q=${encodeURIComponent(t)}`,
};

interface MoviesPageProps {
  onNavigate: (page: string) => void;
}

const genres = ["Todos", "Bíblico", "Drama", "Épico", "Inspiracional", "Animação"];

const platformColors: Record<string, string> = {
  "Netflix": "bg-red-600",
  "Prime Video": "bg-blue-500",
  "Disney+": "bg-blue-700",
  "HBO Max": "bg-purple-600",
  "Apple TV": "bg-gray-700",
  "Paramount+": "bg-blue-800",
  "Star+": "bg-purple-700",
  "Cinema": "bg-amber-600",
};

function getYouTubeId(url: string): string {
  const match = url.match(/(?:v=|\/)([\w-]{11})/);
  return match ? match[1] : '';
}

export default function MoviesPage({ onNavigate }: MoviesPageProps) {
  const { movies, loading } = useData();
  const [activeGenre, setActiveGenre] = useState("Todos");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [savedMovies, setSavedMovies] = useState<Set<string>>(new Set());

  const filteredMovies = activeGenre === "Todos"
    ? movies
    : movies.filter(m => m.genre.includes(activeGenre));

  const featuredMovie = movies.find(m => m.featured) || movies[0];

  const toggleSave = (id: string) => {
    setSavedMovies(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openTrailer = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  const openDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowTrailer(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-sacred-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60 text-sm">Carregando filmes...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sacred-900">
      {/* Hero */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sacred-900/90 via-sacred-900/70 to-sacred-900" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Play className="w-3.5 h-3.5 text-gold-400" fill="currentColor" />
                <span className="text-gold-300 text-xs font-semibold tracking-wider uppercase">Cinema & Fé</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                Filmes que tocam<br />
                <span className="gradient-text">a alma</span>
              </h1>
              <p className="text-white/50 text-base sm:text-lg max-w-lg mb-8">
                Histórias bíblicas, vidas de santos e narrativas de fé — descubra filmes
                que inspiram e fortalecem sua caminhada espiritual.
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => featuredMovie && openTrailer(featuredMovie)}
                  className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 rounded-2xl font-bold shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-sacred-900/20 flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </div>
                  Assistir Trailer
                </button>
                <button
                  onClick={() => document.getElementById('movies-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Ver Todos
                </button>
              </div>
            </div>

            {/* Featured card */}
            {featuredMovie && (
              <div
                className="w-72 sm:w-80 shrink-0 group cursor-pointer"
                onClick={() => openDetails(featuredMovie)}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group-hover:border-gold-500/30 transition-all duration-500">
                  <img
                    src={featuredMovie.image}
                    alt={featuredMovie.title}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gold-500/90 text-sacred-900 text-[10px] font-black uppercase tracking-wider">
                      ★ Destaque
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{featuredMovie.title}</h3>
                    <p className="text-white/50 text-xs mb-3">{featuredMovie.director} · {featuredMovie.year}</p>
                    <div className="flex gap-1.5">
                      {featuredMovie.platforms.map(p => (
                        <span key={p} className={`px-2 py-0.5 rounded text-[9px] font-bold text-white ${platformColors[p] || 'bg-gray-600'}`}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Genre Filter — Sticky */}
      <section className="sticky top-16 sm:top-20 z-30 bg-sacred-900/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Filter className="w-4 h-4 text-white/30 shrink-0" />
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeGenre === genre
                    ? 'bg-gold-500 text-sacred-900 shadow-lg shadow-gold-500/25'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {genre}
              </button>
            ))}
            <div className="ml-auto shrink-0 text-white/30 text-xs">
              {filteredMovies.length} filme{filteredMovies.length !== 1 && 's'}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section id="movies-grid" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-gold-500/20 transition-all duration-500"
            >
              {/* Poster */}
              <div
                className="relative aspect-[2/3] overflow-hidden cursor-pointer"
                onClick={() => openDetails(movie)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sacred-900 via-sacred-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Quick actions overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <button
                    onClick={(e) => { e.stopPropagation(); openTrailer(movie); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 text-sacred-900 text-xs font-bold shadow-xl shadow-gold-500/30 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" fill="currentColor" />
                    Trailer
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); openDetails(movie); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-xs font-medium border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Detalhes
                  </button>
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm">
                  <Star className="w-2.5 h-2.5 text-gold-400" fill="currentColor" />
                  <span className="text-white text-[10px] font-bold">{movie.rating}</span>
                </div>

                {movie.featured && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gold-500/90">
                    <Sparkles className="w-2.5 h-2.5 text-sacred-900" />
                    <span className="text-sacred-900 text-[9px] font-black">TOP</span>
                  </div>
                )}

                {/* Save button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(movie.id); }}
                  className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 cursor-pointer"
                  style={{ left: movie.featured ? 'auto' : '8px', right: movie.featured ? 'auto' : undefined }}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedMovies.has(movie.id) ? 'text-gold-400 fill-current' : 'text-white/70'}`} />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3
                  className="text-sm font-bold text-white mb-1 group-hover:text-gold-400 transition-colors cursor-pointer truncate"
                  onClick={() => openDetails(movie)}
                >
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-white/30 text-[10px] mb-2">
                  <span>{movie.year}</span>
                  <span>·</span>
                  <span>{movie.duration}</span>
                </div>

                {/* Platforms */}
                <div className="flex gap-1 flex-wrap">
                  {movie.platforms.slice(0, 2).map(p => (
                    <span key={p} className={`px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${platformColors[p] || 'bg-gray-600'}`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600/[0.04] via-gold-500/[0.02] to-gold-600/[0.04]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            A fé também se vive no cinema
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm">
            Aprofunde sua caminhada espiritual com a leitura da Bíblia Sagrada
          </p>
          <button
            onClick={() => onNavigate('bible')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 rounded-2xl font-bold shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Ler a Bíblia
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {/* ===== MOVIE DETAIL / TRAILER MODAL ===== */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => { setSelectedMovie(null); setShowTrailer(false); }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-sacred-800/95 border border-white/10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => { setSelectedMovie(null); setShowTrailer(false); }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {showTrailer ? (
              /* Trailer View */
              <div>
                <div className="relative w-full aspect-video bg-black rounded-t-3xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedMovie.trailer)}?autoplay=1&rel=0`}
                    title={selectedMovie.title}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-2">{selectedMovie.title}</h2>
                  <p className="text-white/50 text-sm mb-4">{selectedMovie.description}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setShowTrailer(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Ver detalhes
                    </button>
                    <a
                      href={selectedMovie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir no YouTube
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Details View */
              <div>
                {/* Hero image */}
                <div className="relative h-72 sm:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedMovie.image}
                    alt={selectedMovie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-800/95 via-sacred-800/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gold-500/20 border border-gold-500/30">
                        <Star className="w-3.5 h-3.5 text-gold-400" fill="currentColor" />
                        <span className="text-gold-400 text-sm font-bold">{selectedMovie.rating}</span>
                      </div>
                      {selectedMovie.genre.map(g => (
                        <span key={g} className="px-2 py-1 rounded-lg bg-white/10 text-white/70 text-xs">{g}</span>
                      ))}
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">{selectedMovie.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-6 text-white/40 text-sm mb-6">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {selectedMovie.director}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {selectedMovie.duration}
                    </span>
                    <span>{selectedMovie.year}</span>
                  </div>

                  <p className="text-white/60 leading-relaxed mb-8">
                    {selectedMovie.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 rounded-xl font-bold shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all cursor-pointer"
                    >
                      <Play className="w-5 h-5" fill="currentColor" />
                      Assistir Trailer
                    </button>
                    <button
                      onClick={() => toggleSave(selectedMovie.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                        savedMovies.has(selectedMovie.id)
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedMovies.has(selectedMovie.id) ? 'fill-current' : ''}`} />
                      {savedMovies.has(selectedMovie.id) ? 'Salvo' : 'Salvar'}
                    </button>
                    <button
                      onClick={() => {
                        navigator.share?.({ title: selectedMovie.title, url: selectedMovie.trailer })
                          .catch(() => window.open(selectedMovie.trailer, '_blank'));
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-all cursor-pointer font-medium"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </button>
                  </div>

                  {/* Where to Watch */}
                  <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
                    <h3 className="flex items-center gap-2 text-white font-semibold text-sm mb-4">
                      <Tv className="w-4 h-4 text-gold-400" />
                      Onde Assistir
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedMovie.platforms.map(platform => {
                        const getUrl = platformUrls[platform];
                        const url = getUrl ? getUrl(selectedMovie.title) : `https://www.google.com/search?q=${encodeURIComponent(selectedMovie.title + ' ' + platform + ' assistir')}`;
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-medium hover:scale-105 transition-all ${platformColors[platform] || 'bg-gray-600'}`}
                          >
                            <Monitor className="w-4 h-4" />
                            {platform}
                            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                          </a>
                        );
                      })}
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMovie.title + ' filme completo dublado')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-600/80 text-white text-sm font-medium hover:bg-red-600 hover:scale-105 transition-all"
                      >
                        <Play className="w-4 h-4" />
                        YouTube
                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
