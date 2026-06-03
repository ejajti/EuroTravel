import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const BENEFITS = [
  'Prevoz od vrata do vrata bez presedanja',
  'Iskusni i licencirani vozači',
  'Klimatizovana vozila novije generacije',
  'Fleksibilno radno vreme i rute po dogovoru',
];

const REQUIREMENTS = [
  'Datum polaska i povratka',
  'Broj putnika',
  'Destinacija i planirane stanice',
  'Ukupno trajanje putovanja',
  'Posebni uslovi ili zahtevi za vozača',
  'Način i rok plaćanja',
];

const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut', delay: 0.12 } },
};

export default function VehicleRental() {
  return (
    <section id="najam" className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading — centered above columns */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Privatni prevoz
          </span>
          <h2
            className="font-display text-navy font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Najam kombija sa vozačem
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — text + benefits */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-6"
          >
            <p className="text-navy/70 text-base leading-relaxed">
              Pružamo uslugu privatnog najma kombi vozila sa profesionalnim vozačem za sve vrste putovanja — od porodičnih odmora i grupnih izleta do poslovnih transfera i aerodromskih prevoza.
            </p>
            <p className="text-navy/70 text-base leading-relaxed">
              Naša flota modernih kombi vozila kapaciteta do 8 putnika idealna je za grupe koje žele udobnost, privatnost i maksimalnu fleksibilnost u planiranju rute i rasporeda.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-navy/80 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2">
              <Button
                variant="primary"
                size="lg"
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Zatražite ponudu
              </Button>
            </div>
          </motion.div>

          {/* Right — info card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="bg-navy rounded-2xl p-8 sm:p-10">
              <h3 className="font-display text-white font-bold text-xl mb-6">
                Šta nam je potrebno
              </h3>
              <ol className="flex flex-col gap-4">
                {REQUIREMENTS.map((req, i) => (
                  <li key={req} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-xs shrink-0 mt-0.5 select-none">
                      {i + 1}
                    </span>
                    <span className="text-white/75 text-sm leading-relaxed pt-1">{req}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-6 border-t border-white/10 text-white/40 text-xs leading-relaxed">
                Nakon što nam dostavite ove informacije, poslaćemo vam preciznu ponudu u roku od par sati.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
