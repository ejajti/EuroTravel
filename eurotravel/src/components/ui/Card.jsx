import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false }) {
  const base = `bg-white border border-slate-dark rounded-xl ${className}`;

  if (hover) {
    return (
      <motion.div
        className={base}
        style={{ boxShadow: 'var(--shadow-card)' }}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base} style={{ boxShadow: 'var(--shadow-card)' }}>
      {children}
    </div>
  );
}
