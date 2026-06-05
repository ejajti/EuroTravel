import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta('Stranica nije pronađena', 'Tražena stranica ne postoji na sajtu Euro Travel.');

  return (
    <main className="min-h-[80vh] bg-navy flex flex-col items-center justify-center px-4 text-center">
      <span
        className="font-display text-gold font-bold leading-none"
        style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}
      >
        404
      </span>
      <h1 className="font-display text-white font-bold text-2xl sm:text-3xl mt-4 mb-3">
        Stranica nije pronađena
      </h1>
      <p className="text-white/55 text-base max-w-sm leading-relaxed mb-8">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-navy font-semibold px-7 py-3.5 rounded-lg transition-colors duration-150"
      >
        Nazad na početnu
      </Link>
    </main>
  );
}
