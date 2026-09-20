'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Building2,
  MapPin,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { College, CollegeType } from '@/lib/types';
import { CollegeCard } from '@/components/college/CollegeCard';
import { getFeesByCollege, getPlacementsByCollege } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CollegeExplorerClientProps {
  initialColleges: College[];
}

export function CollegeExplorerClient({ initialColleges }: CollegeExplorerClientProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'ALL';
  const initialExam = searchParams.get('exam') || 'ALL';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedExam, setSelectedExam] = useState<string>(initialExam);
  const [selectedCounselling, setSelectedCounselling] = useState<string>('ALL');
  const [maxFee, setMaxFee] = useState<number>(3000000); // 30 Lakh max
  const [minAvgPackage, setMinAvgPackage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'nirf' | 'avgPackage' | 'highestPackage' | 'lowFee' | 'name'>('nirf');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique states and exams
  const states = useMemo(() => {
    return Array.from(new Set(initialColleges.map(c => c.state))).sort();
  }, [initialColleges]);

  const collegeTypes: { label: string; value: string }[] = [
    { label: 'All Institutions', value: 'ALL' },
    { label: 'IITs', value: 'IIT' },
    { label: 'NITs', value: 'NIT' },
    { label: 'IIITs', value: 'IIIT' },
    { label: 'GFTIs', value: 'GFTI' },
    { label: 'State Govt', value: 'State Government' },
    { label: 'Private Universities', value: 'Private' }
  ];

  // Filtering logic
  const filteredColleges = useMemo(() => {
    return initialColleges.filter(college => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName =
          college.name.toLowerCase().includes(q) ||
          college.shortName.toLowerCase().includes(q) ||
          college.aliases.some(a => a.toLowerCase().includes(q)) ||
          college.city.toLowerCase().includes(q) ||
          college.state.toLowerCase().includes(q);
        if (!matchesName) return false;
      }

      // Type
      if (selectedType !== 'ALL' && college.type !== selectedType) {
        return false;
      }

      // State
      if (selectedState !== 'ALL' && college.state !== selectedState) {
        return false;
      }

      // Exam
      if (selectedExam !== 'ALL' && !college.acceptedExams.includes(selectedExam as any)) {
        return false;
      }

      // Counselling
      if (selectedCounselling !== 'ALL' && !college.counselling.includes(selectedCounselling as any)) {
        return false;
      }

      // Fee
      const feeInfo = getFeesByCollege(college.id);
      if (feeInfo && feeInfo.totalEstimated4YearCost > maxFee) {
        return false;
      }

      // Placement
      const placement = getPlacementsByCollege(college.id);
      if (placement && placement.averagePackageLPA < minAvgPackage) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nirf') return a.nirfRank2025 - b.nirfRank2025;
      if (sortBy === 'avgPackage') {
        const pa = getPlacementsByCollege(a.id)?.averagePackageLPA || 0;
        const pb = getPlacementsByCollege(b.id)?.averagePackageLPA || 0;
        return pb - pa;
      }
      if (sortBy === 'highestPackage') {
        const pa = getPlacementsByCollege(a.id)?.highestPackageLPA || 0;
        const pb = getPlacementsByCollege(b.id)?.highestPackageLPA || 0;
        return pb - pa;
      }
      if (sortBy === 'lowFee') {
        const fa = getFeesByCollege(a.id)?.totalEstimated4YearCost || 9999999;
        const fb = getFeesByCollege(b.id)?.totalEstimated4YearCost || 9999999;
        return fa - fb;
      }
      return a.name.localeCompare(b.name);
    });
  }, [
    initialColleges,
    searchQuery,
    selectedType,
    selectedState,
    selectedExam,
    selectedCounselling,
    maxFee,
    minAvgPackage,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('ALL');
    setSelectedState('ALL');
    setSelectedExam('ALL');
    setSelectedCounselling('ALL');
    setMaxFee(3000000);
    setMinAvgPackage(0);
    setSortBy('nirf');
  };

  const activeFiltersCount =
    (selectedType !== 'ALL' ? 1 : 0) +
    (selectedState !== 'ALL' ? 1 : 0) +
    (selectedExam !== 'ALL' ? 1 : 0) +
    (selectedCounselling !== 'ALL' ? 1 : 0) +
    (maxFee < 3000000 ? 1 : 0) +
    (minAvgPackage > 0 ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Page Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering College Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse and filter {initialColleges.length} verified engineering institutions by type, fees, placements, and cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="nirf">NIRF Ranking (Top First)</option>
              <option value="avgPackage">Highest Average Package</option>
              <option value="highestPackage">Highest Placement Package</option>
              <option value="lowFee">Lowest 4-Year Fees (High ROI)</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Filter Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {collegeTypes.map(item => (
          <button
            key={item.value}
            type="button"
            onClick={() => setSelectedType(item.value)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border',
              selectedType === item.value
                ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid with Left Sidebar Filters + College Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block sticky top-20 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-600" />
              <span>Filter Colleges</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="College name, alias..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              State / Region
            </label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All States Across India</option>
              {states.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Entrance Exam */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Entrance Exam
            </label>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Entrance Exams</option>
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="BITSAT">BITSAT</option>
              <option value="VITEEE">VITEEE</option>
              <option value="WBJEE">WBJEE</option>
              <option value="MHT CET">MHT CET</option>
            </select>
          </div>

          {/* Counselling Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Counselling Authority
            </label>
            <select
              value={selectedCounselling}
              onChange={e => setSelectedCounselling(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Counselling Systems</option>
              <option value="JoSAA">JoSAA (IITs, NITs, IIITs)</option>
              <option value="CSAB">CSAB Special Rounds</option>
              <option value="JAC Delhi">JAC Delhi (DTU, NSUT, IIITD)</option>
              <option value="WBJEE">WBJEE (Jadavpur)</option>
              <option value="MHT CET">MHT CET (COEP)</option>
              <option value="Direct / University">Direct Institutional</option>
            </select>
          </div>

          {/* Max 4-Year Fees */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-400 uppercase tracking-wider">
                Max 4-Year Fees
              </label>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                ₹{(maxFee / 100000).toFixed(1)} Lakh
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={3000000}
              step={100000}
              value={maxFee}
              onChange={e => setMaxFee(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          {/* Min Average Package */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-400 uppercase tracking-wider">
                Min Average Package
              </label>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {minAvgPackage > 0 ? `₹${minAvgPackage} LPA` : 'Any'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={35}
              step={2}
              value={minAvgPackage}
              onChange={e => setMinAvgPackage(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing <strong className="text-slate-900 dark:text-slate-100 font-mono">{filteredColleges.length}</strong> institutions</span>
            {activeFiltersCount > 0 && (
              <span className="text-brand-600 dark:text-brand-400 font-medium">
                {activeFiltersCount} filter(s) active
              </span>
            )}
          </div>

          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  No colleges match your current filters
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting the maximum fee slider or resetting filters to view all colleges.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile filter controls */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 uppercase font-semibold mb-1">State</label>
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="ALL">All States</option>
                  {states.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold mb-1">Entrance Exam</label>
                <select
                  value={selectedExam}
                  onChange={e => setSelectedExam(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="ALL">All Exams</option>
                  <option value="JEE Main">JEE Main</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="BITSAT">BITSAT</option>
                  <option value="VITEEE">VITEEE</option>
                  <option value="WBJEE">WBJEE</option>
                  <option value="MHT CET">MHT CET</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-semibold mb-1">Counselling</label>
                <select
                  value={selectedCounselling}
                  onChange={e => setSelectedCounselling(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="ALL">All Counselling</option>
                  <option value="JoSAA">JoSAA</option>
                  <option value="CSAB">CSAB</option>
                  <option value="JAC Delhi">JAC Delhi</option>
                  <option value="WBJEE">WBJEE</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs"
              >
                Apply Filters ({filteredColleges.length} results)
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
