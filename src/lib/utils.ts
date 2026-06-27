import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inr2 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** ₹1,23,45,678 — Indian grouping, no paise */
export function formatINR(value: number) {
  return inr.format(Math.round(value));
}

/** ₹100.00 — for NAV-style figures */
export function formatINR2(value: number) {
  return inr2.format(value);
}

/** 18.4% */
export function formatPct(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}
