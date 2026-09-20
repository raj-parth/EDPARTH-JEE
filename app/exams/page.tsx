import React from 'react';
import { Metadata } from 'next';
import { EXAMS_DATA } from '@/lib/data/exams';
import { GraduationCap, Calendar, Globe, ExternalLink, Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Engineering Entrance Exams in India (JEE Main, Advanced, BITSAT, VITEEE) | EDPARTH',
  description: 'Complete directory of Indian engineering entrance exams with dates, eligibility criteria, conducting agencies, and participating colleges.'
};

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>National & State Admissions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Entrance Examinations Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Explore national and institutional entrance tests governing admissions to IITs, NITs, IIITs, BITS, and state universities across India.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXAMS_DATA.map(exam => (
            <div
              key={exam.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      {exam.shortName}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                      {exam.name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Conducted by {exam.conductedBy}
                    </p>
                  </div>

                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Official Examination Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exam.description}
                </p>

                {/* Exam Key Attributes */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Frequency</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.frequency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Mode of Test</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.mode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Exam Window</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.examMonth}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Counselling Body</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{exam.counsellingBody}</span>
                  </div>
                </div>

                {/* Eligibility summary */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Eligibility Requirement
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exam.eligibility}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  {exam.participatingInstitutesCount}+ Participating Institutes
                </span>
                <Link
                  href={`/colleges?exam=${exam.shortName}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Filter Colleges for this Exam →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
