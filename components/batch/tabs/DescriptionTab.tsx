'use client';

import React from 'react';
import {
  CheckCircle2,
  BookOpen,
  Target,
  Award,
  Sparkles,
  Compass,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Batch } from '@/lib/types/batch';

interface DescriptionTabProps {
  batch: Batch;
  onEnrollClick: () => void;
}

export function DescriptionTab({ batch, onEnrollClick }: DescriptionTabProps) {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Batch Overview & Pedagogy</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          About {batch.title.split('—')[0]}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {batch.description.about}
        </p>

        {/* Weekly Hours Callout */}
        <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
          <span>Recommended Weekly Effort: <strong className="text-slate-900 dark:text-white">{batch.description.weeklyHours}</strong></span>
        </div>
      </section>

      {/* 4-Pillar Pedagogical System */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">
          The 4 Pillars of Success in {batch.targetYear}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-bold text-sm mb-3">
              01
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              Live Advanced Concept Mastery
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every chapter starts from foundational basics and ascends straight to JEE Advanced multi-concept problem drills.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-sm mb-3">
              02
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              Daily Practice Problems (DPP)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rigorous 15-problem daily sets with step-by-step video solutions ensuring concept retention and immediate doubt diagnosis.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center font-bold text-sm mb-3">
              03
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              All India Test Series (AITS)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Computer-based testing matching NTA's exact user interface with deep AI analytics on accuracy, speed, and topic weaknesses.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center font-bold text-sm mb-3">
              04
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
              1-on-1 JoSAA Choice Allotment
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Exclusive personalized counseling with IIT alumni to ensure you secure the highest-ranked branch for your percentile.
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Join & What You Will Learn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Who Should Join */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Target className="w-4 h-4" />
            <span>Eligibility & Fit</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Who Should Join This Batch?
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {batch.description.whoShouldJoin.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Will You Learn */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Key Outcomes</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            What Will You Achieve?
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {batch.description.whatWillYouLearn.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold mb-1">
            Ready to secure your seat in Top IITs & NITs?
          </h3>
          <p className="text-xs sm:text-sm text-brand-100">
            Enroll today to lock early-bird pricing and start your 1-on-1 mentorship journey.
          </p>
        </div>
        <button
          type="button"
          onClick={onEnrollClick}
          className="px-6 py-3 rounded-xl bg-white text-brand-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shrink-0 shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>Enroll in Batch</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
