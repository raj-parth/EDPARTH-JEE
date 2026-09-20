'use client';

import React from 'react';
import { CampusInfrastructure } from '@/lib/types';
import {
  BookOpen,
  Trophy,
  FlaskConical,
  Rocket,
  HeartPulse,
  Wifi,
  Building2,
  Check
} from 'lucide-react';

interface CampusTabProps {
  campus: CampusInfrastructure;
  collegeName: string;
}

export function CampusTab({ campus, collegeName }: CampusTabProps) {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Campus Area
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {campus.totalAreaAcres}
          </div>
          <div className="text-xs text-slate-500 mt-1">Acres of Land Area</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Specialized Labs
          </div>
          <div className="mt-2 text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
            {campus.laboratoriesCount}+
          </div>
          <div className="text-xs text-slate-500 mt-1">Advanced R&D Laboratories</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Campus Network
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white mt-3">
            {campus.wifiCoverage}
          </div>
          <div className="text-xs text-slate-500 mt-1">Enterprise Backbone</div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Central Library */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Central Library & Digital Repositories
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {campus.libraryDetails}
          </p>
        </div>

        {/* Sports & Athletics */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Sports & Athletic Facilities
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {campus.sportsFacilities.map((sport, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>

        {/* Incubation & Startups */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Startup Incubation & Entrepreneurship Hub
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {campus.incubationCenter}
          </p>
        </div>

        {/* Medical & Health */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950 border border-rose-100 dark:border-rose-900 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Hospital & Healthcare Services
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {campus.medicalFacility}
          </p>
        </div>
      </div>
    </div>
  );
}
