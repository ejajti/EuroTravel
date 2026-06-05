import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Check, Info } from 'lucide-react';
import { destinations } from '../../data/destinations';
import Badge from '../ui/Badge';
import { WA_BASE, VIBER_HREF } from '../../data/contact';
import ViberIcon from '../ui/ViberIcon';
import { cardVariants, staggerContainer } from '../../lib/motion';

const containerVariants = staggerContainer(0.09);

function PricingCard({ dest }) {
  const isPopular = !!dest.popular;

  const waText = `Zdravo! Zanima me cena prevoza do ${dest.nameGenitive ?? dest.name}. Možete li mi poslati ponudu?`;

  return (
    <Link to={`/destinacije/${dest.slug}`} className="block h-full">
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={[
        'relative bg-white rounded-2xl overflow-hidden flex flex-col',
        isPopular
          ? 'border-2 border-gold shadow-[0_0_0_4px_rgba(212,168,67,0.12)]'
          : 'border border-slate-dark',
      ].join(' ')}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Popular ribbon */}
      {isPopular && (
        <div className="absolute top-4 right-0 bg-gold text-navy text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-l-full shadow">
          Najpopularnije
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="sm:hidden text-3xl leading-none">{dest.flag}</span>
          <div>
            <h2 className="font-display font-bold text-navy text-lg leading-tight">
              {dest.name}
            </h2>
            <p className="text-navy/50 text-xs mt-0.5 line-clamp-2">{dest.cities.join(' · ')}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1 leading-none">
          <span className="text-navy/40 text-sm mb-1">od</span>
          <span className="text-gold font-bold" style={{ fontSize: '2rem' }}>
            {dest.priceFrom}€
          </span>
          <span className="text-navy/40 text-sm mb-1">/ putnik</span>
        </div>

        {/* Perks */}
        <ul className="flex flex-col gap-2 flex-1">
          {[
            'Prevoz od vrata do vrata',
            'Klimatizovano vozilo',
            'Bez doplata za prtljag',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-navy/70">
              <Check size={14} className="text-emerald-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Badge */}
        <div>
          <Badge color="green">od vrata do vrata</Badge>
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <a
            href={`${WA_BASE}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 bg-[#25D366] hover:bg-[#1ebe5d] text-white"
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </a>
          <a
            href={VIBER_HREF}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 bg-[#7360F2] hover:bg-[#6250e0] text-white"
          >
            <ViberIcon size={15} />
            Viber
          </a>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export default function Pricing({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <section className="bg-slate py-20 px-4 sm:px-6">
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
            Transparentne cene
          </span>
          <Heading
            className="font-display text-navy font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Cene kombi prevoza iz Beograda
          </Heading>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {destinations.map((dest) => (
            <PricingCard key={dest.id} dest={dest} />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="flex items-start gap-2 text-sm text-navy/50 max-w-xl mx-auto text-center mt-10 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Info size={15} className="text-gold shrink-0 mt-0.5" />
          Cena se formira u zavisnosti od broja putnika i destinacije. Kontaktirajte nas za tačnu ponudu.
        </motion.p>
      </div>
    </section>
  );
}
