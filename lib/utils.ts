import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatLPA(lpa: number): string {
  if (!lpa || isNaN(lpa)) return 'N/A';
  return `₹${lpa.toFixed(1)} LPA`;
}

export function formatRank(rank: number): string {
  if (!rank || isNaN(rank)) return 'N/A';
  return rank.toLocaleString('en-IN');
}

export function estimateRankFromPercentile(percentile: number, totalCandidates = 1415000): number {
  if (percentile <= 0) return totalCandidates;
  if (percentile >= 100) return 1;
  const estimated = Math.round(((100 - percentile) / 100) * totalCandidates);
  return Math.max(1, estimated);
}
