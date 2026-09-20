import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllColleges } from '@/lib/data';
import { CollegeExplorerClient } from './CollegeExplorerClient';

export const metadata: Metadata = {
  title: 'Engineering College Explorer — Filter IITs, NITs, IIITs by Cutoffs & Fees',
  description: 'Search and filter 30+ top engineering colleges across India. Filter by State, JoSAA/CSAB counselling, fees, NIRF rank, and placement package.'
};

function ExplorerLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse hidden lg:block" />
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  const colleges = getAllColleges();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<ExplorerLoading />}>
          <CollegeExplorerClient initialColleges={colleges} />
        </Suspense>
      </div>
    </div>
  );
}
