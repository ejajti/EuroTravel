import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';

const PHONE = '+381 693 539 444';
const PHONE_HREF = 'tel:+381693539444';
const WA_HREF = 'https://wa.me/381693539444';
const VIBER_HREF = 'viber://chat?number=%2B381693539444';

const NAV_LINKS = [
  { label: 'Početna', to: '/' },
  { label: 'Destinacije', to: '/destinacije', dropdown: true },
  { label: 'Cene', to: '/cene' },
  { label: 'Najam vozila', to: '/najam' },
  { label: 'Kontakt', to: '/kontakt' },
];

const DESTINATIONS = [
  { label: 'Hrvatska',   to: '/destinacije/hrvatska' },
  { label: 'Slovenija',  to: '/destinacije/slovenija' },
  { label: 'BiH',        to: '/destinacije/bih' },
  { label: 'Grčka',      to: '/destinacije/grcka' },
  { label: 'Italija',    to: '/destinacije/italija' },
  { label: 'Makedonija', to: '/destinacije/makedonija' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.14, ease: 'easeIn' } },
};

const mobileMenuVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit:    { x: '100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
};

function activeLinkClass({ isActive }) {
  return [
    'text-sm font-medium transition-colors duration-150',
    isActive
      ? 'text-gold border-b-2 border-gold pb-0.5'
      : 'text-white/80 hover:text-white',
  ].join(' ');
}

function DestinationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to="/destinacije"
        className={({ isActive }) =>
          [
            'flex items-center gap-1 text-sm font-medium transition-colors duration-150',
            isActive
              ? 'text-gold border-b-2 border-gold pb-0.5'
              : 'text-white/80 hover:text-white',
          ].join(' ')
        }
      >
        Destinacije
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </NavLink>

      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {DESTINATIONS.map((dest) => (
              <li key={dest.to}>
                <Link
                  to={dest.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-navy hover:text-gold hover:border-l-4 hover:border-gold hover:pl-3 transition-all duration-150 font-medium"
                >
                  {dest.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-navy/90 backdrop-blur-md shadow-lg'
            : 'bg-[#0B1C3D]',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/src/assets/images/logo.jpeg"
              alt="Euro Travel logo"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <DestinationsDropdown key={link.to} />
              ) : (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className={activeLinkClass}>
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Desktop right: phone + WhatsApp */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors duration-150"
            >
              <Phone size={15} className="text-gold" />
              {PHONE}
            </a>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a
              href={VIBER_HREF}
              className="flex items-center gap-1.5 bg-[#7360F2] hover:bg-[#6250e0] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
            >
              <MessageCircle size={15} />
              Viber
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1 -mr-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Zatvori meni' : 'Otvori meni'}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#0B1C3D] flex flex-col pt-20 pb-8 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        'block py-3.5 text-lg font-medium border-b border-white/10 transition-colors duration-150',
                        isActive ? 'text-gold' : 'text-white/80',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>

                  {link.dropdown && (
                    <div className="pl-4 flex flex-col">
                      {DESTINATIONS.map((dest) => (
                        <Link
                          key={dest.to}
                          to={dest.to}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 text-base text-white/60 hover:text-gold border-b border-white/5 transition-colors duration-150"
                        >
                          {dest.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile phone + WhatsApp */}
            <div className="flex flex-col gap-3 mt-6">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-base font-medium transition-colors duration-150"
              >
                <Phone size={17} className="text-gold" />
                {PHONE}
              </a>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-base font-semibold py-3 rounded-xl transition-colors duration-150"
              >
                <MessageCircle size={18} />
                Pišite nam na WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content isn't hidden under fixed nav */}
      <div className="h-16" />
    </>
  );
}
