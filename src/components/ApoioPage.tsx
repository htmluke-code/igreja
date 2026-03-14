import { Heart, Copy, Check, HandHeart, Sparkles, Church, BookOpen, Shield, Users, Globe, Clock, ChevronRight, Star, TrendingUp, Eye, BookMarked, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from './Footer';

interface ApoioPageProps {
  onNavigate: (page: string) => void;
}

export default function ApoioPage({ onNavigate }: ApoioPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState({ visitors: 0, prayers: 0, verses: 0 });
  const [showQR, setShowQR] = useState(false);

  const pixKey = 'wowkillaz07@gmail.com';

  useEffect(() => {
    const targets = { visitors: 12847, prayers: 45230, verses: 73 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounters({
        visitors: Math.floor(targets.visitors * eased),
        prayers: Math.floor(targets.prayers * eased),
        verses: Math.floor(targets.verses * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
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

  const testimonials = [
    { text: 'Este site me ajudou a voltar para a Igreja depois de anos afastado. Que Deus abençoe vocês!', author: 'Maria S.', location: 'São Paulo, SP' },
    { text: 'Leio a Bíblia online todos os dias aqui. A experiência de virar páginas é incrível!', author: 'João P.', location: 'Rio de Janeiro, RJ' },
    { text: 'Minha avó de 78 anos consegue usar o site facilmente. Muito obrigada por pensarem em todos!', author: 'Ana C.', location: 'Belo Horizonte, MG' },
    { text: 'Os filmes e histórias bíblicas são uma bênção para minha família toda.', author: 'Pedro L.', location: 'Curitiba, PR' },
  ];

  const stats = [
    { 
      icon: Eye, 
      value: counters.visitors.toLocaleString(), 
      label: 'Visitantes', 
      sublabel: 'pessoas alcançadas',
      gradient: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/20'
    },
    { 
      icon: TrendingUp, 
      value: counters.prayers.toLocaleString(), 
      label: 'Orações', 
      sublabel: 'momentos de fé',
      gradient: 'from-rose-500 to-pink-400',
      glow: 'shadow-rose-500/20'
    },
    { 
      icon: BookMarked, 
      value: counters.verses, 
      label: 'Livros', 
      sublabel: 'da Bíblia Sagrada',
      gradient: 'from-amber-500 to-yellow-400',
      glow: 'shadow-amber-500/20'
    },
  ];

  const impacts = [
    { icon: Globe, value: '24/7', label: 'Disponível', desc: 'Sempre online', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, value: 'SSL', label: 'Seguro', desc: 'Dados protegidos', color: 'from-emerald-500 to-green-500' },
    { icon: BookOpen, value: '73', label: 'Livros', desc: 'Bíblia completa', color: 'from-amber-500 to-yellow-500' },
    { icon: Users, value: '∞', label: 'Grátis', desc: 'Sem restrições', color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80"
            alt="Mãos em oração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300/90 text-sm font-medium tracking-wider uppercase">Apoie esta Obra</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Ajude a manter
              <br />
              <span className="bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500 bg-clip-text text-transparent">
                este espaço de fé
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
              Levamos a Palavra de Deus a milhares de pessoas gratuitamente.
              Sua contribuição faz esta missão possível.
            </p>

            {/* CTA Button */}
            <a
              href="#pix-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pix-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Contribuir agora
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Cards - Modern */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-20 max-w-2xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.04] hover:${stat.glow} hover:shadow-xl`}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-xl" />
                  <div className="absolute inset-0 border border-white/[0.08] rounded-2xl sm:rounded-3xl group-hover:border-white/[0.15] transition-colors duration-300" />
                  
                  {/* Top gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Hover glow */}
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b ${stat.gradient} opacity-0 group-hover:opacity-[0.07] rounded-full blur-2xl transition-opacity duration-500`} />

                  <div className="relative px-3 py-5 sm:px-5 sm:py-7 text-center">
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg ${stat.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    
                    {/* Value */}
                    <p className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight mb-1">
                      {stat.value}
                    </p>
                    
                    {/* Label */}
                    <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-0.5">
                      {stat.label}
                    </p>
                    
                    {/* Sublabel */}
                    <p className="text-white/25 text-[10px] sm:text-xs hidden sm:block">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verse Banner */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/[0.03] via-amber-500/[0.06] to-gold-500/[0.03]" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
        
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
            <BookOpen className="w-5 h-5 text-gold-400/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
          </div>
          <p className="font-bible text-lg sm:text-xl text-white/70 italic leading-relaxed">
            "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação,
            pois Deus ama quem dá com alegria."
          </p>
          <p className="text-gold-400/60 text-sm mt-4 font-medium tracking-wide">— 2 Coríntios 9:7</p>
        </div>
      </section>

      {/* Main Content */}
      <section id="pix-section" className="relative py-16 sm:py-24">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
              <HandHeart className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-white/50 text-xs font-medium tracking-wider uppercase">Como contribuir</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Sua contribuição faz a diferença
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
              Todo valor, por menor que seja, nos ajuda a continuar levando a fé a mais pessoas.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            
            {/* Left Column - Message & Impact (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Message Card */}
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                
                <div className="relative p-8 sm:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 flex items-center justify-center shrink-0 border border-gold-500/10">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                        Ajude a manter este espaço de fé
                      </h3>
                      <p className="text-white/30 text-sm">Uma missão que depende da sua generosidade</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-white/50 text-[15px] leading-relaxed">
                    <p>
                      Criamos este site para levar a <span className="text-white/80 font-medium">Palavra de Deus</span> a
                      todos os cantos do mundo, de forma completamente gratuita.
                    </p>
                    <p>
                      Manter este espaço no ar tem custos reais — <span className="text-white/70">servidor, domínio,
                      certificado de segurança</span> — e fazemos tudo com{' '}
                      <span className="text-gold-400/80 font-medium">amor e oração</span>.
                    </p>
                    <p>
                      Se este site te ajudou na sua caminhada de fé, contribua com o que o seu coração sentir.
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gold-400 to-amber-500" />
                      <p className="text-gold-400/80 font-medium italic text-sm">
                        Não existe valor mínimo — toda oferta é uma bênção.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {impacts.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                      <div className="absolute inset-0 border border-white/[0.06] rounded-2xl group-hover:border-white/[0.12] transition-colors" />
                      <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-60 transition-opacity`} />
                      
                      <div className="relative p-4 text-center">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-lg font-bold text-white mb-0.5">{item.value}</p>
                        <p className="text-white/60 text-xs font-medium">{item.label}</p>
                        <p className="text-white/25 text-[10px] mt-1 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Testimonials */}
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                
                <div className="relative p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="w-4 h-4 text-gold-400" fill="currentColor" />
                    <p className="text-white/40 text-xs font-medium tracking-wider uppercase">Depoimentos da comunidade</p>
                  </div>

                  <div className="relative min-h-[100px]">
                    {testimonials.map((t, i) => (
                      <div
                        key={i}
                        className="transition-all duration-500"
                        style={{
                          opacity: activeTestimonial === i ? 1 : 0,
                          position: activeTestimonial === i ? 'relative' : 'absolute',
                          top: 0, left: 0, right: 0,
                        }}
                      >
                        <p className="text-white/70 text-base italic leading-relaxed mb-4">
                          "{t.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400/30 to-amber-500/20 flex items-center justify-center text-xs font-bold text-gold-400">
                            {t.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white/80 text-sm font-medium">{t.author}</p>
                            <p className="text-white/30 text-xs">{t.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                          activeTestimonial === i ? 'w-6 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - PIX Card (2 cols) */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-gold-500/20 via-transparent to-gold-500/20 blur-xl opacity-60" />
                
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#12121a] to-[#0c0c14] border border-gold-500/[0.12]">
                  
                  {/* Header */}
                  <div className="relative px-6 py-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/[0.08] via-amber-500/[0.04] to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg shadow-gold-500/30">
                          <Heart className="w-5 h-5 text-white" fill="white" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold text-white">Contribua via PIX</h3>
                          <p className="text-white/30 text-xs">Rápido, seguro e sem taxas</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-[10px] font-medium">Ativo</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-7">
                    
                    {/* Step 1: QR Code */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center text-[10px] font-bold text-black">1</div>
                        <p className="text-white/60 text-sm font-medium">Escaneie o QR Code</p>
                      </div>

                      {/* QR Toggle */}
                      <div className="flex flex-col items-center">
                        {showQR ? (
                          <div className="relative group">
                            <div className="absolute -inset-3 bg-gradient-to-r from-gold-400/10 via-amber-400/15 to-gold-400/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative bg-white rounded-2xl p-3 shadow-2xl shadow-black/60">
                              <img
                                src="https://i.imgur.com/yYYv5NA.png"
                                alt="QR Code PIX"
                                className="w-48 h-48 object-contain"
                              />
                            </div>
                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold-400/50 rounded-tl-lg" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-gold-400/50 rounded-tr-lg" />
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-gold-400/50 rounded-bl-lg" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold-400/50 rounded-br-lg" />
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowQR(true)}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-gold-500/20 transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/10 to-amber-500/5 flex items-center justify-center border border-gold-500/10 group-hover:border-gold-500/20 transition-colors">
                              <Eye className="w-6 h-6 text-gold-400/60 group-hover:text-gold-400 transition-colors" />
                            </div>
                            <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">Toque para revelar o QR Code</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
                      <span className="text-white/15 text-[10px] uppercase tracking-widest">ou</span>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
                    </div>

                    {/* Step 2: PIX Key */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center text-[10px] font-bold text-black">2</div>
                        <p className="text-white/60 text-sm font-medium">Copie a chave PIX</p>
                      </div>

                      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                        <div className="px-4 py-2 border-b border-white/[0.05] flex items-center justify-between">
                          <span className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-medium">Chave PIX · E-mail</span>
                          <Lock className="w-3 h-3 text-green-400/40" />
                        </div>
                        <div className="p-3 flex items-center gap-2">
                          <code className="flex-1 text-gold-400/90 font-mono text-sm bg-white/[0.02] rounded-xl px-4 py-3 text-center truncate border border-white/[0.04]">
                            {pixKey}
                          </code>
                          <button
                            onClick={handleCopy}
                            className={`shrink-0 h-[46px] px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer font-medium text-sm ${
                              copied
                                ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                                : 'bg-gradient-to-r from-gold-500/90 to-amber-500/90 text-black hover:shadow-lg hover:shadow-gold-500/20'
                            }`}
                          >
                            {copied ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Security badges */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      {[
                        { icon: Shield, text: 'Seguro' },
                        { icon: Lock, text: 'Criptografado' },
                        { icon: Globe, text: 'Banco Central' },
                      ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <badge.icon className="w-3 h-3 text-green-400/40" />
                          <span className="text-white/25 text-[10px] font-medium">{badge.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Blessing Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-gold-500/[0.06] to-amber-500/[0.02] border border-gold-500/[0.1] p-5 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400/15 to-amber-500/10 flex items-center justify-center mx-auto mb-3 border border-gold-500/10">
                        <span className="text-2xl">✝️</span>
                      </div>
                      <p className="font-display text-white font-semibold text-sm mb-2">
                        Deus abençoe você e sua família
                      </p>
                      <p className="text-white/30 text-xs leading-relaxed italic">
                        "Quem dá ao pobre empresta a Deus,
                        <br />
                        e Ele lhe retribuirá."
                      </p>
                      <p className="text-gold-400/40 text-[10px] mt-2 font-medium">— Provérbios 19:17</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
            alt="Luz divina"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm" />
        </div>

        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-6 h-6 text-gold-400/60 mx-auto mb-6" />
          
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            Obrigado por fazer parte
            <br />
            <span className="bg-gradient-to-r from-gold-300 to-amber-400 bg-clip-text text-transparent">
              desta missão
            </span>
          </h2>
          
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Cada visitante, cada oração, cada contribuição nos motiva a continuar.
            Juntos, levamos a fé a mais pessoas.
          </p>

          <div className="inline-flex items-center gap-6">
            <a
              href="#pix-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pix-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Contribuir
            </a>
            <button
              onClick={() => {
                window.location.hash = 'bible';
                onNavigate('bible');
              }}
              className="inline-flex items-center gap-2 text-white/50 hover:text-gold-400 text-sm font-medium transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Ler a Bíblia
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {[
              { icon: Shield, text: 'Seguro' },
              { icon: Clock, text: '24/7 Online' },
              { icon: Church, text: 'Católico' },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-white/20" />
                  <span className="text-white/20 text-[10px] font-medium tracking-wider uppercase">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
