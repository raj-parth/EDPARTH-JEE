'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Batch, ScheduleSlot } from '@/lib/types/batch';
import { cn } from '@/lib/utils';

interface ScheduleTabProps {
  batch: Batch;
  onEnrollClick: () => void;
}

const DAYS: ScheduleSlot['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function ScheduleTab({ batch, onEnrollClick }: ScheduleTabProps) {
  const [selectedDay, setSelectedDay] = useState<ScheduleSlot['day']>('Monday');

  const slotsForDay = batch.schedule.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Timetable & Live Planner</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Weekly Live Class Routine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Structured daily schedule engineered to prevent burnout while ensuring systematic completion before exams.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>IST Timezone</span>
            </span>
          </div>
        </div>
      </div>

      {/* Day Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {DAYS.map(day => {
          const isSelected = selectedDay === day;
          const count = batch.schedule.filter(s => s.day === day).length;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border flex items-center gap-2',
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              )}
            >
              <span>{day}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold',
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedule Slots Timeline for Selected Day */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Schedule for {selectedDay}</span>
          <span className="text-xs text-slate-400 font-normal">
            ({slotsForDay.length} sessions scheduled)
          </span>
        </h3>

        {slotsForDay.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
            {slotsForDay.map((slot, idx) => (
              <div
                key={idx}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200/60 dark:border-brand-800/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {slot.time}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] uppercase font-bold px-2 py-0.5 rounded-full',
                          slot.mode === 'LIVE'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : slot.mode === 'PRACTICE'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        )}
                      >
                        {slot.mode} SESSION
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {slot.subject}: {slot.topic}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Faculty: <strong className="text-slate-700 dark:text-slate-300">{slot.faculty}</strong>
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <button
                    type="button"
                    onClick={onEnrollClick}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span>Join Class (Live)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">
            No live classes scheduled for this day. Dedicated to self-revision, DPP completion, and test analysis.
          </div>
        )}
      </div>
    </div>
  );
}
