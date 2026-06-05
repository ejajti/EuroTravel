import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react';

const WA_NUMBER = '381693539444';

const CONTACT_ITEMS = [
  { icon: Phone,  label: '+381 693 539 444', href: 'tel:+381693539444' },
  { icon: Phone,  label: '+381 61 614 4944', href: 'tel:+38161614944' },
  { icon: Mail,   label: 'office@eurotravel.rs', href: 'mailto:office@eurotravel.rs' },
];

const SOCIAL_BUTTONS = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WA_NUMBER}`,
    bg: 'bg-[#25D366] hover:bg-[#1ebe5d]',
    icon: MessageCircle,
  },
  {
    label: 'Viber',
    href: 'viber://chat?number=%2B381693539444',
    bg: 'bg-[#7360F2] hover:bg-[#6250e0]',
    icon: MessageCircle,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/eurotravel.rs',
    bg: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90',
    icon: ExternalLink,
  },
];

function FieldError({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18 }}
          className="text-red-500 text-xs mt-1"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const VIBER_NUMBER = '%2B381693539444';

export default function Contact() {
  const [form, setForm]             = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors]         = useState({});
  const [loadingChannel, setLoadingChannel] = useState(null);
  const [sent, setSent]             = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Ime i prezime je obavezno.';
    if (!form.email.trim())   e.email   = 'Email adresa je obavezna.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Unesite ispravnu email adresu.';
    if (!form.message.trim()) e.message = 'Poruka je obavezna.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  }

  function buildText() {
    return [
      `Zdravo! Kontaktujem vas putem sajta.`,
      `Ime i prezime: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Telefon: ${form.phone}` : null,
      `Poruka: ${form.message}`,
    ].filter(Boolean).join('\n');
  }

  function handleSend(channel) {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoadingChannel(channel);
    const text = buildText();

    setTimeout(() => {
      if (channel === 'whatsapp') {
        window.open(
          `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
          '_blank',
          'noopener,noreferrer',
        );
      } else {
        window.open(
          `viber://chat?number=${VIBER_NUMBER}`,
          '_blank',
          'noopener,noreferrer',
        );
      }
      setLoadingChannel(null);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 800);
  }

  const inputBase = (hasErr) => [
    'w-full rounded-xl border px-4 py-3 text-sm text-navy placeholder-navy/35',
    'focus:outline-none focus:ring-2 transition-colors duration-150 bg-white',
    hasErr
      ? 'border-red-400 focus:ring-red-200'
      : 'border-slate-dark focus:ring-gold/30 focus:border-gold',
  ].join(' ');

  return (
    <section id="kontakt" className="bg-slate py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
            Budite u kontaktu
          </span>
          <h2
            className="font-display text-navy font-bold mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Kontaktirajte nas
          </h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display text-navy font-bold text-xl mb-5">
                Dostupni smo svaki dan
              </h3>
              <ul className="flex flex-col gap-3">
                {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-3 text-navy/70 hover:text-gold transition-colors duration-150 text-base"
                    >
                      <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-gold" />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_BUTTONS.map(({ label, href, bg, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-2 ${bg} text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-150 active:scale-95`}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>

            {/* Working hours note */}
            <div className="bg-navy/5 rounded-xl p-5 border border-navy/10">
              <p className="text-navy font-semibold text-sm mb-1">Radno vreme</p>
              <p className="text-navy/60 text-sm">Pon – Pet: 08:00 – 20:00</p>
              <p className="text-navy/60 text-sm">Sub – Ned: 09:00 – 18:00</p>
              <p className="text-navy/50 text-xs mt-2">Za hitne upite dostupni smo 24/7 putem WhatsApp-a.</p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[420px]"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-emerald-500" />
                  </div>
                  <h3 className="font-display text-navy font-bold text-xl">
                    Poruka je poslata!
                  </h3>
                  <p className="text-navy/60 text-sm max-w-xs leading-relaxed">
                    Chat je otvoren sa vašom porukom. Odgovorićemo vam u najkraćem roku.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-gold font-semibold text-sm hover:underline mt-2"
                  >
                    Pošaljite novu poruku
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-8 sm:p-10 flex flex-col gap-5"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <h3 className="font-display text-navy font-bold text-xl">
                    Pošaljite upit
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-navy/70 mb-1.5">
                      Ime i prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Marko Marković"
                      className={inputBase(!!errors.name)}
                    />
                    <FieldError msg={errors.name} />
                  </div>

                  {/* Email + Phone — side by side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="marko@example.com"
                        className={inputBase(!!errors.email)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy/70 mb-1.5">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+381 60 123 4567"
                        className={inputBase(false)}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-navy/70 mb-1.5">
                      Poruka <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Opišite vašu rutu, broj putnika i datum polaska..."
                      className={`${inputBase(!!errors.message)} resize-none`}
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  {/* Submit */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      disabled={!!loadingChannel}
                      onClick={() => handleSend('whatsapp')}
                      whileTap={{ scale: loadingChannel ? 1 : 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors duration-150 text-sm"
                    >
                      {loadingChannel === 'whatsapp' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Slanje…
                        </>
                      ) : (
                        <>
                          <MessageCircle size={17} />
                          WhatsApp
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      disabled={!!loadingChannel}
                      onClick={() => handleSend('viber')}
                      whileTap={{ scale: loadingChannel ? 1 : 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#7360F2] hover:bg-[#6250e0] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors duration-150 text-sm"
                    >
                      {loadingChannel === 'viber' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Slanje…
                        </>
                      ) : (
                        <>
                          <MessageCircle size={17} />
                          Viber
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-navy/60 text-xs text-center">
                    Izaberite aplikaciju — otvoriće se chat sa vašim podacima.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
