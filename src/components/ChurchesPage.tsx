import { ArrowLeft, MapPin, Globe, Calendar } from 'lucide-react';
import VerseRotator from './VerseRotator';
import Footer from './Footer';

interface ChurchesPageProps {
  onNavigate: (page: string) => void;
}

export default function ChurchesPage({ onNavigate }: ChurchesPageProps) {
  const churches = [
    {
      name: "Basílica de São Pedro",
      location: "Cidade do Vaticano, Roma",
      year: "1626",
      description: "A maior e mais importante igreja do mundo católico, centro da cristandade. Construída sobre o túmulo do apóstolo São Pedro, é um marco da arquitetura renascentista e barroca.",
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80",
      style: "Renascimento e Barroco"
    },
    {
      name: "Notre-Dame de Paris",
      location: "Paris, França",
      year: "1345",
      description: "Uma das mais famosas catedrais góticas do mundo, dedicada à Virgem Maria. Seus vitrais, rosáceas e arcobotantes são obras-primas da arquitetura medieval.",
      image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80",
      style: "Gótico Francês"
    },
    {
      name: "Sagrada Família",
      location: "Barcelona, Espanha",
      year: "Em construção desde 1882",
      description: "A obra-prima inacabada de Antoni Gaudí, combinando formas naturais e simbolismo cristão em uma das igrejas mais impressionantes já concebidas.",
      image: "https://images.unsplash.com/photo-1564725075388-cc8338732289?w=800&q=80",
      style: "Art Nouveau / Modernismo Catalão"
    },
    {
      name: "Catedral de Milão (Duomo)",
      location: "Milão, Itália",
      year: "1965",
      description: "A maior catedral da Itália e uma das maiores do mundo, com suas impressionantes 3.400 estátuas e 135 pináculos em estilo gótico flamejante.",
      image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&q=80",
      style: "Gótico Tardio"
    },
    {
      name: "Basílica de Nossa Senhora Aparecida",
      location: "Aparecida, São Paulo, Brasil",
      year: "1980",
      description: "O maior santuário mariano do mundo, dedicado à padroeira do Brasil. Recebe milhões de peregrinos anualmente em devoção a Nossa Senhora Aparecida.",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
      style: "Moderno / Neo-Bizantino"
    },
    {
      name: "Catedral de Colônia",
      location: "Colônia, Alemanha",
      year: "1880",
      description: "Uma das maiores catedrais góticas do mundo, Patrimônio da Humanidade pela UNESCO. Suas torres gêmeas de 157 metros dominam o horizonte da cidade.",
      image: "https://images.unsplash.com/photo-1567623689622-1d9abe677f37?w=800&q=80",
      style: "Gótico"
    },
  ];

  const sacraments = [
    { name: "Batismo", desc: "O sacramento da iniciação cristã, que nos torna filhos de Deus e membros da Igreja.", icon: "💧" },
    { name: "Eucaristia", desc: "O corpo e sangue de Cristo, fonte e ápice de toda a vida cristã.", icon: "🍞" },
    { name: "Confirmação", desc: "O sacramento que completa a graça batismal e nos fortalece pelo Espírito Santo.", icon: "🔥" },
    { name: "Penitência", desc: "O sacramento da reconciliação com Deus e com a Igreja.", icon: "🕊️" },
    { name: "Unção dos Enfermos", desc: "Graça especial para os que estão gravemente doentes ou em perigo de morte.", icon: "🫒" },
    { name: "Ordem", desc: "O sacramento pelo qual se ordena diáconos, presbíteros e bispos.", icon: "📖" },
    { name: "Matrimônio", desc: "A aliança sagrada entre um homem e uma mulher, sinal do amor de Cristo pela Igreja.", icon: "💍" },
  ];

  return (
    <div className="min-h-screen bg-sacred-900">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80"
            alt="Igrejas Católicas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sacred-900/60 via-sacred-900/40 to-sacred-900" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Voltar ao Início</span>
          </button>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-lg">
            Igrejas <span className="gradient-text">Católicas</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Conheça as mais belas e históricas catedrais e basílicas do mundo católico, 
            testemunhos de fé construídos ao longo dos séculos.
          </p>
        </div>
      </section>

      {/* Churches Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {churches.map((church, i) => (
              <article 
                key={i} 
                className={`group grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all duration-500 ${
                  i % 2 === 1 ? 'md:direction-rtl' : ''
                }`}
              >
                <div className={`relative h-64 md:h-auto overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img 
                    src={church.image} 
                    alt={church.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-900/50 to-transparent md:bg-none" />
                </div>
                <div className={`p-6 sm:p-8 flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5" />
                    {church.style}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {church.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {church.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      {church.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Calendar className="w-3.5 h-3.5 text-gold-500" />
                      {church.year}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Verse */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80"
            alt="Oração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sacred-900/85 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-8 sm:p-12">
            <VerseRotator variant="glass" showIcon={true} />
          </div>
        </div>
      </section>

      {/* Sacraments */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Os Sete <span className="gradient-text">Sacramentos</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Sinais sensíveis e eficazes da graça divina instituídos por Cristo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sacraments.map((sac, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/5 p-5 hover:border-gold-500/20 hover:bg-white/8 transition-all duration-300">
                <span className="text-3xl mb-3 block">{sac.icon}</span>
                <h3 className="font-display text-lg font-bold text-white mb-2">{sac.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{sac.desc}</p>
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
