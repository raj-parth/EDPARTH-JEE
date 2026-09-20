import { FeeStructure } from '@/lib/types';

export const FEES_DATA: Record<string, FeeStructure> = {
  'iit-bombay': {
    collegeId: 'iit-bombay',
    tuitionPerSem: 100000,
    otherChargesPerSem: 15450,
    annualTuitionTotal: 200000,
    oneTimeAdmissionFee: 7800,
    refundableCautionDeposit: 10000,
    annualHostelFee: 34000,
    annualMessFee: 54000,
    totalAnnualCost: 318900,
    totalEstimated4YearCost: 1275600,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All candidates belonging to SC/ST/PwD categories',
        waiverPercentage: 100,
        details: '100% Tuition fee exemption per Ministry of Education guidelines. Only hostel, mess, and other institute charges payable.'
      },
      {
        category: 'General / OBC-NCL (Income < ₹1 Lakh)',
        criteria: 'Family income less than ₹1,00,000 per annum',
        waiverPercentage: 100,
        details: '100% Tuition fee waiver under Government of India Remission of Fee scheme.'
      },
      {
        category: 'General / OBC-NCL (Income ₹1 Lakh - ₹5 Lakh)',
        criteria: 'Family income between ₹1,00,000 and ₹5,00,000 per annum',
        waiverPercentage: 66.67,
        details: '2/3rd (66.67%) Tuition fee waiver. Net payable tuition is ₹33,333 per semester.'
      }
    ],
    source: 'IIT Bombay Academic Fee Circular 2025-26',
    status: 'verified',
    lastUpdated: '2025-07-15',
    feeNoticeUrl: 'https://www.iitb.ac.in/academic/fees'
  },
  'iit-delhi': {
    collegeId: 'iit-delhi',
    tuitionPerSem: 100000,
    otherChargesPerSem: 16800,
    annualTuitionTotal: 200000,
    oneTimeAdmissionFee: 8500,
    refundableCautionDeposit: 10000,
    annualHostelFee: 32000,
    annualMessFee: 52000,
    totalAnnualCost: 317600,
    totalEstimated4YearCost: 1270400,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All SC/ST/PwD category students',
        waiverPercentage: 100,
        details: '100% Tuition Fee Waiver across all 8 semesters.'
      },
      {
        category: 'Income < ₹1 Lakh',
        criteria: 'Family annual income under ₹1 Lakh',
        waiverPercentage: 100,
        details: 'Full remission of tuition fees upon income certificate verification.'
      },
      {
        category: 'Income ₹1 - ₹5 Lakh',
        criteria: 'Family annual income ₹1 Lakh to ₹5 Lakh',
        waiverPercentage: 66.67,
        details: 'Two-thirds remission of tuition fees.'
      }
    ],
    source: 'IIT Delhi Official Fee Schedule 2025-26',
    status: 'verified',
    lastUpdated: '2025-07-20'
  },
  'iit-madras': {
    collegeId: 'iit-madras',
    tuitionPerSem: 100000,
    otherChargesPerSem: 14250,
    annualTuitionTotal: 200000,
    oneTimeAdmissionFee: 7500,
    refundableCautionDeposit: 9000,
    annualHostelFee: 35000,
    annualMessFee: 50000,
    totalAnnualCost: 313500,
    totalEstimated4YearCost: 1254000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All SC/ST/PwD students',
        waiverPercentage: 100,
        details: 'Complete tuition exemption.'
      },
      {
        category: 'Income < ₹1 Lakh',
        criteria: 'Annual income below ₹1,00,000',
        waiverPercentage: 100,
        details: '100% Tuition fee remission.'
      }
    ],
    source: 'IIT Madras UG Fee Structure 2025',
    status: 'verified',
    lastUpdated: '2025-08-01'
  },
  'nit-trichy': {
    collegeId: 'nit-trichy',
    tuitionPerSem: 62500,
    otherChargesPerSem: 13200,
    annualTuitionTotal: 125000,
    oneTimeAdmissionFee: 6500,
    refundableCautionDeposit: 6000,
    annualHostelFee: 28000,
    annualMessFee: 46000,
    totalAnnualCost: 225400,
    totalEstimated4YearCost: 901600,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All SC/ST/PwD candidates',
        waiverPercentage: 100,
        details: '100% tuition waiver mandated by Central Seat Allocation Board / MoE.'
      },
      {
        category: 'Economically Backward (Income < ₹1 Lakh)',
        criteria: 'Family income below ₹1 Lakh per year',
        waiverPercentage: 100,
        details: 'Full tuition fee waiver.'
      },
      {
        category: 'Other Economically Backward (Income ₹1 - ₹5 Lakh)',
        criteria: 'Family income ₹1 to ₹5 Lakh',
        waiverPercentage: 66.67,
        details: 'Two-thirds tuition waiver (pays only ₹20,833/sem).'
      }
    ],
    source: 'NIT Trichy Institute Fee Structure 2025',
    status: 'verified',
    lastUpdated: '2025-07-28'
  },
  'nit-surathkal': {
    collegeId: 'nit-surathkal',
    tuitionPerSem: 62500,
    otherChargesPerSem: 14000,
    annualTuitionTotal: 125000,
    oneTimeAdmissionFee: 7000,
    refundableCautionDeposit: 6000,
    annualHostelFee: 30000,
    annualMessFee: 48000,
    totalAnnualCost: 231000,
    totalEstimated4YearCost: 924000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All candidates',
        waiverPercentage: 100,
        details: 'Full tuition exemption.'
      },
      {
        category: 'Income < ₹1 Lakh',
        criteria: 'Family income under 1 LPA',
        waiverPercentage: 100,
        details: '100% Tuition waiver.'
      }
    ],
    source: 'NITK Surathkal Dean Academic Fee Circular',
    status: 'verified',
    lastUpdated: '2025-08-05'
  },
  'iiit-hyderabad': {
    collegeId: 'iiit-hyderabad',
    tuitionPerSem: 190000,
    otherChargesPerSem: 10000,
    annualTuitionTotal: 380000,
    oneTimeAdmissionFee: 15000,
    refundableCautionDeposit: 10000,
    annualHostelFee: 42000,
    annualMessFee: 54000,
    totalAnnualCost: 496000,
    totalEstimated4YearCost: 1984000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'Special Financial Assistance (SFA)',
        criteria: 'Family annual income under ₹8 Lakh',
        waiverPercentage: 50,
        details: 'IIITH offers need-based fee support up to 100% of tuition as an institutional loan with zero interest, repayable after placement.'
      }
    ],
    source: 'IIIT Hyderabad Admissions Portal 2025',
    status: 'verified',
    lastUpdated: '2025-06-12'
  },
  'iiit-allahabad': {
    collegeId: 'iiit-allahabad',
    tuitionPerSem: 84000,
    otherChargesPerSem: 18500,
    annualTuitionTotal: 168000,
    oneTimeAdmissionFee: 12000,
    refundableCautionDeposit: 10000,
    annualHostelFee: 32000,
    annualMessFee: 46000,
    totalAnnualCost: 283000,
    totalEstimated4YearCost: 1132000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'SC / ST / PwD',
        criteria: 'All eligible categories',
        waiverPercentage: 100,
        details: 'Tuition fees waived as per MoE guidelines for CFTIs.'
      }
    ],
    source: 'IIIT Allahabad Academic Section Fee Notification 2025',
    status: 'verified',
    lastUpdated: '2025-07-10'
  },
  'dtu-delhi': {
    collegeId: 'dtu-delhi',
    tuitionPerSem: 105000,
    otherChargesPerSem: 12000,
    annualTuitionTotal: 210000,
    oneTimeAdmissionFee: 5000,
    refundableCautionDeposit: 5000,
    annualHostelFee: 36000,
    annualMessFee: 44000,
    totalAnnualCost: 307000,
    totalEstimated4YearCost: 1228000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'Delhi Govt Merit-cum-Means',
        criteria: 'Family income < ₹2.5 Lakh for Delhi students',
        waiverPercentage: 100,
        details: '100% tuition reimbursement provided by Department of Higher Education, Govt. of NCT of Delhi.'
      }
    ],
    source: 'DTU JAC Delhi Information Brochure 2025',
    status: 'verified',
    lastUpdated: '2025-06-30'
  },
  'jadavpur-university': {
    collegeId: 'jadavpur-university',
    tuitionPerSem: 1200,
    otherChargesPerSem: 800,
    annualTuitionTotal: 2400,
    oneTimeAdmissionFee: 500,
    refundableCautionDeposit: 500,
    annualHostelFee: 3000,
    annualMessFee: 24000,
    totalAnnualCost: 31000,
    totalEstimated4YearCost: 124000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'Free Studentship Scheme',
        criteria: 'Economically challenged students',
        waiverPercentage: 100,
        details: 'Tuition waiver granted by Dean of Students upon submission of family income affidavit.'
      }
    ],
    source: 'Jadavpur University FET Official Information Bulletin 2025',
    status: 'verified',
    lastUpdated: '2025-05-18'
  },
  'bits-pilani': {
    collegeId: 'bits-pilani',
    tuitionPerSem: 260000,
    otherChargesPerSem: 20000,
    annualTuitionTotal: 520000,
    oneTimeAdmissionFee: 53900,
    refundableCautionDeposit: 10000,
    annualHostelFee: 55000,
    annualMessFee: 62000,
    totalAnnualCost: 677000,
    totalEstimated4YearCost: 2708000,
    currency: 'INR',
    categoryWaivers: [
      {
        category: 'Merit-cum-Need (MCN) Scholarship',
        criteria: 'Family income < ₹12-15 LPA with good CGPA',
        waiverPercentage: 80,
        details: 'Up to 80% or 40% tuition fee waiver provided to top 25% of BITS student body under MCN fund.'
      },
      {
        category: 'Institute Merit Scholarship',
        criteria: 'Top 1-2% scorers in semester exams',
        waiverPercentage: 100,
        details: '100% or 40% tuition scholarship regardless of parent income based on CGPA.'
      }
    ],
    source: 'BITS Pilani Fee Structure 2025-26',
    status: 'verified',
    lastUpdated: '2025-07-01'
  }
};
