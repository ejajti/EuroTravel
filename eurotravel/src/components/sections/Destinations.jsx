import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { destinations } from '../../data/destinations';
import DestinationCard from '../ui/DestinationCard';
import { staggerContainer } from '../../lib/motion';

const containerVariants = staggerContainer(0.1);

export default function Destinations() {
  return (
    <section className="bg-navy py-20 px-4 sm:px-6">
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
            Kuda putujemo
          </span>
          <h2 className="font-display text-white font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Naše destinacije
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Link
            to="/destinacije"
            className="inline-flex items-center gap-2 text-gold font-semibold text-base hover:gap-3 transition-all duration-150 group py-3 px-2"
          >
            Sve destinacije
            <ArrowRight size={18} className="transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
