'use client';

import React, { useState } from 'react';
import { Batch } from '@/lib/types/batch';
import { BatchCard } from '@/components/batch/BatchCard';
import {
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface BatchesListClientProps {
  batches: Batch[];
}

export function BatchesListClient({ batches }: BatchesListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const categories = ['All', 'JEE Main + Adv', 'Droppers', 'Class 12th', 'JoSAA Mentorship'];
  const languages = ['All', 'Hinglish', 'English'];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch =
      batch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.faculties.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || batch.category === selectedCategory;

    const matchesLanguage =
      selectedLanguage === 'All' || batch.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>ADMISSION 2026 & 2027 STUDY PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Engineering Prep & Mentorship Batches
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            PhysicsWallah-inspired rigorous curriculum, India's top IITian educators, and EDPARTH's verified cutoff and choice-filling algorithm under one roof.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs sm:text-sm text-slate-300">
            <div>
              <strong className="text-white font-bold text-base">48,500+</strong> Students Enrolled
            </div>
            <span>•</span>
            <div>
              <strong className="text-white font-bold text-base">4.9 ★</strong> Highest Student Rating
            </div>
            <span>•</span>
            <div>
              <strong className="text-white font-bold text-base">1-on-1</strong> IITian Counseling Included
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search batches by exam, topic, or faculty (e.g. Mission 100, Sachin Jakhar)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Batches Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Available Batches ({filteredBatches.length})
            </h2>
            <span className="text-xs text-slate-400">
              Updated for 2026/2027 Admissions
            </span>
          </div>

          {filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBatches.map(batch => (
                <BatchCard key={batch.id} batch={batch} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Batches Found
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search query or switching filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLanguage('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
