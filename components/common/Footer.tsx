import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-base">
              E
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
              EDPARTH
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            EDPARTH is India&apos;s authoritative engineering college discovery and admission intelligence platform. We decode verified JoSAA, CSAB, NIRF, and institutional data for JEE aspirants and parents.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Zero-Fabrication Data Policy</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Discovery
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/colleges" className="hover:text-brand-600 dark:hover:text-brand-400">
                All Engineering Colleges
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=IIT" className="hover:text-brand-600 dark:hover:text-brand-400">
                Top IITs & Cutoffs
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=NIT" className="hover:text-brand-600 dark:hover:text-brand-400">
                NITs & Home State Quotas
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=IIIT" className="hover:text-brand-600 dark:hover:text-brand-400">
                IIITs & Coding Placements
              </Link>
            </li>
            <li>
              <Link href="/cutoffs" className="hover:text-brand-600 dark:hover:text-brand-400">
                Cutoff Explorer (2023-2025)
              </Link>
            </li>
          </ul>
        </div>

        {/* Decision Tools */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Decision Tools
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/predictor" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5">
                <span>JEE Percentile Explorer</span>
                <span className="text-[10px] px-1 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-mono">
                  NEW
                </span>
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-brand-600 dark:hover:text-brand-400">
                Side-by-Side Comparison
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="hover:text-brand-600 dark:hover:text-brand-400">
                Saved Shortlist
              </Link>
            </li>
            <li>
              <Link href="/exams" className="hover:text-brand-600 dark:hover:text-brand-400">
                Entrance Exams Directory
              </Link>
            </li>
            <li>
              <Link href="/branches" className="hover:text-brand-600 dark:hover:text-brand-400">
                Branches & Salary Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Data & Sources */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Transparency
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/methodology" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1">
                <Database className="w-3 h-3" /> Methodology & Sources
              </Link>
            </li>
            <li>
              <a
                href="https://josaa.nic.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
              >
                <span>JoSAA Official</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://csab.nic.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
              >
                <span>CSAB Official</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nirfindia.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1"
              >
                <span>NIRF Engineering</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal & Ethical Disclaimer Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} EDPARTH. Built for JEE aspirants across India. Data verified against official JoSAA/CSAB public reports.
        </p>
        <p className="text-[11px] text-slate-400 max-w-md text-center sm:text-right">
          Disclaimer: Cutoff and rank data shown is based on historical counselling archives. EDPARTH does not guarantee seat allotment; admissions are governed strictly by official authorities.
        </p>
      </div>
    </footer>
  );
}
