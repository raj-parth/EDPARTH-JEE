'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Award,
  Bookmark,
  Scale,
  ArrowUpRight,
  Check,
  Building2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { College } from '@/lib/types';
import { getFeesByCollege, getPlacementsByCollege, getCutoffsByCollege } from '@/lib/data';
import { formatINR, formatLPA, formatRank, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';

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

  const getTypeVariant = (type: string): 'brand' | 'info' | 'purple' | 'success' | 'warning' | 'default' => {
    switch (type) {
      case 'IIT': return 'warning';
      case 'NIT': return 'info';
      case 'IIIT': return 'purple';
      case 'GFTI': return 'success';
      case 'State Government': return 'brand';
      default: return 'default';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Card Body */}
      <div className="p-5 pb-3.5 space-y-3.5">
        {/* Top Badges & Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={getTypeVariant(college.type)} size="sm">
              {college.type}
            </Badge>

            {college.nirfRank2025 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 font-mono">
                <Award className="w-3 h-3 text-amber-500" />
                NIRF #{college.nirfRank2025}
              </span>
            )}

            {college.naacGrade && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800">
                NAAC {college.naacGrade}
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            type="button"
            className={cn(
              'p-1.5 rounded-lg border transition-colors shrink-0',
              bookmarked
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-400'
                : 'border-slate-200/80 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark college'}
            aria-label="Bookmark"
          >
            <Bookmark className={cn('w-3.5 h-3.5', bookmarked && 'fill-rose-600')} />
          </button>
        </div>

        {/* Identity & Location */}
        <div>
          <Link
            href={`/college/${college.slug}`}
            className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
          >
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">
              {college.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{college.city}, {college.state}</span>
            <span>•</span>
            <span className="shrink-0">Estd. {college.established}</span>
          </div>
        </div>

        {/* Key Metrics Grid (Instant visual scanning) */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 text-center">
          {/* Average Package */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Avg CTC
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {placements ? formatLPA(placements.averagePackageLPA) : 'N/A'}
            </span>
          </div>

          {/* Highest Package */}
          <div className="flex flex-col items-center border-x border-slate-200/60 dark:border-slate-700/60 px-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Highest
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {placements ? formatLPA(placements.highestPackageLPA) : 'N/A'}
            </span>
          </div>

          {/* 4-Yr Fees */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              4-Yr Fees
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {fees ? formatINR(fees.totalEstimated4YearCost) : 'N/A'}
            </span>
          </div>
        </div>

        {/* CSE Closing Rank Highlight */}
        {cseCutoff && (
          <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
            <span className="font-medium text-[11px] truncate text-slate-500 dark:text-slate-400">
              {cseCutoff.branchCode} Closing ({cseCutoff.quota}):
            </span>
            <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400 shrink-0">
              #{formatRank(cseCutoff.closingRank)}
            </span>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="p-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCompareClick}
          className={cn(
            'text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5',
            compared
              ? 'text-brand-700 bg-brand-100/80 dark:bg-brand-950 dark:text-brand-300'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800'
          )}
        >
          {compared ? (
            <>
              <Check className="w-3.5 h-3.5 text-brand-600" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>

        <Link
          href={`/college/${college.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white transition-colors shadow-sm"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
