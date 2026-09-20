import { PlacementReport } from '@/lib/types';

export const PLACEMENTS_DATA: Record<string, PlacementReport> = {
  'iit-bombay': {
    collegeId: 'iit-bombay',
    reportYear: 2025,
    highestPackageLPA: 168.0,
    averagePackageLPA: 23.5,
    medianPackageLPA: 17.9,
    lowestPackageLPA: 6.0,
    placementPercentage: 86.4,
    totalEligibleStudents: 1988,
    totalOffers: 1650,
    totalCompaniesVisited: 388,
    topRecruiters: [
      'Google', 'Microsoft', 'Jane Street', 'Optiver', 'Apple',
      'Tower Research', 'Qualcomm', 'Texas Instruments', 'McKinsey & Company', 'Goldman Sachs'
    ],
    sectorDistribution: [
      { sector: 'Engineering & Technology', percentage: 42 },
      { sector: 'IT & Software', percentage: 28 },
      { sector: 'Finance & Banking', percentage: 14 },
      { sector: 'Consulting', percentage: 11 },
      { sector: 'R&D', percentage: 5 }
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 168.0, averageLPA: 36.8, medianLPA: 32.0, placementPercent: 96.5 },
      { branchCode: 'ECE', branchName: 'Electrical Engineering', highestLPA: 115.0, averageLPA: 26.2, medianLPA: 21.0, placementPercent: 91.2 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 54.0, averageLPA: 18.4, medianLPA: 15.2, placementPercent: 84.8 },
      { branchCode: 'CHEM', branchName: 'Chemical Engineering', highestLPA: 48.0, averageLPA: 17.5, medianLPA: 14.5, placementPercent: 82.0 },
      { branchCode: 'CIVIL', branchName: 'Civil Engineering', highestLPA: 42.0, averageLPA: 15.6, medianLPA: 13.0, placementPercent: 78.4 }
    ],
    source: 'IIT Bombay Placement Office Official Report 2024-25',
    status: 'verified',
    lastUpdated: '2025-07-10',
    reportPdfUrl: 'https://www.iitb.ac.in/placement'
  },
  'iit-delhi': {
    collegeId: 'iit-delhi',
    reportYear: 2025,
    highestPackageLPA: 180.0,
    averagePackageLPA: 25.8,
    medianPackageLPA: 19.5,
    lowestPackageLPA: 7.0,
    placementPercentage: 88.2,
    totalEligibleStudents: 1520,
    totalOffers: 1420,
    totalCompaniesVisited: 395,
    topRecruiters: [
      'Graviton Research', 'Google', 'Microsoft', 'Databricks', 'Rubrik',
      'Bain & Company', 'Boston Consulting Group', 'Nvidia', 'Samsung R&D'
    ],
    sectorDistribution: [
      { sector: 'Software & Data', percentage: 38 },
      { sector: 'Core Engineering', percentage: 30 },
      { sector: 'Quant & Finance', percentage: 16 },
      { sector: 'Management Consulting', percentage: 16 }
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 180.0, averageLPA: 39.2, medianLPA: 34.0, placementPercent: 98.0 },
      { branchCode: 'ECE', branchName: 'Electrical Engineering', highestLPA: 120.0, averageLPA: 27.5, medianLPA: 22.5, placementPercent: 92.5 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 55.0, averageLPA: 19.2, medianLPA: 16.0, placementPercent: 85.0 },
      { branchCode: 'CIVIL', branchName: 'Civil Engineering', highestLPA: 40.0, averageLPA: 16.2, medianLPA: 13.8, placementPercent: 80.5 }
    ],
    source: 'OCS IIT Delhi Annual Placement Report 2024-25',
    status: 'verified',
    lastUpdated: '2025-07-22'
  },
  'iit-madras': {
    collegeId: 'iit-madras',
    reportYear: 2025,
    highestPackageLPA: 154.0,
    averagePackageLPA: 22.8,
    medianPackageLPA: 17.5,
    lowestPackageLPA: 6.5,
    placementPercentage: 85.0,
    totalEligibleStudents: 1850,
    totalOffers: 1550,
    totalCompaniesVisited: 340,
    topRecruiters: [
      'Microsoft', 'Qualcomm', 'Texas Instruments', 'Airbus', 'Caterpillar',
      'Morgan Stanley', 'Barclays', 'Honeywell', 'Amazon'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 154.0, averageLPA: 35.4, medianLPA: 30.5, placementPercent: 95.0 },
      { branchCode: 'ECE', branchName: 'Electrical Engineering', highestLPA: 95.0, averageLPA: 24.8, medianLPA: 20.0, placementPercent: 89.0 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 52.0, averageLPA: 18.0, medianLPA: 14.8, placementPercent: 83.0 }
    ],
    source: 'IIT Madras Placement Cell Final Stats 2025',
    status: 'verified',
    lastUpdated: '2025-06-30'
  },
  'nit-trichy': {
    collegeId: 'nit-trichy',
    reportYear: 2025,
    highestPackageLPA: 52.89,
    averagePackageLPA: 16.9,
    medianPackageLPA: 13.5,
    lowestPackageLPA: 5.5,
    placementPercentage: 92.8,
    totalEligibleStudents: 1250,
    totalOffers: 1340,
    totalCompaniesVisited: 280,
    topRecruiters: [
      'Google', 'Microsoft', 'Amazon', 'Morgan Stanley', 'Oracle',
      'Texas Instruments', 'Siemens', 'ITC Infotech', 'L&T'
    ],
    sectorDistribution: [
      { sector: 'Software / IT', percentage: 45 },
      { sector: 'Core Engineering', percentage: 32 },
      { sector: 'Analytics / Consulting', percentage: 15 },
      { sector: 'Banking & Finance', percentage: 8 }
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 52.89, averageLPA: 27.6, medianLPA: 24.0, placementPercent: 98.4 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', highestLPA: 46.0, averageLPA: 21.4, medianLPA: 18.5, placementPercent: 94.2 },
      { branchCode: 'EEE', branchName: 'Electrical and Electronics', highestLPA: 38.0, averageLPA: 17.5, medianLPA: 15.0, placementPercent: 90.5 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 28.0, averageLPA: 13.2, medianLPA: 11.5, placementPercent: 88.0 },
      { branchCode: 'CIVIL', branchName: 'Civil Engineering', highestLPA: 22.0, averageLPA: 10.8, medianLPA: 9.2, placementPercent: 84.5 }
    ],
    source: 'NIT Trichy Dept of Training & Placement Report 2025',
    status: 'verified',
    lastUpdated: '2025-07-28'
  },
  'nit-surathkal': {
    collegeId: 'nit-surathkal',
    reportYear: 2025,
    highestPackageLPA: 54.0,
    averagePackageLPA: 16.4,
    medianPackageLPA: 13.0,
    lowestPackageLPA: 5.2,
    placementPercentage: 91.5,
    totalEligibleStudents: 1180,
    totalOffers: 1260,
    totalCompaniesVisited: 265,
    topRecruiters: [
      'DE Shaw', 'Arcesium', 'Google', 'Qualcomm', 'Nvidia',
      'Uber', 'Intuit', 'Wells Fargo', 'Cisco'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 54.0, averageLPA: 26.8, medianLPA: 23.5, placementPercent: 97.8 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', highestLPA: 45.0, averageLPA: 20.8, medianLPA: 17.5, placementPercent: 93.0 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 26.0, averageLPA: 12.8, medianLPA: 11.0, placementPercent: 86.5 }
    ],
    source: 'NITK Surathkal Career Development Centre 2025',
    status: 'verified',
    lastUpdated: '2025-08-02'
  },
  'iiit-hyderabad': {
    collegeId: 'iiit-hyderabad',
    reportYear: 2025,
    highestPackageLPA: 102.0,
    averagePackageLPA: 32.2,
    medianPackageLPA: 30.0,
    lowestPackageLPA: 12.0,
    placementPercentage: 99.1,
    totalEligibleStudents: 340,
    totalOffers: 420,
    totalCompaniesVisited: 140,
    topRecruiters: [
      'Apple', 'Google', 'Microsoft', 'Bloomberg London', 'Meta',
      'Uber', 'Adobe', 'Tower Research', 'DE Shaw'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 102.0, averageLPA: 34.5, medianLPA: 32.0, placementPercent: 100.0 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', highestLPA: 65.0, averageLPA: 28.5, medianLPA: 26.0, placementPercent: 98.2 }
    ],
    source: 'IIIT Hyderabad Placement Office Summary 2025',
    status: 'verified',
    lastUpdated: '2025-06-25'
  },
  'dtu-delhi': {
    collegeId: 'dtu-delhi',
    reportYear: 2025,
    highestPackageLPA: 82.05,
    averagePackageLPA: 15.6,
    medianPackageLPA: 12.5,
    lowestPackageLPA: 4.5,
    placementPercentage: 88.5,
    totalEligibleStudents: 2200,
    totalOffers: 2150,
    totalCompaniesVisited: 410,
    topRecruiters: [
      'Google', 'Microsoft', 'Amazon', 'Atlassian', 'Sprinklr',
      'Goldman Sachs', 'PwC', 'KPMG', 'Hero MotoCorp'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 82.05, averageLPA: 25.2, medianLPA: 21.0, placementPercent: 96.0 },
      { branchCode: 'ECE', branchName: 'Electronics and Communication', highestLPA: 50.0, averageLPA: 18.5, medianLPA: 15.0, placementPercent: 91.0 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 24.0, averageLPA: 11.5, medianLPA: 10.0, placementPercent: 82.0 }
    ],
    source: 'DTU Placement & Training Cell Report 2025',
    status: 'verified',
    lastUpdated: '2025-07-15'
  },
  'jadavpur-university': {
    collegeId: 'jadavpur-university',
    reportYear: 2025,
    highestPackageLPA: 85.0,
    averagePackageLPA: 15.2,
    medianPackageLPA: 12.0,
    lowestPackageLPA: 4.8,
    placementPercentage: 90.2,
    totalEligibleStudents: 980,
    totalOffers: 1100,
    totalCompaniesVisited: 190,
    topRecruiters: [
      'Google', 'Amazon', 'Microsoft', 'Texas Instruments', 'Airbus',
      'PwC', 'Tata Steel', 'Schlumberger', 'CESC'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science and Engineering', highestLPA: 85.0, averageLPA: 24.5, medianLPA: 20.0, placementPercent: 98.0 },
      { branchCode: 'ECE', branchName: 'Electronics and Telecommunication', highestLPA: 45.0, averageLPA: 18.2, medianLPA: 15.5, placementPercent: 94.0 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 20.0, averageLPA: 10.5, medianLPA: 9.0, placementPercent: 86.0 }
    ],
    source: 'Jadavpur University Central Placement Cell Report 2025',
    status: 'verified',
    lastUpdated: '2025-06-28'
  },
  'bits-pilani': {
    collegeId: 'bits-pilani',
    reportYear: 2025,
    highestPackageLPA: 60.75,
    averagePackageLPA: 20.9,
    medianPackageLPA: 17.5,
    lowestPackageLPA: 7.0,
    placementPercentage: 93.4,
    totalEligibleStudents: 1450,
    totalOffers: 1580,
    totalCompaniesVisited: 330,
    topRecruiters: [
      'Google', 'Microsoft', 'Nutanix', 'DE Shaw', 'Goldman Sachs',
      'McKinsey', 'Bain', 'Schlumberger', 'Qualcomm'
    ],
    branchStats: [
      { branchCode: 'CSE', branchName: 'Computer Science', highestLPA: 60.75, averageLPA: 31.5, medianLPA: 28.0, placementPercent: 99.0 },
      { branchCode: 'ECE', branchName: 'Electrical and Electronics', highestLPA: 42.0, averageLPA: 23.0, medianLPA: 20.0, placementPercent: 94.5 },
      { branchCode: 'MECH', branchName: 'Mechanical Engineering', highestLPA: 28.0, averageLPA: 14.8, medianLPA: 13.0, placementPercent: 88.0 }
    ],
    source: 'BITS Pilani Practice School & Placement Division 2025',
    status: 'verified',
    lastUpdated: '2025-07-20'
  }
};
