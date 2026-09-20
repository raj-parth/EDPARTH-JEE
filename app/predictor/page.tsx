import React from 'react';
import { Metadata } from 'next';
import { PredictorClient } from './PredictorClient';

export const metadata: Metadata = {
  title: 'JEE Main 2026 Percentile & Rank Explorer — College Cutoff Matching',
  description: 'Enter your JEE Main percentile, category, gender, and home state to explore historical cutoff ranges across IITs, NITs, and IIITs.'
};

export default function PredictorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <PredictorClient />
      </div>
    </div>
  );
}
