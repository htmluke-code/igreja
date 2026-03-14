import { ArrowRight, Star, Sparkles, Clapperboard, BookOpen, Heart, Church, Film, Cross, BookMarked, Play } from 'lucide-react';
import VerseRotator from './VerseRotator';
import Footer from './Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: BookMarked,
      title: "Bíblia Sagrada",
      desc: "Leitura interativa com temas personalizáveis, modo escuro, marcadores e navegação por toque ou teclado.",
      action: () => onNavigate('bible'),
      gradient: "from-amber-400 via-yellow-500 to-orange-500",
      accentColor: "#d4a017",
      tag: "73 Livros",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80",
    },
    {
      icon: Heart,
      title: "Histórias Bíblicas",
      desc: "Da criação do mundo à ressurreição de Cristo — narrativas que moldaram a história da humanidade.",
      action: () => onNavigate('stories'),
      gradient: "from-rose-400 via-pink-500 to-red-500",
      accentColor: "#e11d48",
      tag: "Antigo & Novo",
      image: "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?w=600&q=80",
    },
    {
      icon: Church,
      title: "Igrejas Católicas",
      desc: "Catedrais e basílicas que são obras-primas da fé — da Basílica de São Pedro à Sagrada Família.",
      action: () => onNavigate('churches'),
      gradient: "from-sky-400 via-blue-500 to-indigo-500",
      accentColor: "#2563eb",
      tag: "Mundo todo",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
    },
    {
      icon: Film,
      title: "Filmes Católicos",
      desc: "Cinema que inspira a fé — filmes sobre histórias bíblicas, santos e a presença de Deus na vida.",
      action: () => onNavigate('movies'),
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
      accentColor: "#7c3aed",
      tag: "Inspiradores",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    },
  ];

  const stats = [
    { value: "73", label: "Livros Canônicos", sublabel: "46 AT + 27 NT", icon: BookOpen, color: "#d4a017" },
    { value: "1.390", label: "Bilhões de Fiéis", sublabel: "Maior comunidade cristã", icon: Cross, color: "#e11d48" },
    { value: "2.000", label: "Anos de Tradição", sublabel: "Desde o Pentecostes", icon: Church, color: "#2563eb" },
    { value: "7", label: "Sacramentos", sublabel: "Sinais da graça divina", icon: Heart, color: "#7c3aed" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80" 
            alt="Igreja Católica"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sacred-900/70 via-sacred-900/50 to-sacred-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-sacred-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium tracking-wide">Bem-vindo à Fé Católica</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg leading-tight">
              A Palavra de Deus<br />
              <span className="gradient-text">ao seu alcance</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Explore a Bíblia Sagrada, conheça histórias de fé e descubra a beleza 
              da tradição católica em uma experiência digital moderna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('bible')}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 rounded-2xl font-semibold text-lg shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <BookOpen className="w-5 h-5" />
                Ler a Bíblia
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('stories')}
                className="flex items-center gap-3 px-8 py-4 glass text-white rounded-2xl font-semibold text-lg hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <Heart className="w-5 h-5" />
                Histórias Bíblicas
              </button>
            </div>
          </div>

          <div className="mt-16 sm:mt-20 max-w-xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 animate-pulse-glow">
              <VerseRotator variant="glass" />
            </div>
          </div>
        </div>


      </section>

      {/* Stats Section - Modern Bento Style */}
      <section className="relative py-20 bg-gradient-to-b from-sacred-900 to-sacred-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
               style={{ background: 'radial-gradient(circle, #d4a017, transparent 70%)' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              A Igreja Católica em <span className="gradient-text">Números</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="group relative rounded-3xl p-6 sm:p-8 text-center overflow-hidden transition-all duration-500 hover:scale-[1.03]"
                     style={{
                       background: 'rgba(255,255,255,0.03)',
                       border: '1px solid rgba(255,255,255,0.06)',
                       backdropFilter: 'blur(10px)',
                     }}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: `radial-gradient(circle at 50% 80%, ${stat.color}15, transparent 70%)` }} />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-5 transition-all duration-500 group-hover:scale-110"
                         style={{ background: `${stat.color}15` }}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
                    </div>
                    <p className="font-display text-3xl sm:text-5xl font-bold text-white mb-1 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-white/70 text-sm sm:text-base font-medium mb-1">{stat.label}</p>
                    <p className="text-white/30 text-xs">{stat.sublabel}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-[40px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
                       style={{ background: stat.color }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Ultra Compact Modern Grid */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sacred-800 to-sacred-900 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-[160px] bg-gold-500/[0.03]" />
        <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full blur-[160px] bg-blue-500/[0.03]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header compacto */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-400 to-gold-600" />
                <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.2em]">Conteúdo</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                Pilares da <span className="gradient-text">Fé</span>
              </h2>
            </div>
            <p className="text-white/35 text-sm max-w-xs">
              Explore cada dimensão da fé católica em uma experiência digital moderna.
            </p>
          </div>

          {/* Grid 4 cards compactos e alinhados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <button
                  key={i}
                  onClick={feature.action}
                  className="group relative text-left cursor-pointer overflow-hidden"
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {/* Image top */}
                  <div className="relative h-36 overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(to top, rgba(12,15,26,1) 0%, rgba(12,15,26,0.4) 50%, ${feature.accentColor}10 100%)`,
                    }} />

                    {/* Tag flutuante */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
                            style={{ 
                              background: `${feature.accentColor}20`, 
                              color: feature.accentColor, 
                              border: `1px solid ${feature.accentColor}30`,
                            }}>
                        {feature.tag}
                      </span>
                    </div>

                    {/* Icon floating */}
                    <div className="absolute bottom-0 translate-y-1/2 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] z-10"
                         style={{
                           background: `linear-gradient(135deg, ${feature.accentColor}, ${feature.accentColor}cc)`,
                           boxShadow: `0 4px 20px ${feature.accentColor}40`,
                         }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-3">
                    <h3 className="font-display text-sm font-bold text-white mb-1.5 group-hover:text-gold-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/30 text-xs leading-relaxed mb-3 line-clamp-2">
                      {feature.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
                         style={{ color: feature.accentColor }}>
                      <span>Acessar</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                       style={{ background: `linear-gradient(90deg, ${feature.accentColor}, transparent)` }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
            alt="Luz divina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sacred-900/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">
            Versículo para Reflexão
          </h2>
          <div className="glass rounded-3xl p-8 sm:p-12">
            <VerseRotator variant="glass" showIcon={true} />
          </div>
        </div>
      </section>

      {/* Catholic Life Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-sacred-900 to-sacred-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                A Beleza da <span className="gradient-text">Fé Católica</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                A Igreja Católica é a maior e mais antiga instituição cristã do mundo, 
                com mais de 2000 anos de história, tradição e fé. Fundada por Jesus Cristo 
                sobre o apóstolo Pedro, ela continua a ser um farol de esperança e amor 
                para mais de 1,3 bilhão de fiéis em todo o mundo.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Através dos sacramentos, das Escrituras Sagradas e da comunhão dos santos, 
                a Igreja nos convida a uma vida de oração, serviço e contemplação do mistério divino.
              </p>
              <div className="space-y-4">
                {[
                  "Os 7 Sacramentos da Igreja",
                  "A Tradição Apostólica",
                  "Devoção à Virgem Maria",
                  "A Eucaristia: fonte e ápice da vida cristã",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-gold-400 group-hover:scale-150 transition-transform" />
                    <span className="text-white/70 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80"
                  alt="Interior de Igreja Católica"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 max-w-xs hidden sm:block">
                <p className="font-bible text-white/90 italic text-sm">
                  "Tu és Pedro, e sobre esta pedra edificarei a minha igreja."
                </p>
                <p className="text-gold-400 text-xs mt-2">— Mateus 16:18</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Movies */}
      <section className="py-16 bg-gradient-to-b from-sacred-800 to-sacred-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Filmes em Destaque</h2>
                <p className="text-white/40 text-sm">Cinema que inspira a fé</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('movies')}
              className="group flex items-center gap-2 text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors cursor-pointer"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "A Paixão de Cristo",
                year: 2004,
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=400&q=80",
              },
              {
                title: "Cabrini",
                year: 2024,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80",
              },
              {
                title: "Ben-Hur",
                year: 1959,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
              },
            ].map((movie, i) => (
              <button
                key={i}
                onClick={() => onNavigate('movies')}
                className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-gold-400" fill="currentColor" />
                      <span className="text-gold-400 text-xs font-bold">{movie.rating}</span>
                    </div>
                    <span className="text-white/40 text-xs">{movie.year}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                    {movie.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
