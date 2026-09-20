'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Building2, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/data/colleges';
import { BRANCHES_DATA } from '@/lib/data/branches';
import { EXAMS_DATA } from '@/lib/data/exams';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
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
      ).slice(0, 6)
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search college ('IIT Bombay', 'NIT Trichy'), branch ('CSE'), or exam..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center text-xs font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-400">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Colleges */}
          {matchingColleges.length > 0 && (
            <div className="py-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Colleges
              </div>
              <div className="space-y-1">
                {matchingColleges.map(college => (
                  <Link
                    key={college.id}
                    href={`/college/${college.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/50 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {college.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{college.type}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {college.city}, {college.state}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            NIRF #{college.nirfRank2025}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Branches */}
          {matchingBranches.length > 0 && (
            <div className="py-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Engineering Branches
              </div>
              <div className="space-y-1">
                {matchingBranches.map(branch => (
                  <Link
                    key={branch.code}
                    href={`/colleges?branch=${branch.code}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {branch.name} ({branch.code})
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {branch.category} • 4-Year {branch.degreeType}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                      Explore Cutoffs →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Exams */}
          {matchingExams.length > 0 && (
            <div className="py-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                Entrance Exams
              </div>
              <div className="space-y-1">
                {matchingExams.map(exam => (
                  <Link
                    key={exam.id}
                    href="/exams"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-600">
                        {exam.name} ({exam.shortName})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Conducted by {exam.conductedBy} • {exam.mode}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {q && matchingColleges.length === 0 && matchingBranches.length === 0 && matchingExams.length === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm">No colleges or branches match &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for &ldquo;IIT&rdquo;, &ldquo;NIT&rdquo;, or &ldquo;CSE&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Quick search powered by EDPARTH Verified Index</span>
          <Link
            href="/colleges"
            onClick={onClose}
            className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            View all 30+ colleges →
          </Link>
        </div>
      </div>
    </div>
  );
}
