'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Compass,
  TrendingUp,
  Calculator,
  Scale,
  Award,
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Database,
  Filter,
  CheckCircle2,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { College } from '@/lib/types';
import { CollegeCard } from '@/components/college/CollegeCard';
import { cn } from '@/lib/utils';

interface LandingClientProps {
  colleges: College[];
}

export function LandingClient({ colleges }: LandingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/colleges');
    }
  };

  const featuredColleges = colleges.filter(c => c.featured).slice(0, 4);

  const collegeCategories = [
    { name: 'IITs', count: '23 Institutes', type: 'IIT', desc: 'Indian Institutes of Technology via JEE Advanced', color: 'border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300' },
    { name: 'NITs', count: '31 Institutes', type: 'NIT', desc: 'National Institutes of Technology with 50% State Quota', color: 'border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' },
    { name: 'IIITs', count: '26 Institutes', type: 'IIIT', desc: 'Information Technology and Computer Science powerhouses', color: 'border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300' },
    { name: 'GFTIs', count: '38 Institutes', type: 'GFTI', desc: 'Centrally Funded Technical Institutes via JoSAA/CSAB', color: 'border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300' },
    { name: 'Government Colleges', count: 'State Premier', type: 'State Government', desc: 'DTU, NSUT, COEP, VJTI & Jadavpur University', color: 'border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300' },
    { name: 'Private Universities', count: 'Top Tier', type: 'Private', desc: 'BITS Pilani, VIT Vellore, Thapar & DA-IICT', color: 'border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300' }
  ];

  const popularExams = [
    { id: 'jee-main', name: 'JEE Main', subtitle: 'NITs, IIITs, CFTIs & State Colleges', badge: 'National' },
    { id: 'jee-advanced', name: 'JEE Advanced', subtitle: 'All 23 IITs Admissions', badge: 'Premier' },
    { id: 'bitsat', name: 'BITSAT', subtitle: 'BITS Pilani, Goa & Hyderabad', badge: 'Direct' },
    { id: 'viteee', name: 'VITEEE', subtitle: 'VIT Vellore & Chennai', badge: 'Private' },
    { id: 'met', name: 'MET', subtitle: 'MIT Manipal & Bengaluru', badge: 'Deemed' },
    { id: 'wbjee', name: 'WBJEE / State', subtitle: 'State Centralized Counselling', badge: 'State' }
  ];

  const popularBranches = [
    { code: 'CSE', name: 'Computer Science and Engineering', hires: 'SDE, Cloud, Security' },
    { code: 'AI_DS', name: 'Artificial Intelligence & Data Science', hires: 'Machine Learning, GenAI' },
    { code: 'ECE', name: 'Electronics & Communication', hires: 'VLSI, 5G/6G, Embedded' },
    { code: 'EEE', name: 'Electrical & Electronics', hires: 'Power Systems, EV Powertrain' },
    { code: 'MECH', name: 'Mechanical Engineering', hires: 'Automotive, Robotics, CFD' },
    { code: 'CIVIL', name: 'Civil Engineering', hires: 'Smart Infrastructure, Metros' },
    { code: 'CHEM', name: 'Chemical Engineering', hires: 'Petrochemical, Materials' },
    { code: 'BIO', name: 'Biotechnology', hires: 'Biopharma, Computational Bio' }
  ];

  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: 'Verified Official Data',
      desc: 'All cutoff statistics and fee structures are extracted directly from official JoSAA, CSAB, NIRF, and institutional bulletins.'
    },
    {
      icon: TrendingUp,
      title: 'Multi-Year Cutoff Trends',
      desc: 'Inspect Round 1 through Round 6 closing ranks across 2023, 2024, and 2025 without fabricated numbers.'
    },
    {
      icon: Scale,
      title: 'Neutral College Comparison',
      desc: 'Compare up to 4 colleges side-by-side with objective metrics across fees, placements, and campus life.'
    },
    {
      icon: Database,
      title: 'Fee Transparency & Remissions',
      desc: 'Clear distinction between tuition, hostel, and mess charges, plus government 100% and 66% income-based waivers.'
    },
    {
      icon: Award,
      title: 'Audited Placement Records',
      desc: 'View verified highest, average, and median packages with designated academic years and major recruiting partners.'
    },
    {
      icon: Filter,
      title: 'Multi-Faceted Smart Filtering',
      desc: 'Filter colleges dynamically by State, JoSAA quota (HS/OS), category reservation, and maximum fee thresholds.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026 Engineering Admission Data Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Find the Right Engineering College
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore 2026 cutoffs, fees, placements, branches and admission data across India.
          </p>

          {/* Big Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center shadow-elevated rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search college, branch or exam (e.g. 'NIT Trichy', 'CSE', 'IIT Delhi')..."
                className="w-full px-3 py-2.5 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Colleges</span>
            </Link>

            <Link
              href="/cutoffs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <TrendingUp className="w-4 h-4 text-brand-600" />
              <span>Check Cutoffs</span>
            </Link>

            <Link
              href="/predictor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold text-xs sm:text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>JEE Percentile Explorer</span>
            </Link>
          </div>

          {/* Below Hero Metrics Counter */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {colleges.length}+
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Colleges Indexed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                45+
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Engineering Branches</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                8+
              </div>
              <div className="text-xs text-slate-500 mt-0.5">National & State Exams</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                4 Years
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Verified Cutoff Archives</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Exam Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Explore by Entrance Exam
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Filter colleges admitting students through national and university examinations.
            </p>
          </div>
          <Link href="/exams" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            View all exams →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularExams.map(exam => (
            <Link
              key={exam.id}
              href={`/colleges?exam=${encodeURIComponent(exam.name)}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {exam.badge}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-2 group-hover:text-brand-600 transition-colors">
                  {exam.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {exam.subtitle}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 mt-3 flex items-center gap-1">
                <span>View Colleges</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Colleges by Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Explore Colleges by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse premier institutions classified by national governance and status.
            </p>
          </div>
          <Link href="/colleges" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            All 30+ colleges →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collegeCategories.map(cat => (
            <Link
              key={cat.type}
              href={`/colleges?type=${encodeURIComponent(cat.type)}`}
              className={cn(
                'p-6 rounded-3xl border transition-all shadow-card hover:shadow-elevated flex flex-col justify-between group',
                cat.color
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">
                    {cat.count}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-4 flex items-center gap-1">
                <span>Explore Cutoffs & Fees</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Branches Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Popular Engineering Branches
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Target degree specializations with highest placement traction in India.
            </p>
          </div>
          <Link href="/branches" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Branch guide & roadmap →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularBranches.map(b => (
            <Link
              key={b.code}
              href={`/colleges?branch=${b.code}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-card transition-all group"
            >
              <div className="text-xs font-bold font-mono text-brand-600 dark:text-brand-400">
                {b.code}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-brand-600 transition-colors">
                {b.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {b.hires}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Premier Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Featured Premier Institutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Benchmark universities with verified 2025/2026 placement and JoSAA cutoff records.
            </p>
          </div>
          <Link href="/colleges" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            View All Institutions →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* Why EDPARTH Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Built for High-Stakes Decisions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Students, Parents & Counsellors Rely on EDPARTH
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Choosing an engineering college is a four-year investment that shapes your career trajectory. Here is how EDPARTH ensures accuracy and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Want to understand our data aggregation guidelines and NTA percentile conversion mathematics?
            </span>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors shrink-0"
            >
              <span>Read Full Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Big Action Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-800 text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Know where your JEE rank stands?
            </h2>
            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
              Use our JEE Percentile Explorer to evaluate historical opening and closing bounds across Safe, Moderate, and Ambitious institutions.
            </p>
          </div>
          <Link
            href="/predictor"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-colors shrink-0 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-brand-600" />
            <span>Launch Percentile Explorer</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
