import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, ExternalLink, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-brand-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              <span className="font-mono">E</span>
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight font-sans">
              EDPARTH
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
              2026 Index
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            EDPARTH is India&apos;s authoritative engineering college discovery and admission data platform. We decode verified JoSAA, CSAB, NIRF, and institutional bulletins for JEE aspirants, parents, and counsellors.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Zero-Fabrication Public Data Policy</span>
          </div>
        </div>

        {/* Discovery Links */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Discovery
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/colleges" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                All Engineering Colleges
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=IIT" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Top IITs & Closing Ranks
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=NIT" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                NITs & Home State Quotas
              </Link>
            </li>
            <li>
              <Link href="/colleges?type=IIIT" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                IIITs & Coding Placements
              </Link>
            </li>
            <li>
              <Link href="/cutoffs" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Cutoff Explorer (2023–2025)
              </Link>
            </li>
          </ul>
        </div>

        {/* Decision Tools & Guides */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Decision Tools
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/batches/mission-100-jee-2026" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 transition-colors font-medium">
                <span>MISSION 100 JEE 2026 Batch</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  LIVE
                </span>
              </Link>
            </li>
            <li>
              <Link href="/batches" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                All Prep & Mentorship Batches
              </Link>
            </li>
            <li>
              <Link href="/predictor" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 transition-colors">
                <span>JEE Percentile Matcher</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  2026
                </span>
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Side-by-Side Comparison
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Saved Shortlist
              </Link>
            </li>
            <li>
              <Link href="/exams" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Entrance Exams Directory
              </Link>
            </li>
            <li>
              <Link href="/branches" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Branch Specializations & CTC
              </Link>
            </li>
          </ul>
        </div>

        {/* Transparency & Official Sources */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">
            Transparency & Sources
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/methodology" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 transition-colors font-medium">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>Methodology & Mathematics</span>
              </Link>
            </li>
            <li>
              <a
                href="https://josaa.nic.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors"
              >
                <span>JoSAA Official Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a
                href="https://csab.nic.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors"
              >
                <span>CSAB Special Counselling</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.nirfindia.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors"
              >
                <span>NIRF Engineering Reports</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Ethical Disclaimer Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} EDPARTH. Open education intelligence for JEE aspirants across India.
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-md text-center sm:text-right leading-relaxed">
          Disclaimer: Cutoff and rank records reflect verified historical counselling archives. EDPARTH does not guarantee seat allocation; all admissions are governed strictly by statutory authorities.
        </p>
      </div>
    </footer>
  );
}
