import { motion, useReducedMotion } from 'framer-motion';
import { Users, CalendarDays, Globe, Navigation } from 'lucide-react';
import { cardVariants, staggerContainer } from '../../lib/motion';

const CARDS = [
  { icon: Users,        stat: 'Hiljade',    label: 'zadovoljnih putnika' },
  { icon: CalendarDays, stat: 'Svaki dan',  label: 'polasci iz Beograda' },
  { icon: Globe,        stat: '7',          label: 'destinacija u ponudi' },
  { icon: Navigation,   stat: 'Od vrata',   label: 'do vrata, bez presedanja' },
];

const containerVariants = staggerContainer(0.1);


export default function TrustSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-navy overflow-hidden py-20 px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <motion.span
            className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.2em]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Zašto putnici biraju nas
          </motion.span>

          <motion.h2
            className="font-display text-white font-bold mt-3 mb-0 leading-tight max-w-xl mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          >
            Pouzdan prevoz za putovanja širom Evrope
          </motion.h2>

          <motion.p
            className="text-white/60 text-base leading-relaxed max-w-xl mx-auto mt-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
          >
            Godinama organizujemo vanlinijski kombi prevoz ka popularnim destinacijama,
            uz udobna vozila, iskusne vozače i jednostavnu rezervaciju.
          </motion.p>

          <motion.div
            className="mx-auto w-16 h-1 rounded-full bg-gold mt-6"
            initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
            style={{ originX: '50%' }}
          />
        </div>

        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {CARDS.map(({ icon: Icon, stat, label }) => (
            <motion.div
              key={stat}
              variants={prefersReducedMotion ? {} : cardVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -6,
                      boxShadow:
                        '0 20px 48px rgba(212,168,67,0.13), 0 6px 20px rgba(0,0,0,0.38)',
                    }
              }
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="group relative rounded-2xl border-t-2 border-t-gold/30 border border-white/10 hover:border-gold/25 bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-sm p-5 sm:p-7 flex flex-col gap-4 cursor-default overflow-hidden transition-colors duration-300"
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700 ease-in-out"
              />

              <div className="w-11 h-11 rounded-xl bg-gold/15 group-hover:bg-gold/25 flex items-center justify-center shrink-0 transition-colors duration-300">
                <Icon size={20} className="text-gold" aria-hidden="true" />
              </div>

              <div>
                <p
                  className="font-display text-white font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)' }}
                >
                  {stat}
                </p>
                <p className="text-white/50 text-sm mt-1 leading-snug">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
