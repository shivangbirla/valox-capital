import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatINR2, formatPct } from "@/lib/utils";
import { DISCLOSURES } from "@/lib/constants";
import { type NavPoint } from "@/data/navSample";
import { useTheme } from "@/components/theme-provider";
import { useNavData, fmtLongDate } from "@/hooks/useNavData";

const RANGES = [
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
  { label: "All", days: Infinity },
] as const;

type RangeLabel = (typeof RANGES)[number]["label"];

function fmtAxisDate(value: string) {
  const d = new Date(value);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function NavTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as NavPoint;
  return (
    <div className="rounded-xl border border-border bg-popover px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-muted-foreground">{fmtLongDate(point.date)}</p>
      <p className="tnum mt-0.5 font-display text-base font-semibold">
        {formatINR2(point.nav)}
      </p>
    </div>
  );
}

export function NavChart() {
  const { theme } = useTheme();
  const { rows: data, isLive, latest, changePct, asOf } = useNavData();
  const positive = changePct >= 0;
  const [range, setRange] = useState<RangeLabel>("3M");

  const filtered = useMemo(() => {
    if (range === "All" || !data.length) return data;
    const days = RANGES.find((r) => r.label === range)!.days;
    const lastMs = new Date(data[data.length - 1].date).getTime();
    const cutoff = lastMs - days * 86_400_000;
    const slice = data.filter((p) => new Date(p.date).getTime() >= cutoff);
    return slice.length > 1 ? slice : data;
  }, [data, range]);

  const [lo, hi] = useMemo(() => {
    if (!filtered.length) return [0, 1];
    const values = filtered.map((p) => p.nav);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = Math.max((max - min) * 0.25, 0.5);
    return [min - pad, max + pad];
  }, [filtered]);

  // Fewer decimals as the visible band widens, so ticks never collapse to "₹10, ₹10".
  const navDecimals = hi - lo < 2 ? 2 : hi - lo < 20 ? 1 : 0;

  const colors =
    theme === "dark"
      ? { line: "#2BD9A8", grid: "#222734", text: "#9AA3B2" }
      : { line: "#0FB388", grid: "#E3E7EE", text: "#5A6372" };

  return (
    <div className="glass overflow-hidden rounded-3xl p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Latest NAV · as on {asOf}
          </p>
          <div className="mt-1.5 flex items-baseline gap-3">
            <span className="tnum font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {formatINR2(latest)}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium tnum",
                positive
                  ? "bg-primary/12 text-primary"
                  : "bg-destructive/12 text-destructive",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {formatPct(Math.abs(changePct))}
            </span>
          </div>
          {!isLive && (
            <p className="mt-2 text-xs text-muted-foreground/80">
              Showing sample data — connect the NAV sheet to go live.
            </p>
          )}
        </div>

        <div
          className="flex w-full gap-1 rounded-xl border border-border bg-background/50 p-1 sm:w-auto"
          role="group"
          aria-label="Select chart range"
        >
          {RANGES.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => setRange(r.label)}
              aria-pressed={range === r.label}
              className={cn(
                "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none",
                range === r.label
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-[260px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filtered}
            margin={{ top: 8, right: 6, left: 6, bottom: 0 }}
          >
            <defs>
              <linearGradient id="navFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.line} stopOpacity={0.32} />
                <stop offset="100%" stopColor={colors.line} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={colors.grid}
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="date"
              tickFormatter={fmtAxisDate}
              tickLine={false}
              axisLine={false}
              minTickGap={48}
              tick={{ fontSize: 12, fill: colors.text }}
            />
            <YAxis
              domain={[lo, hi]}
              tickFormatter={(v) =>
                `₹${Number(v).toLocaleString("en-IN", {
                  minimumFractionDigits: navDecimals,
                  maximumFractionDigits: navDecimals,
                })}`
              }
              tickLine={false}
              axisLine={false}
              width={56}
              tick={{ fontSize: 12, fill: colors.text }}
            />
            <Tooltip
              content={<NavTooltip />}
              cursor={{
                stroke: colors.line,
                strokeOpacity: 0.4,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="nav"
              stroke={colors.line}
              strokeWidth={2.25}
              fill="url(#navFill)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {DISCLOSURES.navCaption}
      </p>
    </div>
  );
}
