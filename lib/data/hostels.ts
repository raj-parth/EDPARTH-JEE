import { HostelInfo } from '@/lib/types';

export const HOSTELS_DATA: Record<string, HostelInfo> = {
  'iit-bombay': {
    collegeId: 'iit-bombay',
    hostelAvailable: true,
    totalHostelsBoys: 16,
    totalHostelsGirls: 3,
    roomTypes: ['Single', 'Double'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 54000,
    annualHostelRoomCharges: 34000,
    facilities: [
      'High-speed LAN in every room & campus-wide Wi-Fi',
      'Common rooms with LCD TV, table tennis, and carrom',
      '24/7 night canteens in every hostel block',
      'Washing machines & laundry facilities on alternate floors',
      'Dedicated badminton courts in central quadrangles'
    ],
    rules: [
      'Institute student identity card mandatory for entry after midnight.',
      'Visitors permitted only in lounge areas during prescribed visiting hours.',
      'Zero-tolerance policy on smoking, alcohol, and narcotics across all residences.'
    ],
    curfewTimings: 'No curfew for undergraduate senior students within campus perimeters',
    source: 'IIT Bombay Hostel Coordinating Committee (HCC) Guide 2025',
    status: 'verified'
  },
  'iit-delhi': {
    collegeId: 'iit-delhi',
    hostelAvailable: true,
    totalHostelsBoys: 13,
    totalHostelsGirls: 5,
    roomTypes: ['Single', 'Double', 'Triple'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 52000,
    annualHostelRoomCharges: 32000,
    facilities: [
      'Fiber-optic Gigabit Ethernet connection to every room',
      'Student-managed mess committees with regional rotation',
      'In-house gymnasiums and indoor games arenas',
      '24-hour reading rooms and air-conditioned library extensions'
    ],
    rules: [
      'Entry after 1:00 AM requires biometric log registration at main gate.',
      'Guests must be pre-approved via online Dean Student Affairs portal.'
    ],
    curfewTimings: 'Open movement inside campus 24/7; external gate entry restricted 1:00 AM - 5:00 AM',
    source: 'IIT Delhi Board for Hostel Management (BHM) 2025',
    status: 'verified'
  },
  'nit-trichy': {
    collegeId: 'nit-trichy',
    hostelAvailable: true,
    totalHostelsBoys: 22,
    totalHostelsGirls: 6,
    roomTypes: ['Single', 'Double', 'Triple'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 46000,
    annualHostelRoomCharges: 28000,
    facilities: [
      'Mega Mess Complex catering to North Indian, South Indian, and Jain cuisines',
      'High-bandwidth Wi-Fi with campus proxy',
      'Shopping complex, ATM, post office, and pharmacy within hostel zone',
      'Doctor on duty with ambulance service stationed near hostel circle'
    ],
    rules: [
      'First-year students are accommodated in exclusive mega-hostels with biometric sign-in.',
      'Mess rebate applicable for official academic leaves exceeding 4 consecutive days.'
    ],
    curfewTimings: '10:00 PM for first-year undergraduates; 11:30 PM for seniors',
    source: 'NIT Trichy Hostel Administration Committee (HAC) 2025',
    status: 'verified'
  },
  'nit-surathkal': {
    collegeId: 'nit-surathkal',
    hostelAvailable: true,
    totalHostelsBoys: 12,
    totalHostelsGirls: 5,
    roomTypes: ['Single', 'Double', 'Triple'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 48000,
    annualHostelRoomCharges: 30000,
    facilities: [
      'Scenic Arabian sea view from coastal hostel wings',
      'Multiple regional messes (North Indian, South Veg, South Non-Veg, Special Kerala Mess)',
      'Solar water heaters & reverse osmosis drinking water plants',
      'Recreation rooms with pool tables and gym access'
    ],
    rules: [
      'Beach access from hostel gate restricted after 6:30 PM for safety.',
      'Mandatory biometric hostel entry by 11:00 PM.'
    ],
    curfewTimings: '11:00 PM hostel gate entry',
    source: 'NITK Surathkal Hostel Affairs 2025',
    status: 'verified'
  },
  'iiit-hyderabad': {
    collegeId: 'iiit-hyderabad',
    hostelAvailable: true,
    totalHostelsBoys: 4,
    totalHostelsGirls: 2,
    roomTypes: ['Single', 'Double'],
    acAvailable: true,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 54000,
    annualHostelRoomCharges: 42000,
    facilities: [
      'Fully air-conditioned reading halls and common areas',
      'Four diverse dining messes (Yukthahar healthy vegetarian, South, North, Non-Veg)',
      'Gigabit Wi-Fi with seamless roaming',
      '24/7 canteen with fresh juices, pizzas, and midnight snacks'
    ],
    rules: [
      'Students must maintain academic quiet hours in living quarters.',
      'Mandatory stay in hostels for all undergraduate students.'
    ],
    curfewTimings: 'No curfew inside campus perimeter; 24/7 lab and hostel access',
    source: 'IIIT Hyderabad Council of Wardens 2025',
    status: 'verified'
  },
  'dtu-delhi': {
    collegeId: 'dtu-delhi',
    hostelAvailable: true,
    totalHostelsBoys: 9,
    totalHostelsGirls: 6,
    roomTypes: ['Single', 'Double', 'Triple'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 44000,
    annualHostelRoomCharges: 36000,
    facilities: [
      'High-speed Wi-Fi, indoor badminton courts, and common TV room',
      'Central canteen, cafeteria, and Maggi junctions open late',
      'Health centre with round-the-clock emergency medical response'
    ],
    rules: [
      'Outside Delhi students receive priority allotment due to high local commuter ratio.',
      'Hostel gate timings strictly enforced for safety.'
    ],
    curfewTimings: '10:30 PM gate closure',
    source: 'DTU Chief Warden Office Circular 2025',
    status: 'verified'
  },
  'bits-pilani': {
    collegeId: 'bits-pilani',
    hostelAvailable: true,
    totalHostelsBoys: 14,
    totalHostelsGirls: 2,
    roomTypes: ['Single', 'Double'],
    acAvailable: false,
    messType: 'Veg & Non-Veg',
    annualMessCharges: 62000,
    annualHostelRoomCharges: 55000,
    facilities: [
      '100% single occupancy rooms for 3rd and 4th year undergraduate students (Bhawans)',
      'Modern automated student messes with continental and regional menus',
      'Redi food joints and night canteens until 2:30 AM',
      'Student Union gym, music rooms, and sports complex'
    ],
    rules: [
      '100% residential campus — living in on-campus bhawans is mandatory for all students.',
      'Zero ragging tolerance enforced through Student Welfare Division.'
    ],
    curfewTimings: 'No curfew inside campus; students free to move between bhawans and library all night',
    source: 'BITS Pilani SWD Residential Life Guide 2025',
    status: 'verified'
  }
};
