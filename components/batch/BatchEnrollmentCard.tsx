'use client';

import React from 'react';
import {
  Play,
  Zap,
  CheckCircle2,
  Clock,
  Tag,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Batch } from '@/lib/types/batch';

interface BatchEnrollmentCardProps {
  batch: Batch;
  onEnrollClick: () => void;
  onPreviewClick: () => void;
}

export function BatchEnrollmentCard({
  batch,
  onEnrollClick,
  onPreviewClick,
}: BatchEnrollmentCardProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      {/* Video / Orientation Thumbnail Banner */}
      <div className="relative aspect-video bg-slate-950 overflow-hidden group cursor-pointer" onClick={onPreviewClick}>
        {/* Background Image / Abstract Grid */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/80 via-slate-900 to-indigo-950 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />

        {/* Thumbnail Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <button
            type="button"
            className="w-14 h-14 rounded-full bg-white/95 text-brand-600 flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110 mb-2 pl-1"
            aria-label="Play orientation video"
          >
            <Play className="w-6 h-6 fill-brand-600" />
          </button>
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
            Watch Orientation & Sample Demo
          </span>
          <span className="text-[11px] text-slate-300 mt-1">Free 15-min Batch Roadmap</span>
        </div>

        {/* Free Tag Pill */}
        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
          FREE PREVIEW AVAILABLE
        </div>
      </div>

      {/* Pricing & CTA Section */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Price Display */}
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹{batch.price.discounted.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-slate-400 line-through">
              ₹{batch.price.original.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {batch.price.discountPercent}% OFF
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Inclusive of all taxes & JoSAA 2026 Advisory Portal Access
          </p>
        </div>

        {/* Early Bird Coupon Teaser Banner */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-xs">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-medium">
            <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Use Coupon <strong>EDPARTH100</strong></span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            Save Extra ₹500
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={onEnrollClick}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 group"
          >
            <Zap className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
            <span>ENROLL NOW</span>
          </button>

          <button
            type="button"
            onClick={onPreviewClick}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Explore Demo Classes & Free Notes
          </button>
        </div>

        {/* Inclusions List */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            This Batch Package Includes:
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>500+ Hours Live Interactive Theory & Problem Solving</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Daily Practice Problems (DPP) with Video Hints</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>1-on-1 Mentorship with IIT Bombay / Delhi Seniors</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Personalized 150+ Priority JoSAA Choice Filling Sheet</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>25+ All India Mock Tests (AITS) with Simulated AIR</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Unlimited HD Class Recordings Access till 2027</span>
            </li>
          </ul>
        </div>

        {/* Counseling Helpline Callout */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Need Counseling Help?</span>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=919999999999&text=Hi%20EDPARTH,%20I%20want%20information%20regarding%20Mission%20100%20JEE%20Batch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Talk to Advisor</span>
          </a>
        </div>
      </div>
    </div>
  );
}
