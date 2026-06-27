import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Info } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn, formatINR, formatPct } from "@/lib/utils";
import { DISCLOSURES } from "@/lib/constants";
import { useTheme } from "@/components/theme-provider";

type Mode = "onetime" | "monthly";

function sipFutureValue(pmt: number, annualRate: number, years: number) {
  const i = annualRate / 100 / 12;
  const n = years * 12;
  if (i === 0) return pmt * n;
  // Annuity due (contributions at the start of each month)
  return pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

function lumpFutureValue(p: number, annualRate: number, years: number) {
  return p * Math.pow(1 + annualRate / 100, years);
}

function CalcTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: any;
}) {
  if (!active || !payload?.length) return null;
  const value = payload.find((p) => p.dataKey === "value")?.value ?? 0;
  const invested = payload.find((p) => p.dataKey === "invested")?.value ?? 0;
  return (
    <div className="rounded-xl border border-border bg-popover px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-muted-foreground">Year {label}</p>
      <p className="tnum mt-1 text-sm">
        <span className="text-muted-foreground">Value </span>
        <span className="font-semibold">{formatINR(value)}</span>
      </p>
      <p className="tnum text-sm">
        <span className="text-muted-foreground">Invested </span>
        <span className="font-semibold">{formatINR(invested)}</span>
      </p>
    </div>
  );
}

export default function Calculator() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<Mode>("onetime");
  const [amount, setAmount] = useState(100_000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(18);

  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;

  const { projected, invested, gain, pctGain, series } = useMemo(() => {
    const fv =
      mode === "onetime"
        ? lumpFutureValue(safeAmount, rate, years)
        : sipFutureValue(safeAmount, rate, years);
    const totalInvested =
      mode === "onetime" ? safeAmount : safeAmount * years * 12;
    const g = fv - totalInvested;
    const pct = totalInvested > 0 ? (g / totalInvested) * 100 : 0;

    const pts = Array.from({ length: years + 1 }, (_, k) => ({
      year: k,
      value: Math.round(
        mode === "onetime"
          ? lumpFutureValue(safeAmount, rate, k)
          : sipFutureValue(safeAmount, rate, k),
      ),
      invested: Math.round(
        mode === "onetime" ? safeAmount : safeAmount * k * 12,
      ),
    }));

    return {
      projected: fv,
      invested: totalInvested,
      gain: g,
      pctGain: pct,
      series: pts,
    };
  }, [mode, safeAmount, years, rate]);

  const colors =
    theme === "dark"
      ? {
          line: "#2BD9A8",
          invested: "#8B7BF6",
          grid: "#222734",
          text: "#9AA3B2",
        }
      : {
          line: "#0FB388",
          invested: "#6D5DE8",
          grid: "#E3E7EE",
          text: "#5A6372",
        };

  const results = [
    {
      label: "Projected value",
      value: projected,
      fmt: formatINR,
      primary: true,
    },
    {
      label: "Total invested",
      value: invested,
      fmt: formatINR,
      primary: false,
    },
    { label: "Illustrative gain", value: gain, fmt: formatINR, primary: false },
    {
      label: "% gain (illustrative)",
      value: pctGain,
      fmt: (n: number) => formatPct(n),
      primary: true,
    },
  ];

  return (
    <>
      <Seo
        title="Returns calculator · Valox Capital"
        description="Model the power of compounding with a simple, transparent calculator. Set your own assumed return — for illustration only, not a guarantee of future returns."
      />

      <section className="border-b border-border">
        <div className="container py-16 sm:py-20">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Calculator</Eyebrow>
              <h1
                className="mt-4 font-display font-semibold leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
              >
                Model the power of compounding.
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                Adjust the inputs to see how an investment could grow over time.
                You choose the assumed rate — these figures are an illustration,
                not a forecast of Valox returns.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="!pt-12">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Inputs */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 dark:bg-card/60 dark:backdrop-blur lg:sticky lg:top-24">
              {/* Mode toggle */}
              <div
                className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-background/50 p-1"
                role="group"
                aria-label="Investment type"
              >
                {[
                  { id: "onetime" as const, label: "One-time" },
                  { id: "monthly" as const, label: "Monthly" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    aria-pressed={mode === m.id}
                    className={cn(
                      "rounded-lg py-2 text-sm font-medium transition-colors",
                      mode === m.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Amount */}
              <div className="mt-6">
                <Label htmlFor="amount">
                  {mode === "onetime"
                    ? "Investment amount"
                    : "Monthly investment"}
                </Label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    min={0}
                    step={mode === "onetime" ? 10000 : 1000}
                    value={Number.isFinite(amount) ? amount : ""}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                    className="pl-7 tnum"
                  />
                </div>
                <p className="tnum mt-1.5 text-xs text-muted-foreground">
                  {formatINR(safeAmount)}
                </p>
              </div>

              {/* Years */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="years">Time horizon</Label>
                  <span className="tnum text-sm font-medium">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                </div>
                <Slider
                  id="years"
                  className="mt-3"
                  min={1}
                  max={30}
                  step={1}
                  value={[years]}
                  onValueChange={([v]) => setYears(v)}
                  aria-label="Time horizon in years"
                />
              </div>

              {/* Rate */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="rate">Assumed annual return</Label>
                  <span className="tnum text-sm font-medium text-primary">
                    {rate}%
                  </span>
                </div>
                <Slider
                  id="rate"
                  className="mt-3"
                  min={1}
                  max={30}
                  step={0.5}
                  value={[rate]}
                  onValueChange={([v]) => setRate(v)}
                  aria-label="Assumed annual return percentage"
                />
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  You set this assumption — it is not a Valox forecast or
                  guarantee.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Results + chart */}
          <Reveal delay={0.05}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {results.map((r) => (
                  <div
                    key={r.label}
                    className={cn(
                      "rounded-2xl border p-5",
                      r.primary
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card dark:bg-card/60 dark:backdrop-blur",
                    )}
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {r.label}
                    </p>
                    <p
                      className={cn(
                        "tnum mt-2 font-display text-3xl font-bold tracking-tight sm:text-[2rem]",
                        r.primary ? "text-primary" : "text-foreground",
                      )}
                    >
                      <CountUp
                        value={r.value}
                        live
                        duration={0.5}
                        format={r.fmt}
                      />
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 dark:bg-card/60 dark:backdrop-blur">
                <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: colors.line }}
                    />
                    Projected value
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: colors.invested }}
                    />
                    Total invested
                  </span>
                </div>
                <div className="h-[280px] w-full sm:h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={series}
                      margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="calcFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={colors.line}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor={colors.line}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke={colors.grid}
                        strokeOpacity={0.6}
                      />
                      <XAxis
                        dataKey="year"
                        tickFormatter={(v) => `Y${v}`}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={24}
                        tick={{ fontSize: 12, fill: colors.text }}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          v >= 1e7
                            ? `₹${(v / 1e7).toFixed(1)}Cr`
                            : v >= 1e5
                              ? `₹${(v / 1e5).toFixed(0)}L`
                              : `₹${v}`
                        }
                        tickLine={false}
                        axisLine={false}
                        width={56}
                        tick={{ fontSize: 12, fill: colors.text }}
                      />
                      <Tooltip
                        content={<CalcTooltip />}
                        cursor={{ stroke: colors.line, strokeOpacity: 0.3 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={colors.line}
                        strokeWidth={2.5}
                        fill="url(#calcFill)"
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="invested"
                        stroke={colors.invested}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-5 sm:flex-row sm:items-center">
                <p className="text-sm text-muted-foreground">
                  {DISCLOSURES.calculatorTag}
                </p>
                <Button asChild className="shrink-0">
                  <Link to="/contact">
                    Ready to start? Get in touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
