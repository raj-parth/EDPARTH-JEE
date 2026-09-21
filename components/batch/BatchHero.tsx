'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  Home
} from 'lucide-react';
import { Batch } from '@/lib/types/batch';

interface BatchHeroProps {
  batch: Batch;
  onEnrollClick: () => void;
}

export function BatchHero({ batch, onEnrollClick }: BatchHeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-600/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pb-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/batches" className="hover:text-white transition-colors">
            Batches
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-300 font-medium truncate max-w-[200px] sm:max-w-xs">
            {batch.title.split('—')[0]}
          </span>
        </nav>

        {/* Hero Content Left Column (PW Study-v2 Style) */}
        <div className="lg:w-[68%]">
          {/* Badge Chips Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              LIVE & INTERACTIVE
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {batch.targetYear}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
              {batch.language}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {batch.classGrade}
            </span>
          </div>

          {/* Batch Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {batch.title}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base text-slate-300 mb-5 leading-relaxed max-w-2xl font-medium">
            {batch.tagline}
          </p>

          {/* Social Proof: Ratings, Enrolled Count */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3 px-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-bold text-white">{batch.rating.score}</span>
              </div>
              <span className="text-xs text-slate-400">({batch.rating.count})</span>
            </div>

            <div className="h-4 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                {batch.rating.enrolledStudents}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>JoSAA 2026 Verified Strategy</span>
            </div>
          </div>

          {/* Key Offerings 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {batch.keyHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Batch Date & Validity Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Starts: <strong className="text-slate-200">{batch.startDate}</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Validity: <strong className="text-slate-200">{batch.validity}</strong></span>
            </div>
          </div>

          {/* Mobile Enroll Button (Only visible on small screens when sticky card is below) */}
          <div className="mt-6 lg:hidden">
            <button
              onClick={onEnrollClick}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Enroll Now at ₹{batch.price.discounted.toLocaleString('en-IN')}</span>
              <span className="text-xs line-through opacity-75">₹{batch.price.original.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
