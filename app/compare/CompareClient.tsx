'use client';

import React, { useState, useMemo } from 'react';
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
  ArrowUpRight,
  Sparkles,
  Check
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
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

interface CompareClientProps {
  allColleges: College[];
}

export function CompareClient({ allColleges }: CompareClientProps) {
  const { compareSlugs, addToCompare, removeFromCompare, clearCompare, comparedColleges } = useAppStore();
  const [selectedToAdd, setSelectedToAdd] = useState('');

  // Default benchmark colleges if none selected
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

  // Compute best metrics for highlights
  const bestMetrics = useMemo(() => {
    if (activeColleges.length === 0) return {};

    let maxAvgPkg = -1;
    let maxAvgSlug = '';
    let minFee = Infinity;
    let minFeeSlug = '';
    let bestNirf = Infinity;
    let bestNirfSlug = '';

    activeColleges.forEach(c => {
      const p = getPlacementsByCollege(c.id);
      if (p && p.averagePackageLPA > maxAvgPkg) {
        maxAvgPkg = p.averagePackageLPA;
        maxAvgSlug = c.slug;
      }

      const f = getFeesByCollege(c.id);
      if (f && f.totalEstimated4YearCost < minFee) {
        minFee = f.totalEstimated4YearCost;
        minFeeSlug = c.slug;
      }

      if (c.nirfRank2025 && c.nirfRank2025 < bestNirf) {
        bestNirf = c.nirfRank2025;
        bestNirfSlug = c.slug;
      }
    });

    return { maxAvgSlug, minFeeSlug, bestNirfSlug };
  }, [activeColleges]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/60 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Multi-Dimensional Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Side-by-Side College Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare up to 4 engineering institutions simultaneously across verified cutoffs, fees, placements, and campus life.
          </p>
        </div>

        {/* Top Actions: Add College Selector & Clear All */}
        <div className="flex items-center gap-2">
          {activeColleges.length < 4 && (
            <div className="flex items-center gap-1.5">
              <select
                value={selectedToAdd}
                onChange={e => handleAddCollege(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-card"
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
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-1.5 shadow-card"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="block lg:hidden text-[11px] text-slate-400 text-center">
        ← Swipe horizontally to review all comparison metrics →
      </div>

      {/* Comparison Matrix Table */}
      {activeColleges.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
                  <th className="p-4 w-52 font-bold text-slate-400 uppercase tracking-wider text-[11px] sticky left-0 bg-slate-50 dark:bg-slate-850 z-10">
                    Parameter / Institute
                  </th>
                  {activeColleges.map(college => (
                    <th key={college.id} className="p-4 min-w-[210px] align-top relative">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="brand" size="sm">
                          {college.type}
                        </Badge>
                        {comparedColleges.some(c => c.slug === college.slug) && (
                          <button
                            onClick={() => removeFromCompare(college.slug)}
                            className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <Link
                        href={`/college/${college.slug}`}
                        className="font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-600 block mt-2 leading-snug line-clamp-2"
                      >
                        {college.name}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{college.city}, {college.state}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {/* --- SECTION: RANKING & ESTABLISHMENT --- */}
                <tr className="bg-slate-50/60 dark:bg-slate-800/40">
                  <td colSpan={activeColleges.length + 1} className="py-2.5 px-4 font-bold text-xs uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                    Accreditation & Ranking
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    NIRF 2025 Rank
                  </td>
                  {activeColleges.map(c => {
                    const isBest = bestMetrics.bestNirfSlug === c.slug;
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        <span className={cn(isBest && 'text-amber-600 dark:text-amber-400 flex items-center gap-1')}>
                          #{c.nirfRank2025}
                          {isBest && <Award className="w-3.5 h-3.5" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Established
                  </td>
                  {activeColleges.map(c => (
                    <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {c.established}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    NAAC Grade
                  </td>
                  {activeColleges.map(c => (
                    <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {c.naacGrade ? `NAAC ${c.naacGrade}` : 'Institute of National Importance'}
                    </td>
                  ))}
                </tr>

                {/* --- SECTION: PLACEMENTS --- */}
                <tr className="bg-slate-50/60 dark:bg-slate-800/40">
                  <td colSpan={activeColleges.length + 1} className="py-2.5 px-4 font-bold text-xs uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                    Audited Placement Benchmarks
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Average CTC (LPA)
                  </td>
                  {activeColleges.map(c => {
                    const p = getPlacementsByCollege(c.id);
                    const isBest = bestMetrics.maxAvgSlug === c.slug;
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono font-extrabold text-slate-900 dark:text-white">
                        <span className={cn(isBest && 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg inline-block')}>
                          {p ? formatLPA(p.averagePackageLPA) : 'N/A'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Highest CTC (LPA)
                  </td>
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
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Placement Percentage
                  </td>
                  {activeColleges.map(c => {
                    const p = getPlacementsByCollege(c.id);
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {p ? `${p.placementPercentage}%` : 'N/A'}
                      </td>
                    );
                  })}
                </tr>

                {/* --- SECTION: FEES --- */}
                <tr className="bg-slate-50/60 dark:bg-slate-800/40">
                  <td colSpan={activeColleges.length + 1} className="py-2.5 px-4 font-bold text-xs uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                    Tuition & Complete 4-Year Cost
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Est. Total 4-Year Cost
                  </td>
                  {activeColleges.map(c => {
                    const f = getFeesByCollege(c.id);
                    const isLowest = bestMetrics.minFeeSlug === c.slug;
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono font-extrabold text-slate-900 dark:text-white">
                        <span className={cn(isLowest && 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg inline-block')}>
                          {f ? formatINR(f.totalEstimated4YearCost) : 'N/A'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Annual Tuition Fee
                  </td>
                  {activeColleges.map(c => {
                    const f = getFeesByCollege(c.id);
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {f ? formatINR(f.annualTuitionTotal) : 'N/A'}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Fee Remission (Income-Based)
                  </td>
                  {activeColleges.map(c => {
                    const f = getFeesByCollege(c.id);
                    return (
                      <td key={c.id} className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300">
                        {f && f.categoryWaivers.length > 0 ? '100% / 66% Available' : 'Merit / Need Based Only'}
                      </td>
                    );
                  })}
                </tr>

                {/* --- SECTION: CUTOFF BENCHMARKS --- */}
                <tr className="bg-slate-50/60 dark:bg-slate-800/40">
                  <td colSpan={activeColleges.length + 1} className="py-2.5 px-4 font-bold text-xs uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                    Cutoff Benchmarks
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    CSE Closing Rank (Recent)
                  </td>
                  {activeColleges.map(c => {
                    const cuts = getCutoffsByCollege(c.id);
                    const cse = cuts.find(item => item.branchCode === 'CSE');
                    return (
                      <td key={c.id} className="py-3 px-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                        {cse ? `#${formatRank(cse.closingRank)}` : 'N/A'}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Accepted Exams
                  </td>
                  {activeColleges.map(c => (
                    <td key={c.id} className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {c.acceptedExams.join(', ')}
                    </td>
                  ))}
                </tr>

                {/* --- SECTION: CAMPUS & HOSTEL --- */}
                <tr className="bg-slate-50/60 dark:bg-slate-800/40">
                  <td colSpan={activeColleges.length + 1} className="py-2.5 px-4 font-bold text-xs uppercase text-slate-600 dark:text-slate-300 tracking-wider">
                    Campus Facilities & Hostel
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                    Campus Area
                  </td>
                  {activeColleges.map(c => (
                    <td key={c.id} className="py-3 px-4 font-mono text-slate-800 dark:text-slate-200">
                      {c.campusAreaAcres} Acres
                    </td>
                  ))}
                </tr>

                {/* Profile Link Action Row */}
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="py-4 px-4 font-bold text-slate-500 text-xs sticky left-0 bg-slate-50 dark:bg-slate-800 z-10">
                    Detailed Profile
                  </td>
                  {activeColleges.map(c => (
                    <td key={c.id} className="py-4 px-4">
                      <Link
                        href={`/college/${c.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors shadow-sm"
                      >
                        <span>View Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Colleges Selected for Comparison"
          description="Select up to 4 engineering colleges from our directory to inspect multi-year cutoffs, placement rates, and tuition side-by-side."
          action={
            <Link
              href="/colleges"
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold transition-colors inline-block"
            >
              Browse All Colleges
            </Link>
          }
        />
      )}
    </div>
  );
}
