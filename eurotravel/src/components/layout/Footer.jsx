import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";
import logoImg from "../../assets/images/logo.png";
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_HREF,
  FOOTER_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "../../data/contact";

const NAV_LINKS = [
  { label: "Početna", to: "/" },
  { label: "Destinacije", to: "/destinacije" },
  { label: "Cene", to: "/cene" },
  { label: "Najam", to: "/najam" },
  { label: "Kontakt", to: "/kontakt" },
];

const CONTACT = [
  { icon: Phone,        text: PHONE_PRIMARY,    href: PHONE_PRIMARY_HREF },
  { icon: Mail,         text: FOOTER_EMAIL,     href: `mailto:${FOOTER_EMAIL}` },
  { icon: ExternalLink, text: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Col 1 – Logo + description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="w-fit">
              <img
                src={logoImg}
                alt="Euro Travel logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/55 max-w-xs">
              Pouzdani kombi prevoz putnika iz Srbije u Evropu. Udobnost,
              tačnost i bezbednost na svakom putovanju.
            </p>
          </div>

          {/* Col 2 – Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Brzi linkovi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block py-3 text-sm text-white/55 hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Kontakt
            </h4>
            <ul className="flex flex-col gap-3">
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2.5 py-2.5 text-sm text-white/55 hover:text-gold transition-colors duration-150"
                  >
                    <Icon size={15} className="text-gold shrink-0" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>
            © {new Date().getFullYear()} Euro Travel. Sva prava zadržana.
          </span>
        </div>
      </div>
    </footer>
  );
}
