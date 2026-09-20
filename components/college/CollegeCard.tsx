'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Award, IndianRupee, Briefcase, Bookmark, Scale, ArrowUpRight, Check } from 'lucide-react';
import { College } from '@/lib/types';
import { getFeesByCollege, getPlacementsByCollege, getCutoffsByCollege } from '@/lib/data';
import { formatINR, formatLPA, formatRank, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { isBookmarked, toggleBookmark, isInCompare, addToCompare, removeFromCompare } = useAppStore();

  const fees = getFeesByCollege(college.id);
  const placements = getPlacementsByCollege(college.id);
  const cutoffs = getCutoffsByCollege(college.id);

  // Latest closing rank for CSE or first available
  const cseCutoff = cutoffs.find(c => c.branchCode === 'CSE') || cutoffs[0];
  const bookmarked = isBookmarked(college.slug);
  const compared = isInCompare(college.slug);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (compared) {
      removeFromCompare(college.slug);
    } else {
      const added = addToCompare(college.slug);
      if (!added) {
        alert('You can compare a maximum of 4 colleges at a time.');
      }
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(college.slug);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden">
      {/* Top Banner & Header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'text-[11px] font-bold px-2.5 py-0.5 rounded-full border',
                college.type === 'IIT' && 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-900',
                college.type === 'NIT' && 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-900',
                college.type === 'IIIT' && 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-900',
                college.type === 'GFTI' && 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-900',
                college.type === 'State Government' && 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-900',
                college.type === 'Private' && 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-900'
              )}
            >
              {college.type}
            </span>

            {college.nirfRank2025 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1 font-mono">
                <Award className="w-3 h-3 text-amber-500" />
                NIRF #{college.nirfRank2025}
              </span>
            )}

            {college.naacGrade && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                NAAC {college.naacGrade}
              </span>
            )}
          </div>

          {/* Quick Actions (Bookmark & Compare) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCompareClick}
              type="button"
              className={cn(
                'p-1.5 rounded-lg border transition-colors text-xs flex items-center gap-1',
                compared
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
              title={compared ? 'In Comparison' : 'Add to Compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleBookmarkClick}
              type="button"
              className={cn(
                'p-1.5 rounded-lg border transition-colors',
                bookmarked
                  ? 'bg-rose-500 border-rose-500 text-white'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
              title={bookmarked ? 'Remove Bookmark' : 'Bookmark College'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title and location */}
        <Link href={`/college/${college.slug}`} className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">
            {college.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {college.city}, {college.state}
          </span>
          <span>•</span>
          <span>Estd. {college.established}</span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-center">
          {/* Average Package */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
              Avg Package
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {placements ? formatLPA(placements.averagePackageLPA) : 'N/A'}
            </span>
          </div>

          {/* Highest Package */}
          <div className="flex flex-col border-x border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
              Highest
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {placements ? formatLPA(placements.highestPackageLPA) : 'N/A'}
            </span>
          </div>

          {/* Approx 4Y Fees */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
              4-Yr Fees
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {fees ? formatINR(fees.totalEstimated4YearCost) : 'N/A'}
            </span>
          </div>
        </div>

        {/* Closing Rank Highlight */}
        {cseCutoff && (
          <div className="mt-3 flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-200">
            <span className="font-medium truncate">
              {cseCutoff.branchCode} Closing ({cseCutoff.quota} {cseCutoff.category}):
            </span>
            <span className="font-mono font-bold shrink-0">
              Rank #{formatRank(cseCutoff.closingRank)}
            </span>
          </div>
        )}
      </div>

      {/* Footer CTA & Compare Bar */}
      <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCompareClick}
          className={cn(
            'text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5',
            compared
              ? 'text-brand-700 bg-brand-100 dark:bg-brand-950 dark:text-brand-300'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          {compared ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added to Compare
            </>
          ) : (
            <>
              <Scale className="w-3.5 h-3.5" /> Compare
            </>
          )}
        </button>

        <Link
          href={`/college/${college.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
