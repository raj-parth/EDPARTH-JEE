'use client';

import React from 'react';
import {
  FileText,
  BookOpen,
  GraduationCap,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type BatchTabId = 'description' | 'classroom' | 'faculty' | 'schedule' | 'tests' | 'faqs';

interface BatchTabsNavProps {
  activeTab: BatchTabId;
  onTabChange: (tab: BatchTabId) => void;
}

const TABS: { id: BatchTabId; label: string; icon: React.ElementType }[] = [
  { id: 'description', label: 'Description', icon: FileText },
  { id: 'classroom', label: 'Classroom', icon: BookOpen },
  { id: 'faculty', label: 'Faculty & Mentors', icon: GraduationCap },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'tests', label: 'Test Series & DPPs', icon: Layers },
  { id: 'faqs', label: 'FAQs & Reviews', icon: HelpCircle },
];

export function BatchTabsNav({ activeTab, onTabChange }: BatchTabsNavProps) {
  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150',
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
