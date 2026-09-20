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
  Check,
  Share2
} from 'lucide-react';
import { College } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
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

  const getTypeVariant = (type: string): 'warning' | 'info' | 'purple' | 'success' | 'brand' | 'default' => {
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
    <div className="relative border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pb-10 space-y-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Colleges', href: '/colleges' },
            { label: college.name }
          ]}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-1">
          {/* Main Info */}
          <div className="space-y-3 max-w-4xl">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getTypeVariant(college.type)}>
                {college.type}
              </Badge>

              {college.nirfRank2025 && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1 font-mono">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  NIRF #{college.nirfRank2025} (Engineering)
                </span>
              )}

              {college.naacGrade && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  NAAC {college.naacGrade}
                </span>
              )}

              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified 2026 Admissions
              </span>
            </div>

            {/* Title & Aliases */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {college.name}
              </h1>
              {college.shortName !== college.name && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Commonly known as <span className="font-semibold text-slate-700 dark:text-slate-300">{college.shortName}</span>
                </p>
              )}
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
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
                className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline font-semibold"
              >
                <Globe className="w-4 h-4" />
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 lg:pt-0">
            <button
              onClick={handleCompareClick}
              type="button"
              className={cn(
                'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 shadow-card',
                compared
                  ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300'
                  : 'border-slate-200/90 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900'
              )}
            >
              {compared ? <Check className="w-4 h-4 text-brand-600" /> : <Scale className="w-4 h-4" />}
              <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(college.slug)}
              type="button"
              className={cn(
                'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 shadow-card',
                bookmarked
                  ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-300'
                  : 'border-slate-200/90 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900'
              )}
            >
              <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-rose-600 text-rose-600')} />
              <span>{bookmarked ? 'Saved to List' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
