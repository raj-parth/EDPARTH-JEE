'use client';

import React from 'react';
import Image from 'next/image';
import {
  Award,
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { College, CampusInfrastructure, PlacementReport, FeeStructure } from '@/lib/types';
import { formatINR, formatLPA } from '@/lib/utils';

interface OverviewTabProps {
  college: College;
  campus?: CampusInfrastructure;
  placements?: PlacementReport;
  fees?: FeeStructure;
}

export function OverviewTab({ college, campus, placements, fees }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            NIRF 2025
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            #{college.nirfRank2025}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Engineering in India</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Avg Placement
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {placements ? formatLPA(placements.averagePackageLPA) : 'N/A'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">2025 Official Report</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-brand-500" />
            4-Year Fees
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {fees ? formatINR(fees.totalEstimated4YearCost) : 'N/A'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Estimated Complete Cost</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-indigo-500" />
            Campus Area
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {college.campusAreaAcres}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Acres Land Area</div>
        </div>
      </div>

      {/* About & Institutional Summary */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          About {college.name}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {college.overview}
        </p>

        {/* Institutional Highlights Checklist */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            Key Institutional Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {college.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Metadata Grid */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Institutional Details & Accreditations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Institute Classification</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.type}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Year of Foundation</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.established}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Campus Location</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.city}, {college.state}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Approved & Regulated By</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.approvedBy.join(', ')}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Admitting Entrance Exams</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.acceptedExams.join(', ')}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">Counselling Authorities</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{college.counselling.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Campus Gallery */}
      {campus?.galleryImages && campus.galleryImages.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Campus Infrastructure & Life
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campus.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video shadow-card"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-medium text-white">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
