import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <a
        href="tel:+381693539444"
        aria-label="Pozovite nas"
        className="relative w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-40" />
        <Phone size={26} className="text-white relative z-10" />
      </a>
      <a
        href="viber://chat?number=%2B381693539444"
        aria-label="Kontaktirajte nas na Viber"
        className="relative w-14 h-14 rounded-full bg-[#7360F2] flex items-center justify-center shadow-lg hover:bg-[#6250e0] transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-[#7360F2] animate-ping opacity-40" />
        <MessageCircle size={26} className="text-white relative z-10" />
      </a>
      <a
        href="https://wa.me/381693539444"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontaktirajte nas na WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] transition-colors duration-150"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <MessageCircle size={26} className="text-white relative z-10" />
      </a>
    </div>
  );
}
