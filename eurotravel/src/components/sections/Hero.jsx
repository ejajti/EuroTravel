import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Match Tailwind's md breakpoint (768px)
const MOBILE_MQ = '(max-width: 767px)';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches,
  );
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause/play when viewport size crosses the breakpoint at runtime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMobile) {
      video.pause();
    } else {
      video.play().catch(() => {/* autoplay may be blocked — ignore */});
    }
  }, [isMobile]);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 overflow-hidden">

        {/* ── Video background (desktop only) / Poster image (mobile) ── */}
        {isMobile ? (
          <img
            src="/videos/hero-van-poster.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/videos/hero-van-poster.jpg"
          >
            <source src="/videos/hero-van.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark overlay — keeps text readable over any video frame */}
        <div className="absolute inset-0 bg-navy/70" />

        {/* Bottom gradient fade so sections below feel connected */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-navy to-transparent" />

        {/* Subtle gold radial glow behind headline */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 45% at 50% 40%, rgba(212,168,67,0.08) 0%, transparent 70%)',
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]"
            >
              Vanlinijski kombi prevoz
            </motion.span>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-white font-bold leading-tight drop-shadow-lg"
              style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)' }}
            >
              Kombi prevoz iz Beograda —{' '}
              <span className="text-gold">Hrvatska, Grčka, Italija i više</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              Putujte udobno, stignite na vreme. Prevoz od vrata do vrata sa iskusnim vozačima i udobnim vozilima.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Button
                variant="primary"
                size="lg"
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Kontaktirajte nas
              </Button>
              <Button variant="outline" size="lg" href="/destinacije">
                Pogledajte destinacije
              </Button>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="tracking-widest uppercase text-[10px]">Skrolujte</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
