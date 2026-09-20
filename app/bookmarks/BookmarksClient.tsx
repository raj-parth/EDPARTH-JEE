'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Building2,
  Trash2,
  Scale,
  ArrowRight,
  Printer,
  Download
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { CollegeCard } from '@/components/college/CollegeCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function BookmarksClient() {
  const { bookmarkedColleges } = useAppStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Personal Target List</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Colleges ({bookmarkedColleges.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your personalized admission target shortlist stored safely in your browser.
          </p>
        </div>

        {bookmarkedColleges.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-card"
            >
              <Printer className="w-4 h-4" />
              <span>Print Shortlist</span>
            </button>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors shadow-sm"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Them</span>
            </Link>
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarkedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark className="w-8 h-8 text-rose-400" />}
          title="No colleges bookmarked yet"
          description="Explore IITs, NITs, and IIITs in the College Explorer or Predictor and click the bookmark icon to curate your personal target choices."
          action={
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <span>Explore Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
      )}
    </div>
  );
}
