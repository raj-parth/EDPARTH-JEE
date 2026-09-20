'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  Award,
  Globe,
  Bookmark,
  Scale,
  ShieldCheck,
  Check
} from 'lucide-react';
import { College } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface CollegeHeaderProps {
  college: College;
}

export function CollegeHeader({ college }: CollegeHeaderProps) {
  const { isBookmarked, toggleBookmark, isInCompare, addToCompare, removeFromCompare } = useAppStore();
  const bookmarked = isBookmarked(college.slug);
  const compared = isInCompare(college.slug);

  const handleCompareClick = () => {
    if (compared) {
      removeFromCompare(college.slug);
    } else {
      const added = addToCompare(college.slug);
      if (!added) {
        alert('You can compare a maximum of 4 colleges at a time.');
      }
    }
  };

  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      {/* Subtle top accent bar */}
      <div className="h-2 w-full bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Main Info */}
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                {college.type}
              </span>

              {college.nirfRank2025 && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 font-mono">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  NIRF #{college.nirfRank2025} (Engineering)
                </span>
              )}

              {college.naacGrade && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  NAAC {college.naacGrade}
                </span>
              )}

              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified 2026 Data
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {college.name}
              </h1>
              {college.shortName !== college.name && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Popularly known as <span className="font-semibold text-slate-700 dark:text-slate-300">{college.shortName}</span>
                </p>
              )}
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {college.city}, {college.state}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                Established {college.established}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {college.campusAreaAcres} Acres Campus
              </span>
              <span>•</span>
              <a
                href={college.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleCompareClick}
              type="button"
              className={cn(
                'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all',
                compared
                  ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              )}
            >
              {compared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
              <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(college.slug)}
              type="button"
              className={cn(
                'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all',
                bookmarked
                  ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-300'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              )}
            >
              <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-rose-600')} />
              <span>{bookmarked ? 'Saved to Shortlist' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
