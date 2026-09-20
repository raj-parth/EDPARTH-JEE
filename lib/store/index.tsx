'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { College } from '@/lib/types';
import { getCollegeBySlug } from '@/lib/data';

interface AppStoreContextType {
  bookmarkedSlugs: string[];
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  bookmarkedColleges: College[];

  compareSlugs: string[];
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;
  comparedColleges: College[];
}

const AppStoreContext = createContext<AppStoreContextType | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedBookmarks = localStorage.getItem('edparth_bookmarks');
      if (savedBookmarks) {
        setBookmarkedSlugs(JSON.parse(savedBookmarks));
      }
      const savedCompare = localStorage.getItem('edparth_compare');
      if (savedCompare) {
        setCompareSlugs(JSON.parse(savedCompare));
      }
    } catch (e) {
      console.error('Failed to restore from localStorage', e);
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    setBookmarkedSlugs(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem('edparth_bookmarks', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const isBookmarked = (slug: string) => bookmarkedSlugs.includes(slug);

  const addToCompare = (slug: string): boolean => {
    if (compareSlugs.includes(slug)) return true;
    if (compareSlugs.length >= 4) return false;
    const next = [...compareSlugs, slug];
    setCompareSlugs(next);
    try {
      localStorage.setItem('edparth_compare', JSON.stringify(next));
    } catch (e) {}
    return true;
  };

  const removeFromCompare = (slug: string) => {
    const next = compareSlugs.filter(s => s !== slug);
    setCompareSlugs(next);
    try {
      localStorage.setItem('edparth_compare', JSON.stringify(next));
    } catch (e) {}
  };

  const clearCompare = () => {
    setCompareSlugs([]);
    try {
      localStorage.removeItem('edparth_compare');
    } catch (e) {}
  };

  const isInCompare = (slug: string) => compareSlugs.includes(slug);

  const bookmarkedColleges = isMounted
    ? (bookmarkedSlugs.map(slug => getCollegeBySlug(slug)).filter(Boolean) as College[])
    : [];

  const comparedColleges = isMounted
    ? (compareSlugs.map(slug => getCollegeBySlug(slug)).filter(Boolean) as College[])
    : [];

  return (
    <AppStoreContext.Provider
      value={{
        bookmarkedSlugs,
        toggleBookmark,
        isBookmarked,
        bookmarkedColleges,
        compareSlugs,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        comparedColleges
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return ctx;
}
