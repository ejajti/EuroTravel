import { Phone } from 'lucide-react';
import { PHONE_PRIMARY_HREF, WA_BASE, VIBER_HREF } from '../../data/contact';
import ViberIcon from '../ui/ViberIcon';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.823.736 5.473 2.027 7.774L0 32l8.454-2.016A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.849l-.485-.288-5.02 1.197 1.22-4.88-.317-.5A13.248 13.248 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.161-2.719-1.294-.365-.133-.63-.199-.896.2-.266.398-1.029 1.294-1.261 1.56-.232.265-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.976-1.183-1.056-1.982-2.36-2.213-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.2-.232.266-.398.399-.664.133-.266.067-.498-.033-.697-.1-.2-.896-2.16-1.228-2.958-.323-.777-.651-.672-.896-.684l-.764-.013c-.265 0-.697.1-1.062.498-.365.399-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.2.265 2.808 4.288 6.803 6.016.951.41 1.692.656 2.27.839.954.303 1.822.26 2.508.158.765-.114 2.354-.962 2.686-1.892.332-.93.332-1.727.232-1.892-.099-.166-.365-.265-.763-.465z" />
    </svg>
  );
}

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
        <span className="text-white relative z-10">
          <ViberIcon size={26} />
        </span>
      </a>
      <a
        href={WA_BASE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontaktirajte nas na WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <span className="text-white relative z-10">
          <WhatsAppIcon />
        </span>
      </a>
    </div>
  );
}
