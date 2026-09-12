// SparkX Hackathon 2026 — single source of truth for the event details shown
// on the home page, the roadmap and the dedicated /hackathon page.

export const hackathon = {
  name: "SparkX Hackathon",
  tagline: "Code. Create. Innovate.",
  organiser: "PGS Software Club",
  dates: "17–18 September 2026",
  datesLong: "Thursday 17 September – Friday 18 September 2026",
  duration: "24 continuous hours",
  campusHours: "8:00 am – 5:00 pm on campus each day",
  venue: "College Hall, Presidential Graduate School, Thapagaun",
  teams: "10 teams · 2–4 members each",
  maxParticipants: 40,
  fee: "Free — open to all enrolled PGS students",
  prizePool: "NPR 25,000",
  registrationOpens: "10 August 2026",
  registrationCloses: "13 September 2026",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScQrwZxr0GfU8nnWsBQE90c10hGb5zR1rPxrYBj6T_EVfRpqA/viewform",
};

export const stats = [
  { value: "24", label: "Hours on the clock" },
  { value: "10", label: "Teams · 2–4 members" },
  { value: "3", label: "Tracks · 3 prizes" },
  { value: "25K", label: "NPR prize money" },
];

export const formatNote =
  "The clock runs for twenty-four unbroken hours, from kickoff at 10:00 on Thursday 17 September to the hard submission deadline at 10:00 on Friday 18 September. Teams build on campus from 8:00 am to 5:00 pm on the first day, go home in the evening and keep building remotely, then return at 8:00 am on the second day for rehearsal, judging and the closing ceremony. Nobody stays overnight at the college.";

export const tracks = [
  {
    number: "Track One",
    name: "AI & Machine Learning",
    description:
      "Applied intelligence — assistants, prediction, computer vision, language tools, recommendation, and automation of real workflows.",
    icon: "brain",
    color: "bg-blue-500",
  },
  {
    number: "Track Two",
    name: "Cybersecurity",
    description:
      "Defensive and awareness tooling — threat detection, secure authentication, privacy, phishing and fraud protection, security education.",
    icon: "shield",
    color: "bg-purple-500",
  },
  {
    number: "Track Three",
    name: "Open Innovation",
    description:
      "Anything else that solves a genuine problem — education, health, campus life, agriculture, tourism, sustainability or civic services.",
    icon: "lightbulb",
    color: "bg-green-500",
  },
];

export const trackNote =
  "Each team commits to exactly one track at registration. Problem statements are released only at the opening ceremony, so no team can begin work in advance. Cybersecurity projects must be defensive in nature — no offensive tooling, and no testing against systems the team does not own.";

export const eligibility = [
  "Open to all currently enrolled students of Presidential Graduate School, across all semesters and programmes.",
  "Teams of minimum two and maximum four members. Individual entries are not accepted.",
  "Cross-programme and cross-semester teams are encouraged; each team nominates one team lead as the single point of contact.",
  "A student may belong to only one team. Team composition is locked at the close of registration.",
  "Members of the organising committee, mentors and judges may not compete.",
  "The chosen track cannot be changed after the opening ceremony.",
  "Ten teams are admitted. If registrations exceed ten, teams are shortlisted on the strength of the 200-word idea abstract, balanced across the three tracks; the rest go on a waiting list.",
  "Every member attends both campus days — 8:00 am to 5:00 pm on 17 September and from 8:00 am on 18 September — and carries a college ID at all times.",
  "Work continues remotely between 5:00 pm and 8:00 am. That window is part of the twenty-four hours, and commits made in it are reviewed like any other.",
];

export const preEventTimeline = [
  { date: "10 August 2026", milestone: "Registration opens — team name, members, team lead, chosen track and a 200-word idea abstract" },
  { date: "10 Aug – 13 Sept 2026", milestone: "Registration window open; club representatives visit classes and answer queries" },
  { date: "13 September 2026", milestone: "Registration closes" },
  { date: "14 September 2026", milestone: "Ten teams confirmed and published across the three tracks; waiting list notified" },
  { date: "15 September 2026", milestone: "Compulsory orientation and rule briefing for all team leads (one hour)" },
  { date: "16 September 2026", milestone: "Mentor–team allocation published; venue setup, network load test, power and seating check" },
  { date: "17–18 September 2026", milestone: "SparkX Hackathon" },
  { date: "By 30 September 2026", milestone: "Event report, settled accounts and project showcase published" },
];

export const scheduleDayOne = [
  { time: "08:00 – 08:45", activity: "Reporting, ID verification and seat allotment" },
  { time: "08:45 – 09:30", activity: "Opening ceremony — welcome address, rules, release of the track problem statements" },
  { time: "09:30 – 10:00", activity: "Mentor introductions and team–mentor pairing" },
  { time: "10:00", activity: "Clock starts — the twenty-four hours begin; repositories created and registered", highlight: true },
  { time: "11:00 – 12:00", activity: "Checkpoint 1 — problem statement and scope validation" },
  { time: "12:30 – 13:15", activity: "Lunch (served at desks in rotation; the clock does not stop)" },
  { time: "14:00 – 15:00", activity: "Checkpoint 2 — architecture and technology-stack review" },
  { time: "15:00 – 15:30", activity: "Evening tea, coffee and snacks" },
  { time: "15:45 – 16:45", activity: "Checkpoint 3 — progress review and MVP scope-cut advice" },
  { time: "16:45 – 17:00", activity: "Daily close-out — attendance, progress roll call, overnight mentor roster published" },
  { time: "17:00", activity: "Venue clears — teams go home and keep building remotely; the clock does not stop", highlight: true },
  { time: "19:30 – 21:30", activity: "Checkpoint 4 — online debugging clinic on the club channel; mentors on call for blockers" },
];

export const scheduleDayTwo = [
  { time: "08:00 – 08:30", activity: "Reporting and re-seating; network, projector and demo setup" },
  { time: "08:30 – 09:15", activity: "Checkpoint 5 — demo rehearsal and pitch feedback" },
  { time: "09:15 – 09:50", activity: "Final commits, documentation and submission upload" },
  { time: "10:00", activity: "Clock stops at twenty-four hours — hard submission deadline; presentations begin", highlight: true },
  { time: "10:00 – 10:50", activity: "Judging — teams 1 to 5 (10 minutes each)" },
  { time: "10:50 – 11:05", activity: "Break for judges and participants" },
  { time: "11:05 – 11:55", activity: "Judging — teams 6 to 10" },
  { time: "11:55 – 12:30", activity: "Panel deliberation and score consolidation" },
  { time: "12:30 – 13:00", activity: "Lunch" },
  { time: "13:00 – 14:00", activity: "Winner announcement, prizes, certificates and closing ceremony", highlight: true },
  { time: "14:00 – 15:00", activity: "Project showcase, group photograph and networking; venue reset" },
];

export const checkpoints = [
  { round: "CP 1", time: "Day 1 · 11:00 – 12:00", focus: "Is the problem real, is the scope achievable in 24 hours, is the idea distinct?" },
  { round: "CP 2", time: "Day 1 · 14:00 – 15:00", focus: "Architecture, technology-stack sanity, data model, division of work" },
  { round: "CP 3", time: "Day 1 · 15:45 – 16:45", focus: "Honest progress check; cutting scope down to a demonstrable MVP" },
  { round: "CP 4", time: "Day 1 · 19:30 – 21:30", focus: "Online debugging clinic — teams raise blockers from home, mentors pair remotely on the hardest bugs" },
  { round: "CP 5", time: "Day 2 · 08:30 – 09:15", focus: "Demo rehearsal, pitch narrative, anticipated questions" },
];

export const mentorPanel = [
  "Three faculty mentors from the IT and management departments, on a rotating duty roster.",
  "Two alumni mentors working in the software industry, invited through the alumni network.",
  "Three industry professionals from Kathmandu technology companies — one aligned to each track.",
  "Mentors advise; they do not write code, and no code may be authored by anyone outside the team.",
  "At least two mentors are in the hall through both campus days, and an on-call roster covers the remote evening window.",
];

export const submissions = [
  {
    title: "Source-code repository",
    detail: "A Git repository created at the start of the event, with commits visible throughout the 24 hours and access granted to the technical committee.",
  },
  {
    title: "README file",
    detail: "The problem, the solution, the technology stack, setup instructions, team members, and a declaration of all third-party libraries, APIs, templates and AI assistance used.",
  },
  {
    title: "A working demonstration",
    detail: "A deployed link or a locally runnable build, plus a three-minute screen-recorded demo video as a fallback in case of network or hardware failure.",
  },
  {
    title: "Presentation deck",
    detail: "A maximum of ten slides, submitted as PDF.",
  },
];

export const codeRules = {
  permitted: [
    "Open-source libraries and frameworks",
    "Publicly available starter templates and UI kits",
    "Public APIs, pre-trained models and open datasets",
    "AI coding assistants — encouraged, provided the team discloses which tools were used and for what",
  ],
  notPermitted: [
    "Submitting a previous personal, academic or commercial project",
    "Continuing work on a private codebase begun before the event",
    "Undisclosed or unexplainable AI-generated code",
    "Unattributed code copied from an external source, or plagiarism of another team's work",
  ],
  note:
    "All feature code must be written inside the 24-hour window, on campus or at home during the evening. Repositories are registered at kickoff and the full commit history is reviewed. Every member must be able to explain any part of the submitted code during the question round.",
};

export const judgingFormat = [
  { value: "5", label: "min pitch" },
  { value: "3", label: "min live demo" },
  { value: "2", label: "min question round" },
  { value: "2", label: "min changeover" },
];

export const judgingCriteria = [
  { criterion: "Innovation & Originality", detail: "Freshness of the idea and of the approach taken", weight: 20 },
  { criterion: "Technical Implementation", detail: "Engineering depth, code quality, sound architectural choices", weight: 20 },
  { criterion: "Functionality & Completeness", detail: "Does the prototype actually run and do what is claimed?", weight: 15 },
  { criterion: "Problem Relevance & Impact", detail: "Significance of the problem and plausibility of real-world use", weight: 15 },
  { criterion: "User Experience & Design", detail: "Usability, clarity and finish of the interface", weight: 10 },
  { criterion: "Presentation & Demo", detail: "Clarity of the pitch, quality of the demo, handling of questions", weight: 10 },
  { criterion: "Teamwork & Process", detail: "Commit history, contribution of all members, use of the checkpoints, honest disclosure", weight: 10 },
];

export const awards = [
  {
    award: "Champion",
    recognition: "Best team overall — trophy, winner certificates and the full cash prize",
    prize: "NPR 20,000",
    featured: true,
  },
  {
    award: "First Runner-Up",
    recognition: "Second-placed team overall — trophy, certificates and a sponsored gift hamper",
    prize: "Gift hamper",
  },
  {
    award: "Second Runner-Up",
    recognition: "Third-placed team overall — trophy, certificates and a sponsored gift hamper",
    prize: "Gift hamper",
  },
];

export const awardsNote =
  "All ten teams are ranked on one common scale regardless of track. The cash prize of NPR 20,000 goes to the champion; the two runners-up receive sponsored gift hampers, and the prize pool is worth NPR 25,000 in total. Winners are announced at 1:00 pm on 18 September. Every participant receives a certificate of participation and a digital badge, and all projects are published in a post-event showcase page for students' portfolios.";

export const organisingTeam = [
  {
    role: "Logistics",
    icon: "boxes",
    members: [{ name: "Vivek Raut" }, { name: "Tsering Lama" }],
    description:
      "Hall booking and setup: team tables, seating, power and extension boards, signage, water and waste. Opens the venue each morning and clears it at 5:00 pm.",
  },
  {
    role: "MC / Host",
    icon: "mic",
    members: [{ name: "Abudayik Sharma" }, { name: "Ojoshwi Raymajhi" }],
    description:
      "Runs the stage: opening and closing ceremonies, announcements, mentor and judge introductions, timing calls in the judging round, prize distribution.",
  },
  {
    role: "Tech Lead",
    icon: "terminal",
    members: [{ name: "Ishant Dahal" }, { name: "Rahul Singh" }],
    description:
      "Internet, projector and audio. Registers team repositories at kickoff, runs the countdown timer, verifies submissions before judging and archives them after.",
  },
  {
    role: "Event Day",
    icon: "calendar",
    members: [{ name: "Abudayik Sharma" }, { name: "Ojoshwi Raymajhi" }],
    description:
      "Runs the 8:00 am – 5:00 pm schedule on both days: reporting and ID desk, checkpoint rounds, meal slots, attendance and the daily close-out.",
  },
  {
    role: "Volunteer Team",
    icon: "users",
    members: [
      { name: "Anup Prajapati" },
      { name: "Bidhanshu Soni" },
      { name: "Safal Subedi" },
      { name: "Ayan Akhtar Ansari" },
      { name: "Pratiyga Mahato", note: "after content work" },
      { name: "Jenia Shahi", note: "after content work" },
      { name: "Karuna Joshi", note: "after content work" },
    ],
    description:
      "Floor support in shift pairs: registration desk, guiding participants, table-to-table help requests, refreshment service and room reset each day.",
  },
  {
    role: "PR Lead",
    icon: "megaphone",
    members: [
      { name: "Lagzen Thakuri", note: "Lead" },
      { name: "Shibam Guragai", note: "Co-Lead" },
    ],
    description:
      "Publicity and outreach: posters and class announcements, sponsor and alumni approaches, invitations to mentors and judges, and the post-event report.",
  },
  {
    role: "Content Creation",
    icon: "camera",
    members: [
      { name: "Ojoshwi Raymajhi" },
      { name: "Pratiyga Mahato" },
      { name: "Jenia Shahi" },
      { name: "Karuna Joshi" },
    ],
    description:
      "Pre-event content only: promotional posters and graphics, teaser photography and videography, captions and written copy, and the announcement reels published before the hackathon. Once that work is done, Pratiyga Mahato, Jenia Shahi and Karuna Joshi join the volunteer team for the event days.",
  },
  {
    role: "Social Media",
    icon: "share",
    members: [{ name: "Pema Sherpa" }, { name: "Saroj Tamang" }],
    description:
      "Runs the club channels: teasers, countdown, daily live updates during the event, results posts and replies to participant queries.",
  },
];

export const organisingTeamNote =
  "Eight desks, every one of them student-run. If you are unsure who to ask on the day, start at the registration desk and a volunteer will route you.";

export const sponsors = [
  { name: "ShyenaSec", url: "https://www.linkedin.com/company/shyenasec" },
  { name: "Himalaya Cloud", url: "https://himalaya.cloud/" },
  { name: "Mudita", url: "https://mudita.com.np/" },
  { name: "GitHub", url: "https://github.com/" },
  { name: "Thaun", url: "https://thaun.rahaar.com/" },
];

export const sponsorsNote =
  "SparkX runs on the support of the organisations below. Sponsors acquire no rights over participant work — every team keeps full ownership of what it builds.";

export const faqs = [
  {
    question: "Do I need a team before registering?",
    answer:
      "Yes — registration is by team. Teams need two to four members and one nominated team lead. Cross-programme and cross-semester teams are encouraged, so ask around your batch or the club channels if you are short of members.",
  },
  {
    question: "What do I submit with the registration form?",
    answer:
      "Team name, all members, the team lead, your chosen track, and a 200-word idea abstract. If more than ten teams register, the abstract is what shortlists you — so write it properly.",
  },
  {
    question: "Can I work on an idea before the event?",
    answer:
      "You can think about your idea, but no feature code may be written before the clock starts at 10:00 on 17 September. Repositories are registered at kickoff and commit history is reviewed.",
  },
  {
    question: "Are AI coding assistants allowed?",
    answer:
      "Yes, and their use is encouraged — provided you disclose which tools you used and for what in your README. Every member must be able to explain any part of the submitted code when the judges ask.",
  },
  {
    question: "Do we stay on campus overnight?",
    answer:
      "No. The hall clears at 5:00 pm on 17 September and everyone goes home. The clock keeps running while you are away, so teams that want to keep building overnight are free to do so from home, and mentors are on call on the club channel from 19:30 to 21:30. You report back at 8:00 am on 18 September.",
  },
  {
    question: "When are the winners announced?",
    answer:
      "Presentations start at 10:00 am on 18 September, the panel deliberates over lunch, and the winners are announced at 1:00 pm in the closing ceremony.",
  },
  {
    question: "Who owns what we build?",
    answer:
      "Your team retains full ownership of everything you create. The college is granted a non-exclusive, royalty-free right to display and publicise the project with attribution; sponsors acquire no rights over participant work.",
  },
];
