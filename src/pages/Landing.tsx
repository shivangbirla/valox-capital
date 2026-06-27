import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Repeat,
  TrendingUp,
  ArrowRight,
  Cpu,
  BadgePercent,
  ArrowLeftRight,
  Shield,
  Droplets,
  Sparkles,
  MessageSquare,
  ClipboardCheck,
  LineChart,
  User,
  Gem,
  Building2,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/Aurora";
import { CountUp } from "@/components/CountUp";
import { NavChart } from "@/components/NavChart";
import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ, DISCLOSURES, NAV } from "@/lib/constants";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Capital preservation first",
    body: "Protect the downside before chasing the upside. Avoiding deep losses is the foundation of long-run growth.",
  },
  {
    icon: Repeat,
    title: "Active rotation",
    body: "Move capital toward the strongest opportunities across the Nifty 100 rather than letting it drift.",
  },
  {
    icon: TrendingUp,
    title: "Compounding",
    body: "Reinvest gains so money keeps working — the full amount, uninterrupted, over time.",
  },
];

const advantages = [
  {
    icon: BadgePercent,
    title: "No fee drag",
    body: "Most funds and PMS arrangements take 1–2%+ every year, compounding against you. Valox charges no management fees, so more of every rupee stays invested — and compounding works on the full amount.",
  },
  {
    icon: ArrowLeftRight,
    title: "Active rotation",
    body: "Rather than buy-and-hold drift, we actively rotate capital toward the strongest opportunities across the Nifty 100, so money keeps working.",
  },
  {
    icon: Shield,
    title: "Risk-first by design",
    body: "Avoiding deep losses matters more to long-run growth than chasing the largest gains — a 50% drawdown needs a 100% recovery just to break even. Capital preservation comes first.",
  },
  {
    icon: Droplets,
    title: "No idle capital",
    body: "T+1 redemption and no lock-in mean your capital is never trapped and never penalised for staying liquid.",
  },
  {
    icon: Cpu,
    title: "An AI-augmented edge",
    body: "Machine-assisted research helps us act on opportunity and risk faster and more systematically than manual analysis alone.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Get in touch",
    body: "Reach out by form or WhatsApp. We'll talk through your goals and how Valox works.",
  },
  {
    icon: ClipboardCheck,
    title: "Onboard",
    body: "Complete a quick KYC. Onboarding is straightforward, with no lock-in to sign away.",
  },
  {
    icon: LineChart,
    title: "Invest & track",
    body: "Put your capital to work and follow it through the NAV published every business day.",
  },
];

const serve = [
  {
    icon: User,
    title: "Individuals",
    body: "Investors who want disciplined, actively managed exposure without fee drag or lock-in.",
  },
  {
    icon: Gem,
    title: "HNIs",
    body: "Larger portfolios seeking risk-first management and full transparency on performance.",
  },
  {
    icon: Building2,
    title: "Institutions & family offices",
    body: "Mandates that value a research-led process and daily NAV reporting. No minimums.",
  },
];

const cardClass =
  "group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-36px_hsl(var(--primary)/0.55)] dark:bg-card/60 dark:backdrop-blur";

const iconWrap =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15";

export default function Landing() {
  return (
    <>
      <Seo
        title="Valox Capital — Disciplined investing, compounded over time"
        description="Valox Capital actively manages and compounds your capital — fifteen years of market experience paired with AI-augmented research. No management fees, no lock-in, T+1 liquidity."
      />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden">
        <Aurora />
        <div className="container relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center">
          <Reveal>
            <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="tnum">Live NAV ₹{NAV.latest.toFixed(2)}</span>
              <span className="text-muted-foreground">·</span>
              <span className="tnum text-primary">+{NAV.dayChangePct}% today</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className="mt-7 max-w-4xl font-display font-semibold leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
            >
              Fifteen years of discipline.{" "}
              <span className="text-aurora">Compounded into your capital.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Valox Capital actively manages and compounds your capital — pairing seasoned market
              judgment with AI-augmented research. No management fees, no lock-in, and T+1
              (next-business-day) liquidity.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/strategy">How the strategy works</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Credibility strip */}
      <Section className="!py-0">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
            <Stat value={<><CountUp value={15} />+</>} label="Years of market experience" />
            <Stat value="Zero" label="Management fees" />
            <Stat value="T+1" label="Redemption" />
            <Stat value="Daily" label="NAV transparency" />
          </div>
        </Reveal>
      </Section>

      {/* 3 — Fund NAV */}
      <Section id="nav">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Fund NAV</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Our NAV, published every business day.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Full transparency on how the Valox Dynamic Compounding strategy is performing — no
              black box, no waiting for a monthly statement.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <NavChart />
        </Reveal>
      </Section>

      {/* 4 — Our approach */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A research-led, risk-first philosophy.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={cardClass + " h-full"}>
                <span className={iconWrap}>
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/strategy"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
          >
            See how the strategy works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      {/* 5 — Human judgment, sharpened by AI */}
      <Section className="border-y border-border bg-muted/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Human + machine</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Human judgment, sharpened by machine intelligence.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Markets generate more data than any individual can read. We pair fifteen-plus years
                of hands-on experience with AI-augmented research — systematic screening across the
                Nifty 100, signal processing that surfaces shifts in momentum and risk, and faster
                synthesis of the information that moves prices. The models inform; experienced people
                decide. Every position stays under human oversight.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative">
              <Aurora className="opacity-70" />
              <div className="glass relative grid gap-4 rounded-3xl p-7 sm:grid-cols-2">
                {[
                  { icon: Cpu, t: "Systematic screening", d: "Across the Nifty 100, continuously." },
                  { icon: Sparkles, t: "Signal processing", d: "Surfacing momentum and risk shifts." },
                  { icon: ShieldCheck, t: "Human oversight", d: "People decide on every position." },
                  { icon: TrendingUp, t: "Faster synthesis", d: "Acting on what moves prices." },
                ].map((b) => (
                  <div key={b.t} className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <b.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 font-display text-sm font-semibold">{b.t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6 — The compounding advantage */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The compounding advantage</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Built to compound faster than standard investing.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              We don&apos;t promise outperformance — no one credibly can. But the structure of how
              Valox invests is deliberately designed to remove the frictions that quietly erode
              standard investment returns:
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className={cardClass + " h-full"}>
                <span className={iconWrap}>
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {DISCLOSURES.advantageCaveat}
          </p>
        </Reveal>
      </Section>

      {/* 7 — Experience & expertise */}
      <Section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Experience</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Fifteen years navigating market cycles.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Over 15+ years, our team has invested across the Indian stock market and every major
              sector, with a focus on Nifty 100 companies — building the judgement that only comes
              from real time in the market, and now amplifying it with modern, data-driven tools.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 8 — How it works */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Three steps to get started.</h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={cardClass + " h-full"}>
                <div className="flex items-center justify-between">
                  <span className={iconWrap}>
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="tnum font-display text-2xl font-semibold text-border">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9 — Who we serve */}
      <Section className="border-y border-border bg-muted/30">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Built for serious, long-term investors.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {serve.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={cardClass + " h-full"}>
                <span className={iconWrap}>
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10 — FAQ */}
      <Section id="faq">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <Eyebrow className="justify-center">FAQ</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Questions, answered.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="mt-10">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* 11 — Get started */}
      <Section id="get-started" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Reveal>
              <Eyebrow className="justify-center">Get started</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Start a conversation.</h2>
              <p className="mt-4 text-muted-foreground">
                Tell us a little about your goals and we&apos;ll be in touch. No obligation, no
                pressure.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8 dark:bg-card/60 dark:backdrop-blur">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center bg-card px-6 py-8 text-center dark:bg-card/60 dark:backdrop-blur">
      <span className="tnum font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {value}
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
