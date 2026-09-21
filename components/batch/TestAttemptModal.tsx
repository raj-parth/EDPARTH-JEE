'use client';

import React, { useState } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TestSeriesItem } from '@/lib/types/batch';

interface TestAttemptModalProps {
  test: TestSeriesItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    subject: 'Mathematics',
    question:
      'Let f(x) = x³ - 3x + 1. The number of distinct real roots of the equation f(f(x)) = 0 in the interval [-2, 2] is equal to:',
    options: ['3', '5', '7', '9'],
    correctOption: 2, // 7
  },
  {
    id: 2,
    subject: 'Physics',
    question:
      'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of inclination θ. The minimum coefficient of static friction required for pure rolling is:',
    options: ['(1/2) tan θ', '(1/3) tan θ', '(2/3) tan θ', '(1/4) tan θ'],
    correctOption: 1, // (1/3) tan θ
  },
  {
    id: 3,
    subject: 'Chemistry',
    question:
      'Among the following coordination complexes, which one exhibits both geometrical isomerism and optical isomerism?',
    options: [
      '[Co(en)₂Cl₂]⁺ (cis-isomer)',
      '[Co(NH₃)₄Cl₂]⁺',
      '[Pt(NH₃)₂Cl₂]',
      '[Ni(CO)₄]',
    ],
    correctOption: 0,
  },
];

export function TestAttemptModal({ test, isOpen, onClose }: TestAttemptModalProps) {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !test) return null;

  const currentQ = SAMPLE_QUESTIONS[currentQIdx];

  const handleSelectOption = (optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIdx]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] !== undefined) {
        if (selectedAnswers[idx] === q.correctOption) {
          score += 4; // Correct
        } else {
          score -= 1; // Negative marking
        }
      }
    });
    return score;
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top NTA Style Banner */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-600 text-white uppercase">
              NTA CBT SIMULATOR
            </span>
            <h3 className="text-xs sm:text-sm font-bold truncate max-w-md">
              {test.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold bg-slate-800 px-3 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5" />
              <span>178:42 Left</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white"
              aria-label="Close test"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSubmitted ? (
          /* Test Results & JoSAA Rank Projection */
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Mock Test Analysis Complete!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Here is your diagnostic score breakdown and simulated JoSAA percentile.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Your Score</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {score} / 12
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Accuracy</span>
                <span className="text-xl font-bold text-emerald-600">
                  {answeredCount > 0 ? Math.round((Math.max(0, score) / (answeredCount * 4)) * 100) : 0}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Simulated %ile</span>
                <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                  99.12 %ile
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Projected Seat</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate block mt-1">
                  NIT Trichy CSE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Enrolling in the MISSION 100 batch unlocks all 25+ Full AITS tests with topic-wise weakness heatmaps and 1-on-1 mentor paper discussions.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Back to Batch Overview
            </button>
          </div>
        ) : (
          /* Live Test Interface */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Question Panel Left */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-brand-600 dark:text-brand-400">
                  Question {currentQIdx + 1} of {SAMPLE_QUESTIONS.length}
                </span>
                <span className="text-slate-400 font-mono">
                  +4 Marks • -1 Negative Marking
                </span>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed font-sans">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, oIdx) => {
                  const isSelected = selectedAnswers[currentQIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all text-xs sm:text-sm ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-950/60 text-brand-950 dark:text-brand-100 font-semibold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-brand-600 bg-brand-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Question Palette */}
            <div className="w-full md:w-64 p-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Question Palette
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {SAMPLE_QUESTIONS.map((q, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isCurrent = currentQIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentQIdx(idx)}
                        className={`w-10 h-10 rounded-xl font-bold font-mono text-xs flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900'
                            : ''
                        } ${
                          isAnswered
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation & Submit CTA */}
              <div className="space-y-2 pt-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={currentQIdx === 0}
                    onClick={() => setCurrentQIdx(prev => Math.max(0, prev - 1))}
                    className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentQIdx === SAMPLE_QUESTIONS.length - 1}
                    onClick={() => setCurrentQIdx(prev => Math.min(SAMPLE_QUESTIONS.length - 1, prev + 1))}
                    className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Submit & View AIR Prediction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
