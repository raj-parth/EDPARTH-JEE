import React from 'react';
import { Metadata } from 'next';
import { getAllColleges } from '@/lib/data';
import { LandingClient } from './LandingClient';

export const metadata: Metadata = {
  title: 'EDPARTH — Engineering College Discovery & Admission Data Platform',
  description: 'Find the right engineering college in India. Explore verified 2026 cutoffs, fees, placements, branches, and admission data across IITs, NITs, and IIITs.'
};

export default function HomePage() {
  const colleges = getAllColleges();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <LandingClient colleges={colleges} />
    </div>
  );
}
