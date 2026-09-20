'use client';

import React, { useState } from 'react';
import {
  Info,
  TrendingUp,
  BookOpen,
  IndianRupee,
  Briefcase,
  Home,
  Building2,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import {
  College,
  CutoffRecord,
  FeeStructure,
  PlacementReport,
  HostelInfo,
  CampusInfrastructure,
  AdmissionDetails
} from '@/lib/types';
import { OverviewTab } from '@/components/college/OverviewTab';
import { CutoffsTab } from '@/components/college/CutoffsTab';
import { BranchesTab } from '@/components/college/BranchesTab';
import { FeesTab } from '@/components/college/FeesTab';
import { PlacementsTab } from '@/components/college/PlacementsTab';
import { HostelTab } from '@/components/college/HostelTab';
import { CampusTab } from '@/components/college/CampusTab';
import { AdmissionTab } from '@/components/college/AdmissionTab';
import { cn } from '@/lib/utils';

type TabKey =
  | 'overview'
  | 'cutoffs'
  | 'branches'
  | 'fees'
  | 'placements'
  | 'hostel'
  | 'campus'
  | 'admission'
  | 'reviews';

interface ClientWrapperProps {
  college: College;
  cutoffs: CutoffRecord[];
  fees: FeeStructure;
  placements: PlacementReport;
  hostel: HostelInfo;
  campus: CampusInfrastructure;
  admission: AdmissionDetails;
}

export function CollegeDetailClientWrapper({
  college,
  cutoffs,
  fees,
  placements,
  hostel,
  campus,
  admission
}: ClientWrapperProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'overview', label: 'Overview', icon: Info },
    { key: 'cutoffs', label: 'Cutoffs', icon: TrendingUp },
    { key: 'branches', label: 'Branches', icon: BookOpen },
    { key: 'fees', label: 'Fees & Costs', icon: IndianRupee },
    { key: 'placements', label: 'Placements', icon: Briefcase },
    { key: 'hostel', label: 'Hostel & Mess', icon: Home },
    { key: 'campus', label: 'Campus & Facilities', icon: Building2 },
    { key: 'admission', label: 'Admission Process', icon: GraduationCap },
    { key: 'reviews', label: 'Reviews & FAQs', icon: MessageSquare }
  ];

  return (
    <div>
      {/* Sticky Tab Navigation Bar */}
      <div className="sticky top-16 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-medium">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all shrink-0',
                    isActive
                      ? 'bg-brand-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab college={college} campus={campus} placements={placements} fees={fees} />
        )}
        {activeTab === 'cutoffs' && (
          <CutoffsTab cutoffs={cutoffs} collegeName={college.name} />
        )}
        {activeTab === 'branches' && (
          <BranchesTab collegeName={college.name} />
        )}
        {activeTab === 'fees' && (
          <FeesTab fees={fees} collegeName={college.name} />
        )}
        {activeTab === 'placements' && (
          <PlacementsTab placements={placements} collegeName={college.name} />
        )}
        {activeTab === 'hostel' && (
          <HostelTab hostel={hostel} collegeName={college.name} />
        )}
        {activeTab === 'campus' && (
          <CampusTab campus={campus} collegeName={college.name} />
        )}
        {activeTab === 'admission' && (
          <AdmissionTab admission={admission} collegeName={college.name} />
        )}
        {activeTab === 'reviews' && (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Frequently Asked Questions about {college.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Verified answers for JEE aspirants and parents.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  What is the minimum JEE rank needed for Computer Science (CSE) at {college.shortName}?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Based on recent JoSAA counselling data, general category closing ranks typically close around top ranks for Round 5/6. Check the Cutoffs tab for precise historical trends by category (OPEN, OBC-NCL, EWS, SC, ST) and state quotas.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Are scholarships or fee remissions available for economically weaker students?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Yes, candidates whose family annual income is under ₹1,00,000 are eligible for a 100% tuition fee waiver, and those between ₹1,00,000 and ₹5,00,000 receive a 2/3rd (66.67%) fee waiver per Government of India guidelines. Refer to the Fees & Costs tab for details.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  How are the hostel and mess facilities managed?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  The campus provides fully furnished hostels with high-speed Internet, sports recreation halls, and student-run mess committees offering multiple regional cuisine choices.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
