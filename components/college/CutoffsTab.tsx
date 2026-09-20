'use client';

import React, { useState, useMemo } from 'react';
import {
  Filter,
  Download,
  Search,
  ArrowUpDown,
  TrendingUp,
  ShieldCheck,
  Info,
  Calendar
} from 'lucide-react';
import { CutoffRecord, Category, Gender, Quota } from '@/lib/types';
import { formatRank, cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface CutoffsTabProps {
  cutoffs: CutoffRecord[];
  collegeName: string;
}

export function CutoffsTab({ cutoffs, collegeName }: CutoffsTabProps) {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedQuota, setSelectedQuota] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('OPEN');
  const [selectedGender, setSelectedGender] = useState<string>('Gender-Neutral');
  const [searchBranch, setSearchBranch] = useState<string>('');
  const [sortField, setSortField] = useState<'closingRank' | 'openingRank' | 'branchName'>('closingRank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Available unique years and quotas
  const years = useMemo(() => Array.from(new Set(cutoffs.map(c => c.year))).sort((a, b) => b - a), [cutoffs]);
  const quotas = useMemo(() => Array.from(new Set(cutoffs.map(c => c.quota))), [cutoffs]);
  const branches = useMemo(() => Array.from(new Set(cutoffs.map(c => c.branchCode))), [cutoffs]);

  // Filtered cutoffs
  const filteredCutoffs = useMemo(() => {
    return cutoffs.filter(c => {
      if (selectedYear !== 'ALL' && c.year.toString() !== selectedYear) return false;
      if (selectedQuota !== 'ALL' && c.quota !== selectedQuota) return false;
      if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;
      if (selectedGender !== 'ALL' && c.gender !== selectedGender) return false;
      if (searchBranch && !c.branchName.toLowerCase().includes(searchBranch.toLowerCase()) && !c.branchCode.toLowerCase().includes(searchBranch.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'closingRank') comparison = a.closingRank - b.closingRank;
      else if (sortField === 'openingRank') comparison = a.openingRank - b.openingRank;
      else comparison = a.branchName.localeCompare(b.branchName);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [cutoffs, selectedYear, selectedQuota, selectedCategory, selectedGender, searchBranch, sortField, sortOrder]);

  // Historical trend data for CSE or top branch
  const trendBranch = branches.includes('CSE') ? 'CSE' : branches[0] || '';
  const trendData = useMemo(() => {
    if (!trendBranch) return [];
    const points: { year: string; closingRank?: number }[] = [
      { year: '2023' },
      { year: '2024' },
      { year: '2025' },
      { year: '2026' }
    ];

    points.forEach(p => {
      const match = cutoffs.find(
        c =>
          c.branchCode === trendBranch &&
          c.year.toString() === p.year &&
          c.category === (selectedCategory === 'ALL' ? 'OPEN' : selectedCategory) &&
          c.gender === (selectedGender === 'ALL' ? 'Gender-Neutral' : selectedGender)
      );
      if (match) {
        p.closingRank = match.closingRank;
      }
    });

    return points;
  }, [cutoffs, trendBranch, selectedCategory, selectedGender]);

  const handleExportCSV = () => {
    const headers = ['Year', 'Round', 'Counselling', 'Branch', 'Category', 'Gender', 'Quota', 'Opening Rank', 'Closing Rank', 'Source'];
    const rows = filteredCutoffs.map(c => [
      c.year,
      c.round,
      c.counselling,
      `"${c.branchName}"`,
      c.category,
      c.gender,
      c.quota,
      c.openingRank,
      c.closingRank,
      `"${c.source}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${collegeName.replace(/\s+/g, '_')}_cutoffs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Historical Trend Chart Section */}
      {trendData.some(d => d.closingRank !== undefined) && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  Historical Closing Rank Trajectory ({trendBranch})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Comparing {selectedCategory} ({selectedGender}) closing ranks across official JoSAA rounds.
              </p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono self-start sm:self-auto">
              Category: {selectedCategory}
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis
                  reversed
                  stroke="#94a3b8"
                  tickFormatter={val => `#${val}`}
                  domain={['dataMin - 50', 'dataMax + 50']}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                  formatter={(value: any) => [`#${formatRank(value)}`, 'Closing Rank']}
                />
                <Line
                  type="monotone"
                  dataKey="closingRank"
                  name={`${trendBranch} Closing Rank`}
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#4f46e5' }}
                  activeDot={{ r: 8 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 text-right">
            * Note: Y-axis is inverted so a higher line represents a higher competitive rank. 2026 data reflects early mock/verified rounds.
          </div>
        </div>
      )}

      {/* Interactive Cutoff Filters */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Branch */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchBranch}
              onChange={e => setSearchBranch(e.target.value)}
              placeholder="Filter by branch (e.g. 'Computer', 'CSE', 'Electrical')..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Year */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Years</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Categories</option>
              <option value="OPEN">OPEN (General)</option>
              <option value="EWS">EWS</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="PwD">PwD</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Gender
            </label>
            <select
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Genders</option>
              <option value="Gender-Neutral">Gender-Neutral</option>
              <option value="Female-Only">Female-Only Pool</option>
            </select>
          </div>

          {/* Quota */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              State Quota
            </label>
            <select
              value={selectedQuota}
              onChange={e => setSelectedQuota(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Quotas</option>
              {quotas.map(q => (
                <option key={q} value={q}>
                  {q === 'AI' ? 'AI (All India)' : q === 'HS' ? 'HS (Home State)' : 'OS (Other State)'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cutoff Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Year & Round</th>
                <th
                  onClick={() => {
                    setSortField('branchName');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Branch & Specialization</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3 font-semibold">Quota</th>
                <th className="py-3.5 px-3 font-semibold">Category</th>
                <th
                  onClick={() => {
                    setSortField('openingRank');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="py-3.5 px-3 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Opening</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => {
                    setSortField('closingRank');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Closing Rank</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 font-semibold text-right">Data Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {filteredCutoffs.length > 0 ? (
                filteredCutoffs.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                          {record.year}
                        </span>
                        <span className="text-xs text-slate-500">R{record.round}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {record.branchName}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        Code: {record.branchCode}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {record.quota}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                        {record.category}
                      </span>
                      {record.gender === 'Female-Only' && (
                        <span className="block text-[10px] text-pink-600 dark:text-pink-400 mt-0.5 font-medium">
                          Female Only
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-400">
                      {formatRank(record.openingRank)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-right text-brand-600 dark:text-brand-400">
                      #{formatRank(record.closingRank)}
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1 text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        {record.source}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="font-medium text-sm">No cutoffs match the current filter selection.</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the quota or category filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
