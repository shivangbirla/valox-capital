// ---------------------------------------------------------------------------
// Owner-configurable values
// ---------------------------------------------------------------------------

/**
 * Published Google Sheet CSV with columns: date (YYYY-MM-DD), nav (number).
 * PLACEHOLDER — replace with your published-sheet CSV link.
 * File → Share → Publish to web → CSV. Until set, the chart uses sample data.
 */
export const NAV_SHEET_URL = import.meta.env.VITE_NAV_SHEET_URL ?? "";

/** Web3Forms access key (no backend required). Override via VITE_WEB3FORMS_ACCESS_KEY. */
export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "fc32f081-246d-46e5-a0fa-e715fece44ff";

// ---------------------------------------------------------------------------
// Company
// ---------------------------------------------------------------------------

export const COMPANY = {
  name: "Valox Capital",
  legalName: "Valox Capital Services Pvt Ltd",
  cin: "U63113RJ2026PTC115009",
  tagline: "Disciplined investing. Compounded over time.",
  strategy: "Valox Dynamic Compounding",
  email: "capital.valox@gmail.com",
  phoneDisplay: "+91 78498 70734",
  whatsapp: "https://wa.me/917849870734",
  address: "C-1302, Purva Westend, Kudlu Gate, Bangalore, Karnataka 560068",
  addressShort: "C-1302, Purva Westend, Kudlu Gate, Bangalore 560068",
  mapsEmbed:
    "https://www.google.com/maps?q=C-1302%20Purva%20Westend%20Kudlu%20Gate%20Bangalore%20560068&output=embed",
} as const;

export const NAV = {
  latest: 100.0,
  asOf: "29 June 2026",
  dayChangePct: 1.5,
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Strategy", to: "/strategy" },
  { label: "Calculator", to: "/calculator" },
  { label: "Contact", to: "/contact" },
] as const;

// ---------------------------------------------------------------------------
// Required disclosure lines (do not remove)
// ---------------------------------------------------------------------------

export const DISCLOSURES = {
  footerRisk:
    "Investing involves risk, including the possible loss of capital. Past performance is not a guarantee of future results.",
  navCaption:
    "NAV reflects the Valox Dynamic Compounding strategy. Past performance is not a guarantee of future results.",
  calculatorTag: "For illustration only — not a guarantee of future returns.",
  advantageCaveat:
    "These are structural advantages in how we invest, not a forecast or guarantee of returns. Investing involves risk, including the possible loss of capital.",
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ = [
  {
    q: "What does Valox Capital do?",
    a: "We actively manage and compound investor capital in the Indian stock market, with a research-led, risk-first approach focused on Nifty 100 companies. The strategy is called Valox Dynamic Compounding.",
  },
  {
    q: "How are returns generated?",
    a: "By actively rotating capital toward the strongest opportunities across the Nifty 100 and reinvesting gains so money keeps working. We prioritise protecting capital before pursuing upside. Returns are not guaranteed.",
  },
  {
    q: "How does AI fit into your process?",
    a: "AI augments our research — systematic screening, signal processing, and faster synthesis of market data. The models inform; experienced people make every decision, and every position stays under human oversight.",
  },
  {
    q: "What are your fees?",
    a: "We charge no management fees, so more of every rupee stays invested and compounds.",
  },
  {
    q: "Is there a lock-in?",
    a: "No. There is no lock-in, and redemptions settle on a T+1 (next-business-day) basis, so your capital stays liquid.",
  },
  {
    q: "How do I track my investment?",
    a: "Through a NAV published every business day, alongside periodic statements — full transparency on how your capital is performing.",
  },
  {
    q: "Who can invest?",
    a: "Individuals, HNIs, and institutions or family offices. There are no minimums.",
  },
  {
    q: "How do I start?",
    a: "Get in touch, complete a quick KYC to onboard, then invest and track your capital via the daily NAV.",
  },
] as const;
