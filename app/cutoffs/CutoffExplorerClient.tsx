'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { CutoffRecord, College } from '@/lib/types';
import { formatRank } from '@/lib/utils';

interface CutoffExplorerClientProps {
  cutoffs: CutoffRecord[];
  colleges: College[];
}

export function CutoffExplorerClient({ cutoffs, colleges }: CutoffExplorerClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedCounselling, setSelectedCounselling] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('OPEN');
  const [selectedGender, setSelectedGender] = useState<string>('Gender-Neutral');
  const [selectedQuota, setSelectedQuota] = useState<string>('ALL');
  const [selectedRound, setSelectedRound] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'closingRank' | 'openingRank' | 'year'>('closingRank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // College lookup map
  const collegeMap = useMemo(() => {
    const map = new Map<string, College>();
    colleges.forEach(c => map.set(c.id, c));
    return map;
  }, [colleges]);

  // Filtering
  const filteredCutoffs = useMemo(() => {
    return cutoffs.filter(c => {
      const college = collegeMap.get(c.collegeId);
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCollege = college && (
          college.name.toLowerCase().includes(q) ||
          college.shortName.toLowerCase().includes(q) ||
          college.aliases.some(a => a.toLowerCase().includes(q))
        );
        const matchesBranch = c.branchName.toLowerCase().includes(q) || c.branchCode.toLowerCase().includes(q);
        if (!matchesCollege && !matchesBranch) return false;
      }

      if (selectedYear !== 'ALL' && c.year.toString() !== selectedYear) return false;
      if (selectedCounselling !== 'ALL' && c.counselling !== selectedCounselling) return false;
      if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;
      if (selectedGender !== 'ALL' && c.gender !== selectedGender) return false;
      if (selectedQuota !== 'ALL' && c.quota !== selectedQuota) return false;
      if (selectedRound !== 'ALL' && c.round.toString() !== selectedRound) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'closingRank') comparison = a.closingRank - b.closingRank;
      else if (sortField === 'openingRank') comparison = a.openingRank - b.openingRank;
      else comparison = b.year - a.year;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [
    cutoffs,
    collegeMap,
    searchQuery,
    selectedYear,
    selectedCounselling,
    selectedCategory,
    selectedGender,
    selectedQuota,
    selectedRound,
    sortField,
    sortOrder
  ]);

  const handleExportCSV = () => {
    const headers = ['College', 'Year', 'Round', 'Counselling', 'Branch', 'Category', 'Gender', 'Quota', 'Opening Rank', 'Closing Rank', 'Source'];
    const rows = filteredCutoffs.map(c => {
      const college = collegeMap.get(c.collegeId);
      return [
        `"${college?.name || c.collegeId}"`,
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
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EDPARTH_National_Cutoffs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-brand-600" />
            <span>National Cutoff Explorer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Historical opening and closing ranks from official JoSAA, CSAB, and State Counselling rounds.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>Download Results CSV</span>
        </button>
      </div>

      {/* Filter Control Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by college name, branch, or alias (e.g. 'IIT Bombay', 'NIT Trichy', 'CSE')..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Facet Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Year */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Counselling */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Counselling
            </label>
            <select
              value={selectedCounselling}
              onChange={e => setSelectedCounselling(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Authorities</option>
              <option value="JoSAA">JoSAA</option>
              <option value="CSAB">CSAB</option>
              <option value="JAC Delhi">JAC Delhi</option>
              <option value="WBJEE">WBJEE</option>
              <option value="Direct / University">Direct / University</option>
            </select>
          </div>

          {/* Round */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Round
            </label>
            <select
              value={selectedRound}
              onChange={e => setSelectedRound(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Rounds</option>
              <option value="1">Round 1</option>
              <option value="2">Round 2</option>
              <option value="5">Round 5</option>
              <option value="6">Round 6</option>
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
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Categories</option>
              <option value="OPEN">OPEN (General)</option>
              <option value="EWS">GEN-EWS</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
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
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
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
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Quotas</option>
              <option value="AI">AI (All India)</option>
              <option value="HS">HS (Home State)</option>
              <option value="OS">OS (Other State)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cutoff Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Found <strong className="text-slate-900 dark:text-white font-mono">{filteredCutoffs.length}</strong> cutoff records</span>
          <span>Category: <strong className="text-brand-600">{selectedCategory}</strong> ({selectedGender})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Institute</th>
                <th className="py-3 px-4 font-semibold">Branch & Code</th>
                <th className="py-3 px-3 font-semibold">Year/Rnd</th>
                <th className="py-3 px-3 font-semibold">Quota</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th
                  onClick={() => {
                    setSortField('openingRank');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="py-3 px-3 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white text-right"
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
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Closing Rank</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {filteredCutoffs.length > 0 ? (
                filteredCutoffs.map(record => {
                  const college = collegeMap.get(record.collegeId);
                  return (
                    <tr key={record.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        {college ? (
                          <Link
                            href={`/college/${college.slug}`}
                            className="font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 inline-flex items-center gap-1.5"
                          >
                            <span>{college.shortName}</span>
                            <span className="text-[10px] text-slate-400">({college.city})</span>
                          </Link>
                        ) : (
                          <span className="font-semibold text-slate-900">{record.collegeId}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {record.branchName}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {record.branchCode}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                        {record.year} <span className="text-xs text-slate-400">R{record.round}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {record.quota}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {record.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-400">
                        {formatRank(record.openingRank)}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-right text-brand-600 dark:text-brand-400">
                        #{formatRank(record.closingRank)}
                      </td>
                      <td className="py-3 px-4 text-right text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{record.counselling} Verified</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="font-medium text-sm">No cutoff records match the specified filters.</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the category or quota filter.</p>
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
