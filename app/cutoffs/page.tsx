import React from 'react';
import { Metadata } from 'next';
import { getAllCutoffs, getAllColleges } from '@/lib/data';
import { CutoffExplorerClient } from './CutoffExplorerClient';

export const metadata: Metadata = {
  title: 'National Cutoff Explorer — JoSAA & CSAB Opening & Closing Ranks',
  description: 'Filter and search verified multi-year historical cutoff ranks across IITs, NITs, IIITs, and GFTIs by category, round, quota, and branch.'
};

export default function CutoffsPage() {
  const cutoffs = getAllCutoffs();
  const colleges = getAllColleges();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <CutoffExplorerClient cutoffs={cutoffs} colleges={colleges} />
      </div>
    </div>
  );
}
