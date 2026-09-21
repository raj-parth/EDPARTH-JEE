'use client';

import React from 'react';
import {
  Layers,
  Award,
  Clock,
  HelpCircle,
  FileCheck,
  Play,
  Lock,
  BarChart2,
  Users
} from 'lucide-react';
import { Batch, TestSeriesItem } from '@/lib/types/batch';

interface TestSeriesTabProps {
  batch: Batch;
  onAttemptTest: (test: TestSeriesItem) => void;
  onEnrollClick: () => void;
}

export function TestSeriesTab({
  batch,
  onAttemptTest,
  onEnrollClick,
}: TestSeriesTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>Computer Based All India Testing</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          All India Test Series (AITS) & DPPs
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Simulated full-length papers designed strictly as per NTA JEE Main and IIT JEE Advanced patterns with percentile and JoSAA seat prediction.
        </p>
      </div>

      {/* Tests Grid */}
      <div className="space-y-4">
        {batch.testSeries.map((test, idx) => (
          <div
            key={test.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300">
                  {test.type}
                </span>
                {test.isFree ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    FREE FOR ALL
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    BATCH EXCLUSIVE
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{test.attemptsCount}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {test.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Syllabus: <strong className="text-slate-700 dark:text-slate-300">{test.syllabus}</strong>
              </p>

              {/* Meta tags: Duration, Questions, Marks */}
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{test.duration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>{test.totalQuestions} Questions</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{test.totalMarks} Marks</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 flex items-center gap-3">
              {test.isFree ? (
                <button
                  type="button"
                  onClick={() => onAttemptTest(test)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Attempt Free Test</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onEnrollClick}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Test Series</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
