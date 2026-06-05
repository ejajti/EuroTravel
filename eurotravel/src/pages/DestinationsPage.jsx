import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/ui/DestinationCard';
import { staggerContainer } from '../lib/motion';

const containerVariants = staggerContainer(0.08);

export default function DestinationsPage() {
  usePageMeta(
    'Destinacije kombi prevoza iz Beograda',
    'Sve destinacije Euro Travel kombi prevoza iz Beograda — Hrvatska od 60€, Grčka od 75€, Makedonija, Italija i više. Prevoz od vrata do vrata.',
  );

  return (
    <main className="bg-navy min-h-screen pt-10 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Kuda putujemo
          </span>
          <h1
            className="font-display text-white font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Destinacije kombi prevoza iz Beograda
          </h1>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
          <p className="text-white/50 text-sm mt-5 max-w-md mx-auto">
            Biramo destinacije na osnovu potražnje i kvaliteta usluge. Kontaktirajte nas ako vaša destinacija nije na listi.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
