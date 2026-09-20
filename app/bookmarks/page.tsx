import React from 'react';
import { Metadata } from 'next';
import { BookmarksClient } from './BookmarksClient';

export const metadata: Metadata = {
  title: 'My Saved Colleges & Shortlist | EDPARTH',
  description: 'Manage your personal shortlist of engineering colleges, compare admission parameters, and export your target choices.'
};

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <BookmarksClient />
      </div>
    </div>
  );
}
