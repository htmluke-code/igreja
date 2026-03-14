import { useState, useEffect, useCallback } from 'react';
import { getShuffledVerses, type Verse } from '../data/verses';
import { Quote } from 'lucide-react';

interface VerseRotatorProps {
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
  showIcon?: boolean;
}

export default function VerseRotator({ className = '', variant = 'dark', showIcon = true }: VerseRotatorProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setVerses(getShuffledVerses());
  }, []);

  const nextVerse = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev >= verses.length - 1) {
          setVerses(getShuffledVerses());
          return 0;
        }
        return prev + 1;
      });
      setFade(true);
    }, 600);
  }, [verses.length]);

  useEffect(() => {
    if (verses.length === 0) return;
    const interval = setInterval(nextVerse, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, [verses.length, nextVerse]);

  if (verses.length === 0) return null;
  const verse = verses[currentIndex];

  const baseStyles = {
    light: 'text-sacred-800',
    dark: 'text-white',
    glass: 'text-white',
  };

  const refStyles = {
    light: 'text-gold-600',
    dark: 'text-gold-400',
    glass: 'text-gold-300',
  };

  return (
    <div className={`transition-all duration-600 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}>
      {showIcon && (
        <Quote className={`w-6 h-6 mb-3 ${refStyles[variant]} opacity-60`} />
      )}
      <p className={`font-bible text-lg sm:text-xl leading-relaxed italic ${baseStyles[variant]}`}>
        "{verse.text}"
      </p>
      <p className={`mt-3 text-sm font-medium tracking-wide ${refStyles[variant]}`}>
        — {verse.reference}
      </p>
    </div>
  );
}
