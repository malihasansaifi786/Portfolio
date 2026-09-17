// ---------------------------------------------------------------------------
// Single source of truth for every piece of content on the site.
// Edit this file to update the portfolio — no component changes needed.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ali Hasan",
  initials: "AH",
  title: "Civil Technologist | AutoCAD Expert | Graphic Designer | Frontend Developer",
  tagline: "I build, draft, design & teach.",
  status: "Available for new opportunities",
  location: "Faisalabad, Punjab, Pakistan",
  address: "P-162, Madina Block, Sehgal City, Sammundri Road, Faisalabad",
  email: "alifida007@gmail.com",
  phones: ["+92 305-4306686", "+92 343-4900310"],
  whatsapp: "923054306686",
  cv: "/Ali_Hasan_CV.pdf",
  photo: "/profileImg.webp",
  intro:
    "Civil Technologist from the University of Lahore with 12+ years across technical education, AutoCAD drafting, graphic design, front-end development and administration. I move comfortably between a drawing board, a classroom and a code editor.",
  highlights: [
    "AutoCAD Drafting",
    "Graphic Design",
    "MERN / Frontend",
    "WordPress & SEO",
    "Teaching & Training",
  ],
};

export const stats = [
  { value: 12, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "", label: "Professional roles" },
  { value: 4, suffix: "", label: "IT programs completed" },
  { value: 500, suffix: "+", label: "Students taught" },
];

export const about = {
  paragraphs: [
    "I hold a degree in **Civil Technology from the University of Lahore (UOL)** and bring over a decade of hands-on experience in both technical and administrative positions. My expertise spans AutoCAD, graphic design, MS Office, front-end web development (NAVTTC certified) and DAE Civil Technology instruction.",
    "For more than five years I taught DAE Civil Technology — delivering technical education and mentoring students through both theory and practical work — and later led the Civil Engineering Department as **HOD at Punjab Institute of Engineering and Technology**.",
    "My most recent government role was **Hostel Warden (BS-11) at NASHEMAN**, Social Welfare & Bait-ul-Maal Department Punjab, where I also volunteered as a Graphic Designer and Coordinator to the Computer Instructor — taking initiative well beyond my official duties. Since then I have added accounting experience at Umer Hasan Impex, logistics sales at Brothers Logistics LLC and truck dispatching at Haul 48 Logistics, which sharpened my record-keeping, negotiation and coordination skills.",
    "I'm currently open to roles in **drafting, technical instruction, IT & administration, web development and dispatch operations**.",
  ],
  facts: [
    { label: "Location", value: "Faisalabad, Punjab, Pakistan" },
    { label: "Degree", value: "BS Civil Technology (UOL)" },
    { label: "Diploma", value: "DAE Civil" },
    { label: "Languages", value: "Urdu, English, Punjabi" },
    { label: "Driving", value: "Licensed driver" },
    { label: "Status", value: "Open to work", accent: true },
  ],
};

export const filters = [
  { id: "all", label: "All" },
  { id: "education", label: "Teaching" },
  { id: "admin", label: "Administration" },
  { id: "business", label: "Sales & Accounts" },
  { id: "logistics", label: "Logistics" },
];

export const experience = [
  {
    role: "Truck Dispatcher",
    org: "Haul 48 Logistics",
    period: "6 Months",
    categories: ["logistics"],
    featured: true,
    points: [
      "Coordinated daily load assignments, routes and schedules for assigned drivers.",
      "Sourced and booked freight through load boards and direct broker contact, negotiating rates per mile.",
      "Tracked shipments in transit and kept brokers and customers updated on pickup and delivery ETAs.",
      "Prepared and filed trip paperwork — rate confirmations, bills of lading and proof of delivery.",
      "Monitored Hours-of-Service compliance and driver logs to keep operations within regulation.",
      "Resolved en-route problems — delays, detention, breakdowns and reroutes — to limit downtime.",
    ],
    tags: ["Load Boards", "Rate Negotiation", "Route Planning", "HOS Compliance", "Customer Updates"],
  },
  {
    role: "Sales Person",
    org: "Brothers Logistics LLC",
    period: "6 Months",
    categories: ["business", "logistics"],
    featured: true,
    points: [
      "Prospected owner-operators and small fleets through cold calls, follow-ups and referrals.",
      "Presented the company's logistics and dispatch services and explained pricing and terms.",
      "Qualified leads and moved them through the pipeline from first contact to signed agreement.",
      "Coordinated carrier onboarding — collecting MC/DOT details, insurance and setup documents.",
      "Worked to monthly sales targets and reported leads, calls and conversions to management.",
      "Maintained client relationships after signup to drive retention and referrals.",
    ],
    tags: ["Lead Generation", "Cold Calling", "Client Onboarding", "Target Achievement", "Relationship Building"],
  },
  {
    role: "Accountant — POS Operator",
    org: "Umer Hasan Impex",
    period: "6 Months",
    categories: ["business"],
    summary:
      "Handled daily financial transactions, billing operations and ledger management on Digital Soft 2-User POS Software, covering both computerised and manual accounting.",
    points: [
      "Performed billing and invoicing through Digital Soft POS software.",
      "Recorded daily cash receipts and payments with supporting documentation.",
      "Maintained sales and purchase records, ledgers and account balances.",
      "Created and managed new items plus customer and supplier accounts.",
      "Issued and recorded cheques and maintained cheque registers.",
      "Conducted party account reconciliation and balance confirmations.",
    ],
    tags: ["Digital Soft POS", "Ledgers", "Reconciliation", "AR / AP", "Cheque Registers"],
  },
  {
    role: "Computer Instructor",
    org: "The Creative College, Khurainwala — Faisalabad",
    period: "Oct 2024 – Mar 2025",
    categories: ["education"],
    points: [
      "Taught Computer Software & Applications to Inter Tech (FBISE) students.",
      "Delivered both practical and theoretical lectures on computer applications.",
      "Prepared students for board examinations with structured lessons and hands-on training.",
      "Built students' foundational IT and software usage skills.",
    ],
    extra: {
      title: "Additional responsibility",
      heading: "Invigilator — Practical Exams, Inter Tech 2025",
      body: "Selected by the Federal Board of Intermediate and Secondary Education (FBISE) to supervise practical examinations, ensuring fair conduct, discipline and compliance with board rules.",
    },
    tags: ["FBISE Curriculum", "Practical Training", "Exam Preparation", "Invigilation"],
  },
  {
    role: "Hostel Warden (BS-11) — On Contract",
    org: "NASHEMAN — Social Welfare & Bait-ul-Maal Department, Punjab",
    period: "Mar 2018 – Jun 2024 · 6+ yrs",
    categories: ["admin"],
    summary:
      "Additional voluntary role: Graphic Designer & Coordinator to the Computer Instructor.",
    points: [
      "Oversaw hostel operations — management, discipline and resident welfare.",
      "Handled admissions, documentation and recruitment of course instructors.",
      "Maintained complete academic and hostel record systems with accuracy and data security.",
      "Designed institutional graphics and helped train students in Professional Graphic Designing.",
      "Coordinated computer and design instructors to align teaching outcomes with industry needs.",
      "Managed mess records, including debit and credit of mess items.",
      "Promoted a professional learning environment through guidance, motivation and collaboration.",
    ],
    tags: ["Operations", "Record Management", "Admissions", "Graphic Design", "Staff Coordination"],
  },
  {
    role: "HOD — Civil Department",
    org: "Punjab Institute of Engineering and Technology",
    period: "Apr 2015 – Dec 2017 · 3 yrs",
    categories: ["education", "admin"],
    columns: [
      {
        title: "Morning shift — subjects taught",
        items: [
          "Basic Engineering Drawing",
          "Basic Surveying & Advanced Surveying",
          "Civil Engineering Drawing & AutoCAD",
          "Project Management",
        ],
      },
      {
        title: "Evening shift — short courses",
        items: ["AutoCAD — 4 months", "Surveying & Drawing — 4 months", "Graphic Designing — 3 months"],
      },
    ],
    pointsTitle: "Key achievements",
    points: [
      "Supervised and managed the entire Civil Engineering Department, keeping academic operations smooth.",
      "Developed and monitored teaching plans, course coverage and performance evaluation systems.",
      "Led a team of instructors, fostering collaboration and mentorship to maintain educational standards.",
      "Coordinated departmental meetings, curriculum reviews and student training workshops.",
      "Maintained departmental records, course documentation and student progress archives.",
    ],
    tags: ["Department Leadership", "Curriculum Planning", "Team Mentorship", "AutoCAD Training"],
  },
  {
    role: "Civil Instructor",
    org: "Ravi Institute of Engineering and Technology",
    period: "Jan 2014 – Feb 2015 · 1 yr",
    categories: ["education"],
    points: [
      "Lectured on Basic Surveying, Engineering Materials & Constructions, Computer Applications, Civil Engineering Drawing & AutoCAD, Building Construction, and Environment, Health & Safety.",
      "Prepared and maintained course files, attendance records and evaluation sheets.",
      "Provided technical guidance in laboratory and field surveying practice.",
      "Supported administrative staff in planning examinations and academic schedules.",
    ],
    tags: ["Surveying", "Building Construction", "EHS", "Course Files"],
  },
  {
    role: "Civil Instructor",
    org: "Punjab Institute of Engineering and Technology",
    period: "Sep 2012 – Dec 2013 · 1 yr",
    categories: ["education"],
    points: [
      "Taught Engineering Materials & Constructions, Basic Engineering Drawing, Public Health Technology, Civil Engineering Drawing & AutoCAD, Soil Mechanics & Bridge Engineering, and Project Management.",
      "Maintained accurate teaching records, student assessments and academic performance reports.",
      "Assisted in curriculum implementation and timely completion of course outlines.",
      "Encouraged teamwork through group assignments and project-based learning.",
    ],
    tags: ["Soil Mechanics", "Public Health Tech", "Engineering Drawing", "Assessment"],
  },
];

export const skills = [
  {
    icon: "drafting",
    title: "Technical",
    items: [
      "AutoCAD Drafting",
      "Engineering Drawing",
      "Surveying",
      "Data Entry & Record Management",
      "Software Installation & Configuration",
      "Hardware Troubleshooting",
      "Technical Documentation",
    ],
  },
  {
    icon: "code",
    title: "Web & Design",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind",
      "SASS",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Git & GitHub",
      "WordPress",
      "SEO",
      "Adobe Photoshop",
      "CorelDRAW",
    ],
  },
  {
    icon: "chart",
    title: "Accounting & Financial",
    items: [
      "Billing & Invoicing",
      "Sales & Purchase Entry",
      "Ledger Maintenance",
      "Accounts Receivable & Payable",
      "Cash Receipts & Payments",
      "Cheque Issuance & Recording",
      "Account Reconciliation",
      "Digital Soft POS Software",
    ],
  },
  {
    icon: "truck",
    title: "Operations & Logistics",
    items: [
      "Load Booking",
      "Route Planning",
      "Broker Negotiation",
      "Shipment Tracking",
      "HOS & Compliance",
      "Dispatch Documentation",
      "Carrier Onboarding",
      "Logistics Sales",
    ],
  },
  {
    icon: "cap",
    title: "Teaching & Training",
    items: [
      "Lecture Delivery",
      "Curriculum Implementation",
      "Course File Preparation",
      "Student Assessment",
      "Lab & Field Supervision",
      "Exam Invigilation",
    ],
  },
  {
    icon: "users",
    title: "Professional",
    items: [
      "Team Collaboration",
      "Task Coordination",
      "Attention to Detail",
      "Time Management",
      "Communication",
      "Problem Solving",
      "Driving",
    ],
  },
];

export const education = [
  {
    degree: "BS (Civil Technology)",
    institute: "University of Lahore",
    period: "2013 – 2017",
    score: "71%",
    accent: true,
  },
  {
    degree: "DAE (Civil)",
    institute: "Pak Poly Tech Institute, Lahore",
    period: "2009 – 2011",
    score: "66%",
  },
  {
    degree: "Matriculation (Science)",
    institute: "Rashid Minhas Cadet School",
    period: "2006 – 2008",
    score: "62%",
  },
];

export const courses = [
  {
    title: "I.T Basic",
    duration: "3 Months",
    institute: "AUSPAK Lahore",
    items: [
      "Fundamentals of Computer Systems",
      "Operating Systems",
      "MS Office",
      "InPage",
      "Windows Installation",
    ],
  },
  {
    title: "AutoCAD",
    duration: "4 Months",
    institute: "GCT Lahore",
    items: [
      "Basics of Hand Drafting",
      "Introduction to AutoCAD",
      "Installation of AutoCAD",
      "Engineering Drawings",
      "Project Work",
    ],
  },
  {
    title: "Software & Hardware",
    duration: "6 Months",
    institute: "Nasheman SWC Lahore",
    items: [
      "Introduction to Computer",
      "Operating Systems & Installation",
      "MS Office & InPage",
      "CorelDRAW & Adobe Photoshop",
      "Hardware Installation & Troubleshooting",
    ],
  },
  {
    title: "MERN Stack",
    duration: "4 Months",
    institute: "NAVTTC",
    highlight: true,
    items: [
      "HTML5, CSS3, JavaScript",
      "Tailwind & SASS",
      "React.js",
      "Node.js & Express.js",
      "MongoDB",
      "Version Control (Git & GitHub)",
      "Project Deployment & Web Project",
    ],
  },
];

export const certifications = [
  {
    badge: "SEO",
    title: "Search Engine Optimization",
    issuer: "DigiSkills Training Program — DSTP3.0, Batch-02",
    issued: "14 March 2026",
    id: "Z25GUVAMK",
  },
  {
    badge: "WP",
    title: "WordPress Development",
    issuer: "DigiSkills Training Program — DSTP3.0, Batch-02",
    issued: "14 March 2026",
    id: "QA97VTGMK",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];
