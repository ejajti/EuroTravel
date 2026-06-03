import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/sections/Hero';
import Destinations from '../components/sections/Destinations';
import Pricing from '../components/sections/Pricing';
import VehicleRental from '../components/sections/VehicleRental';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  usePageMeta(
    null,
    'Euro Travel – pouzdani kombi prevoz putnika iz Srbije u Evropu. Prevoz od vrata do vrata za Hrvatsku, Grčku, Sloveniju, Italiju i još.',
  );

  return (
    <main>
      <Hero />
      <Destinations />
      <Pricing />
      <VehicleRental />
      <Testimonials />
      <Contact />
    </main>
  );
}
