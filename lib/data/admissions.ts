import { AdmissionDetails } from '@/lib/types';

export const ADMISSIONS_DATA: Record<string, AdmissionDetails> = {
  'iit-bombay': {
    collegeId: 'iit-bombay',
    acceptedExams: ['JEE Advanced'],
    counsellingAuthority: 'JoSAA',
    eligibilityCriteria: [
      'Top 2,50,000 successful candidates in JEE Main who subsequently qualified JEE Advanced.',
      'Must have passed Class 12 (or equivalent) with Physics, Chemistry, and Mathematics.',
      'Aggregate marks of at least 75% in Class 12 board examination (65% for SC, ST, and PwD), or within the category-wise top 20 percentile of respective qualifying board.',
      'Maximum of two attempts in JEE Advanced in consecutive years.'
    ],
    documentsRequired: [
      'Provisional Seat Allotment Letter (JoSAA)',
      'JEE Advanced Admit Card & Rank Card',
      'Class 10th Certificate / Birth Certificate (Date of birth proof)',
      'Class 12th Marksheet and Passing Certificate',
      'Category Certificate (GEN-EWS / OBC-NCL / SC / ST) issued on or after April 1 of admission year',
      'Medical Examination Report in prescribed JoSAA format',
      'Valid Photo ID Proof (Aadhaar Card / Passport)',
      'Fee Payment Receipt of Seat Acceptance Fee (SAF)'
    ],
    steps: [
      { stepNumber: 1, title: 'JEE Main Qualification', description: 'Appear for JEE Main and secure an All India Rank within the top 2.5 Lakh candidates eligible for JEE Advanced.' },
      { stepNumber: 2, title: 'JEE Advanced Examination', description: 'Register and appear for both Paper 1 and Paper 2 of JEE Advanced in late May.' },
      { stepNumber: 3, title: 'JoSAA Registration & Choice Filling', description: 'Register on the official JoSAA portal, lock preferred choices of IIT Bombay branches in descending preference order.' },
      { stepNumber: 4, title: 'Seat Allotment Rounds', description: 'Participate in Rounds 1 through 5 of JoSAA. Choose Float, Slide, or Freeze upon receiving a provisional offer.' },
      { stepNumber: 5, title: 'Online Reporting & Fee Payment', description: 'Upload verified documents and pay the Seat Acceptance Fee (₹35,000 for General/OBC, ₹17,500 for SC/ST).' },
      { stepNumber: 6, title: 'Physical Reporting & Registration', description: 'Report to IIT Bombay campus in Powai for physical document verification, biometric capture, hostel allotment, and orientation.' }
    ],
    officialPortalUrl: 'https://josaa.nic.in',
    applicationPeriod: 'JoSAA Choice Filling: Mid-June to Late-June',
    reportingVenue: 'IIT Bombay, Powai, Mumbai - 400076'
  },
  'nit-trichy': {
    collegeId: 'nit-trichy',
    acceptedExams: ['JEE Main'],
    counsellingAuthority: 'JoSAA',
    eligibilityCriteria: [
      'Qualified JEE Main with an All India Rank.',
      'Minimum 75% aggregate in Class 12 board exam (65% for SC/ST/PwD) or top 20 percentile.',
      'Home State (HS) quota requires candidate to have passed Class 12 in Tamil Nadu.'
    ],
    documentsRequired: [
      'JoSAA / CSAB Provisional Seat Allotment Letter',
      'JEE Main Score Card & Admit Card',
      'Class 10 & Class 12 Marksheets',
      'State of Eligibility Certificate',
      'Category Certificate & PwD certificate (if applicable)',
      'Medical Fitness Certificate'
    ],
    steps: [
      { stepNumber: 1, title: 'JEE Main Exam', description: 'Appear in Session 1 (Jan) or Session 2 (Apr) and obtain an NTA score.' },
      { stepNumber: 2, title: 'JoSAA / CSAB Choice Locking', description: 'Lock NIT Trichy branches under Home State (HS) or Other State (OS) quota.' },
      { stepNumber: 3, title: 'Seat Allotment & Document Upload', description: 'Accept seat, upload documents online, and resolve queries raised by verifying officer.' },
      { stepNumber: 4, title: 'CSAB Special Rounds (Optional)', description: 'Participate in CSAB special rounds if seats remain vacant after JoSAA round 5.' },
      { stepNumber: 5, title: 'Institute Physical Registration', description: 'Physical reporting at Orion Hall, NIT Trichy for balance institute fee submission and hostel allotment.' }
    ],
    officialPortalUrl: 'https://josaa.nic.in',
    applicationPeriod: 'June - July',
    reportingVenue: 'Orion Complex, National Institute of Technology, Tiruchirappalli - 620015'
  },
  'dtu-delhi': {
    collegeId: 'dtu-delhi',
    acceptedExams: ['JEE Main'],
    counsellingAuthority: 'JAC Delhi',
    eligibilityCriteria: [
      'Valid JEE Main All India Common Rank List (CRL) rank.',
      'Minimum 60% aggregate in Physics, Chemistry, and Mathematics in Class 12 (50% for SC/ST/PwD).',
      'Delhi Region Candidates (85% quota): Must have passed Class 12 from a school located in NCT of Delhi.',
      'Outside Delhi Candidates (15% quota): Passed Class 12 from schools outside NCT of Delhi.'
    ],
    documentsRequired: [
      'JAC Delhi Registration Form & Seat Allotment Letter',
      'JEE Main Admit Card & Score Card',
      'Class 10th & 12th Original Marksheets & Certificates',
      'Category / Sub-category Certificate (Delhi OBC non-creamy layer from authorized Delhi revenue officer)',
      'Medical Fitness Certificate',
      'Character Certificate from last attended institution'
    ],
    steps: [
      { stepNumber: 1, title: 'JAC Delhi Registration', description: 'Register on jacdelhi.admissions.nic.in using JEE Main Application Number.' },
      { stepNumber: 2, title: 'Choice Filling & Locking', description: 'Fill prioritized list of DTU, NSUT, IIIT-D, and IGDTUW programmes.' },
      { stepNumber: 3, title: 'Allotment & SAF Payment', description: 'Pay ₹95,000 Seat Acceptance Fee upon seat allotment.' },
      { stepNumber: 4, title: 'Document Verification', description: 'Physical document verification at the designated reporting institute.' }
    ],
    officialPortalUrl: 'https://jacdelhi.admissions.nic.in',
    applicationPeriod: 'Late May to June',
    reportingVenue: 'B.R. Ambedkar Auditorium, Delhi Technological University, Shahbad Daulatpur, Bawana Road, Delhi - 110042'
  },
  'bits-pilani': {
    collegeId: 'bits-pilani',
    acceptedExams: ['BITSAT'],
    counsellingAuthority: 'Direct / University',
    eligibilityCriteria: [
      'Minimum 75% aggregate marks in Physics, Chemistry, and Mathematics in Class 12th.',
      'At least 60% marks in each of Physics, Chemistry, and Mathematics individually.',
      'Must have appeared in BITSAT 2025.'
    ],
    documentsRequired: [
      'BITSAT Score Card & Allotment Letter',
      'Class 10th & 12th Marksheets & Certificates',
      'Transfer / Migration Certificate',
      'Proof of admission fee remittance'
    ],
    steps: [
      { stepNumber: 1, title: 'BITSAT Examination', description: 'Appear in Session 1 or Session 2 of BITSAT.' },
      { stepNumber: 2, title: 'Iteration Choice Filling', description: 'Submit 12th marks and order of campus/branch preference (Pilani, Goa, Hyderabad).' },
      { stepNumber: 3, title: 'Iteration Results & Admission', description: 'Iterative seat assignment across Iterations 1 to 6.' },
      { stepNumber: 4, title: 'Campus Reporting', description: 'Report to allotted campus for orientation and document verification.' }
    ],
    officialPortalUrl: 'https://www.bitsadmission.com',
    applicationPeriod: 'June - July',
    reportingVenue: 'BITS Pilani Campus, Vidya Vihar, Pilani, Rajasthan - 333031'
  }
};
