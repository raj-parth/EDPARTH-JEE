'use client';

import React from 'react';
import { FeeStructure } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, Info, ExternalLink, AlertCircle, Percent } from 'lucide-react';

interface FeesTabProps {
  fees: FeeStructure;
  collegeName: string;
}

export function FeesTab({ fees, collegeName }: FeesTabProps) {
  return (
    <div className="space-y-8">
      {/* Top Cost Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Estimated Annual Cost
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {formatINR(fees.totalAnnualCost)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Includes Tuition, Hostel & Food for 2 Semesters
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Total Estimated 4-Year Cost
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand-700 dark:text-brand-300 font-mono">
            {formatINR(fees.totalEstimated4YearCost)}
          </div>
          <div className="text-xs text-brand-600 dark:text-brand-400 mt-1">
            Full 8 Semesters B.Tech Programme
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            One-Time / Refundable
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {formatINR(fees.oneTimeAdmissionFee + fees.refundableCautionDeposit)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Caution deposit of {formatINR(fees.refundableCautionDeposit)} refundable upon graduation
          </div>
        </div>
      </div>

      {/* Itemized Fee Breakdown Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Itemized Academic & Residential Fee Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown based on the official institutional circular for {collegeName}.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Status: {fees.status === 'verified' ? 'Verified Official' : 'Estimated Baseline'}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Fee Component</th>
                <th className="py-3 px-4 font-semibold">Frequency</th>
                <th className="py-3 px-4 font-semibold text-right">Amount ({fees.currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Tuition Fee
                </td>
                <td className="py-3 px-4 text-slate-500">Per Semester</td>
                <td className="py-3 px-4 font-mono font-semibold text-right text-slate-900 dark:text-slate-100">
                  {formatINR(fees.tuitionPerSem)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Annual Tuition Total (2 Semesters)
                </td>
                <td className="py-3 px-4 text-slate-500">Annually</td>
                <td className="py-3 px-4 font-mono font-semibold text-right text-slate-900 dark:text-slate-100">
                  {formatINR(fees.annualTuitionTotal)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Institute Other Charges (Exam, Library, Gymkhana, Internet)
                </td>
                <td className="py-3 px-4 text-slate-500">Per Semester</td>
                <td className="py-3 px-4 font-mono text-right text-slate-700 dark:text-slate-300">
                  {formatINR(fees.otherChargesPerSem)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  One-time Admission & Processing Fee
                </td>
                <td className="py-3 px-4 text-slate-500">One-time at admission</td>
                <td className="py-3 px-4 font-mono text-right text-slate-700 dark:text-slate-300">
                  {formatINR(fees.oneTimeAdmissionFee)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Caution Deposit (Institute & Library)
                </td>
                <td className="py-3 px-4 text-slate-500">One-time (100% Refundable)</td>
                <td className="py-3 px-4 font-mono text-right text-slate-700 dark:text-slate-300">
                  {formatINR(fees.refundableCautionDeposit)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Hostel Room Rent & Amenities
                </td>
                <td className="py-3 px-4 text-slate-500">Annually</td>
                <td className="py-3 px-4 font-mono text-right text-slate-700 dark:text-slate-300">
                  {formatINR(fees.annualHostelFee)}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  Mess Advance / Dining Charges
                </td>
                <td className="py-3 px-4 text-slate-500">Annually (Estimated)</td>
                <td className="py-3 px-4 font-mono text-right text-slate-700 dark:text-slate-300">
                  {formatINR(fees.annualMessFee)}
                </td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/60 font-bold">
                <td className="py-3.5 px-4 text-slate-900 dark:text-white">
                  Total First Year Cost
                </td>
                <td className="py-3.5 px-4 text-slate-500">First Year Total</td>
                <td className="py-3.5 px-4 font-mono text-right text-brand-600 dark:text-brand-400">
                  {formatINR(fees.totalAnnualCost + fees.oneTimeAdmissionFee + fees.refundableCautionDeposit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Category-Wise Tuition Fee Remissions & Waivers */}
      {fees.categoryWaivers && fees.categoryWaivers.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Category-Wise Tuition Fee Remission & Concessions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Under official Government of India regulations and institutional scholarship trusts, many students are eligible for full or partial tuition fee remissions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {fees.categoryWaivers.map((waiver, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {waiver.category}
                  </span>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {waiver.waiverPercentage}% Waiver
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Criteria:</span> {waiver.criteria}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {waiver.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source Citation and Transparency Note */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Data Source:</span> {fees.source}
          <span className="mx-2">•</span>
          <span>Last Updated: {fees.lastUpdated}</span>
        </div>
        {fees.feeNoticeUrl && (
          <a
            href={fees.feeNoticeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
          >
            <span>View Official Fee Notice</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
