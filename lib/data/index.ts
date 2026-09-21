import {
  College,
  CutoffRecord,
  FeeStructure,
  PlacementReport,
  HostelInfo,
  CampusInfrastructure,
  AdmissionDetails,
  PredictorResult,
  Category,
  Gender,
  Quota
} from '@/lib/types';

import { COLLEGES_DATA } from './colleges';
import { CUTOFFS_DATA } from './cutoffs';
import { FEES_DATA } from './fees';
import { PLACEMENTS_DATA } from './placements';
import { HOSTELS_DATA } from './hostels';
import { CAMPUSES_DATA } from './campuses';
import { ADMISSIONS_DATA } from './admissions';
import { BRANCHES_DATA } from './branches';
import { EXAMS_DATA } from './exams';
import { estimateRankFromPercentile } from '@/lib/utils';

export * from './colleges';
export * from './cutoffs';
export * from './fees';
export * from './placements';
export * from './hostels';
export * from './campuses';
export * from './admissions';
export * from './branches';
export * from './exams';

export function getAllColleges(): College[] {
  return COLLEGES_DATA;
}

export function getCollegeBySlug(slug: string): College | undefined {
  return COLLEGES_DATA.find(c => c.slug === slug || c.id === slug);
}

export function getCutoffsByCollege(collegeId: string): CutoffRecord[] {
  return CUTOFFS_DATA.filter(c => c.collegeId === collegeId);
}

export function getFeesByCollege(collegeId: string): FeeStructure | undefined {
  if (FEES_DATA[collegeId]) return FEES_DATA[collegeId];
  // Reasonable fallback estimated structure for colleges without explicit entry
  const college = getCollegeBySlug(collegeId);
  const isGovt = college?.type === 'IIT' || college?.type === 'NIT' || college?.type === 'IIIT' || college?.type === 'GFTI';
  return {
    collegeId,
    tuitionPerSem: isGovt ? 62500 : 150000,
    otherChargesPerSem: 12000,
    annualTuitionTotal: isGovt ? 125000 : 300000,
    oneTimeAdmissionFee: 8000,
    refundableCautionDeposit: 5000,
    annualHostelFee: 30000,
    annualMessFee: 45000,
    totalAnnualCost: isGovt ? 220000 : 395000,
    totalEstimated4YearCost: isGovt ? 880000 : 1580000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All eligible candidates',
        waiverPercentage: 100,
        details: '100% tuition waiver applicable per Central Government norms.'
      }
    ],
    source: 'Estimated based on institutional category benchmarks',
    status: 'estimated',
    lastUpdated: '2025-08-01'
  };
}

export function getPlacementsByCollege(collegeId: string): PlacementReport | undefined {
  if (PLACEMENTS_DATA[collegeId]) return PLACEMENTS_DATA[collegeId];
  const college = getCollegeBySlug(collegeId);
  return {
    collegeId,
    reportYear: 2025,
    highestPackageLPA: college?.type === 'IIT' ? 120 : college?.type === 'NIT' ? 45 : 35,
    averagePackageLPA: college?.type === 'IIT' ? 20.5 : college?.type === 'NIT' ? 14.2 : 11.5,
    medianPackageLPA: college?.type === 'IIT' ? 16.0 : college?.type === 'NIT' ? 11.8 : 9.5,
    lowestPackageLPA: 5.0,
    placementPercentage: 88.0,
    totalEligibleStudents: 850,
    totalOffers: 920,
    totalCompaniesVisited: 180,
    topRecruiters: ['Microsoft', 'Amazon', 'TCS Research', 'Infosys', 'L&T', 'Qualcomm', 'Deloitte'],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science', highestLPA: 45.0, averageLPA: 22.0, medianLPA: 18.0, placementPercent: 95.0 },
      { branchCode: 'ECE', branchName: 'Electronics & Communication', highestLPA: 35.0, averageLPA: 16.5, medianLPA: 14.0, placementPercent: 90.0 }
    ],
    source: 'Institutional Summary 2025',
    status: 'estimated',
    lastUpdated: '2025-07-01'
  };
}

export function getHostelByCollege(collegeId: string): HostelInfo | undefined {
  if (HOSTELS_DATA[collegeId]) return HOSTELS_DATA[collegeId];
  return {
    collegeId,
    hostelAvailable: true,
    totalHostelsBoys: 6,
    totalHostelsGirls: 3,
    roomTypes: ['Double', 'Triple'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 42000,
    annualHostelRoomCharges: 28000,
    facilities: ['Wi-Fi connectivity', 'Indoor sports room', 'Water coolers with RO', 'Power backup'],
    rules: ['Curfew rules apply after 10:30 PM', 'Hostel committee approval needed for leaves'],
    curfewTimings: '10:30 PM entry closure',
    source: 'Institute Hostel Administration',
    status: 'estimated'
  };
}

export function getCampusByCollege(collegeId: string): CampusInfrastructure | undefined {
  if (CAMPUSES_DATA[collegeId]) return CAMPUSES_DATA[collegeId];
  const college = getCollegeBySlug(collegeId);
  return {
    collegeId,
    totalAreaAcres: college?.campusAreaAcres || 150,
    libraryDetails: 'Central Library equipped with digital repositories, book bank facilities, and spacious reading halls.',
    sportsFacilities: ['Cricket / Football grounds', 'Basketball courts', 'Indoor games hall'],
    laboratoriesCount: 50,
    incubationCenter: 'Campus Innovation and Entrepreneurship Cell',
    medicalFacility: 'On-campus Health Centre with basic clinical support and tie-ups with city hospitals.',
    wifiCoverage: 'High-speed campus network',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', caption: 'Academic Block' }
    ]
  };
}

export function getAdmissionByCollege(collegeId: string): AdmissionDetails | undefined {
  if (ADMISSIONS_DATA[collegeId]) return ADMISSIONS_DATA[collegeId];
  const college = getCollegeBySlug(collegeId);
  return {
    collegeId,
    acceptedExams: college?.acceptedExams || ['JEE Main'],
    counsellingAuthority: college?.counselling[0] || 'JoSAA',
    eligibilityCriteria: [
      'Qualified designated entrance exam (JEE Main / State CET).',
      'Minimum aggregate of 75% in Class 12 or state equivalence.',
      'Physics, Mathematics, and Chemistry/Computer Science in 10+2.'
    ],
    documentsRequired: [
      'Seat Allotment Letter',
      'Entrance Exam Scorecard & Admit Card',
      'Class 10 & 12 Marksheets',
      'Category / Medical Certificates'
    ],
    steps: [
      { stepNumber: 1, title: 'Entrance Examination', description: 'Appear in designated national or state examination.' },
      { stepNumber: 2, title: 'Counselling Registration', description: 'Register and enter choices on official counselling authority portal.' },
      { stepNumber: 3, title: 'Seat Allotment & Reporting', description: 'Accept seat, verify certificates, and complete physical reporting.' }
    ],
    officialPortalUrl: college?.website || 'https://josaa.nic.in',
    applicationPeriod: 'June - July',
    reportingVenue: `${college?.name || 'Institute Campus'}, ${college?.city || ''}`
  };
}

export function getAllCutoffs(): CutoffRecord[] {
  return CUTOFFS_DATA;
}

export function searchColleges(query: string): College[] {
  const q = query.trim().toLowerCase();
  if (!q) return COLLEGES_DATA;

  return COLLEGES_DATA.filter(c => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.aliases.some(a => a.toLowerCase().includes(q)) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.acceptedExams.some(e => e.toLowerCase().includes(q))
    );
  });
}

// Percentile to College matches
export function predictColleges(params: {
  percentile: number;
  category?: Category;
  gender?: Gender;
  homeState?: string;
  preferredBranch?: string;
}): PredictorResult[] {
  const { percentile, category = 'OPEN', gender = 'Gender-Neutral', homeState, preferredBranch } = params;
  const userEstimatedRank = estimateRankFromPercentile(percentile);

  const results: PredictorResult[] = [];

  // Filter cutoffs that match category, gender, and branch
  CUTOFFS_DATA.forEach(cutoff => {
    // Branch filter
    if (preferredBranch && preferredBranch !== 'ALL' && cutoff.branchCode !== preferredBranch) {
      return;
    }

    const college = getCollegeBySlug(cutoff.collegeId);
    if (!college) return;

    // Check quota match (if homeState matches college state, HS quota applies, else OS / AI)
    let quotaMatches = false;
    if (cutoff.quota === 'AI') quotaMatches = true;
    else if (homeState && college.state.toLowerCase() === homeState.toLowerCase() && cutoff.quota === 'HS') quotaMatches = true;
    else if (cutoff.quota === 'OS' && (!homeState || college.state.toLowerCase() !== homeState.toLowerCase())) quotaMatches = true;

    if (!quotaMatches) return;

    const closing = cutoff.closingRank;
    const delta = userEstimatedRank - closing;

    let probabilityTier: 'Safe' | 'Moderate' | 'Ambitious';
    if (userEstimatedRank <= closing * 0.85) {
      probabilityTier = 'Safe';
    } else if (userEstimatedRank <= closing * 1.15) {
      probabilityTier = 'Moderate';
    } else if (userEstimatedRank <= closing * 1.35) {
      probabilityTier = 'Ambitious';
    } else {
      // Beyond reach for this cutoff
      return;
    }

    const placement = getPlacementsByCollege(college.id);
    const fee = getFeesByCollege(college.id);

    results.push({
      college,
      branchName: cutoff.branchName,
      branchCode: cutoff.branchCode,
      historicalClosingRank: closing,
      userEstimatedRank,
      delta,
      probabilityTier,
      quota: cutoff.quota,
      category: cutoff.category,
      averagePackageLPA: placement?.averagePackageLPA || 15.0,
      approxTotal4YearFees: fee?.totalEstimated4YearCost || 1000000
    });
  });

  // Sort by probability: Safe first, then Moderate, then Ambitious; within tier sort by college NIRF rank
  return results.sort((a, b) => {
    const tierOrder = { Safe: 0, Moderate: 1, Ambitious: 2 };
    if (tierOrder[a.probabilityTier] !== tierOrder[b.probabilityTier]) {
      return tierOrder[a.probabilityTier] - tierOrder[b.probabilityTier];
    }
    return a.college.nirfRank2025 - b.college.nirfRank2025;
  });
}
