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
  Scale,
  MapPin,
  HelpCircle,
  Check
} from 'lucide-react';
import { Category, Gender, PredictorResult } from '@/lib/types';
import { predictColleges } from '@/lib/data';
import { estimateRankFromPercentile, formatRank, formatINR, formatLPA, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export function PredictorClient() {
  const [percentile, setPercentile] = useState<number>(98.5);
  const [percentileInput, setPercentileInput] = useState<string>('98.50');
  const [category, setCategory] = useState<Category>('OPEN');
  const [gender, setGender] = useState<Gender>('Gender-Neutral');
  const [homeState, setHomeState] = useState<string>('Delhi');
  const [preferredBranch, setPreferredBranch] = useState<string>('ALL');
  const [activeTierTab, setActiveTierTab] = useState<'ALL' | 'Safe' | 'Moderate' | 'Ambitious'>('ALL');

  const { isBookmarked, toggleBookmark, isInCompare, addToCompare, removeFromCompare } = useAppStore();

  const handleSliderChange = (val: number) => {
    setPercentile(val);
    setPercentileInput(val.toFixed(2));
  };

  const handleInputChange = (val: string) => {
    setPercentileInput(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed >= 50 && parsed <= 100) {
      setPercentile(Math.min(99.99, Math.max(80.0, parsed)));
    }
  };

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/60 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>JEE Main 2026 Admissions Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Colleges Based on Historical Cutoffs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Enter your JEE percentile to analyze institutions and branches where previous year closing ranks fell within your score band.
        </p>
      </div>

      {/* Strict Ethical Transparency Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Ethical Guidance: </span>
          This tool is a historical eligibility indicator and not an admission guarantee. Cutoff trends fluctuate each year based on applicant volume, question paper difficulty, and seat capacity. Seat allocation is managed solely by official JoSAA and CSAB counselling.
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Percentile Input (Slider + Direct Input) */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                JEE Main Percentile
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.01"
                  min="80"
                  max="99.99"
                  value={percentileInput}
                  onChange={e => handleInputChange(e.target.value)}
                  className="w-20 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-extrabold text-brand-600 dark:text-brand-400 text-sm text-right focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <span className="text-xs font-mono font-bold text-slate-500">%ile</span>
              </div>
            </div>
            <input
              type="range"
              min={80.0}
              max={99.99}
              step={0.05}
              value={percentile}
              onChange={e => handleSliderChange(parseFloat(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>80.00 %ile</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">
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
              className="w-full p-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
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
              className="w-full p-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
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
              className="w-full p-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {statesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Branch Filter Chips */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 uppercase tracking-wider mr-2">
            Discipline Filter:
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

      {/* Progressive Disclosure Context Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-white">Active Parameters:</span>
          <span>{percentile.toFixed(2)} %ile (~#{formatRank(estimatedRank)} AIR)</span>
          <span>•</span>
          <span>{category}</span>
          <span>•</span>
          <span>{homeState} (Home State)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>Found {results.length} historical matching options</span>
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
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
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
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 hover:border-emerald-300'
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
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 hover:border-amber-300'
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
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-400 hover:border-purple-300'
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
              const compared = isInCompare(res.college.slug);
              return (
                <div
                  key={`${res.college.id}-${res.branchCode}-${idx}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top Row: Tier badge & Bookmark */}
                    <div className="flex items-center justify-between gap-2">
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
                        type="button"
                        className={cn(
                          'p-1.5 rounded-lg border transition-colors',
                          bookmarked
                            ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-400'
                            : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        )}
                        title={bookmarked ? 'Saved' : 'Bookmark'}
                        aria-label="Bookmark"
                      >
                        <Bookmark className={cn('w-3.5 h-3.5', bookmarked && 'fill-rose-600')} />
                      </button>
                    </div>

                    {/* College & Branch */}
                    <div>
                      <Link href={`/college/${res.college.slug}`} className="group block">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">
                          {res.college.name}
                        </h3>
                      </Link>

                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{res.college.type}</span>
                        <span>•</span>
                        <span>{res.college.city}, {res.college.state}</span>
                        {res.college.nirfRank2025 && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                              NIRF #{res.college.nirfRank2025}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {res.branchName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1 flex items-center justify-between">
                        <span>Quota: <strong>{res.quota}</strong></span>
                        <span>Historical Closing: <strong>#{formatRank(res.historicalClosingRank)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Footer stats & link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Package</span>
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
          <EmptyState
            title="No Matching Institutes for Current Filters"
            description="Try selecting 'All Branches' or switching your home state quota filter to broaden your eligibility scope."
            action={
              <button
                type="button"
                onClick={() => {
                  setPreferredBranch('ALL');
                  setActiveTierTab('ALL');
                }}
                className="px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs transition-colors"
              >
                Reset Branch Filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
