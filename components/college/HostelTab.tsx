'use client';

import React from 'react';
import { HostelInfo } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  Home,
  Utensils,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Sparkles
} from 'lucide-react';

interface HostelTabProps {
  hostel: HostelInfo;
  collegeName: string;
}

export function HostelTab({ hostel, collegeName }: HostelTabProps) {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Hostel Capacity
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {hostel.totalHostelsBoys + hostel.totalHostelsGirls} Blocks
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {hostel.totalHostelsBoys} Boys, {hostel.totalHostelsGirls} Girls
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Room Sharing
          </div>
          <div className="mt-2 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
            {hostel.roomTypes.join(' / ')}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {hostel.acAvailable ? 'AC & Non-AC available' : 'Standard Non-AC'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mess Cuisine
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white font-mono">
            {hostel.messType}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Regional & Jain options</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Annual Mess & Room
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
            {formatINR(hostel.annualMessCharges + hostel.annualHostelRoomCharges)}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Approx. Combined Cost</div>
        </div>
      </div>

      {/* Facilities & Amenities */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Residential Facilities & In-House Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {hostel.facilities.map((facility, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{facility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hostel Rules & Curfew */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Hostel Rules, Entry Timings & Curfew
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <div className="font-bold mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Curfew & Entry Norms:
          </div>
          <p>{hostel.curfewTimings}</p>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Important Code of Conduct
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {hostel.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Source citation */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Data Source:</span> {hostel.source}
        </div>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified
        </div>
      </div>
    </div>
  );
}
