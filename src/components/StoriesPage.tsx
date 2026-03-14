import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { biblicalStories } from '../data/bible';
import VerseRotator from './VerseRotator';
import Footer from './Footer';

interface StoriesPageProps {
  onNavigate: (page: string) => void;
}

export default function StoriesPage({ onNavigate }: StoriesPageProps) {
  const catholicTeachings = [
    {
      title: "Os 7 Sacramentos",
      items: ["Batismo", "Confirmação (Crisma)", "Eucaristia", "Penitência", "Unção dos Enfermos", "Ordem", "Matrimônio"],
      description: "Os sete sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja."
    },
    {
      title: "As Obras de Misericórdia",
      items: ["Dar de comer a quem tem fome", "Dar de beber a quem tem sede", "Vestir os nus", "Acolher os peregrinos", "Visitar os enfermos", "Visitar os presos", "Enterrar os mortos"],
      description: "Ações caritativas pelas quais socorremos o próximo em suas necessidades corporais e espirituais."
    },
    {
      title: "Os 10 Mandamentos",
      items: ["Amar a Deus sobre todas as coisas", "Não tomar Seu santo nome em vão", "Guardar domingos e festas", "Honrar pai e mãe", "Não matar", "Não pecar contra a castidade", "Não furtar", "Não levantar falso testemunho", "Não desejar a mulher do próximo", "Não cobiçar as coisas alheias"],
      description: "Os Dez Mandamentos exprimem as obrigações fundamentais do homem para com Deus e para com o próximo."
    }
  ];

  return (
    <div className="min-h-screen bg-sacred-900">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80"
            alt="Histórias Bíblicas"
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
            Histórias <span className="gradient-text">Bíblicas</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Conheça as grandes narrativas da Palavra de Deus que moldaram a fé católica ao longo dos séculos.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {biblicalStories.map((story, i) => (
              <article key={i} className="group rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-medium mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {story.book}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {story.summary}
                  </p>
                  <button 
                    onClick={() => onNavigate('bible')}
                    className="flex items-center gap-2 text-gold-400 text-sm font-medium hover:gap-3 transition-all cursor-pointer"
                  >
                    Ler na Bíblia <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Verse Banner */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1533000759938-aa0ba70beceb?w=1920&q=80"
            alt="Reflexão"
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

      {/* Catholic Teachings */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ensinamentos <span className="gradient-text">Católicos</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Os pilares fundamentais da doutrina católica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {catholicTeachings.map((teaching, i) => (
              <div key={i} className="rounded-3xl bg-white/5 border border-white/5 p-6 sm:p-8 hover:border-gold-500/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{teaching.title}</h3>
                <p className="text-white/40 text-sm mb-4">{teaching.description}</p>
                <ol className="space-y-2">
                  {teaching.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
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
