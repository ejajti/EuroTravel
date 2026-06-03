const COLOR_MAP = {
  gold:  'bg-gold/15 text-gold-dark',
  green: 'bg-emerald-100 text-emerald-700',
  blue:  'bg-blue-100 text-blue-700',
  gray:  'bg-slate-dark text-navy/60',
};

export default function Badge({ children, color = 'gold' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${COLOR_MAP[color]}`}>
      {children}
    </span>
  );
}
