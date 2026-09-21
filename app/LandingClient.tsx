'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  FileText,
  MapPin,
  ExternalLink,
  ChevronRight,
  Cpu,
  Binary,
  Radio,
  Zap,
  Cog,
  HardHat,
  FlaskConical,
  Dna
} from 'lucide-react';
import { College } from '@/lib/types';
import { CollegeCard } from '@/components/college/CollegeCard';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { BRANCHES_DATA } from '@/lib/data/branches';
import { EXAMS_DATA } from '@/lib/data/exams';

interface LandingClientProps {
  colleges: College[];
}

export function LandingClient({ colleges }: LandingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/colleges');
    }
  };

  const featuredColleges = colleges.filter(c => c.featured).slice(0, 4);

  // Smart suggestions for hero search
  const filteredSuggestions = searchQuery.trim()
    ? colleges
        .filter(
          c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
            c.city.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : colleges.slice(0, 4);

  const collegeCategories = [
    {
      name: 'IITs',
      badge: 'Premier',
      count: '23 Institutes',
      type: 'IIT',
      desc: 'Indian Institutes of Technology via JEE Advanced with global alumni networks.',
      accent: 'border-amber-200/80 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/40 to-white dark:from-amber-950/20 dark:to-slate-900',
      badgeVariant: 'warning' as const
    },
    {
      name: 'NITs',
      badge: 'National',
      count: '31 Institutes',
      type: 'NIT',
      desc: 'National Institutes of Technology with 50% Home State & 50% Other State quotas.',
      accent: 'border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/40 to-white dark:from-blue-950/20 dark:to-slate-900',
      badgeVariant: 'info' as const
    },
    {
      name: 'IIITs',
      badge: 'Specialized',
      count: '26 Institutes',
      type: 'IIIT',
      desc: 'Information Technology and Computer Science powerhouses with high tech packages.',
      accent: 'border-purple-200/80 dark:border-purple-900/60 bg-gradient-to-b from-purple-50/40 to-white dark:from-purple-950/20 dark:to-slate-900',
      badgeVariant: 'purple' as const
    },
    {
      name: 'GFTIs',
      badge: 'Central',
      count: '38 Institutes',
      type: 'GFTI',
      desc: 'Centrally Funded Technical Institutes admitting via JoSAA and CSAB counselling.',
      accent: 'border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 to-white dark:from-emerald-950/20 dark:to-slate-900',
      badgeVariant: 'success' as const
    },
    {
      name: 'State Government',
      badge: 'State Flagship',
      count: 'State Premier',
      type: 'State Government',
      desc: 'DTU, NSUT, COEP, VJTI, and Jadavpur University with high localized ROI.',
      accent: 'border-rose-200/80 dark:border-rose-900/60 bg-gradient-to-b from-rose-50/40 to-white dark:from-rose-950/20 dark:to-slate-900',
      badgeVariant: 'brand' as const
    },
    {
      name: 'Private Universities',
      badge: 'Top Tier',
      count: 'Direct / Merit',
      type: 'Private',
      desc: 'BITS Pilani, VIT Vellore, Thapar, and DA-IICT offering world-class infrastructure.',
      accent: 'border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 to-white dark:from-indigo-950/20 dark:to-slate-900',
      badgeVariant: 'default' as const
    }
  ];

  const popularExams = [
    {
      id: 'jee-main',
      name: 'JEE Main',
      conductedBy: 'National Testing Agency',
      subtitle: 'Admissions to NITs, IIITs, CFTIs & State Quotas',
      badge: 'National',
      institutions: 'NITs, IIITs, GFTIs, DTU, NSUT',
      date: 'Session 1 & 2 (Jan / Apr)'
    },
    {
      id: 'jee-advanced',
      name: 'JEE Advanced',
      conductedBy: 'IIT Joint Admission Board',
      subtitle: 'Exclusive entrance for all 23 IITs and IISc',
      badge: 'Premier',
      institutions: 'All 23 IITs, RGIPT, IIPE',
      date: 'May 2026'
    },
    {
      id: 'bitsat',
      name: 'BITSAT',
      conductedBy: 'BITS Pilani',
      subtitle: 'Pilani, KK Birla Goa, and Hyderabad campuses',
      badge: 'University',
      institutions: 'BITS Pilani, Goa, Hyderabad',
      date: 'Session 1 & 2'
    },
    {
      id: 'viteee',
      name: 'VITEEE',
      conductedBy: 'VIT Group of Institutions',
      subtitle: 'Engineering entrance for Vellore, Chennai & AP',
      badge: 'Private',
      institutions: 'VIT Vellore, Chennai, Bhopal',
      date: 'April 2026'
    },
    {
      id: 'met',
      name: 'MET',
      conductedBy: 'Manipal Academy of Higher Ed',
      subtitle: 'Admissions to MIT Manipal, Jaipur & Bengaluru',
      badge: 'Deemed',
      institutions: 'MIT Manipal, Bengaluru, Sikkim',
      date: 'Phase 1 & 2'
    },
    {
      id: 'wbjee',
      name: 'WBJEE / State',
      conductedBy: 'State Joint Entrance Boards',
      subtitle: 'Jadavpur University, COEP, VJTI & State Colleges',
      badge: 'State Central',
      institutions: 'Jadavpur, Calcutta Univ, Heritage',
      date: 'April 2026'
    }
  ];

  const popularBranches = [
    {
      code: 'CSE',
      name: 'Computer Science and Engineering',
      desc: 'Algorithms, operating systems, cloud architectures, and software engineering.',
      icon: Binary,
      hires: 'SDE, Distributed Systems, Security',
      packageEst: '₹18–28 LPA'
    },
    {
      code: 'AI_DS',
      name: 'Artificial Intelligence & Data Science',
      desc: 'Machine learning, neural networks, natural language processing, and big data.',
      icon: Cpu,
      hires: 'ML Engineer, Data Scientist, GenAI',
      packageEst: '₹17–26 LPA'
    },
    {
      code: 'ECE',
      name: 'Electronics & Communication',
      desc: 'VLSI chip design, wireless communications, embedded systems, and signal processing.',
      icon: Radio,
      hires: 'Silicon Design, 5G/6G, Embedded',
      packageEst: '₹14–22 LPA'
    },
    {
      code: 'EEE',
      name: 'Electrical & Electronics',
      desc: 'Power electronics, renewable energy grids, EV powertrains, and control automation.',
      icon: Zap,
      hires: 'EV Powertrain, Power Systems, IoT',
      packageEst: '₹12–18 LPA'
    },
    {
      code: 'MECH',
      name: 'Mechanical Engineering',
      desc: 'Thermodynamics, robotics, automotive engineering, fluid dynamics, and CAD/CAM.',
      icon: Cog,
      hires: 'Robotics, Automotive R&D, Aerospace',
      packageEst: '₹10–16 LPA'
    },
    {
      code: 'CIVIL',
      name: 'Civil & Infrastructure Engineering',
      desc: 'Structural engineering, smart transportation, geotechnical, and urban planning.',
      icon: HardHat,
      hires: 'Structural Design, Smart Metros, PM',
      packageEst: '₹8–14 LPA'
    },
    {
      code: 'CHEM',
      name: 'Chemical Engineering',
      desc: 'Process engineering, materials synthesis, petrochemicals, and biochemical systems.',
      icon: FlaskConical,
      hires: 'Process Control, Polymers, Green Energy',
      packageEst: '₹11–17 LPA'
    },
    {
      code: 'BIO',
      name: 'Biotechnology & Biochemical',
      desc: 'Bioprocess engineering, computational biology, immunology, and genetic systems.',
      icon: Dna,
      hires: 'Biopharma R&D, Computational Bio',
      packageEst: '₹9–15 LPA'
    }
  ];

  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: 'Verified Official Data',
      desc: 'Every cutoff rank, fee breakdown, and placement stat is curated from official JoSAA, CSAB, NIRF, and institutional mandatory disclosure bulletins.'
    },
    {
      icon: TrendingUp,
      title: 'Multi-Year Cutoff Archives',
      desc: 'Examine verified opening and closing bounds across 2023, 2024, and 2025 rounds without exaggerated or synthetic estimates.'
    },
    {
      icon: Scale,
      title: 'Objective Side-by-Side Matrix',
      desc: 'Compare up to 4 colleges simultaneously across fee structures, verified placement packages, and campus lifestyle indicators.'
    },
    {
      icon: Database,
      title: 'Fee Transparency & Remissions',
      desc: 'Detailed breakdown of tuition, mess, and hostel expenses, with full explanations of 100% and 66% income-based tuition fee waivers.'
    },
    {
      icon: Award,
      title: 'Audited Placement Records',
      desc: 'Clear distinction between median, average, and highest domestic/international packages with verified recruitment partners.'
    },
    {
      icon: Filter,
      title: 'Multi-Parameter Search & Quotas',
      desc: 'Filter colleges dynamically by State, JoSAA Home State (HS) vs. Other State (OS) quotas, category reservations, and tuition caps.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-subtle">
        {/* Subtle radial lighting accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-brand-500/8 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] tracking-wide text-brand-600 dark:text-brand-400 font-bold">
              2026 ENGINEERING ADMISSION INTELLIGENCE
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Find the Engineering College That&apos;s Right for You.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Verified cutoffs, tuition fees, placement statistics, branches, and admission criteria for IITs, NITs, IIITs, and premier institutions across India.
          </p>

          {/* Hero Search Box (Visual Focal Point) */}
          <div ref={searchContainerRef} className="max-w-2xl mx-auto pt-2 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center shadow-elevated rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
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

            {/* Live Autocomplete / Suggestion Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-dropdown border border-slate-200 dark:border-slate-800 p-2 text-left z-30 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {searchQuery.trim() ? 'Matching Colleges' : 'Popular Searches'}
                </div>
                <div className="space-y-0.5">
                  {filteredSuggestions.map(college => (
                    <div
                      key={college.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        router.push(`/college/${college.slug}`);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {college.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {college.type}
                        </span>
                      </div>
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-medium shrink-0">
                        View Profile →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Navigation Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Colleges</span>
            </Link>

            <Link
              href="/cutoffs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors shadow-card"
            >
              <TrendingUp className="w-4 h-4 text-brand-600" />
              <span>Cutoff Matrix</span>
            </Link>

            <Link
              href="/predictor"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 border border-brand-200/80 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 font-semibold text-xs sm:text-sm transition-colors shadow-card"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>JEE Percentile Matcher</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Building2 className="w-5 h-5" />}
            value={`${colleges.length}+`}
            label="Colleges Indexed"
            description="Verified IITs, NITs, IIITs & State Premier Institutes"
          />
          <StatCard
            icon={<GraduationCap className="w-5 h-5" />}
            value="45+"
            label="Engineering Branches"
            description="Comprehensive syllabus & placement trends"
          />
          <StatCard
            icon={<Award className="w-5 h-5" />}
            value="8+"
            label="Entrance Exams"
            description="JoSAA, CSAB, BITSAT, WBJEE, COMEDK"
          />
          <StatCard
            accent
            icon={<TrendingUp className="w-5 h-5 text-brand-600" />}
            value="4 Years"
            label="Cutoff Archives"
            description="2023, 2024, 2025 verified closing ranks"
          />
        </div>
      </section>

      {/* 3. College Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          eyebrow="Institution Categories"
          title="Browse by Institutional Framework"
          description="Understand admissions, quota distribution, and governance structures across national and state tiers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collegeCategories.map(cat => (
            <Link
              key={cat.name}
              href={`/colleges?type=${cat.type}`}
              className={cn(
                'group p-5 rounded-2xl border transition-all duration-200 shadow-card hover:shadow-elevated flex flex-col justify-between',
                cat.accent
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={cat.badgeVariant} size="sm">
                    {cat.badge}
                  </Badge>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    {cat.count}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                <span>Explore {cat.name} Cutoffs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Exam Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          eyebrow="National & State Portals"
          title="Explore by Entrance Exam"
          description="Track exam dates, governing authorities, and eligible engineering colleges across India."
          action={
            <Link
              href="/exams"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View all exam guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularExams.map(exam => (
            <Link
              key={exam.id}
              href="/exams"
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" size="sm">
                    {exam.badge}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    {exam.date}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {exam.conductedBy}
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exam.subtitle}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Covers: </span>
                  {exam.institutions}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Exam Pattern & Dates</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Branch Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          eyebrow="Specialization Matrix"
          title="Explore Engineering Disciplines"
          description="Evaluate branch specializations, industry career trajectories, and average salary profiles."
          action={
            <Link
              href="/branches"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View full branch salaries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularBranches.map(branch => {
            const Icon = branch.icon;
            return (
              <Link
                key={branch.code}
                href={`/colleges?branch=${branch.code}`}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-brand-600 group-hover:scale-105 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                      {branch.code}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 transition-colors">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {branch.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Typical CTC</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {branch.packageEst}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  <span>View Cutoffs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Featured Premier Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          eyebrow="Verified Profiles"
          title="Featured Engineering Institutions"
          description="Explore verified multi-year closing ranks, tuition structures, and audited placement benchmarks."
          action={
            <Link
              href="/colleges"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Explore all {colleges.length} institutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* 7. Why EDPARTH Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Built for High-Stakes Decisions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Aspirants, Parents & Counsellors Trust EDPARTH
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Choosing an engineering college is a four-year commitment with significant financial and career implications. EDPARTH eliminates speculation by providing verified, reproducible admission intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="space-y-2 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
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
              Want to inspect our raw data sources and NTA percentile-to-rank mathematics?
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

      {/* 8. Callout for Predictor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 dark:bg-brand-950 border border-slate-800 text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-brand-400" />
              <span>JEE Main 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Know where your estimated rank stands?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
