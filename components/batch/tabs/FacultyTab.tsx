'use client';

import React from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Star,
  PlayCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Batch, Faculty } from '@/lib/types/batch';

interface FacultyTabProps {
  batch: Batch;
  onPreviewFaculty: (facultyName: string) => void;
}

export function FacultyTab({ batch, onPreviewFaculty }: FacultyTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>India’s Top Educators & Mentors</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Learn From Veteran IITian Faculties
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Our master educators have mentored thousands of top-tier JEE rankers across India, combining concept mastery with strategic admission advisory.
        </p>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {batch.faculties.map(faculty => (
          <div
            key={faculty.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar, Name & Subject */}
              <div className="flex items-start gap-4 mb-4">
                {/* Faculty Avatar Initial Box */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
                  {faculty.name
                    .replace('Er. ', '')
                    .replace('Dr. ', '')
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                      {faculty.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{faculty.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                    {faculty.subject} • {faculty.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{faculty.education}, {faculty.alumni}</span>
                  </p>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {faculty.bio}
              </p>

              {/* Experience & Students Mentored Stats */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Experience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{faculty.experience}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Mentored</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{faculty.studentsMentored}</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => onPreviewFaculty(faculty.name)}
              className="w-full py-2.5 px-3 rounded-xl border border-brand-200 dark:border-brand-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Watch Sample Class with {faculty.name.split(' ')[1] || faculty.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
