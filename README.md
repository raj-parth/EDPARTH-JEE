# EDPARTH — Engineering College Discovery & Admission Data Platform

> **EDPARTH** is a fast, clean, professional engineering college discovery, cutoff intelligence, and comparison platform built for JEE aspirants, parents, and academic counsellors across India.

Designed with the restraint and precision of premier SaaS products (Linear, Stripe, Notion), EDPARTH provides verified JoSAA, CSAB, NIRF, and institutional admission data across 30+ benchmark institutions in India.

---

## Key Features

1. **Global College Explorer (`/colleges`)**
   - Multi-faceted desktop sidebar and mobile drawer filters.
   - Filter by State, College Classification (IIT, NIT, IIIT, GFTI, State Govt, Top Private), Exam, Counselling authority, Max 4-Year Fees, and Min Average Placement.
   - Sort by NIRF Rank, Average Package, Highest Package, 4-Year Fees, and Name.
   - Instant quick-actions: View Profile, Add to Side-by-Side Compare (up to 4 colleges), and Bookmark to Shortlist.

2. **College Profile Hub (`/college/[slug]`)**
   - Dynamic deep college profile with sticky tabbed navigation across 9 dedicated dimensions:
     - **Overview**: Foundation year, campus area, NIRF rank, accreditations, institutional summary, highlights, and campus photo gallery.
     - **Cutoffs**: Multi-year interactive cutoff records (2023, 2024, 2025) filterable by Round, Quota (AI/HS/OS), Category (OPEN, EWS, OBC-NCL, SC, ST, PwD), and Gender pool, plus an interactive **Closing Rank Trajectory Trend Line Chart** powered by Recharts.
     - **Branches**: Complete inventory of offered specializations with duration, degree type, core curriculum highlights, and top hiring sectors.
     - **Fees & Costs**: Itemized fee schedule (Semester tuition, one-time fees, caution deposit, hostel rent, mess charges), estimated 4-year projection, and Government of India category fee remissions (100% waiver for SC/ST and income < ₹1L; 66% waiver for income ₹1L-₹5L).
     - **Placements**: Year-labeled official reports with Highest, Average, and Median packages, placement rates, branch-wise compensation bar chart, and major visiting recruiters.
     - **Hostel & Mess**: Capacity, room types (Single/Double/Triple), AC/Non-AC options, mess cuisine varieties (Veg/Non-Veg, Jain, regional menus), curfew timings, and house rules.
     - **Campus & Facilities**: Central library specifications, athletic stadiums, specialized laboratories, startup incubation centres, and hospital infrastructure.
     - **Admission Process**: Step-by-step seat allocation flowchart, eligibility prerequisites (75% / top 20 percentile), mandatory physical reporting document checklist, and official portal links.
     - **Reviews & FAQs**: Transparent answers to common student inquiries.

3. **National Cutoff Explorer (`/cutoffs`)**
   - Cross-institutional cutoff database with live multi-column sorting and filtering.
   - Instant CSV export for offline analysis and counselling preparation.

4. **JEE Main Percentile & Rank Explorer (`/predictor`)**
   - Enter your JEE Main Percentile or estimated CRL rank.
   - Select Category, Gender pool, Home State (to test Home State vs Other State quotas), and Preferred Branch.
   - Colleges matched and categorized into **High Possibility (Safe)**, **Moderate / Competitive**, and **Ambitious / Reach** tiers based on historical closing thresholds.
   - Strict ethical disclaimer emphasizing that historical trends are indicators rather than guaranteed seat allotments.

5. **Side-by-Side College Comparison (`/compare`)**
   - Compare up to 4 colleges simultaneously across Basic Info, NIRF Ranking, Fees, Average/Highest Packages, Cutoff Benchmarks, and Residential Facilities.
   - Neutral presentation without artificial "winner" bias.

6. **Personalized Shortlist (`/bookmarks`)**
   - Saved colleges stored in browser local storage.
   - Printable shortlist for parents and student meetings.

7. **Entrance Exams (`/exams`) & Branches (`/branches`) Directories**
   - Complete guides to JEE Main, JEE Advanced, BITSAT, VITEEE, MET, WBJEE, and engineering disciplines.

8. **Transparency & Methodology (`/methodology`)**
   - Detailed documentation on JoSAA data collection, NTA percentile-to-rank conversion math, fee calculation rules, and verification standards.

---

## Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict typing for colleges, cutoffs, fees, placements, and facilities)
- **Styling**: Tailwind CSS with custom typography, responsive design, and CSS variables
- **Dark Mode**: `next-themes` (Class-based intentional dark mode)
- **Visualizations**: `recharts` for Cutoff Trajectory and Placement Distribution
- **Icons**: `lucide-react`
- **Deployment**: Vercel-ready static/SSR architecture

---

## Project Structure

```
d:\EDPARTH
├── app/
│   ├── layout.tsx                # Root layout with Navbar, Footer & Providers
│   ├── page.tsx                  # Landing page with search, exams, categories & trust
│   ├── LandingClient.tsx         # Client interactivity for home page
│   ├── providers.tsx             # Theme & global AppStore providers
│   ├── globals.css               # Tailwind CSS base and theme rules
│   ├── not-found.tsx             # 404 recovery state
│   ├── error.tsx                 # Error boundary
│   ├── colleges/                 # /colleges explorer route
│   │   ├── page.tsx
│   │   └── CollegeExplorerClient.tsx
│   ├── college/[slug]/           # Dynamic /college/[slug] route
│   │   ├── page.tsx
│   │   └── CollegeDetailClientWrapper.tsx
│   ├── cutoffs/                  # /cutoffs national cutoff explorer
│   ├── predictor/                # /predictor JEE percentile explorer
│   ├── compare/                  # /compare side-by-side comparator
│   ├── bookmarks/                # /bookmarks saved shortlist
│   ├── methodology/              # /methodology data provenance
│   ├── exams/                    # /exams directory
│   └── branches/                 # /branches discipline guide
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            # Sticky navbar with search, bookmarks & theme toggle
│   │   ├── Footer.tsx            # SaaS footer with source links & legal notices
│   │   ├── GlobalSearchModal.tsx # Cmd+K fuzzy search modal
│   │   └── ThemeToggle.tsx       # Dark/light mode switcher
│   └── college/
│       ├── CollegeCard.tsx       # Reusable college card with stats & actions
│       ├── CollegeHeader.tsx     # Institutional header banner
│       ├── OverviewTab.tsx       # General overview, stats & gallery
│       ├── CutoffsTab.tsx        # Filterable table & closing rank trend chart
│       ├── BranchesTab.tsx       # Curricula & job roles
│       ├── FeesTab.tsx           # Itemized fees & category waivers
│       ├── PlacementsTab.tsx     # Salary metrics, branch bar chart & recruiters
│       ├── HostelTab.tsx         # Hostels, mess charges & rules
│       ├── CampusTab.tsx         # Infrastructure & labs
│       └── AdmissionTab.tsx      # Flowchart & document checklist
├── lib/
│   ├── types/                    # Core TypeScript schemas
│   ├── data/                     # Seed databases (colleges, cutoffs, fees, etc.)
│   ├── store/                    # Bookmarks and Comparison state store
│   └── utils.ts                  # Currency and rank helpers
├── public/                       # Static public assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run production build verification**:
   ```bash
   npm run build
   ```

4. **Lint code**:
   ```bash
   npm run lint
   ```

---

## Deployment on Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"New Project"**.
3. Import the repository.
4. Set Framework Preset to **Next.js**.
5. Add any environment variables from `.env.example` if required.
6. Click **Deploy**. Vercel will automatically build and deploy the Next.js production bundle.

---

## Data Source & Integrity Policy

Every statistic on EDPARTH references its official origin:
- **Cutoffs**: Joint Seat Allocation Authority (JoSAA) & CSAB Archives
- **Rankings**: National Institutional Ranking Framework (NIRF) 2025
- **Placements**: Institutional Training & Placement (T&P) verified annual reports
- **Fees**: Approved institutional fee circulars with Government of India fee waiver guidelines

*Disclaimer: Cutoff and rank data shown is based on historical counselling archives. Actual admissions are conducted strictly through official counselling authorities.*
