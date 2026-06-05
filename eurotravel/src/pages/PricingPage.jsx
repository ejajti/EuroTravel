import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import Pricing from '../components/sections/Pricing';

const FAQS = [
  {
    q: 'Kako se formira cena prevoza?',
    a: 'Cena zavisi od destinacije, broja putnika i polazišta. Prikazane cene su okvirne po putniku za grupu od 4–8 osoba. Za tačnu ponudu kontaktirajte nas putem WhatsApp-a ili telefona.',
  },
  {
    q: 'Da li je prevoz od vrata do vrata zaista uključen?',
    a: 'Da. Vozač dolazi direktno na vašu adresu i odvozi vas do odredišta koje ste naveli, bez presedanja ili čekanja na stanicama.',
  },
  {
    q: 'Koliko prtljaga smem poneti?',
    a: 'Svaki putnik može poneti jedan kofer i jedan ručni prtljag bez doplata. Za veće količine prtljaga (npr. ski oprema, bicikli) javite se unapred kako bismo organizovali odgovarajuće vozilo.',
  },
  {
    q: 'Šta ako trebam da otkažem ili promenim rezervaciju?',
    a: 'Otkazivanje je besplatno do 48 sati pre polaska. Naknadna otkazivanja ili izmene zavise od dostupnosti i dogovaraju se individualno. Preporučujemo da nas kontaktirate što pre.',
  },
  {
    q: 'Da li vozač govori engleski?',
    a: 'Naši vozači govore srpski i osnove engleskog i hrvatskog jezika. Za posebne jezičke zahteve javite nam se unapred i trudićemo se da pronađemo odgovarajuće rešenje.',
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border border-slate-dark rounded-xl overflow-hidden bg-white" style={{ boxShadow: 'var(--shadow-card)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-semibold text-navy text-sm sm:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 text-gold"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-navy/65 text-sm leading-relaxed border-t border-slate-dark pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  usePageMeta(
    'Cene prevoza',
    'Cene kombi prevoza iz Srbije u Evropu — Hrvatska, Grčka, Slovenija, Italija i više. Prevoz od vrata do vrata.',
  );

  const [openIdx, setOpenIdx] = useState(null);

  function toggle(i) {
    setOpenIdx((prev) => (prev === i ? null : i));
  }

  return (
    <main>
      <Pricing />

      {/* FAQ */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Česta pitanja
            </span>
            <h2
              className="font-display text-navy font-bold mt-3 mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Sve što trebate znati
            </h2>
            <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
