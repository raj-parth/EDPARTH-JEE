'use client';

import React, { useState } from 'react';
import { Batch, TestSeriesItem } from '@/lib/types/batch';
import { BatchHero } from '@/components/batch/BatchHero';
import { BatchEnrollmentCard } from '@/components/batch/BatchEnrollmentCard';
import { BatchTabsNav, BatchTabId } from '@/components/batch/BatchTabsNav';
import { DescriptionTab } from '@/components/batch/tabs/DescriptionTab';
import { ClassroomTab } from '@/components/batch/tabs/ClassroomTab';
import { FacultyTab } from '@/components/batch/tabs/FacultyTab';
import { ScheduleTab } from '@/components/batch/tabs/ScheduleTab';
import { TestSeriesTab } from '@/components/batch/tabs/TestSeriesTab';
import { FaqTab } from '@/components/batch/tabs/FaqTab';
import { EnrollmentModal } from '@/components/batch/EnrollmentModal';
import { VideoPreviewModal } from '@/components/batch/VideoPreviewModal';
import { TestAttemptModal } from '@/components/batch/TestAttemptModal';
import { Zap, ShieldCheck } from 'lucide-react';

interface BatchOverviewClientProps {
  batch: Batch;
}

export function BatchOverviewClient({ batch }: BatchOverviewClientProps) {
  const [activeTab, setActiveTab] = useState<BatchTabId>('description');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [previewVideoTitle, setPreviewVideoTitle] = useState('');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [activeTest, setActiveTest] = useState<TestSeriesItem | null>(null);

  const handleOpenEnrollModal = () => {
    setIsEnrollModalOpen(true);
  };

  const handleOpenVideoPreview = (title?: string) => {
    setPreviewVideoTitle(title || `${batch.title.split('—')[0]} Orientation & Masterclass`);
    setIsVideoModalOpen(true);
  };

  const handleAttemptTest = (test: TestSeriesItem) => {
    setActiveTest(test);
    setIsTestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 sm:pb-24 transition-colors">
      {/* 1. Hero Section (PhysicsWallah Study-v2 Style) */}
      <BatchHero batch={batch} onEnrollClick={handleOpenEnrollModal} />

      {/* 2. Sticky Tab Navigation Bar */}
      <BatchTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Active Tab Content (68% width on Desktop) */}
          <div className="w-full lg:w-[68%] space-y-8">
            {activeTab === 'description' && (
              <DescriptionTab batch={batch} onEnrollClick={handleOpenEnrollModal} />
            )}

            {activeTab === 'classroom' && (
              <ClassroomTab
                batch={batch}
                onPreviewLecture={title => handleOpenVideoPreview(title)}
                onEnrollClick={handleOpenEnrollModal}
              />
            )}

            {activeTab === 'faculty' && (
              <FacultyTab
                batch={batch}
                onPreviewFaculty={facultyName =>
                  handleOpenVideoPreview(`Masterclass Demo with ${facultyName}`)
                }
              />
            )}

            {activeTab === 'schedule' && (
              <ScheduleTab batch={batch} onEnrollClick={handleOpenEnrollModal} />
            )}

            {activeTab === 'tests' && (
              <TestSeriesTab
                batch={batch}
                onAttemptTest={handleAttemptTest}
                onEnrollClick={handleOpenEnrollModal}
              />
            )}

            {activeTab === 'faqs' && <FaqTab batch={batch} />}
          </div>

          {/* Right Column: Sticky Purchase / Action Card (32% width on Desktop) */}
          <div className="w-full lg:w-[32%] hidden lg:block sticky top-32 z-20">
            <BatchEnrollmentCard
              batch={batch}
              onEnrollClick={handleOpenEnrollModal}
              onPreviewClick={() => handleOpenVideoPreview()}
            />
          </div>
        </div>
      </main>

      {/* 4. Mobile Sticky Bottom Enrollment Bar (Matches PW mobile experience) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 px-4 flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{batch.price.discounted.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{batch.price.original.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {batch.price.discountPercent}% OFF • Instant Access
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpenEnrollModal}
          className="py-2.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>ENROLL NOW</span>
        </button>
      </div>

      {/* 5. Modals */}
      <EnrollmentModal
        batch={batch}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />

      <VideoPreviewModal
        title={previewVideoTitle}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <TestAttemptModal
        test={activeTest}
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}
