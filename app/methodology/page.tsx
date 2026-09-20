import React from 'react';
import { Metadata } from 'next';
import {
  ShieldCheck,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Methodology & Verification Standards | EDPARTH',
  description: 'Learn how EDPARTH aggregates, verifies, and calculates cutoffs, fee projections, placement data, and percentile estimations.'
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Zero-Fabrication Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Data Methodology & Transparency Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            EDPARTH exists to solve the epidemic of misinformation, clickbait predictions, and outdated statistics in Indian engineering admissions. Here is the exact provenance behind every number on this platform.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Official Primary Sources
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We extract data directly from official counselling bodies (JoSAA, CSAB, JAC Delhi, WBJEEB) and published institute circulars.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Data Status Metadata
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every data point is strictly classified as <strong>Verified</strong>, <strong>Estimated</strong>, or <strong>Data Unavailable</strong>. We never fabricate missing figures.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Zero &ldquo;Guaranteed&rdquo; Claims
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We clearly state that historical cutoff trends do not guarantee future seat allocations, preserving student trust and mental well-being.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          {/* Cutoff Collection */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-brand-600" />
              <span>1. How Cutoff Data is Collected and Indexed</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Opening and closing ranks are captured from the post-round archives published annually by the <strong>Joint Seat Allocation Authority (JoSAA)</strong> and <strong>Central Seat Allocation Board (CSAB)</strong>. Each record preserves:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1 pl-2">
              <li>Academic Year (2023, 2024, 2025, 2026) and Allotment Round (Round 1 through Round 6, Special Rounds)</li>
              <li>Quota type: All India (AI), Home State (HS), or Other State (OS)</li>
              <li>Reservation category (OPEN, GEN-EWS, OBC-NCL, SC, ST, PwD)</li>
              <li>Gender pool: Gender-Neutral vs. Female-Only Supernumerary seats</li>
            </ul>
          </div>

          {/* Percentile and Rank Formula */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>2. How Percentile and Rank Estimates are Calculated</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              NTA percentiles are normalized scores representing the percentage of candidates who scored equal to or lower than a particular student. EDPARTH estimates the Common Rank List (CRL) using the standard national benchmark formula:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Estimated CRL Rank = Math.round(((100 - Percentile) / 100) * Total Unique Candidates)
            </div>
            <p className="text-xs text-slate-500">
              For JEE Main 2025/2026, total unique candidates across Session 1 and Session 2 are calibrated at ~14.15 Lakh students based on official NTA press releases.
            </p>
          </div>

          {/* Fee Calculation Policy */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <span>3. How 4-Year Fees and Remissions are Calculated</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              College fee figures include 8 semesters of tuition, recurring institutional charges (examinations, library, sports), annual hostel room fees, and standard dining mess charges. One-time security deposits refundable upon degree completion are itemized separately.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Government fee remissions (such as 100% waiver for SC/ST and students with parental income &lt; ₹1 LPA in IITs/NITs) are explicitly displayed to ensure fair economic transparency for all families.
            </p>
          </div>

          {/* Placement Statistics Sourcing */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>4. Placement Statistics Sourcing</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Placement figures are collected exclusively from audited annual reports published by institutional Training & Placement (T&P) cells and official NIRF submissions. Every metric states its exact report year. When international packages are converted into INR, we maintain separation between domestic median and foreign offers.
            </p>
          </div>
        </div>

        {/* Public Audit & Contribution */}
        <div className="p-6 rounded-3xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Spotted a discrepancy in cutoff or fee data?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Our data engineering team continuously reviews and verifies college admission bulletins.
            </p>
          </div>
          <a
            href="https://josaa.nic.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors shrink-0"
          >
            <span>Verify on JoSAA Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
