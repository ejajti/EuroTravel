import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { PHONE_PRIMARY_HREF, WA_BASE, VIBER_HREF } from '../../data/contact';
import ViberIcon from '../ui/ViberIcon';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-center gap-2">
      <a
        href={PHONE_PRIMARY_HREF}
        aria-label="Pozovite nas"
        className="relative w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-40" />
        <Phone size={26} className="text-white relative z-10" aria-hidden="true" />
      </a>
      <a
        href={VIBER_HREF}
        aria-label="Kontaktirajte nas na Viber"
        className="relative w-14 h-14 rounded-full bg-[#7360F2] flex items-center justify-center shadow-lg hover:bg-[#6250e0] transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-[#7360F2] animate-ping opacity-40" />
        <ViberIcon size={26} className="text-white relative z-10" />
      </a>
      <a
        href={WA_BASE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontaktirajte nas na WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <FaWhatsapp size={26} className="text-white relative z-10" />
      </a>
    </div>
  );
}
