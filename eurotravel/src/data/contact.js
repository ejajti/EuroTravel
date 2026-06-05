// Single source of truth for all contact info.
// Update here; every component picks up the change automatically.

export const PHONE_PRIMARY       = '+381 693 539 444';
export const PHONE_PRIMARY_HREF  = 'tel:+381693539444';

// ⚠ VERIFY: display label "+381 61 614 4944" has 12 digits but
// the original href had 11. Confirm the correct number before going live.
export const PHONE_SECONDARY      = '+381 61 614 4944';
export const PHONE_SECONDARY_HREF = 'tel:+38161614944';

export const WA_NUMBER = '381693539444';
export const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

export const VIBER_HREF = 'viber://chat?number=%2B381693539444';

export const VIBER_GENERIC_MSG = 'Zdravo! Zanima me vaša usluga prevoza. Možete li mi poslati ponudu?';

export function viberLink(text) {
  return `${VIBER_HREF}&text=${encodeURIComponent(text)}`;
}

// ⚠ Two different emails are used across the codebase — verify which is correct.
export const CONTACT_EMAIL = 'office@eurotravel.rs'; // used in Contact section
export const FOOTER_EMAIL  = 'info@eurotravel.rs';   // used in Footer

export const INSTAGRAM_HANDLE = '@eurotravel.rs';
export const INSTAGRAM_URL    = 'https://instagram.com/eurotravel.rs';
