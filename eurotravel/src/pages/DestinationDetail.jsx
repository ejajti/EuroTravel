import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CheckCircle, MessageCircle, Star } from 'lucide-react';
import { destinations } from '../data/destinations';
import { usePageMeta } from '../hooks/usePageMeta';
import Badge from '../components/ui/Badge';

const WA_BASE = 'https://wa.me/381693539444';

export default function DestinationDetail() {
  const { slug } = useParams();
  const dest = destinations.find((d) => d.slug === slug);

  usePageMeta(
    dest ? dest.name : null,
    dest
      ? `Kombi prevoz do ${dest.name} od ${dest.priceFrom}€. Gradovi: ${dest.cities.join(', ')}. Prevoz od vrata do vrata.`
      : null,
  );

  if (!dest) return <Navigate to="/destinacije" replace />;

  const waText = `Zdravo! Zanima me prevoz do ${dest.name}. Možete li mi poslati ponudu?`;

  return (
    <main>
      {/* Hero banner */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />

        {/* Back link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/destinacije"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors duration-150 bg-navy/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <ArrowLeft size={15} />
            Sve destinacije
          </Link>
        </div>

        {/* Name + price overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
          <div className="max-w-5xl mx-auto flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{dest.flag}</span>
                {dest.popular && <Badge color="gold">Najpopularnije</Badge>}
              </div>
              <h1 className="font-display text-white font-bold text-4xl sm:text-5xl leading-tight">
                {dest.name}
              </h1>
              <div className="flex items-center gap-1.5 text-white/60 text-sm mt-1">
                <MapPin size={13} />
                <span>{dest.cities.join(', ')}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/50 text-xs uppercase tracking-wider">Cena od</p>
              <p className="text-gold font-bold" style={{ fontSize: '2.5rem', lineHeight: 1.1 }}>
                {dest.priceFrom}€
              </p>
              <p className="text-white/50 text-xs">po putniku</p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-slate py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Description */}
            <div>
              <h2 className="font-display text-navy font-bold text-2xl mb-3">O destinaciji</h2>
              <p className="text-navy/70 text-base leading-relaxed">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-display text-navy font-bold text-2xl mb-4">Highlights</h2>
              <ul className="flex flex-col gap-3">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-gold shrink-0" />
                    <span className="text-navy/80 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h2 className="font-display text-navy font-bold text-2xl mb-4">Gradovi u ponudi</h2>
              <div className="flex flex-wrap gap-2">
                {dest.cities.map((city) => (
                  <span
                    key={city}
                    className="flex items-center gap-1.5 bg-white border border-slate-dark text-navy text-sm font-medium px-4 py-2 rounded-full"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <MapPin size={13} className="text-gold" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar — pricing card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div
              className="bg-white rounded-2xl border border-slate-dark p-6 flex flex-col gap-5 sticky top-24"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div>
                <p className="text-navy/50 text-xs uppercase tracking-wider mb-1">Cena prevoza</p>
                <div className="flex items-end gap-1 leading-none">
                  <span className="text-navy/40 text-sm mb-1">od</span>
                  <span className="text-gold font-bold" style={{ fontSize: '2.2rem' }}>
                    {dest.priceFrom}€
                  </span>
                  <span className="text-navy/40 text-sm mb-1">/ putnik</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-navy/70">
                {['Prevoz od vrata do vrata', 'Klimatizovano vozilo', 'Bez doplata za prtljag', 'Iskusni vozač'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Star size={13} className="text-gold shrink-0" fill="#D4A843" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={`${WA_BASE}?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-150 text-sm"
              >
                <MessageCircle size={17} />
                Rezervišite na WhatsApp
              </a>

              <p className="text-navy/35 text-xs text-center">
                Tačna cena zavisi od broja putnika i polazišta.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
