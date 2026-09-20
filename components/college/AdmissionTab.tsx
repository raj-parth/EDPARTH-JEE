'use client';

import React from 'react';
import { AdmissionDetails } from '@/lib/types';
import {
  GraduationCap,
  FileCheck2,
  ListOrdered,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdmissionTabProps {
  admission: AdmissionDetails;
  collegeName: string;
}

export function AdmissionTab({ admission, collegeName }: AdmissionTabProps) {
  return (
    <div className="space-y-8">
      {/* Top Meta Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-xs text-slate-400 block mb-0.5 font-medium">Entrance Exam(s)</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {admission.acceptedExams.join(', ')}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5 font-medium">Counselling Body</span>
            <span className="font-bold text-brand-600 dark:text-brand-400 text-base">
              {admission.counsellingAuthority}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5 font-medium">Application Window</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {admission.applicationPeriod}
            </span>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Eligibility & Academic Prerequisites
          </h2>
        </div>

        <div className="space-y-2.5 pt-1">
          {admission.eligibilityCriteria.map((crit, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Counselling & Seat Allocation Process */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Step-by-Step Admission & Seat Allocation Process
          </h2>
        </div>

        <div className="relative border-l-2 border-brand-200 dark:border-brand-900/60 ml-4 space-y-6">
          {admission.steps.map((step) => (
            <div key={step.stepNumber} className="relative pl-6">
              {/* Step indicator dot */}
              <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {step.stepNumber}
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Documents Checklist */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Required Documents for Physical & Online Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {admission.documentsRequired.map((doc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Link Action Box */}
      <div className="p-6 rounded-2xl bg-brand-50/40 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            Official Counselling & Reporting Portal
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Always refer to the official portal for final choice locking and admission schedules.
          </p>
        </div>
        <a
          href={admission.officialPortalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
        >
          <span>Open Official Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
