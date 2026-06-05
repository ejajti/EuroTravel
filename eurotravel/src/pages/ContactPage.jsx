import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  usePageMeta(
    'Kontakt – Euro Travel Beograd',
    'Kontaktirajte Euro Travel Beograd za rezervaciju kombi prevoza. Telefon, WhatsApp, Viber. Dostupni svaki dan, hitni upiti 24/7.',
  );

  return (
    <main>
      <Contact headingLevel="h1" />

      {/* Google Maps */}
      <section className="bg-white px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-display text-navy font-bold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Gde se nalazimo
            </h2>
            <p className="text-navy/50 text-sm mt-2">Beograd, Srbija</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-slate-dark"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <iframe
              title="Euro Travel – Beograd"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92614.56388889498!2d20.384712513867137!3d44.81775489999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3d7b53fbd%3A0x1db8645cf2177ee4!2sBelgrade%2C%20Serbia!5e0!3m2!1sen!2srs!4v1717000000000!5m2!1sen!2srs"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
