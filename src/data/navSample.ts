// ---------------------------------------------------------------------------
// SAMPLE / PLACEHOLDER NAV DATA — this is NOT a track record.
// It exists only so the chart renders before NAV_SHEET_URL is connected.
// Values hover near the inception value (~₹100). The two most recent points
// are anchored so the stated latest NAV (₹100.00) and day change (+1.5%) hold.
// Replace by publishing your Google Sheet and setting NAV_SHEET_URL.
// ---------------------------------------------------------------------------

export interface NavPoint {
  date: string; // YYYY-MM-DD
  nav: number;
}

function businessDaysBack(end: Date, count: number): Date[] {
  const days: Date[] = [];
  const d = new Date(end);
  while (days.length < count) {
    const dow = d.getUTCDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return days.reverse();
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildSampleNav(): NavPoint[] {
  const end = new Date("2026-06-29T00:00:00Z");
  const dates = businessDaysBack(end, 60);

  const pts: NavPoint[] = dates.map((d, i) => {
    const t = i / dates.length;
    const wander = Math.sin(i * 0.55) * 0.9 + Math.sin(i * 0.21) * 0.5;
    const drift = -0.6 * (1 - t); // start a touch lower, ease toward inception
    const nav = 99.6 + wander * 0.6 + drift;
    return { date: iso(d), nav: Math.round(nav * 100) / 100 };
  });

  // Anchor the two latest points so +1.5% day change is consistent.
  pts[pts.length - 2] = { date: iso(dates[dates.length - 2]), nav: 98.52 };
  pts[pts.length - 1] = { date: iso(dates[dates.length - 1]), nav: 100.0 };

  return pts;
}

export const SAMPLE_NAV: NavPoint[] = buildSampleNav();
