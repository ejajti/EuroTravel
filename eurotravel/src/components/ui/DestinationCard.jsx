import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { UNAVAILABLE_DESTINATIONS } from '../../data/destinations';
import Badge from './Badge';
import ResponsiveImage from './ResponsiveImage';
import { cardVariants } from '../../lib/motion';

export default function DestinationCard({ dest }) {
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
          <ResponsiveImage
            image={dest.image}
            alt={`Kombi prevoz do ${dest.name} – ${dest.cities[0]}`}
            width={400}
            height={192}
            sizes="(max-width: 640px) 100vw, 400px"
            className={`w-full h-full object-cover ${unavailable ? 'grayscale' : 'transition-transform duration-500 group-hover:scale-110'}`}
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            {unavailable
              ? <Badge color="orange">Trenutno nedostupno</Badge>
              : dest.popular && <Badge color="gold">Najpopularnije</Badge>
            }
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-navy text-lg leading-tight flex items-center gap-2">
              <span className="sm:hidden text-2xl leading-none">{dest.flag}</span>
              {dest.name}
            </h3>
            <span className={`font-bold text-base whitespace-nowrap ${unavailable ? 'text-navy/30' : 'text-gold'}`}>
              od {dest.priceFrom}€
            </span>
          </div>
          <p className="text-navy/60 text-sm leading-relaxed line-clamp-2 flex-1">{dest.description}</p>
          <span className={`inline-flex items-center gap-1.5 font-semibold text-sm mt-auto ${unavailable ? 'text-navy/30' : 'text-gold group-hover:gap-2.5 transition-all duration-150'}`}>
            Saznaj više
            <ArrowRight size={15} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
