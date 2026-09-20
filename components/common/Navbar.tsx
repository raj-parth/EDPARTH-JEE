'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  TrendingUp,
  Calculator,
  Scale,
  Bookmark,
  Search,
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { GlobalSearchModal } from './GlobalSearchModal';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { bookmarkedSlugs, compareSlugs } = useAppStore();

  const mainNavLinks = [
    { href: '/colleges', label: 'Colleges', icon: Compass },
    { href: '/cutoffs', label: 'Cutoffs', icon: TrendingUp },
    { href: '/compare', label: 'Compare', icon: Scale, count: compareSlugs.length },
    { href: '/exams', label: 'Exams', icon: GraduationCap },
    { href: '/branches', label: 'Branches', icon: BookOpen },
    { href: '/methodology', label: 'Methodology', icon: ShieldCheck },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              {/* Refined Geometric Logo Mark */}
              <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-brand-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                <span className="tracking-tighter font-mono">E</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                    EDPARTH
                  </span>
                  <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 font-mono">
                    2026
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-1 hidden sm:block">
                  Admission Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'text-slate-900 dark:text-white bg-slate-100/90 dark:bg-slate-800/80 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {typeof link.count === 'number' && link.count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-brand-600 text-white font-bold">
                        {link.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions: Search + JEE Predictor CTA + Saved + Theme */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-card"
              aria-label="Open global search (Press Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xl:inline">Search colleges, cutoffs, branches...</span>
              <span className="hidden md:inline xl:hidden">Search index...</span>
              <span className="md:hidden">Search</span>
              <kbd className="hidden md:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 font-medium">
                ⌘K
              </kbd>
            </button>

            {/* Dedicated JEE Predictor CTA */}
            <Link
              href="/predictor"
              className={cn(
                'hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 border',
                pathname === '/predictor'
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 border-brand-200/80 dark:border-brand-800/80'
              )}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Percentile Explorer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </Link>

            {/* Bookmarks */}
            <Link
              href="/bookmarks"
              className={cn(
                'relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors',
                pathname === '/bookmarks' && 'text-brand-600 border-brand-300 bg-brand-50/50 dark:bg-brand-950/40'
              )}
              title="Saved Colleges Shortlist"
              aria-label="Saved Colleges"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedSlugs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold font-mono">
                  {bookmarkedSlugs.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-3 space-y-1.5 animate-slide-down">
            {/* Mobile JEE Predictor Callout */}
            <Link
              href="/predictor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-900 text-brand-800 dark:text-brand-200 text-sm font-semibold mb-2"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-brand-600" />
                <span>JEE 2026 Percentile Explorer</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {mainNavLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]',
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.count === 'number' && link.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-brand-600 text-white font-semibold">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
