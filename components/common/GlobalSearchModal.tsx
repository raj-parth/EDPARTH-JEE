'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Building2,
  GraduationCap,
  MapPin,
  ArrowRight,
  TrendingUp,
  History,
  CornerDownLeft,
  FileSpreadsheet
} from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/data/colleges';
import { BRANCHES_DATA } from '@/lib/data/branches';
import { EXAMS_DATA } from '@/lib/data/exams';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('edparth_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 4));
      }
    } catch {
      // Ignore
    }
  }, [isOpen]);

  const saveRecentSearch = (text: string) => {
    try {
      const updated = [text, ...recentSearches.filter(s => s !== text)].slice(0, 4);
      setRecentSearches(updated);
      localStorage.setItem('edparth_recent_searches', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingColleges = q
    ? COLLEGES_DATA.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.aliases.some(a => a.toLowerCase().includes(q)) ||
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q)
      ).slice(0, 5)
    : COLLEGES_DATA.slice(0, 4);

  const matchingBranches = q
    ? BRANCHES_DATA.filter(
        b =>
          b.name.toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingExams = q
    ? EXAMS_DATA.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.shortName.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const handleSelectCollege = (slug: string, name: string) => {
    saveRecentSearch(name);
    onClose();
    router.push(`/college/${slug}`);
  };

  const handleSelectBranch = (code: string, name: string) => {
    saveRecentSearch(name);
    onClose();
    router.push(`/colleges?branch=${code}`);
  };

  const handleSelectExam = (id: string, name: string) => {
    saveRecentSearch(name);
    onClose();
    router.push('/exams');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-dropdown border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a college ('IIT Bombay', 'NIT Trichy'), branch ('CSE'), or exam..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[62vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Recent Searches */}
          {!q && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Recent Queries
                </span>
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('edparth_recent_searches');
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 px-3">
                {recentSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(s)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <History className="w-3 h-3 text-slate-400" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colleges */}
          {matchingColleges.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Engineering Colleges
              </div>
              <div className="space-y-1">
                {matchingColleges.map(college => (
                  <div
                    key={college.id}
                    onClick={() => handleSelectCollege(college.slug, college.name)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 group-hover:text-brand-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {college.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{college.type}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400" /> {college.city}, {college.state}
                          </span>
                          {college.nirfRank2025 && (
                            <>
                              <span>•</span>
                              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                NIRF #{college.nirfRank2025}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branches */}
          {matchingBranches.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Engineering Branches
              </div>
              <div className="space-y-1">
                {matchingBranches.map(branch => (
                  <div
                    key={branch.code}
                    onClick={() => handleSelectBranch(branch.code, branch.name)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {branch.name} <span className="font-mono text-xs text-brand-600">({branch.code})</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {branch.category} • 4-Year B.Tech
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                      Explore Colleges →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exams */}
          {matchingExams.length > 0 && (
            <div className="py-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Entrance Exams
              </div>
              <div className="space-y-1">
                {matchingExams.map(exam => (
                  <div
                    key={exam.id}
                    onClick={() => handleSelectExam(exam.id, exam.name)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600">
                        {exam.name} ({exam.shortName})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Conducted by {exam.conductedBy} • {exam.mode}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty search state */}
          {q && matchingColleges.length === 0 && matchingBranches.length === 0 && matchingExams.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No indexed results match &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;IIT Bombay&rdquo;, &ldquo;CSE&rdquo;, &ldquo;NIT Trichy&rdquo;, or &ldquo;JEE Main&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>Verified 2026 Index</span>
            <span>•</span>
            <span className="hidden sm:inline">Use ↑↓ arrows to navigate</span>
          </div>
          <Link
            href="/colleges"
            onClick={onClose}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            Explore all colleges →
          </Link>
        </div>
      </div>
    </div>
  );
}
