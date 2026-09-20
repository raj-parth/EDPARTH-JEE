import React from 'react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  description?: string;
  className?: string;
  accent?: boolean;
}

export function StatCard({
  icon,
  value,
  label,
  description,
  className,
  accent = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900',
        accent
          ? 'border-brand-200 dark:border-brand-900/60 bg-gradient-to-b from-brand-50/40 to-white dark:from-brand-950/20 dark:to-slate-900 shadow-card'
          : 'border-slate-200/80 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-elevated',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:scale-105 transition-all duration-200">
            {icon}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {value}
        </div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
          {label}
        </div>
        {description && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
