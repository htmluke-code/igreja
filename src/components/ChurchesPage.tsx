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

  const sacraments = [
    { name: "Batismo", desc: "Iniciação cristã — nos torna filhos de Deus e membros da Igreja.", icon: "💧", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
    { name: "Eucaristia", desc: "Corpo e sangue de Cristo — fonte e ápice de toda a vida cristã.", icon: "🍞", color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20" },
    { name: "Confirmação", desc: "Completa a graça batismal — fortalece pelo Espírito Santo.", icon: "🔥", color: "from-orange-500/20 to-red-500/20", border: "border-orange-500/20" },
    { name: "Penitência", desc: "Reconciliação com Deus e com a Igreja através da confissão.", icon: "🕊️", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20" },
    { name: "Unção", desc: "Graça especial para os gravemente doentes ou em perigo de morte.", icon: "🫒", color: "from-lime-500/20 to-green-500/20", border: "border-lime-500/20" },
    { name: "Ordem", desc: "Sacramento de ordenação de diáconos, presbíteros e bispos.", icon: "📖", color: "from-purple-500/20 to-violet-500/20", border: "border-purple-500/20" },
    { name: "Matrimônio", desc: "Aliança sagrada — sinal do amor de Cristo pela Igreja.", icon: "💍", color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20" },
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

      {/* Sacraments — Modern Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-gold-400 to-amber-600" />
            <span className="text-gold-400/60 text-xs font-semibold uppercase tracking-[0.2em]">Pilares da Fé</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Os Sete <span className="gradient-text">Sacramentos</span>
          </h2>
          <p className="text-white/40 text-sm mb-10 max-w-xl">
            Sinais sensíveis e eficazes da graça divina, instituídos por Cristo e confiados à Igreja.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {sacraments.map((sac, i) => (
              <div 
                key={i} 
                className={`group relative rounded-2xl bg-gradient-to-br ${sac.color} border ${sac.border} p-4 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-default`}
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{sac.icon}</span>
                <h3 className="font-display text-sm font-bold text-white mb-1.5 leading-tight">{sac.name}</h3>
                <p className="text-white/40 text-[11px] leading-relaxed">{sac.desc}</p>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 30px rgba(212,175,55,0.05)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
