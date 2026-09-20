'use client';

import React from 'react';
import { BRANCHES_DATA } from '@/lib/data/branches';
import { GraduationCap, Briefcase, BookOpen, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';

interface BranchesTabProps {
  collegeName: string;
}

export function BranchesTab({ collegeName }: BranchesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Offered Engineering Branches & Programmes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Degree curricula, specialization courses, and primary recruiting sectors at {collegeName}.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
          {BRANCHES_DATA.length} Programmes Indexed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRANCHES_DATA.map(branch => (
          <div
            key={branch.code}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {branch.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      Code: {branch.code}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {branch.degreeType}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2 mb-4">
                {branch.description}
              </p>

              {/* Core subjects */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Core Curriculum Highlights
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {branch.popularCourses.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top sectors */}
              <div className="space-y-1.5 mt-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Top Hiring Sectors
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {branch.topSectors.join(' • ')}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" /> {branch.durationYears} Years (8 Semesters)
              </span>
              <Link
                href={`/colleges?branch=${branch.code}`}
                className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
              >
                Compare across colleges →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
