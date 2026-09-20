'use client';

import React from 'react';
import {
  Award,
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
  MapPin,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { College, CampusInfrastructure, PlacementReport, FeeStructure } from '@/lib/types';
import { formatINR, formatLPA } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Award className="w-5 h-5 text-amber-500" />}
          value={`#${college.nirfRank2025}`}
          label="NIRF 2025 Rank"
          description="Ministry of Education Official Ranking"
        />

        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          value={placements ? formatLPA(placements.averagePackageLPA) : 'N/A'}
          label="Average CTC (LPA)"
          description="Audited Institutional Report"
        />

        <StatCard
          icon={<DollarSign className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          value={fees ? formatINR(fees.totalEstimated4YearCost) : 'N/A'}
          label="4-Year Total Fees"
          description="Tuition + Mandatory Institutional Fees"
        />

        <StatCard
          icon={<Building2 className="w-5 h-5 text-indigo-500" />}
          value={`${college.campusAreaAcres} Acres`}
          label="Campus Infrastructure"
          description="Academic, Residential & Labs"
        />
      </div>

      {/* About & Institutional Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              About {college.name}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {college.overview}
          </p>

          {/* Institutional Highlights Checklist */}
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Key Academic & Institutional Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {college.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institutional Metadata Grid */}
      <Card>
        <CardHeader>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Governance, Accreditations & Admissions
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Classification
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.type}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Establishment Year
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.established}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Campus Location
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.city}, {college.state}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Approved & Regulated By
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.approvedBy.join(', ')}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Accepted Examinations
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.acceptedExams.join(', ')}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Counselling Authority
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{college.counselling.join(', ')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                className="group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-video shadow-card"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs font-semibold text-white">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
