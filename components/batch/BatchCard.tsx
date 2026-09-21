'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  Users,
  Calendar,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Batch } from '@/lib/types/batch';

interface BatchCardProps {
  batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between">
      {/* Top Banner & Badges */}
      <div className="relative aspect-[16/8] bg-gradient-to-tr from-slate-950 via-slate-900 to-brand-950 p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/90 text-white shadow-sm">
              LIVE BATCH
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/40">
              {batch.targetYear}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-700">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{batch.rating.score}</span>
          </div>
        </div>

        {/* Class Grade & Language */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-white">{batch.classGrade}</span>
          <span className="bg-slate-800/90 px-2 py-0.5 rounded text-[11px] font-mono">
            {batch.language}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/batches/${batch.slug}`} className="group-hover:text-brand-600 transition-colors">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {batch.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {batch.tagline}
          </p>

          {/* Enrolled Students & Highlights */}
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-3">
            <Users className="w-3.5 h-3.5" />
            <span>{batch.rating.enrolledStudents}</span>
          </div>
        </div>

        {/* Faculties Avatars Preview */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center -space-x-2">
            {batch.faculties.slice(0, 3).map((f, i) => (
              <div
                key={f.id}
                title={`${f.name} (${f.subject})`}
                className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white dark:border-slate-900 text-white flex items-center justify-center text-[10px] font-bold font-mono shadow-sm"
              >
                {f.name.replace('Er. ', '').replace('Dr. ', '')[0]}
              </div>
            ))}
            {batch.faculties.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900 border-2 border-white dark:border-slate-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-[10px] font-bold">
                +{batch.faculties.length - 3}
              </div>
            )}
          </div>
          <span className="text-[11px] text-slate-400">
            Starts: <strong className="text-slate-700 dark:text-slate-300">{batch.startDate}</strong>
          </span>
        </div>

        {/* Price & CTA Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                ₹{batch.price.discounted.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{batch.price.original.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              {batch.price.discountPercent}% OFF
            </span>
          </div>

          <Link
            href={`/batches/${batch.slug}`}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Explore Batch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
