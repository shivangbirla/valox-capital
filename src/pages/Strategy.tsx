import { Link } from "react-router-dom";
import {
  ScanSearch,
  ArrowLeftRight,
  TrendingUp,
  BadgePercent,
  Droplets,
  LineChart as LineChartIcon,
  Cpu,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Seo } from "@/components/Seo";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Aurora } from "@/components/Aurora";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const steps = [
  {
    icon: ScanSearch,
    title: "Identify",
    body: "AI-assisted screening and signals surface candidates across the Nifty 100, so opportunities don't slip past unnoticed.",
  },
  {
    icon: ArrowLeftRight,
    title: "Rotate",
    body: "Move capital toward strength, with risk flags informing timing. Positions stay under human oversight at every step.",
  },
  {
    icon: TrendingUp,
    title: "Compound",
    body: "Reinvest gains so capital keeps working on the full amount — the engine of long-term growth.",
  },
];

const reasons = [
  { icon: BadgePercent, title: "More of your money works", body: "Zero management fees mean compounding works on the full amount." },
  { icon: Droplets, title: "Stay liquid", body: "No lock-in and T+1 redemption — your capital is never trapped." },
  { icon: LineChartIcon, title: "Full transparency", body: "A NAV published every business day, not a quarterly black box." },
  { icon: Cpu, title: "Experienced hands, modern tools", body: "15+ years of judgement, amplified by AI-augmented research." },
];

const cardClass =
  "rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-36px_hsl(var(--primary)/0.55)] dark:bg-card/60 dark:backdrop-blur";

const iconWrap =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15";

// Indexed, unlabelled shape — purely illustrative of "reinvested gains compounding".
const illustrative = Array.from({ length: 11 }, (_, i) => ({
  t: i,
  v: 100 * Math.pow(1.16, i) + i * 4,
}));

function IllustrativeChart() {
  const { theme } = useTheme();
  const line = theme === "dark" ? "#2BD9A8" : "#0FB388";
  return (
    <div className="h-[260px] w-full sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={illustrative} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="strategyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={line} stopOpacity={0.3} />
              <stop offset="100%" stopColor={line} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="t" hide />
          <Area
            type="monotone"
            dataKey="v"
            stroke={line}
            strokeWidth={2.5}
            fill="url(#strategyFill)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Strategy() {
  return (
    <>
      <Seo
        title="Strategy · Valox Dynamic Compounding"
        description="Valox Dynamic Compounding rotates capital toward opportunity across the Nifty 100 and reinvests gains so money is always working — research-led, risk-first, AI-augmented."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <Aurora />
        <div className="container relative py-24 sm:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>The strategy</Eyebrow>
              <h1
                className="mt-4 font-display font-semibold leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
              >
                Valox Dynamic Compounding
              </h1>
              <p className="mt-4 font-display text-xl text-aurora">
                Rotate into opportunity. Compound over time.
              </p>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                A single, focused strategy: actively rotate capital between the strongest
                opportunities and reinvest gains, so your money is always working — never drifting,
                never idle.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The idea */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>The idea</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Capital that&apos;s always working.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Most portfolios drift: bought once, then left alone while opportunities move on.
                Valox Dynamic Compounding takes a different path — we actively rotate capital toward
                strength across the Nifty 100 and reinvest the gains. Combined with zero fees and no
                lock-in, the structure is designed to keep every rupee productive.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-6 dark:bg-card/60 dark:backdrop-blur">
              <p className="text-sm font-medium text-muted-foreground">
                Illustrative — how reinvested gains compound
              </p>
              <div className="mt-3">
                <IllustrativeChart />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Shape is illustrative only and does not represent actual or projected returns.
                Investing involves risk, including the possible loss of capital.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Three steps */}
      <Section className="border-y border-border bg-muted/30">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Identify. Rotate. Compound.</h2>
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

      {/* Why investors choose it */}
      <Section>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Why investors choose it</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A structure that works in your favour.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className={cardClass + " flex h-full items-start gap-4"}>
                <span className={iconWrap + " shrink-0"}>
                  <r.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
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
                Put the strategy to work.
              </h2>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Start investing — get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/calculator">Try the returns calculator</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
