import { motion } from 'framer-motion';
import { ClipboardList, PhoneCall, CheckSquare, Car, CreditCard, Smile } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import VehicleRental from '../components/sections/VehicleRental';

const STEPS = [
  {
    icon: PhoneCall,
    title: 'Kontaktirajte nas',
    body: 'Pozovite nas, pošaljite WhatsApp poruku ili popunite kontakt formu. Odgovaramo u roku od par sati.',
  },
  {
    icon: ClipboardList,
    title: 'Dogovor i ponuda',
    body: 'Poslaćemo vam preciznu ponudu na osnovu vaših zahteva — ruta, broj putnika, datumi i posebne napomene.',
  },
  {
    icon: CheckSquare,
    title: 'Potvrda rezervacije',
    body: 'Nakon prihvatanja ponude, rezervacija se potvrđuje. Tačan sat polaska dogovarate sa vozačem.',
  },
  {
    icon: Car,
    title: 'Polazak',
    body: 'Vozač dolazi direktno na vašu adresu. Prtljag se utovara, a vi udobno sedite i uživate u vožnji.',
  },
  {
    icon: CreditCard,
    title: 'Plaćanje',
    body: 'Plaćanje je gotovinom ili na račun, po dogovoru.',
  },
  {
    icon: Smile,
    title: 'Sretan put!',
    body: 'Stignete odmorno na cilj. Radujemo se ponovnoj saradnji i preporuci prijateljima i porodici.',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.08 },
  }),
};

export default function RentalPage() {
  usePageMeta(
    'Najam kombija sa vozačem – Privatni prevoz',
    'Privatni najam kombi vozila sa vozačem iz Beograda. Fleksibilne rute, prevoz od vrata do vrata, iskusni vozači. Kontaktirajte nas za ponudu.',
  );

  return (
    <main>
      <VehicleRental headingLevel="h1" />

      {/* Rental process */}
      <section className="bg-slate py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Jednostavan proces
            </span>
            <h2
              className="font-display text-navy font-bold mt-3 mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Kako funkcioniše najam?
            </h2>
            <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="bg-white rounded-2xl p-6 border border-slate-dark flex flex-col gap-4"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <span className="text-gold font-bold text-2xl leading-none opacity-30 ml-auto">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display text-navy font-bold text-base">{step.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
