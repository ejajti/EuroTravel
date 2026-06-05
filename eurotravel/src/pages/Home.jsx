import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/sections/Hero';
import TrustSection from '../components/sections/TrustSection';
import Destinations from '../components/sections/Destinations';
import Testimonials from '../components/sections/Testimonials';
import VehicleRental from '../components/sections/VehicleRental';
import Contact from '../components/sections/Contact';

export default function Home() {
  usePageMeta(
    null,
    'Kombi prevoz iz Beograda do Hrvatske, Grčke, Italije i Makedonije. Prevoz od vrata do vrata, udobna vozila, iskusni vozači. Rezervišite na WhatsApp.',
  );

  return (
    <main>
      <Hero />
      <TrustSection />
      <Destinations />
      <Testimonials />
      <VehicleRental />
      <Contact />
    </main>
  );
}
