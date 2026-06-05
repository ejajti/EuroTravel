import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { destinations, UNAVAILABLE_DESTINATIONS } from '../../data/destinations';
import Badge from '../ui/Badge';

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function DestinationCard({ dest }) {
  const unavailable = UNAVAILABLE_DESTINATIONS.includes(dest.slug);
  return (
    <Link to={`/destinacije/${dest.slug}`} className="block">
      <motion.div
        variants={cardVariants}
        whileHover={unavailable ? {} : { y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className={`group bg-white rounded-2xl overflow-hidden border border-slate-dark flex flex-col h-full cursor-pointer ${unavailable ? 'opacity-70' : ''}`}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            width={400}
            height={192}
            className={`w-full h-full object-cover ${unavailable ? 'grayscale' : 'transition-transform duration-500 group-hover:scale-110'}`}
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3">
            {unavailable
              ? <Badge color="orange">Trenutno nedostupno</Badge>
              : dest.popular && <Badge color="gold">Najpopularnije</Badge>
            }
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-navy text-lg leading-tight">
              {dest.name}
            </h3>
            <span className={`font-bold text-base whitespace-nowrap ${unavailable ? 'text-navy/30' : 'text-gold'}`}>
              od {dest.priceFrom}€
            </span>
          </div>

          <p className="text-navy/60 text-sm leading-relaxed line-clamp-2 flex-1">
            {dest.description}
          </p>

          <span className={`inline-flex items-center gap-1.5 font-semibold text-sm mt-auto ${unavailable ? 'text-navy/30' : 'text-gold group-hover:gap-2.5 transition-all duration-150'}`}>
            Saznaj više
            <ArrowRight size={15} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Destinations() {
  return (
    <section className="bg-navy py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Kuda putujemo
          </span>
          <h2 className="font-display text-white font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Naše destinacije
          </h2>
          {/* Gold underline accent */}
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[...destinations]
            .sort((a, b) => {
              const aUnavailable = UNAVAILABLE_DESTINATIONS.includes(a.slug);
              const bUnavailable = UNAVAILABLE_DESTINATIONS.includes(b.slug);
              return aUnavailable - bUnavailable;
            })
            .map((dest) => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Link
            to="/destinacije"
            className="inline-flex items-center gap-2 text-gold font-semibold text-base hover:gap-3 transition-all duration-150 group py-3 px-2"
          >
            Sve destinacije
            <ArrowRight size={18} className="transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
