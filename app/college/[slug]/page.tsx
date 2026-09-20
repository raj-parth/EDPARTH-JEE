import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getCollegeBySlug,
  getAllColleges,
  getCutoffsByCollege,
  getFeesByCollege,
  getPlacementsByCollege,
  getHostelByCollege,
  getCampusByCollege,
  getAdmissionByCollege
} from '@/lib/data';
import { CollegeHeader } from '@/components/college/CollegeHeader';
import { OverviewTab } from '@/components/college/OverviewTab';
import { CutoffsTab } from '@/components/college/CutoffsTab';
import { BranchesTab } from '@/components/college/BranchesTab';
import { FeesTab } from '@/components/college/FeesTab';
import { PlacementsTab } from '@/components/college/PlacementsTab';
import { HostelTab } from '@/components/college/HostelTab';
import { CampusTab } from '@/components/college/CampusTab';
import { AdmissionTab } from '@/components/college/AdmissionTab';
import { CollegeDetailClientWrapper } from './CollegeDetailClientWrapper';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const colleges = getAllColleges();
  return colleges.map(c => ({
    slug: c.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const college = getCollegeBySlug(params.slug);
  if (!college) {
    return {
      title: 'College Not Found | EDPARTH'
    };
  }

  return {
    title: `${college.name} (${college.shortName}) — 2026 Cutoffs, Fees, Placements`,
    description: `Explore verified cutoffs, fee breakdown, placement packages, branch choices, hostel information, and admission criteria for ${college.name} (${college.city}, ${college.state}).`,
    openGraph: {
      title: `${college.name} — Admission & Cutoff Data | EDPARTH`,
      description: `NIRF #${college.nirfRank2025} Engineering institute in ${college.city}. Check branch-wise cutoffs, 4-year fee calculator, and placement statistics.`
    }
  };
}

export default function CollegeDetailPage({ params }: PageProps) {
  const college = getCollegeBySlug(params.slug);
  if (!college) {
    notFound();
  }

  const cutoffs = getCutoffsByCollege(college.id);
  const fees = getFeesByCollege(college.id);
  const placements = getPlacementsByCollege(college.id);
  const hostel = getHostelByCollege(college.id);
  const campus = getCampusByCollege(college.id);
  const admission = getAdmissionByCollege(college.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors">
      <CollegeHeader college={college} />

      {/* Interactive Tabs Section */}
      <CollegeDetailClientWrapper
        college={college}
        cutoffs={cutoffs}
        fees={fees!}
        placements={placements!}
        hostel={hostel!}
        campus={campus!}
        admission={admission!}
      />
    </div>
  );
}
