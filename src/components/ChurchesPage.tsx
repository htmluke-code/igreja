import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Maximize2, X, ChevronLeft, ChevronRight, Star, Landmark, ExternalLink, Heart } from 'lucide-react';
import VerseRotator from './VerseRotator';
import Footer from './Footer';

interface ChurchesPageProps {
  onNavigate: (page: string) => void;
}

export default function ChurchesPage({ onNavigate }: ChurchesPageProps) {
  const [selectedChurch, setSelectedChurch] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const churches = [
    {
      name: "Basílica de São Pedro",
      location: "Cidade do Vaticano, Roma",
      country: "🇻🇦 Vaticano",
      year: "1626",
      capacity: "60.000",
      height: "136m",
      description: "A maior e mais importante igreja do mundo católico, centro da cristandade. Construída sobre o túmulo do apóstolo São Pedro, é um marco da arquitetura renascentista e barroca.",
      highlights: ["Cúpula de Michelangelo", "Pietà", "Baldaquino de Bernini", "Praça de São Pedro"],
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80",
        "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&q=80",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      ],
      style: "Renascimento e Barroco",
      rating: 4.9,
      visitors: "7M/ano",
      mapUrl: "https://maps.google.com/?q=Basilica+de+Sao+Pedro+Vaticano"
    },
    {
      name: "Notre-Dame de Paris",
      location: "Paris, França",
      country: "🇫🇷 França",
      year: "1345",
      capacity: "9.000",
      height: "96m",
      description: "Uma das mais famosas catedrais góticas do mundo, dedicada à Virgem Maria. Seus vitrais, rosáceas e arcobotantes são obras-primas da arquitetura medieval.",
      highlights: ["Rosáceas Medievais", "Arcobotantes", "Gárgulas", "Órgão Histórico"],
      image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=800&q=80",
      ],
      style: "Gótico Francês",
      rating: 4.8,
      visitors: "12M/ano",
      mapUrl: "https://maps.google.com/?q=Notre+Dame+Paris"
    },
    {
      name: "Sagrada Família",
      location: "Barcelona, Espanha",
      country: "🇪🇸 Espanha",
      year: "Desde 1882",
      capacity: "9.000",
      height: "172m",
      description: "A obra-prima inacabada de Antoni Gaudí, combinando formas naturais e simbolismo cristão em uma das igrejas mais impressionantes já concebidas.",
      highlights: ["Fachada da Natividade", "Colunas Arborescentes", "Vitrais Coloridos", "Torres Espirais"],
      image: "https://images.unsplash.com/photo-1564725075388-cc8338732289?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1564725075388-cc8338732289?w=800&q=80",
        "https://images.unsplash.com/photo-1583779457094-ab6f2b05c2b7?w=800&q=80",
        "https://images.unsplash.com/photo-1562541823-06f15b12cd80?w=800&q=80",
      ],
      style: "Modernismo Catalão",
      rating: 4.9,
      visitors: "4.5M/ano",
      mapUrl: "https://maps.google.com/?q=Sagrada+Familia+Barcelona"
    },
    {
      name: "Catedral de Milão",
      location: "Milão, Itália",
      country: "🇮🇹 Itália",
      year: "1965",
      capacity: "40.000",
      height: "108m",
      description: "A maior catedral da Itália e uma das maiores do mundo, com suas impressionantes 3.400 estátuas e 135 pináculos em estilo gótico flamejante.",
      highlights: ["3.400 Estátuas", "135 Pináculos", "Terraço Panorâmico", "Madonnina Dourada"],
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&q=80",
        "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80",
        "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800&q=80",
      ],
      style: "Gótico Tardio",
      rating: 4.7,
      visitors: "6M/ano",
      mapUrl: "https://maps.google.com/?q=Duomo+di+Milano"
    },
    {
      name: "Basílica de Aparecida",
      location: "Aparecida, São Paulo",
      country: "🇧🇷 Brasil",
      year: "1980",
      capacity: "45.000",
      height: "70m",
      description: "O maior santuário mariano do mundo, dedicado à padroeira do Brasil. Recebe milhões de peregrinos anualmente em devoção a Nossa Senhora Aparecida.",
      highlights: ["Sala das Promessas", "Imagem Original", "Cúpula Central", "Torre Brasília"],
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
        "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=800&q=80",
        "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800&q=80",
      ],
      style: "Moderno / Neo-Bizantino",
      rating: 4.8,
      visitors: "12M/ano",
      mapUrl: "https://maps.google.com/?q=Basilica+Nossa+Senhora+Aparecida"
    },
    {
      name: "Catedral de Colônia",
      location: "Colônia, Alemanha",
      country: "🇩🇪 Alemanha",
      year: "1880",
      capacity: "20.000",
      height: "157m",
      description: "Uma das maiores catedrais góticas do mundo, Patrimônio da Humanidade pela UNESCO. Suas torres gêmeas de 157 metros dominam o horizonte da cidade.",
      highlights: ["Torres Gêmeas", "Relicário dos Reis Magos", "Vitrais de Richter", "Patrimônio UNESCO"],
      image: "https://images.unsplash.com/photo-1567623689622-1d9abe677f37?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1567623689622-1d9abe677f37?w=800&q=80",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        "https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?w=800&q=80",
      ],
      style: "Gótico",
      rating: 4.7,
      visitors: "6M/ano",
      mapUrl: "https://maps.google.com/?q=Kolner+Dom+Cologne"
    },
  ];

  const [activeSacrament, setActiveSacrament] = useState<number | null>(null);

  const sacraments = [
    { 
      name: "Batismo", 
      subtitle: "Porta da Vida",
      desc: "Iniciação cristã — nos torna filhos de Deus e membros da Igreja. Pelo batismo somos libertados do pecado e regenerados como filhos de Deus.",
      verse: "\"Quem crer e for batizado será salvo.\" — Mc 16,16",
      gradient: "from-sky-400 to-blue-600",
      glow: "rgba(56,189,248,0.3)",
      bg: "rgba(56,189,248,0.08)",
      number: "I",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-3-3 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z"
    },
    { 
      name: "Eucaristia", 
      subtitle: "Pão da Vida",
      desc: "Corpo e sangue de Cristo — fonte e ápice de toda a vida cristã. O memorial da Paixão, Morte e Ressurreição do Senhor.",
      verse: "\"Isto é o meu corpo, que é dado por vós.\" — Lc 22,19",
      gradient: "from-amber-400 to-yellow-600",
      glow: "rgba(251,191,36,0.3)",
      bg: "rgba(251,191,36,0.08)",
      number: "II",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
    { 
      name: "Confirmação", 
      subtitle: "Selo do Espírito",
      desc: "Completa a graça batismal — fortalece pelo Espírito Santo. Vincula mais perfeitamente o cristão à Igreja.",
      verse: "\"Recebereis a força do Espírito Santo.\" — At 1,8",
      gradient: "from-orange-400 to-red-500",
      glow: "rgba(251,146,60,0.3)",
      bg: "rgba(251,146,60,0.08)",
      number: "III",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
    { 
      name: "Penitência", 
      subtitle: "Reconciliação",
      desc: "Reconciliação com Deus e com a Igreja através da confissão dos pecados. O perdão e a misericórdia de Deus.",
      verse: "\"A quem perdoardes os pecados, serão perdoados.\" — Jo 20,23",
      gradient: "from-emerald-400 to-teal-600",
      glow: "rgba(52,211,153,0.3)",
      bg: "rgba(52,211,153,0.08)",
      number: "IV",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
    { 
      name: "Unção dos Enfermos", 
      subtitle: "Cura e Conforto",
      desc: "Graça especial para os gravemente doentes ou em perigo de morte. Fortalece a alma e une ao sofrimento de Cristo.",
      verse: "\"Está alguém doente? Chame os presbíteros da Igreja.\" — Tg 5,14",
      gradient: "from-lime-400 to-green-600",
      glow: "rgba(163,230,53,0.3)",
      bg: "rgba(163,230,53,0.08)",
      number: "V",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
    { 
      name: "Ordem", 
      subtitle: "Serviço Sagrado",
      desc: "Sacramento de ordenação de diáconos, presbíteros e bispos. A missão confiada por Cristo aos Apóstolos continua na Igreja.",
      verse: "\"Fazei isto em memória de mim.\" — Lc 22,19",
      gradient: "from-violet-400 to-purple-600",
      glow: "rgba(167,139,250,0.3)",
      bg: "rgba(167,139,250,0.08)",
      number: "VI",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
    { 
      name: "Matrimônio", 
      subtitle: "Aliança de Amor",
      desc: "Aliança sagrada — sinal do amor de Cristo pela Igreja. União indissolúvel entre um homem e uma mulher perante Deus.",
      verse: "\"O que Deus uniu, o homem não separe.\" — Mt 19,6",
      gradient: "from-rose-400 to-pink-600",
      glow: "rgba(251,113,133,0.3)",
      bg: "rgba(251,113,133,0.08)",
      number: "VII",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    },
  ];

  const toggleLike = (i: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const selected = selectedChurch !== null ? churches[selectedChurch] : null;
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <div className="min-h-screen bg-sacred-900">
      {/* Hero */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80"
            alt="Igrejas Católicas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sacred-900/70 via-sacred-900/50 to-sacred-900" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.2em]">Patrimônios da Fé</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Igrejas <span className="gradient-text">Católicas</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            As mais belas catedrais e basílicas do mundo — testemunhos de fé 
            que atravessam séculos e inspiram milhões de fiéis.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: "Igrejas", value: "6" },
              { label: "Países", value: "6" },
              { label: "Séculos de História", value: "7+" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gold-400">{s.value}</span>
                <span className="text-white/40 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Churches Grid — Bento Style */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {churches.map((church, i) => (
              <article 
                key={i} 
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 ${
                  i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => { setSelectedChurch(i); setGalleryIndex(0); }}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${i === 0 ? 'h-[420px] sm:h-[500px]' : 'h-[280px]'}`}>
                  <img 
                    src={church.image} 
                    alt={church.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium border border-white/10">
                      {church.country}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500/20 backdrop-blur-md text-gold-400 text-xs font-bold border border-gold-500/20">
                        <Star className="w-3 h-3 fill-gold-400" />
                        {church.rating}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleLike(i); }}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          liked.has(i) 
                            ? 'bg-red-500/30 border border-red-500/30' 
                            : 'bg-black/30 border border-white/10 hover:bg-red-500/20'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-all ${liked.has(i) ? 'fill-red-400 text-red-400 scale-110' : 'text-white/70'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gold-400/80 text-[10px] font-semibold uppercase tracking-widest">{church.style}</span>
                    </div>
                    <h3 className={`font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors leading-tight ${
                      i === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'
                    }`}>
                      {church.name}
                    </h3>
                    
                    {i === 0 && (
                      <p className="text-white/50 text-sm leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                        {church.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-500/70" />
                        {church.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-500/70" />
                        {church.year}
                      </span>
                    </div>

                    {/* Hover action */}
                    <div className="mt-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/20 backdrop-blur-sm text-gold-400 text-xs font-medium border border-gold-500/20">
                        <Maximize2 className="w-3 h-3" />
                        Ver detalhes
                      </span>
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.06) 45%, rgba(212,175,55,0.12) 50%, rgba(212,175,55,0.06) 55%, transparent 60%)' }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && selectedChurch !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedChurch(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-sacred-800 border border-white/10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Gallery */}
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
              <img 
                src={selected.gallery[galleryIndex]} 
                alt={selected.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sacred-800 via-transparent to-transparent" />
              
              {/* Gallery nav */}
              {selected.gallery.length > 1 && (
                <>
                  <button 
                    onClick={() => setGalleryIndex(p => p === 0 ? selected.gallery.length - 1 : p - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setGalleryIndex(p => p === selected.gallery.length - 1 ? 0 : p + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Gallery dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {selected.gallery.map((_, gi) => (
                  <button 
                    key={gi}
                    onClick={() => setGalleryIndex(gi)}
                    className={`w-2 h-2 rounded-full transition-all ${gi === galleryIndex ? 'bg-gold-400 w-5' : 'bg-white/30'}`}
                  />
                ))}
              </div>

              {/* Close */}
              <button 
                onClick={() => setSelectedChurch(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Rating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                <span className="text-white font-bold text-sm">{selected.rating}</span>
                <span className="text-white/50 text-xs">· {selected.visitors} visitantes</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-gold-400/70 text-xs font-semibold uppercase tracking-widest mb-2">
                <Landmark className="w-3.5 h-3.5" />
                {selected.style}
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                {selected.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-white/40">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-500/70" />
                  {selected.location}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold-500/70" />
                  {selected.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{selected.country}</span>
              </div>

              <p className="text-white/60 leading-relaxed mb-6">
                {selected.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Capacidade", value: selected.capacity },
                  { label: "Altura", value: selected.height },
                  { label: "Visitantes", value: selected.visitors },
                ].map((stat, si) => (
                  <div key={si} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xl font-bold text-gold-400">{stat.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-white/70 text-sm font-semibold mb-3">Destaques</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.highlights.map((h, hi) => (
                    <span key={hi} className="px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-400/80 text-xs font-medium border border-gold-500/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href={selected.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Ver no Mapa
                </a>
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(selected.name)}+tour+virtual`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-white/70 text-sm font-medium border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Tour Virtual
                </a>
                <button 
                  onClick={() => toggleLike(selectedChurch)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    liked.has(selectedChurch) 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-red-500/10 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked.has(selectedChurch) ? 'fill-red-400' : ''}`} />
                  {liked.has(selectedChurch) ? 'Salvo' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verse Section */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80"
            alt="Oração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sacred-900/85 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <VerseRotator variant="glass" showIcon={true} />
          </div>
        </div>
      </section>

      {/* Sacraments — Ultra Modern */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400/70 text-[11px] font-semibold uppercase tracking-[0.25em]">Pilares da Fé Católica</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Os Sete <span className="gradient-text">Sacramentos</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Sinais sensíveis e eficazes da graça divina, instituídos por Cristo e confiados à Igreja — 
              os canais pelos quais a graça de Deus flui para nossas vidas.
            </p>
          </div>

          {/* Sacraments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sacraments.map((sac, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl border border-white/[0.06] overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/[0.12] ${
                  activeSacrament === i ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
                style={{ background: sac.bg }}
                onClick={() => setActiveSacrament(activeSacrament === i ? null : i)}
              >
                {/* Top gradient line */}
                <div className={`h-[2px] w-full bg-gradient-to-r ${sac.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    {/* Number badge */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sac.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        style={{ boxShadow: `0 8px 24px ${sac.glow}` }}
                      >
                        <span className="text-white font-display font-bold text-sm">{sac.number}</span>
                      </div>
                      {/* Pulse ring */}
                      <div 
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${sac.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-ping`}
                        style={{ animationDuration: '2s' }}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors duration-300">
                          {sac.name}
                        </h3>
                      </div>
                      <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] bg-gradient-to-r ${sac.gradient} bg-clip-text text-transparent`}>
                        {sac.subtitle}
                      </span>
                      <p className="text-white/40 text-xs leading-relaxed mt-2.5 group-hover:text-white/55 transition-colors duration-300">
                        {sac.desc}
                      </p>
                    </div>
                  </div>

                  {/* Expanded verse */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeSacrament === i ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}>
                    <div className="pt-4 border-t border-white/[0.06]">
                      <p className="text-white/50 text-xs italic font-serif leading-relaxed">
                        {sac.verse}
                      </p>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="flex items-center justify-center mt-3">
                    <div className={`w-6 h-0.5 rounded-full bg-gradient-to-r ${sac.gradient} opacity-30 group-hover:opacity-70 group-hover:w-10 transition-all duration-500`} />
                  </div>
                </div>

                {/* Corner glow on hover */}
                <div 
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
                  style={{ background: sac.glow }}
                />
              </div>
            ))}
          </div>

          {/* Bottom quote */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-amber-600/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-white/40 text-xs sm:text-sm italic">
                "A graça de Deus se manifesta através dos sacramentos" — <span className="text-gold-400/60 not-italic font-medium">Catecismo da Igreja Católica</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
