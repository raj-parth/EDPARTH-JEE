import { CampusInfrastructure } from '@/lib/types';

export const CAMPUSES_DATA: Record<string, CampusInfrastructure> = {
  'iit-bombay': {
    collegeId: 'iit-bombay',
    totalAreaAcres: 550,
    libraryDetails: 'Central Library housing over 500,000 physical volumes, 20,000+ electronic journals, air-conditioned reading halls open 24/7 with ergonomic workspaces.',
    sportsFacilities: ['Olympic-size swimming pool', 'Floodlit cricket ground', 'Gymkhana grounds', 'Squash & tennis courts', 'Weightlifting arena'],
    laboratoriesCount: 145,
    incubationCenter: 'Society for Innovation and Entrepreneurship (SINE) — funded 200+ technology startups with multiple IPOs.',
    medicalFacility: 'IIT Bombay Hospital with 65 beds, operating theatres, pathology labs, and 24/7 ambulance and emergency medical doctors.',
    wifiCoverage: 'Gigabit Wi-Fi 6 coverage across academic complexes, hostels, lecture halls, and open quads.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', caption: 'Main Academic Building & Quadrangle' },
      { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Powai Lakefront scenic walkway' },
      { url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80', caption: 'SINE Innovation and Entrepreneurship Center' }
    ]
  },
  'iit-delhi': {
    collegeId: 'iit-delhi',
    totalAreaAcres: 320,
    libraryDetails: 'Central Library with 300,000+ volumes, RFID automated checkout, digital media resource centre, and round-the-clock air-conditioned study wings.',
    sportsFacilities: ['Mittal Sports Complex with indoor wooden badminton courts', 'Athletic track', 'Olympic swimming pool', 'Basketball courts'],
    laboratoriesCount: 130,
    incubationCenter: 'FITT (Foundation for Innovation and Technology Transfer) — pioneer of academia-industry research tie-ups.',
    medicalFacility: 'IIT Delhi Hospital with full-time medical specialists, diagnostic labs, and tie-up with AIIMS New Delhi for tertiary care.',
    wifiCoverage: 'High-speed optic fiber LAN and unified Wi-Fi network.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Main Administrative Block & Hauz Khas Campus' },
      { url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80', caption: 'Dogra Hall & Academic Concourse' }
    ]
  },
  'nit-trichy': {
    collegeId: 'nit-trichy',
    totalAreaAcres: 800,
    libraryDetails: 'Modern air-conditioned Central Library with 150,000+ volumes, IEEE/ACM digital access, and video conferencing studios.',
    sportsFacilities: ['Synthetically surfaced athletic track', 'Indoor sports stadium', 'Floodlit basketball & tennis courts', 'Olympic pool'],
    laboratoriesCount: 110,
    incubationCenter: 'C-TIDES (Centre for Technology Innovation and Development of Entrepreneurship) and Siemens Centre of Excellence.',
    medicalFacility: 'Comprehensive 24/7 on-campus hospital with resident doctors, dispensary, and intensive emergency triage.',
    wifiCoverage: 'OCTAGON computer centre providing 10 Gbps backbone connectivity.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', caption: 'Octagon Computer Centre' },
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', caption: 'Orion Lecture Hall Complex' }
    ]
  },
  'nit-surathkal': {
    collegeId: 'nit-surathkal',
    totalAreaAcres: 295,
    libraryDetails: 'Central Library with 130,000+ print volumes, online subscriptions to ScienceDirect, Scopus, Springer, and 24/7 digital lab.',
    sportsFacilities: ['Private beach watersports facility', 'Floodlit sports pavilion', 'Indoor badminton stadium', 'Swimming pool complex'],
    laboratoriesCount: 95,
    incubationCenter: 'NITK STEP (Science & Technology Entrepreneurship Park) supported by DST.',
    medicalFacility: 'Health Care Centre with pathology lab, dental clinic, and ambulance service.',
    wifiCoverage: 'Campus-wide gigabit wireless with Eduroam access.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', caption: 'NITK Private Beach and Lighthouse' },
      { url: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80', caption: 'Central Research Facility' }
    ]
  },
  'iiit-hyderabad': {
    collegeId: 'iiit-hyderabad',
    totalAreaAcres: 66,
    libraryDetails: 'Digital-first library with complete ACM, IEEE, Springer, and ArXiv mirror access, dedicated AI/ML reading rooms.',
    sportsFacilities: ['Football field', 'Cricket ground', 'Synthetic basketball courts', 'Indoor TT and Yoga arena'],
    laboratoriesCount: 65,
    incubationCenter: 'CIE (Centre for Innovation and Entrepreneurship) — one of the largest academic incubators in India with 300+ startups.',
    medicalFacility: 'Aarogya Clinic with visiting physicians and Apollo Hospitals network support.',
    wifiCoverage: 'High-density Enterprise Aruba Wi-Fi with unthrottled bandwidth.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', caption: 'Kohli Research Block & CIE' },
      { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Himalaya Block & Green Courtyard' }
    ]
  },
  'dtu-delhi': {
    collegeId: 'dtu-delhi',
    totalAreaAcres: 164,
    libraryDetails: 'Centrally air-conditioned 4-storey library with 180,000 books, DELNET inter-library loan, and digital study sections.',
    sportsFacilities: ['B.R. Ambedkar Sports Complex', 'Olympic gymnasium', '400m running track', 'Floodlit volleyball courts'],
    laboratoriesCount: 90,
    incubationCenter: 'DTU Innovation and Incubation Foundation (DTU-IIF) with state-of-the-art prototyping labs.',
    medicalFacility: 'Health Centre offering outpatient medical services, dispensary, and specialist consultation.',
    wifiCoverage: 'National Knowledge Network (NKN) 1 Gbps high-speed connectivity.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', caption: 'DTU Main Administrative Entrance' },
      { url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80', caption: 'Sports Complex and Academic Grounds' }
    ]
  },
  'bits-pilani': {
    collegeId: 'bits-pilani',
    totalAreaAcres: 328,
    libraryDetails: 'Architecturally famous Clock Tower Library with 250,000+ books, extensive rare manuscripts, and 24/7 central air-conditioned reading halls.',
    sportsFacilities: ['Student Activity Centre (SAC)', 'Laxmi Narayan Temple gardens', 'Floodlit football and cricket stadium', 'Tennis courts'],
    laboratoriesCount: 105,
    incubationCenter: 'Technology Business Incubator (Pilani Innovation & Entrepreneurship Development Society - PIEDS).',
    medicalFacility: 'MedC Health Centre with inpatient beds, pathology, pharmacy, and 24/7 emergency doctor coverage.',
    wifiCoverage: 'High-speed gigabit Wi-Fi covering all Bhawans, classrooms, and cafeteria clusters.',
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80', caption: 'Historic BITS Pilani Clock Tower & Auditorium' },
      { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', caption: 'Student Activity Centre (SAC)' }
    ]
  }
};
