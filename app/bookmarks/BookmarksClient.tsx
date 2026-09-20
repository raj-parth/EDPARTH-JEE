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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>My Saved Colleges ({bookmarkedColleges.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your personalized admission shortlist saved locally on your browser.
          </p>
        </div>

        {bookmarkedColleges.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Shortlist</span>
            </button>

            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
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
        <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              No colleges bookmarked yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Explore IITs, NITs, and IIITs in the College Explorer or Predictor and click the bookmark icon to curate your personal target choices.
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors"
          >
            <span>Explore Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
