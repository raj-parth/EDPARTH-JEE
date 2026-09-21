export interface Faculty {
  id: string;
  name: string;
  subject: string;
  role: string;
  experience: string;
  education: string;
  alumni: string;
  studentsMentored: string;
  avatarUrl?: string;
  bio: string;
  rating: number;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  isFreePreview?: boolean;
  notesCount?: number;
  dppCount?: number;
}

export interface Chapter {
  id: string;
  title: string;
  lecturesCount: number;
  notesCount: number;
  dppCount: number;
  lectures?: Lecture[];
}

export interface ClassroomSubject {
  id: string;
  name: string;
  facultyName: string;
  facultyEducation: string;
  colorScheme: 'indigo' | 'emerald' | 'amber' | 'blue' | 'rose' | 'purple';
  totalChapters: number;
  totalLectures: number;
  totalDpps: number;
  chapters: Chapter[];
}

export interface ScheduleSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  subject: string;
  topic: string;
  time: string;
  faculty: string;
  mode: 'LIVE' | 'PRACTICE' | 'DOUBT';
}

export interface TestSeriesItem {
  id: string;
  title: string;
  type: 'AITS Full Mock' | 'Chapter Test' | 'Part Syllabus' | 'JoSAA Mock';
  duration: string;
  totalMarks: number;
  totalQuestions: number;
  syllabus: string;
  isFree?: boolean;
  attemptsCount: string;
}

export interface BatchFAQ {
  question: string;
  answer: string;
  category?: 'General' | 'Classes & Recordings' | 'Test Series' | 'Mentorship & Doubts';
}

export interface BatchReview {
  id: string;
  studentName: string;
  targetExam: string;
  rankAchieved?: string;
  allottedCollege?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Batch {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'JEE Main + Adv' | 'JoSAA Mentorship' | 'Droppers' | 'Class 12th';
  targetYear: string;
  classGrade: string;
  language: 'Hinglish' | 'English' | 'Hindi';
  startDate: string;
  endDate: string;
  validity: string;
  status: 'Enrolling Now' | 'Starting Soon' | 'In Progress';
  price: {
    original: number;
    discounted: number;
    discountPercent: number;
  };
  rating: {
    score: number;
    count: string;
    enrolledStudents: string;
  };
  badges: string[];
  keyHighlights: string[];
  description: {
    about: string;
    whoShouldJoin: string[];
    whatWillYouLearn: string[];
    weeklyHours: string;
  };
  classroomSubjects: ClassroomSubject[];
  faculties: Faculty[];
  schedule: ScheduleSlot[];
  testSeries: TestSeriesItem[];
  faqs: BatchFAQ[];
  reviews: BatchReview[];
  previewVideoUrl?: string;
}
