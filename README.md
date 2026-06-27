# Valox Capital — website

A production-ready marketing site for **Valox Capital Services Pvt Ltd**, built with Vite + React + TypeScript. Five pages, a live NAV chart, a returns calculator, a lead form, full light/dark theming in the **Obsidian Aurora** design language, and a mobile-first responsive layout.

> **Disclaimer baked into the product:** nothing here states or implies guaranteed returns. The calculator uses a user-chosen rate and is labelled illustration-only; AI is presented strictly as augmenting human judgment.

## Tech stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS** with CSS-variable theming (`dark` class on `<html>`)
- **shadcn-style** Radix UI primitives (button, card, input, select, slider, accordion, checkbox, sheet)
- **Recharts** for the NAV, strategy, and calculator charts
- **Framer Motion** for scroll reveals, count-ups, and route transitions
- **react-router-dom** (lazy-loaded routes)
- **react-hook-form** + **zod** for form validation
- **react-helmet-async** for per-page SEO
- **Space Grotesk** + **Inter** via `@fontsource`

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

Requires Node 18+ (developed on Node 22).

## Configuration

Configuration is optional — the site runs out of the box. To customise, copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `VITE_NAV_SHEET_URL` | Published Google Sheet CSV (`date`, `nav` columns) powering the NAV chart. Blank = bundled sample data. |
| `VITE_WEB3FORMS_ACCESS_KEY` | [Web3Forms](https://web3forms.com) key for the lead form. A working key ships by default; override to use your own inbox. |

Most other content (company details, NAV figures, FAQ, disclosure lines) lives in `src/lib/constants.ts`.

### Connecting the live NAV

1. Create a Google Sheet with two columns: `date` (YYYY-MM-DD) and `nav` (number).
2. **File → Share → Publish to web → CSV**, and copy the link.
3. Set `VITE_NAV_SHEET_URL` to that link. The chart fetches and parses it at runtime, computing the latest NAV and day-over-day change from the last two rows. If the fetch fails, it falls back to the bundled sample data.

The sample dataset in `src/data/navSample.ts` is **placeholder data, not a track record** — it exists only so the chart renders before the sheet is connected.

## Project structure

```
src/
  components/
    ui/            shadcn-style Radix primitives
    Navbar, Footer, NavChart, LeadForm, Aurora, CountUp, ...
    theme-provider.tsx
  pages/           Landing, About, Strategy, Calculator, Contact
  lib/             utils (cn, INR/percent formatters), constants
  data/            navSample (fallback NAV series)
  index.css        Tailwind layers + Obsidian Aurora theme tokens
  App.tsx          layout + routes
  main.tsx         providers + entry
```

## Theming

Both themes are defined as CSS variables in `src/index.css` and mapped into Tailwind in `tailwind.config.js`. The theme is applied via a `dark` class on `<html>`, persisted to `localStorage` (`valox-theme`), and defaults to the system preference. A no-flash inline script in `index.html` sets the correct theme before first paint.

## Deployment

Static build — deploy `dist/` to any static host.

- **Netlify:** build `npm run build`, publish `dist`. Add a redirect for SPA routing: create `public/_redirects` containing `/*  /index.html  200`.
- **Cloudflare Pages:** build `npm run build`, output `dist`. SPA routing is handled automatically (or add a `_redirects` file as above).
- **Vercel:** framework preset **Vite**; build `npm run build`, output `dist`.

## Accessibility & performance

Semantic HTML, labelled inputs, keyboard navigation with a visible aurora focus ring, `prefers-reduced-motion` respected throughout (static aurora, no count-up), lazy-loaded routes, and self-hosted fonts to limit layout shift.

---

© 2026 Valox Capital Services Pvt Ltd · CIN: U63113RJ2026PTC115009
