// Internal Hackathon 2026 — single source of truth for the event details shown
// on the home page, the roadmap and the dedicated /hackathon page.

export const hackathon = {
  name: "Internal Hackathon 2026",
  tagline: "Code. Create. Innovate.",
  organiser: "PGS Software Club",
  dates: "11–12 September 2026",
  datesLong: "Friday 11 September – Saturday 12 September 2026",
  duration: "24 continuous hours",
  venue: "College Hall, Presidential Graduate School, Thapagaun",
  teams: "10 teams · 2–4 members each",
  maxParticipants: 40,
  fee: "Free — open to all enrolled PGS students",
  prizePool: "NPR 25,000",
  registrationOpens: "10 August 2026",
  registrationCloses: "4 September 2026",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScQrwZxr0GfU8nnWsBQE90c10hGb5zR1rPxrYBj6T_EVfRpqA/viewform",
};

export const stats = [
  { value: "24", label: "Hours, on campus" },
  { value: "10", label: "Teams · 2–4 members" },
  { value: "3", label: "Tracks · 3 prizes" },
  { value: "25K", label: "NPR prize money" },
];

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
  "Participants remain on campus for the full 24 hours and carry their college ID at all times.",
];

export const preEventTimeline = [
  { date: "10 August 2026", milestone: "Registration opens — team name, members, team lead, chosen track and a 200-word idea abstract" },
  { date: "10 Aug – 4 Sept 2026", milestone: "Registration window open; club representatives visit classes and answer queries" },
  { date: "4 September 2026", milestone: "Registration closes" },
  { date: "6 September 2026", milestone: "Ten teams confirmed and published across the three tracks; waiting list notified" },
  { date: "8 September 2026", milestone: "Compulsory orientation and rule briefing for all team leads (one hour)" },
  { date: "9 September 2026", milestone: "Mentor–team allocation published; guardian consent forms collected" },
  { date: "10 September 2026", milestone: "Venue setup, network load test, power and seating check" },
  { date: "11–12 September 2026", milestone: "Hackathon" },
  { date: "By 26 September 2026", milestone: "Event report, settled accounts and project showcase published" },
];

export const scheduleDayOne = [
  { time: "08:30 – 09:00", activity: "Reporting, ID verification and seat allotment" },
  { time: "09:00 – 09:40", activity: "Opening ceremony — welcome address, rules, release of the track problem statements" },
  { time: "09:40 – 10:00", activity: "Mentor introductions and team–mentor pairing" },
  { time: "10:00", activity: "Clock starts — development begins; repositories created and registered", highlight: true },
  { time: "11:30 – 12:30", activity: "Checkpoint 1 — problem statement and scope validation" },
  { time: "13:00 – 14:00", activity: "Lunch (served at desks in rotation; the clock does not stop)" },
  { time: "15:30 – 16:30", activity: "Checkpoint 2 — architecture and technology-stack review" },
  { time: "17:00 – 17:30", activity: "Evening tea, coffee and snacks" },
  { time: "19:30 – 20:30", activity: "Checkpoint 3 — progress review and MVP scope-cut advice" },
  { time: "20:30 – 21:30", activity: "Dinner" },
  { time: "22:00", activity: "Venue secured for the night; attendance roll call; no entry or exit without warden approval" },
  { time: "23:30 – 00:30", activity: "Checkpoint 4 — overnight debugging clinic (on-call mentors)" },
];

export const scheduleDayTwo = [
  { time: "00:30 – 06:00", activity: "Overnight development — midnight snacks and the tea and coffee station remain open" },
  { time: "06:00 – 07:00", activity: "Checkpoint 5 — demo rehearsal and pitch feedback" },
  { time: "07:00 – 07:45", activity: "Breakfast" },
  { time: "07:45 – 09:00", activity: "Final commits, documentation and submission upload" },
  { time: "09:00", activity: "Clock stops — hard submission deadline. No commits after this time are evaluated", highlight: true },
  { time: "09:00 – 09:30", activity: "Submission verification; presentation order drawn by lot" },
  { time: "09:30 – 10:20", activity: "Judging — teams 1 to 5 (10 minutes each)" },
  { time: "10:20 – 10:35", activity: "Break for judges and participants" },
  { time: "10:35 – 11:25", activity: "Judging — teams 6 to 10" },
  { time: "11:25 – 11:55", activity: "Panel deliberation and score consolidation" },
  { time: "11:55 – 12:30", activity: "Closing ceremony — results, prizes, certificates and group photograph" },
];

export const checkpoints = [
  { round: "CP 1", time: "11:30 – 12:30", focus: "Is the problem real, is the scope achievable in 24 hours, is the idea distinct?" },
  { round: "CP 2", time: "15:30 – 16:30", focus: "Architecture, technology-stack sanity, data model, division of work" },
  { round: "CP 3", time: "19:30 – 20:30", focus: "Honest progress check; cutting scope down to a demonstrable MVP" },
  { round: "CP 4", time: "23:30 – 00:30", focus: "Debugging clinic — teams raise blockers, mentors pair on the hardest bugs" },
  { round: "CP 5", time: "06:00 – 07:00", focus: "Demo rehearsal, pitch narrative, anticipated questions" },
];

export const mentorPanel = [
  "Three faculty mentors from the IT and management departments, on a rotating duty roster.",
  "Two alumni mentors working in the software industry, invited through the alumni network.",
  "Three industry professionals from Kathmandu technology companies — one aligned to each track.",
  "Mentors advise; they do not write code, and no code may be authored by anyone outside the team.",
  "At least two mentors are present in the venue at any hour of the 24, including overnight.",
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
    "All feature code must be written within the 24-hour window; repositories are registered at kickoff and commit history is reviewed. Every member must be able to explain any part of the submitted code during the question round.",
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
    recognition: "Best team overall — trophy, winner certificates and cash prize",
    prize: "NPR 15,000",
    featured: true,
  },
  {
    award: "Track Winner",
    recognition: "Highest-scoring team in the second track — trophy, certificates and cash prize",
    prize: "NPR 5,000",
  },
  {
    award: "Track Winner",
    recognition: "Highest-scoring team in the third track — trophy, certificates and cash prize",
    prize: "NPR 5,000",
  },
];

export const awardsNote =
  "All ten teams are ranked on one common scale regardless of track. Every participant receives a certificate of participation and a digital badge, and all projects are published in a post-event showcase page for students' portfolios.";

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
      "You can think about your idea, but no feature code may be written before the clock starts at 10:00 on 11 September. Repositories are registered at kickoff and commit history is reviewed.",
  },
  {
    question: "Are AI coding assistants allowed?",
    answer:
      "Yes, and their use is encouraged — provided you disclose which tools you used and for what in your README. Every member must be able to explain any part of the submitted code when the judges ask.",
  },
  {
    question: "Do we really stay the whole night?",
    answer:
      "Yes. Participants remain on campus for the full 24 hours. The venue is secured at 22:00 with a roll call, separate rest zones for male and female participants, faculty and night wardens on duty throughout, and a first-aider on call.",
  },
  {
    question: "Who owns what we build?",
    answer:
      "Your team retains full ownership of everything you create. The college is granted a non-exclusive, royalty-free right to display and publicise the project with attribution; sponsors acquire no rights over participant work.",
  },
];
