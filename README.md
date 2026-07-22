# Euro Travel — Passenger Van Transport Website

A production marketing site for a passenger van transport company running routes between Serbia and Croatia, Greece, North Macedonia, Slovenia, and Bosnia & Herzegovina. Built to convert visitors into WhatsApp/Viber inquiries — every pricing card, destination page, and CTA routes straight into a pre-filled chat message.

**[Live demo →](#)** (https://eurotravel.rs/)

## Features

- **Dynamic destination pages** — routes, cities, per-region pricing (one-way/round-trip), and highlights are all data-driven, so adding a new destination doesn't touch component code
- **Instant quote requests** — pricing cards deep-link into WhatsApp and Viber with a pre-filled message for the selected destination, skipping the "what do I even say" friction of a contact form
- **Vehicle rental page** — a separate flow for private/charter bookings with its own requirements checklist
- **Per-page SEO** — a custom `usePageMeta` hook updates `<title>`, description, and Open Graph/Twitter tags on every route change, so each page is shareable and indexable on its own
- **Animated, responsive UI** — Framer Motion transitions (staggered reveals, hover states) across a fully responsive Tailwind layout
- **Code-split routing** — every page is lazy-loaded via `React.lazy` + `Suspense`, keeping the initial bundle small

## Tech Stack

| Layer      | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | React 19 + Vite                         |
| Routing    | React Router v6 (`createBrowserRouter`) |
| Styling    | Tailwind CSS                            |
| Animation  | Framer Motion                           |
| Icons      | Lucide, React Icons                     |
| Deployment | Vercel                                  |

## Project Structure

```
src/
├── pages/            # Route-level pages (Home, Destinations, Detail, Pricing, Rental, Contact)
├── components/
│   ├── sections/      # Page sections (Hero, Destinations, Pricing, VehicleRental, Testimonials, Contact)
│   ├── layout/         # Navbar, Footer
│   └── ui/            # Buttons, badges, floating action buttons
├── data/               # Destinations, testimonials, and contact config (single source of truth)
└── hooks/              # usePageMeta — per-route SEO metadata
```

## Getting Started

```bash
npm install
npm run dev       # starts Vite dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

## Notes

Content and copy are in Serbian, matching the target market. Adding a destination is a matter of appending an entry to `src/data/destinations.js` — the pricing, detail, and destinations-list pages all read from that one file.
