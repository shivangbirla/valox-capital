import { Link } from "react-router-dom";
import {
  BadgePercent,
  LockOpen,
  Droplets,
  LineChart,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Repeat,
  ArrowRight,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/Aurora";
import { Button } from "@/components/ui/button";

const differentiators = [
  { icon: BadgePercent, title: "No fees", body: "No management fees — more of every rupee stays invested." },
  { icon: LockOpen, title: "No lock-in", body: "Your capital is never trapped; redeem when you choose." },
  { icon: Droplets, title: "T+1 liquidity", body: "Redemptions settle on the next business day." },
  { icon: LineChart, title: "Daily NAV transparency", body: "See performance published every business day." },
  { icon: Cpu, title: "AI-augmented, hands-on management", body: "Modern tooling sharpens experienced human judgment." },
];

const philosophy = [
  {
    icon: ShieldCheck,
    title: "Risk first",
    body: "We protect the downside before pursuing upside. A 50% loss needs a 100% gain just to recover — so avoiding deep drawdowns is the foundation of everything we do.",
  },
  {
    icon: Repeat,
    title: "Always working",
    body: "Capital is actively rotated toward the strongest opportunities across the Nifty 100, rather than left to drift in a static portfolio.",
  },
  {
    icon: TrendingUp,
    title: "Patiently compounded",
    body: "Gains are reinvested so money keeps working on the full amount — the quiet engine behind long-term wealth.",
  },
];

const cardClass =
  "rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-36px_hsl(var(--primary)/0.55)] dark:bg-card/60 dark:backdrop-blur";

const iconWrap =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15";

export default function About() {
  return (
    <>
      <Seo
        title="About · Valox Capital"
        description="Valox Capital pairs fifteen-plus years of market experience with disciplined, risk-first research and AI-augmented tooling. Markets, analysis, and technology at one table."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <Aurora />
        <div className="container relative py-24 sm:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>About Valox</Eyebrow>
              <h1
                className="mt-4 font-display font-semibold leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
              >
                Disciplined investing, built to{" "}
                <span className="text-aurora">compound over time.</span>
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Valox Capital was built on a straightforward conviction: that patient, risk-first
                investing — actively managed and compounded year after year — is how real wealth is
                created in the Indian market. We manage capital the way we would manage our own,
                with discipline ahead of hype.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / philosophy */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Mission &amp; philosophy</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Protect first. Stay active. Compound relentlessly.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Our mission is to grow investor capital responsibly over the long run — pairing the
              judgement that comes from real time in the market with a modern, data-driven process.
              Three principles guide every decision.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {philosophy.map((p, i) => (
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
      </Section>

      {/* Team & expertise */}
      <Section className="border-y border-border bg-muted/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Our team &amp; expertise</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Markets, analysis, and technology at one table.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Valox brings together fifteen-plus years of market experience with disciplined
                research and a modern, data-driven toolkit. Markets, analysis, and technology sit at
                one table: experienced investors set the strategy, rigorous research tests it, and
                AI-augmented tooling helps us screen the Nifty 100, monitor risk, and act faster than
                manual analysis allows. Technology sharpens our judgement — it never replaces it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: TrendingUp, t: "Experienced investors", d: "Set the strategy and own the decisions." },
                { icon: ShieldCheck, t: "Rigorous research", d: "Tests every thesis before capital moves." },
                { icon: Cpu, t: "AI-augmented tooling", d: "Screens, monitors risk, and speeds synthesis." },
                { icon: Repeat, t: "One process", d: "Judgement and technology, working together." },
              ].map((b) => (
                <div key={b.t} className={cardClass}>
                  <b.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-display font-semibold">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What makes us different */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>What makes us different</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              The structural advantages, in plain terms.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <div className={cardClass + " h-full"}>
                <span className={iconWrap}>
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{d.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border bg-muted/30">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-14 dark:bg-card/60 dark:backdrop-blur">
            <Aurora className="opacity-60" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl">
                Ready to put your capital to work?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Start a conversation with the Valox team — no obligation.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/strategy">Explore the strategy</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
