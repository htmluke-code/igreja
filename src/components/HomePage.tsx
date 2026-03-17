import { useState, useEffect } from 'react';
import { ArrowRight, Star, Sparkles, Clapperboard, BookOpen, Heart, Church, Film, BookMarked, Play, Quote, Calendar, Crown } from 'lucide-react';
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

  const [activeSaint, setActiveSaint] = useState(0);
  const saints = [
    {
      name: "São Francisco de Assis",
      quote: "Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      feast: "4 de Outubro",
      patron: "Padroeiro dos animais e da ecologia"
    },
    {
      name: "Santa Teresa de Lisieux",
      quote: "Que as pequenas coisas sejam feitas com grande amor.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
      feast: "1 de Outubro",
      patron: "Padroeira das missões"
    },
    {
      name: "Santo Agostinho",
      quote: "Fizeste-nos para Vós, Senhor, e o nosso coração está inquieto enquanto não repousa em Vós.",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
      feast: "28 de Agosto",
      patron: "Doutor da Igreja"
    },
    {
      name: "São João Paulo II",
      quote: "Não tenham medo! Abram as portas a Cristo!",
      image: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=400&q=80",
      feast: "22 de Outubro",
      patron: "Padroeiro das famílias"
    }
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveSaint(p => (p + 1) % saints.length), 6000);
    return () => clearInterval(t);
  }, []);

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

      {/* Saints & Wisdom Section */}
      <section className="relative py-20 bg-gradient-to-b from-sacred-900 to-sacred-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
               style={{ background: 'radial-gradient(circle, #d4a017, transparent 70%)' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                 style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.15)' }}>
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300 text-xs font-medium tracking-wider uppercase">Sabedoria dos Santos</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Palavras que <span className="gradient-text">Transformam</span>
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Frases dos grandes santos da Igreja que iluminam nossa caminhada de fé
            </p>
          </div>

          {/* Saints Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="relative rounded-3xl overflow-hidden"
                 style={{
                   background: 'rgba(255,255,255,0.03)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   backdropFilter: 'blur(20px)',
                 }}>
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Image Side */}
                <div className="relative w-full md:w-2/5 h-56 md:h-auto min-h-[280px]">
                  {saints.map((saint, i) => (
                    <div key={i} className="absolute inset-0 transition-opacity duration-1000"
                         style={{ opacity: activeSaint === i ? 1 : 0 }}>
                      <img src={saint.image} alt={saint.name}
                           className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sacred-900/90 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-sacred-900/90 to-transparent md:hidden" />
                    </div>
                  ))}
                  {/* Name badge on image */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <div className="px-3 py-1.5 rounded-xl"
                         style={{ background: 'rgba(212,160,23,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212,160,23,0.3)' }}>
                      <span className="text-gold-300 text-sm font-semibold">{saints[activeSaint].name}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="relative w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  {/* Quote icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-gold-500/30" />
                  </div>

                  {/* Quote text */}
                  <div className="min-h-[100px]">
                    {saints.map((saint, i) => (
                      <p key={i} className="font-display text-xl sm:text-2xl text-white/90 font-light italic leading-relaxed absolute transition-all duration-700"
                         style={{
                           opacity: activeSaint === i ? 1 : 0,
                           transform: activeSaint === i ? 'translateY(0)' : 'translateY(20px)',
                         }}>
                        "{saint.quote}"
                      </p>
                    ))}
                  </div>

                  {/* Saint info */}
                  <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gold-400 font-semibold text-base hidden md:block">{saints[activeSaint].name}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-white/30" />
                            <span className="text-white/40 text-xs">{saints[activeSaint].feast}</span>
                          </div>
                          <span className="text-white/15">·</span>
                          <span className="text-white/40 text-xs">{saints[activeSaint].patron}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex items-center gap-2 mt-6">
                    {saints.map((_, i) => (
                      <button key={i} onClick={() => setActiveSaint(i)}
                              className="transition-all duration-500 rounded-full cursor-pointer"
                              style={{
                                width: activeSaint === i ? '32px' : '8px',
                                height: '8px',
                                background: activeSaint === i ? '#d4a017' : 'rgba(255,255,255,0.15)',
                              }} />
                    ))}
                    <span className="text-white/20 text-[10px] ml-auto">{activeSaint + 1}/{saints.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini-cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { icon: BookOpen, label: "Bíblia Completa", sub: "73 livros", color: "#d4a017" },
                { icon: Heart, label: "7 Sacramentos", sub: "Graça divina", color: "#e11d48" },
                { icon: Church, label: "2.000 Anos", sub: "De tradição", color: "#2563eb" },
                { icon: Star, label: "1.3 Bilhão", sub: "De fiéis no mundo", color: "#7c3aed" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="group relative rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.03] cursor-default"
                       style={{
                         background: 'rgba(255,255,255,0.02)',
                         border: '1px solid rgba(255,255,255,0.05)',
                       }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{ background: `radial-gradient(circle at 50% 100%, ${item.color}10, transparent 70%)` }} />
                    <div className="relative z-10">
                      <Icon className="w-4 h-4 mx-auto mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: item.color }} />
                      <p className="text-white/80 text-xs font-medium">{item.label}</p>
                      <p className="text-white/30 text-[10px] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

       {/* Features Section - Compact Modern Grid */}
       <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sacred-800 to-sacred-900 overflow-hidden">
         <div className="absolute inset-0 opacity-[0.012]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           {/* Header Compacto */}
           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
             <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.12)' }}>
                 <Sparkles className="w-3 h-3 text-gold-400" />
                 <span className="text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em]">Categorias</span>
               </div>
               <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                 Pilares da <span className="gradient-text">Fé</span>
               </h2>
             </div>
             <p className="text-white/30 text-xs sm:text-sm max-w-xs">
               Explore cada dimensão da fé católica
             </p>
           </div>

           {/* Grid Compacto 4 colunas */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
             {features.map((feature, i) => {
               const Icon = feature.icon;
               const isHighlight = i === 0;
               return (
                 <button
                   key={i}
                   onClick={feature.action}
                   className="group relative text-left cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
                   style={{
                     borderRadius: '16px',
                     border: isHighlight ? '1px solid rgba(212,160,23,0.25)' : '1px solid rgba(255,255,255,0.05)',
                     background: 'rgba(255,255,255,0.02)',
                   }}
                 >
                   {/* Image */}
                   <div className="relative h-32 sm:h-36 overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}>
                     <img src={feature.image} alt={feature.title}
                          className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
                     <div className="absolute inset-0"
                          style={{ background: `linear-gradient(to top, rgba(8,10,20,0.95) 0%, ${feature.accentColor}15 100%)` }} />

                     {/* Icon badge */}
                     <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${feature.accentColor}, ${feature.accentColor}aa)`,
                            boxShadow: `0 4px 15px ${feature.accentColor}40`,
                          }}>
                       <Icon className="w-4 h-4 text-white" />
                     </div>

                     {/* Tag */}
                     <div className="absolute top-2.5 left-2.5">
                       <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                             style={{ background: `${feature.accentColor}20`, color: feature.accentColor, border: `1px solid ${feature.accentColor}30` }}>
                         {feature.tag}
                       </span>
                     </div>

                     {/* Highlight star */}
                     {isHighlight && (
                       <div className="absolute top-2.5 right-2.5">
                         <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                       </div>
                     )}
                   </div>

                   {/* Content */}
                   <div className="p-3.5 sm:p-4">
                     <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1 group-hover:text-gold-300 transition-colors duration-300 truncate">
                       {feature.title}
                     </h3>
                     <p className="text-white/30 text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-3">
                       {feature.desc}
                     </p>
                     <div className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-300"
                          style={{ color: feature.accentColor }}>
                       <span>Explorar</span>
                       <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                     </div>
                   </div>

                   {/* Bottom accent */}
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
