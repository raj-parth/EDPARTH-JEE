'use client';

import React from 'react';
import { PlacementReport } from '@/lib/types';
import { formatLPA, cn } from '@/lib/utils';
import {
  TrendingUp,
  Building2,
  Users,
  Award,
  ShieldCheck,
  Briefcase,
  PieChart as PieIcon,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PlacementsTabProps {
  placements: PlacementReport;
  collegeName: string;
}

export function PlacementsTab({ placements, collegeName }: PlacementsTabProps) {
  // Chart data for branch-wise average package
  const chartData = placements.branchStats.map(b => ({
    name: b.branchCode,
    fullName: b.branchName,
    average: b.averageLPA,
    highest: b.highestLPA,
    placementRate: b.placementPercent
  }));

  return (
    <div className="space-y-8">
      {/* Top Banner with Year and Verification */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
          <span className="px-2 py-0.5 rounded font-mono font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
            {placements.reportYear} Report
          </span>
          <span>Official Placement Statistics for {collegeName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Status: {placements.status === 'verified' ? 'Verified Official' : 'Estimated Data'}</span>
        </div>
      </div>

      {/* Primary 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Highest Package */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Highest Package
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {formatLPA(placements.highestPackageLPA)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Top international or domestic offer
          </div>
        </div>

        {/* Average Package */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
            Average Package
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {formatLPA(placements.averagePackageLPA)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across all graduating branches
          </div>
        </div>

        {/* Median Package */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            Median Package
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {formatLPA(placements.medianPackageLPA)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            50th percentile compensation
          </div>
        </div>

        {/* Placement Percentage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Placement Rate
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
            {placements.placementPercentage}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {placements.totalOffers} total offers recorded
          </div>
        </div>
      </div>

      {/* Branch-Wise Compensation Bar Chart */}
      {chartData.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Branch-Wise Average Compensation (LPA)
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of average salary packages across departments for {placements.reportYear}.
              </p>
            </div>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Values in ₹ Lakhs Per Annum
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={v => `₹${v}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                  formatter={(val: any, name: string) => [`₹${val} LPA`, name === 'average' ? 'Average Package' : 'Highest Package']}
                  labelFormatter={(label) => {
                    const item = chartData.find(c => c.name === label);
                    return item ? item.fullName : label;
                  }}
                />
                <Bar dataKey="average" name="average" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Branch-Wise Placement Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
          Detailed Department Placement Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Department / Branch</th>
                <th className="py-3 px-3 font-semibold text-right">Average Package</th>
                <th className="py-3 px-3 font-semibold text-right">Median Package</th>
                <th className="py-3 px-3 font-semibold text-right">Highest Package</th>
                <th className="py-3 px-4 font-semibold text-right">Placement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {placements.branchStats.map(b => (
                <tr key={b.branchCode} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {b.branchName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block">
                      Code: {b.branchCode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-right text-brand-600 dark:text-brand-400">
                    {formatLPA(b.averageLPA)}
                  </td>
                  <td className="py-3 px-3 font-mono text-right text-slate-700 dark:text-slate-300">
                    {formatLPA(b.medianLPA)}
                  </td>
                  <td className="py-3 px-3 font-mono text-right text-emerald-600 dark:text-emerald-400 font-medium">
                    {formatLPA(b.highestLPA)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {b.placementPercent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Recruiters Grid */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Key Campus Recruiters
            </h3>
            <p className="text-xs text-slate-500">
              Major technology, engineering, finance, and consulting companies that hired from {collegeName}.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
            {placements.totalCompaniesVisited}+ Visiting Firms
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {placements.topRecruiters.map((recruiter, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-center flex items-center justify-center font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200"
            >
              {recruiter}
            </div>
          ))}
        </div>
      </div>

      {/* Source Citation */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Data Source:</span> {placements.source}
          <span className="mx-2">•</span>
          <span>Last Updated: {placements.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
