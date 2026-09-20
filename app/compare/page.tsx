import React from 'react';
import { Metadata } from 'next';
import { getAllColleges } from '@/lib/data';
import { CompareClient } from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare Engineering Colleges Side-by-Side | EDPARTH',
  description: 'Compare up to 4 engineering colleges side-by-side on NIRF ranking, fee breakdown, placement packages, cutoffs, and campus infrastructure.'
};

export default function ComparePage() {
  const allColleges = getAllColleges();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <CompareClient allColleges={allColleges} />
      </div>
    </div>
  );
}
