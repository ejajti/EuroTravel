import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const BASE = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60';

const VARIANTS = {
  primary: 'bg-gold text-navy hover:bg-gold-dark active:bg-gold-dark',
  outline: 'border-2 border-gold text-gold hover:bg-gold/10 bg-transparent',
  ghost:   'text-gold hover:bg-gold/10 bg-transparent',
};

const SIZES = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  ...props
}) {
  const classes = [BASE, VARIANTS[variant], SIZES[size], className].join(' ');

  const motionProps = {
    whileTap: { scale: 0.97 },
    transition: { duration: 0.1 },
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <MotionLink to={href} className={classes} {...motionProps} {...props}>
          {children}
        </MotionLink>
      );
    }
    if (href.startsWith('#')) {
      return (
        <motion.a href={href} className={classes} {...motionProps} {...props}>
          {children}
        </motion.a>
      );
    }
    return (
      <motion.a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
