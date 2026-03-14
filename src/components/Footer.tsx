import { Cross, BookOpen, Church, Heart, HandHeart, ArrowRight, Film, MessageCircle, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Bíblia Sagrada', icon: BookOpen, page: 'bible' },
    { label: 'Histórias Bíblicas', icon: Heart, page: 'stories' },
    { label: 'Igrejas Católicas', icon: Church, page: 'churches' },
    { label: 'Filmes Católicos', icon: Film, page: 'movies' },
  ];

  return (
    <footer className="relative bg-sacred-900 border-t border-white/[0.06]">
      {/* Support CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600/[0.06] via-gold-500/[0.04] to-gold-600/[0.06]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                  <HandHeart className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gold-400 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">
                  Ajude a manter este espaço de fé
                </p>
                <p className="text-white/40 text-xs sm:text-sm mt-0.5">
                  Toda contribuição é uma bênção · Contribua com qualquer valor
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('apoio')}
              className="group shrink-0 flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-900 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-gold-500/25 hover:scale-[1.03] active:scale-100 transition-all duration-300 cursor-pointer"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Contribuir
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/20">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white">Fé Católica</span>
                <p className="text-[10px] text-gold-400/60 tracking-widest uppercase -mt-0.5">Palavra de Deus</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Levando a Palavra de Deus a todos, com amor e fé. 
              Um espaço digital para fortalecer sua caminhada espiritual.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => {
                const Icon = link.icon;
                return (
                  <li key={link.page}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="group flex items-center gap-2.5 text-white/40 hover:text-gold-400 transition-colors duration-300 cursor-pointer text-sm"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">Comunidade</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('apoio')}
                  className="group flex items-center gap-2.5 text-white/40 hover:text-gold-400 transition-colors duration-300 cursor-pointer text-sm"
                >
                  <HandHeart className="w-3.5 h-3.5 shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Apoiar o projeto</span>
                </button>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-white/40 text-sm">
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  Chat ao vivo
                </span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="group flex items-center gap-1.5 text-white/[0.08] hover:text-white/20 transition-colors duration-500 cursor-default text-[10px] mt-6"
                  title=""
                >
                  <Shield className="w-2.5 h-2.5 shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">·</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Verse */}
          <div>
            <h4 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">Versículo</h4>
            <blockquote className="border-l-2 border-gold-500/30 pl-3">
              <p className="text-white/40 text-sm italic leading-relaxed">
                "Ide por todo o mundo, pregai o Evangelho a toda criatura."
              </p>
              <cite className="text-gold-400/50 text-xs mt-2 block not-italic">
                — Marcos 16:15
              </cite>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">
              © {currentYear} Fé Católica — Todos os direitos reservados
            </p>
            <p className="text-white/20 text-xs flex items-center gap-1.5">
              Feito com <Heart className="w-3 h-3 text-red-400/50" fill="currentColor" /> para a glória de Deus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
