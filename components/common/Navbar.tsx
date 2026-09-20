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
  BookOpen
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

  const navLinks = [
    { href: '/colleges', label: 'Colleges', icon: Compass },
    { href: '/cutoffs', label: 'Cutoffs', icon: TrendingUp },
    { href: '/predictor', label: 'Predictor', icon: Calculator, badge: 'JEE 2026' },
    { href: '/compare', label: 'Compare', icon: Scale, count: compareSlugs.length },
    { href: '/exams', label: 'Exams', icon: GraduationCap },
    { href: '/branches', label: 'Branches', icon: BookOpen },
    { href: '/methodology', label: 'Methodology', icon: ShieldCheck }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-brand-600/20 group-hover:bg-brand-700 transition-colors">
                E
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  EDPARTH
                  <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
                    2026 Data
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                  College Discovery & Cutoffs
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors relative',
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/70 dark:bg-brand-950/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {link.badge}
                      </span>
                    )}
                    {typeof link.count === 'number' && link.count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-brand-600 text-white font-semibold">
                        {link.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs md:text-sm text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search colleges, branches...</span>
              <span className="md:hidden">Search</span>
              <kbd className="hidden md:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks */}
            <Link
              href="/bookmarks"
              className={cn(
                'relative p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors',
                pathname === '/bookmarks' && 'text-brand-600 border-brand-300 bg-brand-50/50'
              )}
              title="Saved Colleges"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedSlugs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
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
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-brand-600" />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.count === 'number' && link.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-brand-600 text-white font-medium">
                      {link.count}
                    </span>
                  )}
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {link.badge}
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
