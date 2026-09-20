'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Bookmark,
  Building2,
  ArrowUpRight,
  Info,
  Scale
} from 'lucide-react';
import { Category, Gender, PredictorResult } from '@/lib/types';
import { predictColleges } from '@/lib/data';
import { estimateRankFromPercentile, formatRank, formatINR, formatLPA, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export function PredictorClient() {
  const [percentile, setPercentile] = useState<number>(98.5);
  const [category, setCategory] = useState<Category>('OPEN');
  const [gender, setGender] = useState<Gender>('Gender-Neutral');
  const [homeState, setHomeState] = useState<string>('Delhi');
  const [preferredBranch, setPreferredBranch] = useState<string>('ALL');
  const [activeTierTab, setActiveTierTab] = useState<'ALL' | 'Safe' | 'Moderate' | 'Ambitious'>('ALL');

  const { isBookmarked, toggleBookmark, isInCompare, addToCompare } = useAppStore();

  const estimatedRank = useMemo(() => {
    return estimateRankFromPercentile(percentile);
  }, [percentile]);

  // Match colleges based on historical cutoffs
  const results = useMemo(() => {
    return predictColleges({
      percentile,
      category,
      gender,
      homeState,
      preferredBranch
    });
  }, [percentile, category, gender, homeState, preferredBranch]);

  const safeResults = useMemo(() => results.filter(r => r.probabilityTier === 'Safe'), [results]);
  const moderateResults = useMemo(() => results.filter(r => r.probabilityTier === 'Moderate'), [results]);
  const ambitiousResults = useMemo(() => results.filter(r => r.probabilityTier === 'Ambitious'), [results]);

  const displayedResults = useMemo(() => {
    if (activeTierTab === 'Safe') return safeResults;
    if (activeTierTab === 'Moderate') return moderateResults;
    if (activeTierTab === 'Ambitious') return ambitiousResults;
    return results;
  }, [activeTierTab, safeResults, moderateResults, ambitiousResults, results]);

  const statesList = [
    'Delhi',
    'Maharashtra',
    'Tamil Nadu',
    'Karnataka',
    'Telangana',
    'Uttar Pradesh',
    'West Bengal',
    'Rajasthan',
    'Punjab',
    'Odisha',
    'Kerala',
    'Chandigarh',
    'Jharkhand',
    'Gujarat',
    'Madhya Pradesh',
    'Haryana'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>JEE Main Percentile & Rank Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Colleges Based on Historical Cutoffs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Enter your JEE percentile to analyze institutes and branches where previous year closing ranks fell around your score range.
        </p>
      </div>

      {/* Strict Ethical Transparency Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Ethical Guidance: </span>
          This tool is a historical eligibility indicator and not an admission guarantee. Cutoff trends fluctuate each year based on applicant volume, question paper difficulty, and seat capacity. Seat allocation is managed solely by official JoSAA and CSAB counselling.
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Percentile Input */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                JEE Main Percentile
              </label>
              <span className="font-mono font-extrabold text-brand-600 dark:text-brand-400 text-base">
                {percentile.toFixed(2)} %ile
              </span>
            </div>
            <input
              type="range"
              min={80.0}
              max={99.99}
              step={0.05}
              value={percentile}
              onChange={e => setPercentile(parseFloat(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>80.00 %ile</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                Est. All India Rank: ~#{formatRank(estimatedRank)}
              </span>
              <span>99.99 %ile</span>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <option value="OPEN">OPEN (General)</option>
              <option value="EWS">GEN-EWS</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="PwD">PwD</option>
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Gender Pool
            </label>
            <select
              value={gender}
              onChange={e => setGender(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              <option value="Gender-Neutral">Gender-Neutral Pool</option>
              <option value="Female-Only">Female-Only Supernumerary</option>
            </select>
          </div>

          {/* Home State */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Home State (Quota)
            </label>
            <select
              value={homeState}
              onChange={e => setHomeState(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
            >
              {statesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Branch Preference Filter */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 uppercase tracking-wider mr-2">
            Filter Branch:
          </span>
          {['ALL', 'CSE', 'AI_DS', 'ECE', 'EEE', 'MECH', 'CIVIL'].map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setPreferredBranch(b)}
              className={cn(
                'px-3 py-1.5 rounded-full font-medium transition-all border',
                preferredBranch === b
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              )}
            >
              {b === 'ALL' ? 'All Branches' : b}
            </button>
          ))}
        </div>
      </div>

      {/* Probability Tier Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTierTab('ALL')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap',
            activeTierTab === 'ALL'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          )}
        >
          All Matches ({results.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTierTab('Safe')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5',
            activeTierTab === 'Safe'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400'
          )}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>High Possibility ({safeResults.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTierTab('Moderate')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5',
            activeTierTab === 'Moderate'
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400'
          )}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Moderate / Competitive ({moderateResults.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTierTab('Ambitious')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5',
            activeTierTab === 'Ambitious'
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-400'
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Ambitious / Reach ({ambitiousResults.length})</span>
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {displayedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedResults.map((res, idx) => {
              const bookmarked = isBookmarked(res.college.slug);
              return (
                <div
                  key={`${res.college.id}-${res.branchCode}-${idx}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Tier badge & Bookmark */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                          res.probabilityTier === 'Safe' && 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-900',
                          res.probabilityTier === 'Moderate' && 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-900',
                          res.probabilityTier === 'Ambitious' && 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-900'
                        )}
                      >
                        {res.probabilityTier === 'Safe' ? 'High Possibility' : res.probabilityTier === 'Moderate' ? 'Competitive' : 'Ambitious Reach'}
                      </span>

                      <button
                        onClick={() => toggleBookmark(res.college.slug)}
                        className={cn(
                          'p-1.5 rounded-lg border transition-colors',
                          bookmarked
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        )}
                        title={bookmarked ? 'Saved' : 'Bookmark'}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* College & Branch */}
                    <Link href={`/college/${res.college.slug}`} className="group block">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">
                        {res.college.name}
                      </h3>
                    </Link>

                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{res.college.type}</span>
                      <span>•</span>
                      <span>{res.college.city}, {res.college.state}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">NIRF #{res.college.nirfRank2025}</span>
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {res.branchName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center justify-between">
                        <span>Quota: {res.quota}</span>
                        <span>Historical Closing: <strong>#{formatRank(res.historicalClosingRank)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Footer stats & link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Avg Package</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                        {formatLPA(res.averagePackageLPA)}
                      </span>
                    </div>

                    <Link
                      href={`/college/${res.college.slug}`}
                      className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                    >
                      <span>Explore College</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              No colleges match this percentile with the current branch/quota filter
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting &ldquo;All Branches&rdquo; or adjusting your home state.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
