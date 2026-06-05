import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CheckCircle, Star, ArrowRight, ArrowLeftRight, Bus, AlertTriangle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { destinations, UNAVAILABLE_DESTINATIONS } from '../data/destinations';
import { usePageMeta } from '../hooks/usePageMeta';
import Badge from '../components/ui/Badge';
import { WA_BASE, VIBER_HREF } from '../data/contact';
import ViberIcon from '../components/ui/ViberIcon';

function RegionCard({ region, destName, destNameGenitive }) {
  const nameGen = destNameGenitive ?? destName;
  const msg = `Zdravo! Zanima me prevoz do ${nameGen} - ${region.name}. Možete li mi poslati ponudu?`;
  return (
    <div
      className="bg-white rounded-2xl border-t border-r border-b border-slate-dark border-l-4 border-l-gold flex flex-col gap-4 p-5"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <h3 className="font-display font-bold text-navy text-base leading-tight">{region.name}</h3>
      <div className="flex flex-wrap gap-1.5">
        {region.cities.map((city) => (
          <span
            key={city}
            className="inline-flex items-center gap-1 bg-slate rounded-full px-2.5 py-1 text-xs text-navy/70 font-medium"
          >
            <MapPin size={11} className="text-gold shrink-0" />
            {city}
          </span>
        ))}
      </div>
      <div className="border-t border-slate-dark pt-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-navy/50 text-sm">
            <ArrowRight size={13} className="shrink-0" />
            Jedan smer
          </span>
          <span className="font-bold text-navy text-base">{region.oneWay}€</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-navy/50 text-sm">
            <ArrowLeftRight size={13} className="shrink-0" />
            Oba smera
          </span>
          <span className="font-bold text-navy text-base">{region.roundTrip}€</span>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <a
          href={`${WA_BASE}?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-150 text-sm"
        >
          <FaWhatsapp size={13} />
          WhatsApp
        </a>
        <a
          href={VIBER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#7360f2] hover:bg-[#6150e0] active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-150 text-sm"
        >
          <ViberIcon size={13} />
          Viber
        </a>
      </div>
    </div>
  );
}

function DepartureBanner({ text }) {
  return (
    <div className="flex items-center gap-3 bg-navy/5 border border-navy/10 rounded-xl px-5 py-3.5">
      <Bus size={18} className="text-gold shrink-0" />
      <span className="text-navy font-medium text-sm">{text}</span>
    </div>
  );
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const dest = destinations.find((d) => d.slug === slug);

  const gen = dest?.nameGenitive ?? dest?.name;
  usePageMeta(
    dest ? `Kombi prevoz do ${gen} od ${dest.priceFrom}€` : null,
    dest
      ? `Kombi prevoz iz Beograda do ${gen} od ${dest.priceFrom}€. ${dest.cities.join(', ')}. Svakodnevni polasci, prevoz od vrata do vrata.`
      : null,
  );

  useEffect(() => {
    if (!dest) return;

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Početna', item: 'https://eurotravel.rs/' },
        { '@type': 'ListItem', position: 2, name: 'Destinacije', item: 'https://eurotravel.rs/destinacije' },
        { '@type': 'ListItem', position: 3, name: dest.name, item: `https://eurotravel.rs/destinacije/${dest.slug}` },
      ],
    };

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Kombi prevoz do ${dest.name}`,
      provider: { '@type': 'TravelAgency', name: 'Euro Travel', url: 'https://eurotravel.rs' },
      areaServed: dest.country,
      offers: { '@type': 'Offer', price: String(dest.priceFrom), priceCurrency: 'EUR' },
    };

    ['ld-breadcrumb', 'ld-service'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    [['ld-breadcrumb', breadcrumbSchema], ['ld-service', serviceSchema]].forEach(([id, schema]) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
    });

    return () => {
      ['ld-breadcrumb', 'ld-service'].forEach((id) => {
        document.getElementById(id)?.remove();
      });
    };
  }, [dest]);

  if (!dest) return <Navigate to="/destinacije" replace />;

  const unavailable = UNAVAILABLE_DESTINATIONS.includes(dest.slug);
  const nameGen = dest.nameGenitive ?? dest.name;
  const waText = `Zdravo! Zanima me prevoz do ${nameGen}. Možete li mi poslati ponudu?`;

  return (
    <main>
      {/* Hero banner */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={dest.image}
          alt={`${nameGen} – kombi prevoz iz Beograda`}
          className="w-full h-full object-cover"
          width={1280}
          height={384}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />

        {/* Back link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/destinacije"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors duration-150 bg-navy/40 backdrop-blur-sm px-3 py-2.5 rounded-full active:bg-navy/60"
          >
            <ArrowLeft size={15} />
            Sve destinacije
          </Link>
        </div>

        {/* Name + price overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
          <div className="max-w-5xl mx-auto flex items-end justify-between gap-4 flex-wrap">
            <div>
              {dest.popular && <div className="mb-2"><Badge color="gold">Najpopularnije</Badge></div>}
              <h1 className="font-display text-white font-bold text-4xl sm:text-5xl leading-tight">
                Kombi prevoz do {nameGen}
              </h1>
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

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto">
          <ol className="flex items-center gap-1.5 text-sm text-navy/50">
            <li><Link to="/" className="hover:text-gold transition-colors duration-150">Početna</Link></li>
            <li aria-hidden="true" className="select-none">›</li>
            <li><Link to="/destinacije" className="hover:text-gold transition-colors duration-150">Destinacije</Link></li>
            <li aria-hidden="true" className="select-none">›</li>
            <li className="text-navy font-medium" aria-current="page">{dest.name}</li>
          </ol>
        </div>
      </nav>

      {/* Unavailability banner */}
      {unavailable && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 sm:px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <AlertTriangle size={18} className="text-orange-500 shrink-0" />
            <p className="text-orange-800 text-sm font-medium">
              Ova destinacija trenutno nije dostupna u našoj ponudi. Pratite nas za ažuriranja ili nas kontaktirajte za više informacija.
            </p>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="bg-slate py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {dest.regions ? (
            /* Regions layout: description left (1/3), regions right (2/3), no sidebar */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div>
                  <h2 className="font-display text-navy font-bold text-2xl mb-3">O destinaciji</h2>
                  <p className="text-navy/70 text-base leading-relaxed">{dest.description}</p>
                </div>
                {dest.departures && <DepartureBanner text={dest.departures} />}
              </motion.div>

              <motion.div
                className="lg:col-span-2 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              >
                <h2 className="font-display text-navy font-bold text-2xl">Regije i gradovi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.regions.map((region) => (
                    <RegionCard key={region.name} region={region} destName={dest.name} destNameGenitive={dest.nameGenitive} />
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Standard layout: main content + sidebar */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div
                className="lg:col-span-2 flex flex-col gap-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div>
                  <h2 className="font-display text-navy font-bold text-2xl mb-3">O destinaciji</h2>
                  <p className="text-navy/70 text-base leading-relaxed">{dest.description}</p>
                </div>
                <div>
                  <h2 className="font-display text-navy font-bold text-2xl mb-4">Istaknuto</h2>
                  <ul className="flex flex-col gap-3">
                    {dest.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-gold shrink-0" />
                        <span className="text-navy/80 text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                    <FaWhatsapp size={17} />
                    Rezervišite na WhatsApp
                  </a>
                  <p className="text-navy/35 text-xs text-center">
                    Tačna cena zavisi od broja putnika i polazišta.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
