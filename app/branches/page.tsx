import React from 'react';
import { Metadata } from 'next';
import { BRANCHES_DATA } from '@/lib/data/branches';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Engineering Branches & Career Guide | EDPARTH',
  description: 'Explore engineering branches across Computer Science, Electronics, Mechanical, Civil, and Biotechnology with career prospects and recruiting sectors.'
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Specializations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Branches & Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Understand course structures, industry demand, core subjects, and job profiles before locking your JoSAA counselling choices.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRANCHES_DATA.map(branch => (
            <div
              key={branch.code}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold font-mono">
                      {branch.code}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {branch.name}
                      </h2>
                      <span className="text-xs text-slate-500">
                        {branch.category} • 4-Year {branch.degreeType}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {branch.description}
                </p>

                {/* Popular Courses */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Academic Subjects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.popularCourses.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career roles */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Job Roles & Careers
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.careerProspects.map((role, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100/60 dark:border-indigo-900/40"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top sectors */}
                <div className="pt-2 text-xs text-slate-500">
                  <strong className="text-slate-700 dark:text-slate-300">Top Hiring Sectors: </strong>
                  {branch.topSectors.join(', ')}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/colleges?branch=${branch.code}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Explore colleges with {branch.code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/cutoffs"
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Check Cutoffs →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
