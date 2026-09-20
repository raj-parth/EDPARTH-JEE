// Core Data Contracts for EDPARTH Platform

export type CollegeType =
  | 'IIT'
  | 'NIT'
  | 'IIIT'
  | 'GFTI'
  | 'State Government'
  | 'Private';

export type DataStatus = 'verified' | 'estimated' | 'unavailable';

export type Category = 'OPEN' | 'EWS' | 'OBC-NCL' | 'SC' | 'ST' | 'PwD';

export type Gender = 'Gender-Neutral' | 'Female-Only';

export type Quota = 'AI' | 'HS' | 'OS'; // All India, Home State, Other State

export type CounsellingBody =
  | 'JoSAA'
  | 'CSAB'
  | 'JAC Delhi'
  | 'JAC Chandigarh'
  | 'MHT CET'
  | 'WBJEE'
  | 'Direct / University';

export type EntranceExam =
  | 'JEE Main'
  | 'JEE Advanced'
  | 'BITSAT'
  | 'VITEEE'
  | 'MET'
  | 'SRMJEEE'
  | 'WBJEE'
  | 'MHT CET'
  | 'COMEDK';

export interface College {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  aliases: string[];
  type: CollegeType;
  established: number;
  city: string;
  state: string;
  campusAreaAcres: number;
  nirfRank2025: number;
  nirfScore?: number;
  naacGrade?: string;
  approvedBy: string[]; // e.g. ['UGC', 'AICTE', 'MoE']
  website: string;
  logoUrl?: string;
  coverImageUrl?: string;
  overview: string;
  highlights: string[];
  tags: string[];
  counselling: CounsellingBody[];
  acceptedExams: EntranceExam[];
  featured?: boolean;
}

export interface CutoffTrendPoint {
  year: number;
  closingRank: number;
  openingRank?: number;
}

export interface CutoffRecord {
  id: string;
  collegeId: string;
  branchCode: string;
  branchName: string;
  year: number; // 2023, 2024, 2025
  counselling: CounsellingBody;
  round: number;
  quota: Quota;
  category: Category;
  gender: Gender;
  openingRank: number;
  closingRank: number;
  source: string;
  status: DataStatus;
  lastUpdated: string;
}

export interface CategoryFeeWaiver {
  category: string;
  criteria: string;
  waiverPercentage: number;
  details: string;
}

export interface FeeStructure {
  collegeId: string;
  tuitionPerSem: number;
  otherChargesPerSem: number;
  annualTuitionTotal: number;
  oneTimeAdmissionFee: number;
  refundableCautionDeposit: number;
  annualHostelFee: number;
  annualMessFee: number;
  totalAnnualCost: number;
  totalEstimated4YearCost: number;
  currency: string;
  categoryWaivers: CategoryFeeWaiver[];
  source: string;
  status: DataStatus;
  lastUpdated: string;
  feeNoticeUrl?: string;
}

export interface BranchPlacementStat {
  branchCode: string;
  branchName: string;
  highestLPA: number;
  averageLPA: number;
  medianLPA: number;
  placementPercent: number;
  registeredStudents?: number;
  placedStudents?: number;
}

export interface PlacementReport {
  collegeId: string;
  reportYear: number;
  highestPackageLPA: number;
  averagePackageLPA: number;
  medianPackageLPA: number;
  lowestPackageLPA?: number;
  placementPercentage: number;
  totalEligibleStudents: number;
  totalOffers: number;
  totalCompaniesVisited: number;
  topRecruiters: string[];
  sectorDistribution?: { sector: string; percentage: number }[];
  branchStats: BranchPlacementStat[];
  source: string;
  status: DataStatus;
  lastUpdated: string;
  reportPdfUrl?: string;
}

export interface HostelInfo {
  collegeId: string;
  hostelAvailable: boolean;
  totalHostelsBoys: number;
  totalHostelsGirls: number;
  roomTypes: ('Single' | 'Double' | 'Triple' | 'Four-Seater')[];
  acAvailable: boolean;
  messType: 'Pure Veg' | 'Veg & Non-Veg';
  annualMessCharges: number;
  annualHostelRoomCharges: number;
  facilities: string[];
  rules: string[];
  curfewTimings: string;
  source: string;
  status: DataStatus;
}

export interface CampusFacility {
  name: string;
  description: string;
  iconName?: string;
}

export interface CampusInfrastructure {
  collegeId: string;
  totalAreaAcres: number;
  libraryDetails: string;
  sportsFacilities: string[];
  laboratoriesCount: number;
  incubationCenter: string;
  medicalFacility: string;
  wifiCoverage: string;
  galleryImages: { url: string; caption: string }[];
}

export interface AdmissionStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface AdmissionDetails {
  collegeId: string;
  acceptedExams: EntranceExam[];
  counsellingAuthority: CounsellingBody;
  eligibilityCriteria: string[];
  seatMatrixLink?: string;
  documentsRequired: string[];
  steps: AdmissionStep[];
  officialPortalUrl: string;
  applicationPeriod: string;
  reportingVenue: string;
}

export interface Branch {
  code: string;
  name: string;
  category: 'Computer Science' | 'Electrical' | 'Mechanical' | 'Civil & Infrastructure' | 'Chemical & Bio' | 'Interdisciplinary';
  durationYears: number;
  degreeType: 'B.Tech' | 'B.E.' | 'B.Tech + M.Tech Dual Degree' | 'BS';
  description: string;
  careerProspects: string[];
  topSectors: string[];
  popularCourses: string[];
}

export interface ExamInfo {
  id: string;
  name: string;
  shortName: string;
  conductedBy: string;
  frequency: string;
  mode: string;
  officialWebsite: string;
  description: string;
  eligibility: string;
  applicationPeriod: string;
  examMonth: string;
  counsellingBody: string;
  participatingInstitutesCount: number;
}

export interface PredictorResult {
  college: College;
  branchName: string;
  branchCode: string;
  historicalClosingRank: number;
  userEstimatedRank: number;
  delta: number;
  probabilityTier: 'Safe' | 'Moderate' | 'Ambitious';
  quota: Quota;
  category: Category;
  averagePackageLPA: number;
  approxTotal4YearFees: number;
}
