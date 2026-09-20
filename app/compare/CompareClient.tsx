'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Plus,
  X,
  Building2,
  MapPin,
  Award,
  IndianRupee,
  Briefcase,
  Home,
  CheckCircle2,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { College } from '@/lib/types';
import {
  getFeesByCollege,
  getPlacementsByCollege,
  getHostelByCollege,
  getCampusByCollege,
  getCutoffsByCollege
} from '@/lib/data';
import { formatINR, formatLPA, formatRank, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

interface CompareClientProps {
  allColleges: College[];
}

export function CompareClient({ allColleges }: CompareClientProps) {
  const { compareSlugs, addToCompare, removeFromCompare, clearCompare, comparedColleges } = useAppStore();
  const [selectedToAdd, setSelectedToAdd] = useState('');

  // If no colleges in compare, default to popular benchmark colleges
  const activeColleges = comparedColleges.length > 0
    ? comparedColleges
    : [
        allColleges.find(c => c.slug === 'iit-bombay')!,
        allColleges.find(c => c.slug === 'nit-trichy')!,
        allColleges.find(c => c.slug === 'iiit-hyderabad')!
      ].filter(Boolean);

  const handleAddCollege = (slug: string) => {
    if (!slug) return;
    addToCompare(slug);
    setSelectedToAdd('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Scale className="w-7 h-7 text-brand-600" />
            <span>Side-by-Side College Comparison</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Neutral, multi-dimensional parameter matrix comparing up to 4 institutions simultaneously.
          </p>
        </div>

        {/* Top Actions: Add College Selector & Clear All */}
        <div className="flex items-center gap-2">
          {activeColleges.length < 4 && (
            <div className="flex items-center gap-1.5">
              <select
                value={selectedToAdd}
                onChange={e => handleAddCollege(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">+ Add college to compare...</option>
                {allColleges
                  .filter(c => !activeColleges.some(ac => ac.id === c.id))
                  .map(c => (
                    <option key={c.id} value={c.slug}>
                      {c.name} ({c.type})
                    </option>
                  ))}
              </select>
            </div>
          )}

          {comparedColleges.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
                <th className="p-4 w-48 font-bold text-slate-400 uppercase tracking-wider text-xs">
                  Institutions
                </th>
                {activeColleges.map(college => (
                  <th key={college.id} className="p-4 min-w-[200px] align-top relative">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                        {college.type}
                      </span>
                      {comparedColleges.some(c => c.slug === college.slug) && (
                        <button
                          onClick={() => removeFromCompare(college.slug)}
                          className="text-slate-400 hover:text-rose-500 p-0.5 rounded"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <Link
                      href={`/college/${college.slug}`}
                      className="font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-600 block mt-2"
                    >
                      {college.name}
                    </Link>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{college.city}, {college.state}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {/* --- SECTION: RANKING & ESTABLISHMENT --- */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td colSpan={activeColleges.length + 1} className="py-2 px-4 font-bold text-xs uppercase text-slate-500 tracking-wider">
                  Accreditation & Ranking
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">NIRF 2025 (Engineering)</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    #{c.nirfRank2025}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Established</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {c.established}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">NAAC / Accreditation</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {c.naacGrade ? `NAAC ${c.naacGrade}` : 'Institute of National Importance'}
                  </td>
                ))}
              </tr>

              {/* --- SECTION: PLACEMENTS --- */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td colSpan={activeColleges.length + 1} className="py-2 px-4 font-bold text-xs uppercase text-slate-500 tracking-wider">
                  Placement Statistics (2025)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Average Package</td>
                {activeColleges.map(c => {
                  const p = getPlacementsByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                      {p ? formatLPA(p.averagePackageLPA) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Highest Package</td>
                {activeColleges.map(c => {
                  const p = getPlacementsByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {p ? formatLPA(p.highestPackageLPA) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Median Package</td>
                {activeColleges.map(c => {
                  const p = getPlacementsByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                      {p ? formatLPA(p.medianPackageLPA) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Placement Percentage</td>
                {activeColleges.map(c => {
                  const p = getPlacementsByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono font-medium text-slate-800 dark:text-slate-200">
                      {p ? `${p.placementPercentage}%` : 'N/A'}
                    </td>
                  );
                })}
              </tr>

              {/* --- SECTION: FEES --- */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td colSpan={activeColleges.length + 1} className="py-2 px-4 font-bold text-xs uppercase text-slate-500 tracking-wider">
                  Fee Structure (4-Year Projection)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Annual Tuition Fee</td>
                {activeColleges.map(c => {
                  const f = getFeesByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono text-slate-800 dark:text-slate-200">
                      {f ? formatINR(f.annualTuitionTotal) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Est. Total 4-Year Cost</td>
                {activeColleges.map(c => {
                  const f = getFeesByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {f ? formatINR(f.totalEstimated4YearCost) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Fee Waiver Available</td>
                {activeColleges.map(c => {
                  const f = getFeesByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300">
                      {f && f.categoryWaivers.length > 0 ? 'Yes (SC/ST & Low Income)' : 'Limited / Merit Only'}
                    </td>
                  );
                })}
              </tr>

              {/* --- SECTION: CUTOFF BENCHMARKS --- */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td colSpan={activeColleges.length + 1} className="py-2 px-4 font-bold text-xs uppercase text-slate-500 tracking-wider">
                  Cutoffs & Counselling
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Counselling Body</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {c.counselling.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Accepted Entrance Exams</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {c.acceptedExams.join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">CSE Closing Rank (Recent)</td>
                {activeColleges.map(c => {
                  const cuts = getCutoffsByCollege(c.id);
                  const cse = cuts.find(item => item.branchCode === 'CSE');
                  return (
                    <td key={c.id} className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {cse ? `#${formatRank(cse.closingRank)}` : 'Data unavailable'}
                    </td>
                  );
                })}
              </tr>

              {/* --- SECTION: HOSTEL & INFRASTRUCTURE --- */}
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td colSpan={activeColleges.length + 1} className="py-2 px-4 font-bold text-xs uppercase text-slate-500 tracking-wider">
                  Campus & Residential Life
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Campus Size</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-3 px-4 font-mono text-slate-800 dark:text-slate-200">
                    {c.campusAreaAcres} Acres
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Hostel & Mess</td>
                {activeColleges.map(c => {
                  const h = getHostelByCollege(c.id);
                  return (
                    <td key={c.id} className="py-3 px-4 text-xs text-slate-700 dark:text-slate-300">
                      {h?.messType} ({h?.roomTypes.join('/')})
                    </td>
                  );
                })}
              </tr>

              {/* Action row */}
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                <td className="py-4 px-4 font-bold text-slate-500 text-xs">Profile Link</td>
                {activeColleges.map(c => (
                  <td key={c.id} className="py-4 px-4">
                    <Link
                      href={`/college/${c.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
                    >
                      <span>Full Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
