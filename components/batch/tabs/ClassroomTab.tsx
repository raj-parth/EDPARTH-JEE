'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  PlayCircle,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Lock,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { Batch, ClassroomSubject, Chapter } from '@/lib/types/batch';
import { cn } from '@/lib/utils';

interface ClassroomTabProps {
  batch: Batch;
  onPreviewLecture: (lectureTitle: string) => void;
  onEnrollClick: () => void;
}

export function ClassroomTab({ batch, onPreviewLecture, onEnrollClick }: ClassroomTabProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    batch.classroomSubjects[0]?.id || ''
  );
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({
    [batch.classroomSubjects[0]?.chapters[0]?.id || '']: true,
  });

  const currentSubject =
    batch.classroomSubjects.find(s => s.id === selectedSubjectId) ||
    batch.classroomSubjects[0];

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Subject Pill Selector (PW Study-v2 Style) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-1">
          Select Subject / Curriculum Module
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {batch.classroomSubjects.map(subject => {
            const isSelected = subject.id === selectedSubjectId;
            return (
              <button
                key={subject.id}
                type="button"
                onClick={() => {
                  setSelectedSubjectId(subject.id);
                  if (subject.chapters[0]) {
                    setExpandedChapterIds({ [subject.chapters[0].id]: true });
                  }
                }}
                className={cn(
                  'p-3 sm:p-4 rounded-xl text-left border transition-all duration-150 relative overflow-hidden',
                  isSelected
                    ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300'
                )}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-brand-500" />
                )}
                <div className="font-bold text-xs sm:text-sm line-clamp-1">
                  {subject.name.split(':')[0]}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <span>{subject.totalChapters} Ch</span>
                  <span>•</span>
                  <span>{subject.totalLectures} Ltrs</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Details & Chapters Drawer */}
      {currentSubject && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          {/* Subject Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                ACTIVE CURRICULUM
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {currentSubject.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                <span>Instructor: <strong>{currentSubject.facultyName}</strong> ({currentSubject.facultyEducation})</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {currentSubject.totalChapters} Chapters
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {currentSubject.totalLectures} Lectures
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {currentSubject.totalDpps} DPPs
              </div>
            </div>
          </div>

          {/* Chapters Accordion List */}
          <div className="space-y-3">
            {currentSubject.chapters.map((chapter, cIdx) => {
              const isExpanded = expandedChapterIds[chapter.id];
              return (
                <div
                  key={chapter.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
                >
                  {/* Chapter Header Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold font-mono">
                        {String(cIdx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {chapter.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>{chapter.lecturesCount} Lectures</span>
                          <span>•</span>
                          <span>{chapter.notesCount} Notes PDF</span>
                          <span>•</span>
                          <span>{chapter.dppCount} DPPs</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-xs hidden sm:inline text-slate-500">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Chapter Content Dropdown */}
                  {isExpanded && (
                    <div className="p-4 bg-white dark:bg-slate-900/60 divide-y divide-slate-100 dark:divide-slate-800/60">
                      {chapter.lectures && chapter.lectures.length > 0 ? (
                        chapter.lectures.map((lecture, lIdx) => (
                          <div
                            key={lecture.id}
                            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                                {lecture.isFreePreview ? (
                                  <PlayCircle className="w-3.5 h-3.5" />
                                ) : (
                                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                  <span>{lecture.title}</span>
                                  {lecture.isFreePreview && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                      FREE DEMO
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                                  <span>Duration: {lecture.duration}</span>
                                  <span>•</span>
                                  <span>PDF Notes included</span>
                                  <span>•</span>
                                  <span>15 Questions DPP</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {lecture.isFreePreview ? (
                                <button
                                  type="button"
                                  onClick={() => onPreviewLecture(lecture.title)}
                                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                                >
                                  <PlayCircle className="w-3.5 h-3.5" />
                                  <span>Play Demo</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={onEnrollClick}
                                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1.5"
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Unlock in Batch</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                          Lectures scheduled sequentially as per batch timeline. Full access unlocked upon enrollment.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
