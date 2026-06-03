import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import Badge from '../ui/Badge';

const SLIDE_INTERVAL = 4000;

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#D4A843">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: 'easeOut' } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.28, ease: 'easeIn' } }),
};

export default function Testimonials() {
  const [index, setIndex]     = useState(0);
  const [direction, setDir]   = useState(1);
  const [paused, setPaused]   = useState(false);
  const timerRef              = useRef(null);

  const go = useCallback((next, dir) => {
    setDir(dir);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  const prev = () => go(index - 1, -1);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, SLIDE_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, next]);

  const t = testimonials[index];

  return (
    <section className="bg-navy py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Utisci putnika
          </span>
          <h2
            className="font-display text-white font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Šta kažu naši putnici
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card stage — fixed height prevents layout shift */}
          <div className="relative overflow-hidden min-h-[260px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col gap-5"
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  {/* Quote icon */}
                  <Quote size={32} className="text-gold opacity-70" />

                  {/* Review text */}
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    {t.text}
                  </p>

                  {/* Stars + meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-sm shrink-0 select-none">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-white/40 text-xs">{t.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stars count={t.rating} />
                      <Badge color="gold">{t.destination}</Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Prethodna recenzija"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors duration-150"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Sledeća recenzija"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors duration-150"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Recenzija ${i + 1}`}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              className={[
                'rounded-full transition-all duration-200',
                i === index
                  ? 'w-6 h-2 bg-gold'
                  : 'w-2 h-2 bg-white/25 hover:bg-white/50',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
