import { useEffect, useState } from "react";
import Papa from "papaparse";
import { NAV, NAV_SHEET_URL } from "@/lib/constants";
import { SAMPLE_NAV, type NavPoint } from "@/data/navSample";

function parseCsv(text: string): NavPoint[] {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return (parsed.data || [])
    .map((row) => ({
      date: String(row.date ?? row.Date ?? "").trim(),
      nav: Number(row.nav ?? row.NAV ?? row.value),
    }))
    .filter((p) => p.date && Number.isFinite(p.nav))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** "29 June 2026" */
export function fmtLongDate(value: string) {
  const d = new Date(value);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Module-level cache so the sheet is fetched only once per page load,
// shared across every component that calls useNavData().
let cache: NavPoint[] | null = null;
let inflight: Promise<NavPoint[] | null> | null = null;

function loadNav(): Promise<NavPoint[] | null> {
  if (!NAV_SHEET_URL) return Promise.resolve(null);
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch(NAV_SHEET_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
    .then((text) => {
      const rows = parseCsv(text);
      if (rows.length > 1) {
        cache = rows;
        return rows;
      }
      return null;
    })
    .catch(() => null); // keep sample data on any failure
  return inflight;
}

export interface NavData {
  rows: NavPoint[];
  isLive: boolean;
  loading: boolean;
  latest: number;
  prev: number;
  changePct: number;
  asOf: string;
}

export function useNavData(): NavData {
  const [rows, setRows] = useState<NavPoint[]>(cache ?? SAMPLE_NAV);
  const [isLive, setIsLive] = useState<boolean>(Boolean(cache));
  const [loading, setLoading] = useState<boolean>(
    Boolean(NAV_SHEET_URL) && !cache,
  );

  useEffect(() => {
    if (cache) return; // already have live data this session
    let cancelled = false;
    loadNav().then((res) => {
      if (cancelled) return;
      if (res) {
        setRows(res);
        setIsLive(true);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  let latest: number = NAV.latest;
  let prev: number = NAV.latest;
  let asOf: string = NAV.asOf;
  if (rows.length >= 2) {
    const last = rows[rows.length - 1];
    const before = rows[rows.length - 2];
    latest = last.nav;
    prev = before.nav;
    asOf = fmtLongDate(last.date);
  }
  const changePct = prev ? ((latest - prev) / prev) * 100 : NAV.dayChangePct;

  return { rows, isLive, loading, latest, prev, changePct, asOf };
}
