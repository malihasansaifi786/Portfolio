/**
 * Rebuilds Ali Hasan's CV as a .docx, keeping the original document's
 * structure and adding the two freight-industry roles in chronological order.
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, LevelFormat, convertInchesToTwip,
} = require("docx");

const BLUE = "1F4E79";
const LINK = "2E74B5";
const SHADE = "DEEAF6";
const CONTENT_W = 10026;

const bullet = (text, indent = 0) =>
  new Paragraph({
    text,
    numbering: { reference: "cv-bullets", level: indent },
    spacing: { after: 20 },
  });

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 60 },
    alignment: opts.align,
    children: [new TextRun({ text, size: opts.size ?? 19, bold: opts.bold, italics: opts.italics, color: opts.color })],
  });

/** Blue uppercase section heading with a rule underneath. */
const heading = (text) =>
  new Paragraph({
    spacing: { before: 120, after: 70 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24, color: BLUE })],
  });

/** "Label: value" line used throughout the work-experience section. */
const labelled = (label, value) =>
  new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({ text: `${label} `, bold: true, size: 18 }),
      new TextRun({ text: value, size: 18 }),
    ],
  });

const subHeading = (text, color = "000000") =>
  new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [new TextRun({ text, bold: true, size: 18, color })],
  });

const cell = (children, width, shaded) =>
  new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 110, right: 110 },
    shading: shaded ? { type: ShadingType.CLEAR, fill: SHADE, color: "auto" } : undefined,
    children,
  });

const gridTable = (rows, widths, shaded = true) =>
  new Table({
    columnWidths: widths,
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "9CC3E5" },
    },
    rows: rows.map(
      (cells) =>
        new TableRow({
          cantSplit: true,
          children: cells.map((c) => cell(c, widths[cells.indexOf(c)] ?? widths[0], shaded)),
        })
    ),
  });

// --- Work experience ---------------------------------------------------------
const job = ({ org, duration, position, extra, intro, bullets, blocks }) => {
  const out = [
    labelled("Organization:", org),
    labelled("Duration:", duration),
    labelled("Position:", position),
  ];
  if (extra) out.push(labelled(extra.label, extra.value));
  if (intro) {
    out.push(subHeading("Experience Summary:"));
    out.push(body(intro));
  }
  if (blocks) {
    blocks.forEach((b) => {
      out.push(subHeading(b.title));
      if (b.text) out.push(body(b.text));
      (b.bullets || []).forEach((t) => out.push(bullet(t)));
    });
  }
  if (bullets) {
    out.push(subHeading("Key Responsibilities:"));
    bullets.forEach((t) => out.push(bullet(t)));
  }
  out.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  return out;
};

const jobs = [
  job({
    org: "Punjab Institute of Engineering and Technology",
    duration: "1 yr 3 mos 25 days (Sep 3, 2012 – Dec 28, 2013)",
    position: "Civil Instructor",
    bullets: [
      "Taught core civil engineering subjects including Engineering Materials & Constructions, Basic Engineering Drawing, Public Health Technology, Civil Engineering Drawing & AutoCAD, Soil Mechanics & Bridge Engineering, and Project Management.",
      "Maintained accurate teaching records, student assessments, and academic performance reports.",
      "Assisted in curriculum implementation and ensured timely completion of course outlines.",
      "Collaborated with departmental faculty for academic improvement and practical training sessions.",
      "Encouraged teamwork among students through group assignments and project-based learning.",
    ],
  }),
  job({
    org: "Ravi Institute of Engineering and Technology",
    duration: "1 yr 1 mo 1 day (Jan 27, 2014 – Feb 28, 2015)",
    position: "Civil Instructor",
    bullets: [
      "Delivered lectures on Basic Surveying, Engineering Materials & Constructions, Computer Applications, Civil Engineering Drawing & AutoCAD, Building Construction, and Environment, Health & Safety.",
      "Prepared and maintained comprehensive course files, attendance records, and evaluation sheets.",
      "Promoted teamwork and discipline among students through collaborative learning methods.",
      "Provided technical guidance and assistance in laboratory and field surveying practices.",
      "Supported administrative staff in planning examinations and managing academic schedules.",
    ],
  }),
  job({
    org: "Punjab Institute of Engineering and Technology",
    duration: "2 yrs 8 mos 7 days (Apr 3, 2015 – Dec 10, 2017)",
    position: "HOD Civil Department",
    blocks: [
      {
        title: "Morning Shift – Subjects Taught:",
        text: "Basic Engineering Drawing, Basic Surveying, Advanced Surveying, Civil Engineering Drawing & AutoCAD, Project Management.",
      },
      {
        title: "Evening Shift – Short Courses:",
        bullets: ["AutoCAD (4 Months)", "Surveying & Drawing (4 Months)", "Graphic Designing (3 Months)"],
      },
      {
        title: "Key Achievements & Duties:",
        bullets: [
          "Supervised and managed the entire Civil Engineering Department, ensuring smooth academic operations.",
          "Developed and monitored teaching plans, course coverage, and performance evaluation systems.",
          "Led a team of instructors, fostering collaboration and mentorship to maintain educational standards.",
          "Coordinated departmental meetings, curriculum reviews, and student training workshops.",
          "Maintained departmental records, course documentation, and student progress archives.",
        ],
      },
    ],
  }),
  job({
    org: "NASHEMAN (Social Welfare & BM Department)",
    duration: "6 yrs 3 mos 12 days (Mar 18, 2018 – Jun 30, 2024)",
    position: "Hostel Warden BS-11 (On Contract)",
    extra: { label: "Additional Role:", value: "Graphic Designer & Coordinator to Computer Instructor (Voluntary Basis)" },
    bullets: [
      "Oversaw hostel operations, ensuring proper management, discipline, and resident welfare.",
      "Handled admissions, documentation, and recruitment of course instructors.",
      "Maintained complete academic and hostel record systems, ensuring data accuracy and security.",
      "Designed institutional graphics and assisted in training students in Professional Graphic Designing.",
      "Coordinated computer and design instructors to align teaching outcomes with industry needs.",
      "Encouraged teamwork and coordination among staff for smooth hostel and academic operations.",
      "Promoted a professional learning environment through guidance, motivation, and collaboration.",
      "Mess record management (Debit and credit of mess items).",
    ],
  }),
  job({
    org: "The Creative College, Khurainwala (Faisalabad)",
    duration: "6 months (Oct 2024 – Mar 2025)",
    position: "Computer Instructor",
    bullets: [
      "Taught Computer Software & Applications to Inter Tech (FBISE) students.",
      "Delivered lectures on practical and theoretical aspects of computer applications.",
      "Prepared students for board examinations through structured lessons and hands-on training.",
      "Assisted students in developing basic IT and software usage skills.",
    ],
  }),
  [
    subHeading("Additional Responsibility:", BLUE),
    labelled("Role:", "Invigilator – Practical Exams, Inter Tech 2025"),
    labelled("Board:", "Federal Board of Intermediate and Secondary Education (FBISE)"),
    bullet("Selected by FBISE as an invigilator for practical examinations."),
    bullet("Ensured fair conduct and proper supervision of exam procedures."),
    bullet("Maintained discipline and compliance with board rules during examinations."),
    new Paragraph({ spacing: { after: 100 }, children: [] }),
  ],
  job({
    org: "Umer Hasan Impex",
    duration: "6 Months",
    position: "Accountant (POS Operator)",
    intro:
      "Worked as an Accountant using Digital Soft 2-User POS Software, handling daily financial transactions, billing operations, and ledger management. Managed both computerized and manual accounting tasks, ensuring accurate financial records and smooth daily operations.",
    bullets: [
      "Performed billing and invoicing using Digital Soft POS software.",
      "Recorded daily cash receipts and payments with proper documentation.",
      "Maintained sales and purchase records in the accounting system.",
      "Created and managed new items and customer/supplier accounts.",
      "Issued and recorded cheques and maintained cheque registers.",
      "Maintained ledgers and monitored account balances.",
      "Conducted party account reconciliation and balance confirmations.",
      "Handled manual billing and maintained physical accounting records.",
      "Ensured proper record maintenance and accuracy of financial data.",
      "Assisted in routine accounting tasks and supported daily financial operations.",
    ],
  }),
  // --- New roles -------------------------------------------------------------
  job({
    org: "Brothers Logistics LLC",
    duration: "6 months (September 2025 – February 2026)",
    position: "Sales Executive",
    bullets: [
      "Identified and developed new business opportunities in the US trucking and freight transportation industry.",
      "Contacted potential customers and shippers to promote freight transportation services.",
      "Built and maintained professional relationships with clients to generate new sales opportunities.",
      "Coordinated with dispatch and operations teams regarding available equipment and transportation requirements.",
      "Assisted in finding suitable freight opportunities for company trucks.",
      "Followed up with potential customers and maintained sales activity records.",
      "Supported customer acquisition and business development efforts.",
    ],
  }),
  job({
    org: "Haul 48 Logistics",
    duration: "5 months 25 days (April 1, 2026 – September 26, 2026)",
    position: "Dispatcher",
    bullets: [
      "Managed daily dispatching operations for two box truck drivers in the US freight transportation market.",
      "Searched for suitable freight loads through load boards and other available sources.",
      "Coordinated with brokers and shippers to identify suitable and profitable load opportunities.",
      "Negotiated freight rates and assisted in securing loads according to truck availability and driver preferences.",
      "Planned driver schedules, pickup appointments, delivery requirements, and route coordination.",
      "Maintained regular communication with drivers to monitor load progress and delivery status.",
      "Handled dispatch documentation, including rate confirmations, pickup details, and delivery information.",
      "Supported sales executives by finding suitable loads and freight opportunities for their customers.",
      "Coordinated with the sales team to match available freight with suitable equipment and transportation requirements.",
      "Maintained professional relationships with brokers, shippers, and logistics partners.",
    ],
  }),
  job({
    org: "HAMCO Logistics, Faisalabad",
    duration: "September 26, 2026 – Present",
    position: "Dispatcher",
    bullets: [
      "Manage day-to-day dispatch operations for company drivers in the US freight transportation market.",
      "Source freight through load boards and direct contact with brokers and shippers.",
      "Negotiate rates and book loads that match truck availability and driver preferences.",
      "Plan pickup and delivery appointments, driver schedules, and routes.",
      "Track loads in transit and keep drivers, brokers, and customers updated on delivery status.",
      "Maintain dispatch paperwork, including rate confirmations, pickup details, and delivery records.",
    ],
  }),
].flat();

// --- Tables ------------------------------------------------------------------
const eduCell = (degree, years, inst, marks) => [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: degree, bold: true, size: 18 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: years, size: 18 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: inst, size: 18 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: marks, size: 18 })] }),
];

const courseCell = (title, duration, inst, items) => [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: `${title} (${duration})`, bold: true, size: 18 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: inst, italics: true, size: 18 })] }),
  ...items.map((t) => new Paragraph({ text: t, numbering: { reference: "cv-bullets", level: 0 }, spacing: { after: 10 } })),
];

const certCell = (title, program, meta) => [
  new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: title, bold: true, size: 18, color: BLUE })] }),
  new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: program, size: 18 })] }),
  new Paragraph({ children: [new TextRun({ text: meta, italics: true, size: 18 })] }),
];

const skillCell = (title, items) => [
  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: title, bold: true, size: 18, color: BLUE })] }),
  ...items.map(
    (t) =>
      new Paragraph({
        numbering: { reference: "cv-bullets", level: 0 },
        spacing: { after: 0 },
        children: [new TextRun({ text: t, size: 17 })],
      })
  ),
];

const doc = new Document({
  creator: "Ali Hasan",
  title: "Ali Hasan — Curriculum Vitae",
  description: "CV of Ali Hasan — Dispatcher, Civil Technologist, AutoCAD Expert, Graphic Designer and Frontend Developer",
  styles: { default: { document: { run: { font: "Arial", size: 18 } } } },
  numbering: {
    config: [
      {
        reference: "cv-bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.17) } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: { page: { margin: { top: 600, bottom: 420, left: 940, right: 940 } } },
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [new TextRun({ text: "ALI HASAN", bold: true, size: 44, color: BLUE })],
        }),
        body("Dispatcher | Civil Technologist | AutoCAD Expert | Graphic Designer | Frontend Developer (NAVTTC) | Educator 5+ Yrs", { align: AlignmentType.CENTER, size: 17, after: 40 }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({ text: "(M): +92 305-4306686  |  +92 343-4900310  |  ", size: 18 }),
            new TextRun({ text: "alifida007@gmail.com", size: 18, color: LINK }),
          ],
        }),
        body("P-162, Madina Block, Sehgal City Summundri Road, Faisalabad", { align: AlignmentType.CENTER, size: 18, after: 120 }),

        // Profile
        heading("Profile"),
        body("I am a dedicated and multi-skilled professional with a degree in Civil Technology from the University of Lahore (UOL), and over 6 years of hands-on experience in both technical and administrative roles. My expertise spans AutoCAD, graphic design, MS Office, frontend web development (NAVTTC Certified), and DAE Civil Technology instruction."),
        body("I am currently working as a Dispatcher at HAMCO Logistics, Faisalabad, managing daily dispatch operations in the US freight transportation market. Previously I served as a Dispatcher at Haul 48 Logistics, handling loads for box truck drivers — sourcing freight, negotiating rates with brokers, planning driver schedules and maintaining dispatch documentation — and as a Sales Executive at Brothers Logistics LLC, developing new business in the US trucking industry."),
        body("Earlier I worked as a Hostel Warden at NASHEMAN (Social Welfare & Bait-ul-Maal Department Punjab) — a government contract-based position I held from March 2018 to June 2024. In addition to managing hostel operations and ensuring student welfare, I voluntarily served as a Graphic Designer and Coordinator to a Computer Instructor, taking initiative beyond my official duties to support educational and IT functions."),
        body("I have also taught DAE Civil Technology classes for over 5 years, delivering technical education and mentoring students in both theory and practical work. My background includes proficiency in AutoCAD drafting, front-end development (HTML, CSS, JS), and visual design, allowing me to adapt across multiple roles — from engineering and education to logistics, digital design and administration."),

        // Education
        heading("Academic Qualification"),
        gridTable(
          [[
            eduCell("BS (CIVIL TECHNOLOGY)", "2013–2017", "University of Lahore", "71% Marks"),
            eduCell("DAE (CIVIL)", "2009–2011", "Pak Poly Tech Institute Lhr", "66% Marks"),
            eduCell("MATRICULATION (SCIENCE)", "2006–2008", "Rashid Minhas Cadet School", "62% Marks"),
          ]],
          [3342, 3342, 3342]
        ),

        // Work experience
        heading("Work Experience"),
        ...jobs,

        // IT qualifications
        heading("Information Technology Qualifications"),
        gridTable(
          [[
            courseCell("I.T Basic", "3 Month", "AUSPAK Lahore", ["Fundamentals of Computer System", "Operating Systems", "MS Office", "InPage", "Windows Installation"]),
            courseCell("AutoCAD", "4 Month", "GCT Lahore", ["Basics of Hand Drafting", "Introduction to AutoCAD", "Installation of AutoCAD", "Engineering Drawings", "Project Work"]),
            courseCell("Software & Hardware", "6 Month", "Nasheman SWC Lahore", ["Introduction to Computer", "Operating Systems & Installation", "MS Office & InPage", "CorelDRAW", "Adobe Photoshop", "Hardware Installation", "Troubleshooting"]),
            courseCell("MERN Stack", "4 Month", "NAVTTC", ["HTML5, CSS3, JavaScript", "Tailwind & SASS", "React.js", "Node.js and Express.js", "MongoDB", "Version Control (Git & GitHub)", "Project Deployment", "Web Project"]),
          ]],
          [2507, 2507, 2506, 2506]
        ),

        // Certifications
        heading("Certifications"),
        gridTable(
          [[
            certCell("SEO (Search Engine Optimization)", "DigiSkills Training Program (DSTP3.0-Batch-02)", "Issued: March 14, 2026 | Certificate ID: Z25GUVAMK"),
            certCell("WordPress Development", "DigiSkills Training Program (DSTP3.0-Batch-02)", "Issued: March 14, 2026 | Certificate ID: QA97VTGMK"),
          ]],
          [5013, 5013]
        ),

        // Skills
        heading("Skills"),
        gridTable(
          [[
            skillCell("Logistics & Dispatch", ["Freight Dispatching", "Load Board Sourcing", "Rate Negotiation", "Route & Schedule Planning", "Broker & Shipper Coordination", "Dispatch Documentation", "Driver Communication", "Business Development"]),
            skillCell("Technical Skills", ["Data Entry & Record Management", "Software Installation & Configuration", "Project Work & Technical Documentation", "WordPress Web Page Development", "AutoCAD Drafting"]),
            skillCell("Accounting & Financial", ["Billing and Invoicing", "Sales & Purchase Entry", "Ledger Maintenance", "Accounts Receivable & Payable", "Daily Cash Receipts & Payments", "Cheque Issuance & Recording", "Account Reconciliation", "Manual & Computerized Accounting", "Digital Soft POS Software"]),
            skillCell("Professional Skills", ["Team Collaboration & Task Coordination", "Teaching and Training Record Maintenance", "Attention to Detail", "Time Management", "Accuracy in Financial Data Entry", "Communication with Customers & Parties", "Problem Solving", "Driving"]),
          ]],
          [2507, 2507, 2506, 2506]
        ),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 6 } },
          children: [new TextRun({ text: "References available upon request", italics: true, size: 18 })],
        }),
      ],
    },
  ],
});

const out = process.argv[2] || "Ali_Hasan_CV.docx";
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(out, buf);
  console.log("wrote", out, buf.length, "bytes");
});
