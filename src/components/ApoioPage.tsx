import { Heart, Copy, Check, HandHeart, Sparkles, Church, BookOpen, Shield } from 'lucide-react';
import { useState } from 'react';
import VerseRotator from './VerseRotator';
import Footer from './Footer';

interface ApoioPageProps {
  onNavigate: (page: string) => void;
}

export default function ApoioPage({ onNavigate }: ApoioPageProps) {
  const [copied, setCopied] = useState(false);

  const pixKey = 'wowkillaz07@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-sacred-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80"
            alt="Mãos em oração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sacred-900/60 via-sacred-900/70 to-sacred-900" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8">
              <HandHeart className="w-5 h-5 text-gold-400" />
              <span className="text-gold-300 text-sm font-medium tracking-wide">Apoie esta Obra</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ajude a manter este{' '}
              <span className="gradient-text">espaço de fé</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Criamos este site para levar a Palavra de Deus a todos, gratuitamente.
              Sua contribuição nos ajuda a continuar esta missão.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-sacred-900 to-sacred-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left Column - Message */}
            <div className="space-y-8">
              {/* Verse Card */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-gold-500/10">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 mt-1">
                    <BookOpen className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-bible text-white/90 italic text-lg leading-relaxed">
                      "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria."
                    </p>
                    <p className="text-gold-400 text-sm mt-3 font-medium">— 2 Coríntios 9:7</p>
                  </div>
                </div>
              </div>

              {/* Message Card */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🙏</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Ajude a manter este espaço de fé
                  </h2>
                </div>

                <div className="space-y-4 text-white/60 leading-relaxed">
                  <p>
                    Criamos este site para levar a <span className="text-white/80 font-medium">Palavra de Deus</span> a todos, gratuitamente.
                  </p>
                  <p>
                    Manter este espaço no ar tem custos com <span className="text-white/80 font-medium">servidor e domínio</span>, e fazemos tudo com <span className="text-gold-400/80 font-medium">amor e oração</span>.
                  </p>
                  <p>
                    Se este site te ajudou na sua caminhada de fé, contribua com o que o seu coração sentir.
                  </p>
                  <p className="text-gold-400/70 font-medium italic">
                    Não existe valor mínimo — toda oferta é uma bênção.
                  </p>
                </div>
              </div>

              {/* Impact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Church, label: 'Servidor Online', desc: 'Manter o site acessível 24h' },
                  { icon: Shield, label: 'Segurança', desc: 'Proteção e estabilidade' },
                  { icon: BookOpen, label: 'Conteúdo', desc: 'Novos estudos e reflexões' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="glass rounded-2xl p-4 text-center border border-white/5 hover:border-gold-500/10 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <p className="text-white text-sm font-semibold mb-1">{item.label}</p>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - PIX Card */}
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-3xl overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-gold-500/20 rounded-3xl blur-xl opacity-50" />

                <div className="relative glass rounded-3xl border border-gold-500/20 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 px-6 sm:px-8 py-6 border-b border-gold-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30">
                        <Heart className="w-5 h-5 text-white" fill="white" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">Contribua via PIX</h3>
                        <p className="text-gold-400/70 text-xs">Qualquer valor é uma bênção</p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="px-6 sm:px-8 py-8 flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-3 bg-gradient-to-r from-gold-400/20 to-gold-600/20 rounded-2xl blur-lg" />
                      <div className="relative bg-white rounded-2xl p-4 shadow-2xl">
                        <img
                          src="https://i.imgur.com/yYYv5NA.png"
                          alt="QR Code PIX"
                          className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                        />
                      </div>
                    </div>

                    <p className="text-white/50 text-sm mb-4 text-center">
                      Escaneie o QR Code acima ou copie a chave PIX:
                    </p>

                    {/* PIX Key */}
                    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 mb-6">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2 text-center">Chave PIX</p>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 text-gold-400 font-mono text-sm sm:text-base bg-white/5 rounded-xl px-4 py-3 text-center truncate">
                          {pixKey}
                        </code>
                        <button
                          onClick={handleCopy}
                          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                            copied
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 border border-gold-500/20'
                          }`}
                          title="Copiar chave PIX"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      {copied && (
                        <p className="text-green-400 text-xs text-center mt-2 animate-fade-in-up">
                          ✓ Chave copiada com sucesso!
                        </p>
                      )}
                    </div>

                    {/* Blessing Message */}
                    <div className="w-full bg-gradient-to-r from-gold-500/5 to-gold-600/5 rounded-2xl border border-gold-500/10 p-5 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl">✝️</span>
                      </div>
                      <p className="font-display text-white font-semibold text-base mb-1">
                        Deus abençoe você e sua família
                      </p>
                      <p className="text-white/40 text-xs">
                        Que o Senhor retribua em graças toda a sua generosidade
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Verse Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
            alt="Luz divina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sacred-900/85 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-6" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
            Versículo para Reflexão
          </h2>
          <div className="glass rounded-3xl p-8 sm:p-10">
            <VerseRotator variant="glass" showIcon={true} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
