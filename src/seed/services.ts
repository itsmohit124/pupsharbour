/**
 * The 13 services, verbatim from docs/content/source.md (titles as the client listed them).
 * Items from the first chat's v1 services (HR Management & Operations, Payroll & Statutory
 * Compliance, PMS & HR Analytics, Contract Labour Management, recruitment capabilities) are merged
 * into the matching service.
 */
export const GROUPS = [
  {
    slug: 'recruitment-and-talent-solutions',
    title: 'Recruitment & Talent Solutions',
    summary: 'The right talent, for the right roles, at the right time.',
    icon: 'team',
    order: 1,
  },
  {
    slug: 'hr-consulting-and-business-solutions',
    title: 'HR Consulting & Business Solutions',
    summary: 'Build strong HR systems that drive performance.',
    icon: 'settings',
    order: 2,
  },
  {
    slug: 'compliance-and-risk-management',
    title: 'Compliance & Risk Management',
    summary: 'Stay compliant, reduce risks and operate with confidence.',
    icon: 'scale',
    order: 3,
  },
  {
    slug: 'digital-hr-and-workforce-transformation',
    title: 'Digital HR & Workforce Transformation',
    summary: 'Technology-enabled HR for a more agile and efficient workforce.',
    icon: 'laptop',
    order: 4,
  },
] as const

type GroupSlug = (typeof GROUPS)[number]['slug']

export type SeedService = {
  order: number
  title: string
  shortTitle: string
  slug: string
  group: GroupSlug
  icon: string
  flagship?: boolean
  summary: string
  items: string[]
  focus: string
  disclaimer?: string
}

export const SERVICES: SeedService[] = [
  {
    order: 1,
    title: 'Policy Drafting (Company Policy & SOPs)',
    shortTitle: 'Policy Drafting & SOPs',
    slug: 'policy-drafting-and-sops',
    group: 'hr-consulting-and-business-solutions',
    icon: 'document',
    summary: 'Build a structured organisation with clearly defined policies, procedures and responsibilities.',
    items: [
      'HR Policy Development', 'Employee Handbooks', 'Standard Operating Procedures (SOPs)', 'Code of Conduct',
      'Attendance and Leave Policies', 'Recruitment and Onboarding Policies', 'Employee Discipline and Grievance Procedures',
      'Departmental Process Documentation', 'HR Process Development', 'Employee Lifecycle Management', 'Joining and Onboarding Processes', 'Employee Documentation',
    ],
    focus: 'Creating clarity, consistency and accountability across organisational operations.',
  },
  {
    order: 2,
    title: 'Company Analysis & 360° Survey',
    shortTitle: 'Company Analysis & 360° Survey',
    slug: 'company-analysis-and-360-survey',
    group: 'hr-consulting-and-business-solutions',
    icon: 'search',
    flagship: true,
    summary: 'Understand your organisation from every angle and identify opportunities for improvement.',
    items: [
      'Organisational Health Assessment', '360° Employee Feedback Surveys', 'Employee Satisfaction Surveys',
      'Departmental Performance Analysis', 'Organisational Structure Assessment', 'Management Effectiveness Review',
      'Workplace Culture Assessment', 'Gap Analysis and Improvement Recommendations',
    ],
    focus: 'Identifying organisational strengths, weaknesses and opportunities through structured assessments.',
  },
  {
    order: 3,
    title: 'PMS (Performance Management System)',
    shortTitle: 'Performance Management System',
    slug: 'performance-management-system',
    group: 'hr-consulting-and-business-solutions',
    icon: 'gauge',
    summary: 'Create a performance-driven organisation through structured goal setting, evaluation and accountability.',
    items: [
      'KPI and KRA Development', 'Performance Appraisal Systems', 'Goal Setting and Tracking', 'Performance Review Frameworks',
      'Performance Improvement Plans (PIP)', 'Departmental Performance Monitoring', 'Employee Evaluation Systems',
      'Incentive and Reward Frameworks', 'HR MIS Reporting', 'Workforce Analytics', 'Employee Productivity Monitoring',
    ],
    focus: 'Aligning individual performance with organisational objectives.',
  },
  {
    order: 4,
    title: 'Talent Acquisition',
    shortTitle: 'Talent Acquisition',
    slug: 'talent-acquisition',
    group: 'recruitment-and-talent-solutions',
    icon: 'usersearch',
    summary: 'Connect your organisation with the right talent through structured recruitment and selection processes.',
    items: [
      'Permanent Recruitment', 'Executive Search', 'IT and Non-IT Recruitment', 'Technical and Non-Technical Hiring',
      'Bulk and Volume Hiring', 'Mid-Level and Senior-Level Recruitment', 'Candidate Screening and Shortlisting',
      'Interview Coordination', 'Selection and Onboarding Support', 'Engineering and Technical Recruitment', 'Manufacturing and Industrial Recruitment', 'Sales and Marketing Recruitment', 'Finance and Accounts Recruitment', 'HR and Administration Recruitment',
    ],
    focus: 'Finding the right people for the right roles at the right time.',
  },
  {
    order: 5,
    title: 'Staffing Solutions',
    shortTitle: 'Staffing Solutions',
    slug: 'staffing-solutions',
    group: 'recruitment-and-talent-solutions',
    icon: 'users',
    summary: 'Build a flexible and efficient workforce to meet your operational requirements.',
    items: [
      'Contract Staffing', 'Temporary Staffing', 'Permanent Staffing', 'Project-Based Staffing', 'Workforce Planning',
      'Manpower Requirement Assessment', 'Contract Workforce Coordination', 'Staffing Administration Support', 'Contractor Documentation', 'Labour Records Management', 'Attendance and Wage Documentation', 'Contract Labour Compliance Support', 'Workforce Coordination and Reporting',
    ],
    focus: 'Providing workforce solutions aligned with business requirements and operational demands.',
  },
  {
    order: 6,
    title: 'HRMS Integration & Digitalization',
    shortTitle: 'HRMS Integration & Digitalization',
    slug: 'hrms-integration-and-digitalization',
    group: 'digital-hr-and-workforce-transformation',
    icon: 'laptop',
    summary: 'Transform traditional HR operations through technology-enabled systems and digital workflows.',
    items: [
      'HRMS Requirement Assessment', 'HRMS Implementation Coordination', 'Attendance Management Systems',
      'Leave Management Systems', 'Payroll System Integration', 'Employee Self-Service Platforms', 'Digital Employee Records',
      'HR Process Automation', 'HR Reporting and Dashboards',
    ],
    focus: 'Simplifying HR operations through digitalisation, automation and better data management.',
  },
  {
    order: 7,
    title: 'People Management & Engagement',
    shortTitle: 'People Management & Engagement',
    slug: 'people-management-and-engagement',
    group: 'hr-consulting-and-business-solutions',
    icon: 'heart',
    summary: 'Create a positive workplace culture where employees feel valued, connected and motivated.',
    items: [
      'Employee Engagement Programs', 'Employee Satisfaction Surveys', 'Feedback and Pulse Survey Systems',
      'Employee Grievance Management Frameworks', 'Employee Communication Initiatives', 'Retention Strategy Development',
      'Workplace Culture Development', 'Employee Recognition Programs',
    ],
    focus: 'Strengthening employee relationships, engagement and workplace culture.',
  },
  {
    order: 8,
    title: 'Training & Development',
    shortTitle: 'Training & Development',
    slug: 'training-and-development',
    group: 'recruitment-and-talent-solutions',
    icon: 'graduation',
    summary: 'Build employee capabilities and prepare teams for evolving business requirements.',
    items: [
      'Training Need Assessment', 'Soft Skills Training', 'Leadership Development', 'Managerial Effectiveness Training',
      'Communication Skills', 'Team Building Workshops', 'Technical Training Coordination', 'Employee Development Programs',
      'Learning and Development Frameworks',
    ],
    focus: 'Developing skilled, confident and capable professionals.',
  },
  {
    order: 9,
    title: 'Workforce Cost Optimization (CTC Restructuring)',
    shortTitle: 'Workforce Cost Optimization',
    slug: 'workforce-cost-optimization',
    group: 'hr-consulting-and-business-solutions',
    icon: 'calculator',
    summary: 'Improve workforce cost efficiency while maintaining competitive and sustainable compensation structures.',
    items: [
      'CTC Structure Analysis', 'Salary Benchmarking', 'Compensation Structure Review', 'Salary Component Restructuring',
      'Workforce Cost Analysis', 'Employee Benefit Structure Review', 'Manpower Budgeting', 'Compensation Planning', 'Salary Structure Management', 'Payroll Processing Support', 'Payroll Documentation',
    ],
    focus: 'Balancing employee compensation, organisational budgets and workforce productivity.',
  },
  {
    order: 10,
    title: 'Legal Services & Employment Contracts (NDAs/Bonds)',
    shortTitle: 'Legal Services & Employment Contracts',
    slug: 'legal-services-and-employment-contracts',
    group: 'compliance-and-risk-management',
    icon: 'scroll',
    summary: 'Support organisations in developing structured employment documentation and contractual frameworks.',
    items: [
      'Employment Agreement Drafting Support', 'Appointment Letters', 'Offer Letters', 'Non-Disclosure Agreements (NDAs)',
      'Confidentiality Agreements', 'Employment Bond Documentation', 'Service Agreements', 'HR Legal Documentation Review',
    ],
    focus: 'Supporting clear employment terms, confidentiality and documentation practices.',
    disclaimer:
      'Legal documents and contractual frameworks should be reviewed by qualified legal professionals for applicable enforceability and legal compliance.',
  },
  {
    order: 11,
    title: 'Statutory Compliance Audits (PF/ESIC/Labor Laws)',
    shortTitle: 'Statutory Compliance Audits',
    slug: 'statutory-compliance-audits',
    group: 'compliance-and-risk-management',
    icon: 'shield',
    summary: 'Help organisations assess their statutory compliance processes and identify potential gaps.',
    items: [
      'Provident Fund (PF) Compliance Review', 'ESIC Compliance Review', 'Labour Law Compliance Audits',
      'Employee Documentation Review', 'Wage and Attendance Record Audits', 'Statutory Register Review',
      'Compliance Gap Assessment', 'Corrective Action Recommendations', 'Compliance Process Development', 'PF and ESIC Administration Support', 'Professional Tax Compliance Support', 'Statutory Records and Documentation', 'Compliance Calendar and Reporting',
    ],
    focus: 'Strengthening compliance processes and supporting organisations in meeting applicable statutory obligations.',
    disclaimer: 'All services are subject to the applicable laws, scope of engagement and professional requirements.',
  },
  {
    order: 12,
    title: 'POSH Compliance & ICC Setup',
    shortTitle: 'POSH Compliance & ICC Setup',
    slug: 'posh-compliance-and-icc-setup',
    group: 'compliance-and-risk-management',
    icon: 'badge',
    summary: 'Promote a safe, respectful and inclusive workplace through structured POSH compliance support.',
    items: [
      'POSH Policy Development', 'Internal Committee (IC/ICC) Setup Support', 'POSH Awareness Training',
      'Employee Sensitisation Programs', 'Internal Committee Training', 'POSH Documentation',
      'Complaint Handling Process Frameworks', 'Annual Compliance Support',
    ],
    focus:
      'Helping organisations establish appropriate workplace prevention, awareness and redressal mechanisms in accordance with applicable POSH requirements.',
  },
  {
    order: 13,
    title: 'Succession Planning & Leadership Pipeline',
    shortTitle: 'Succession Planning',
    slug: 'succession-planning-and-leadership-pipeline',
    group: 'recruitment-and-talent-solutions',
    icon: 'crown',
    summary: 'Prepare your organisation for the future by identifying and developing the next generation of leaders.',
    items: [
      'Critical Role Identification', 'Leadership Competency Mapping', 'High-Potential Employee Identification',
      'Succession Planning Frameworks', 'Leadership Development Plans', 'Career Progression Frameworks',
      'Talent Review Processes', 'Leadership Readiness Assessment',
    ],
    focus: 'Building leadership continuity and reducing dependency on individual key positions.',
  },
]

export const INDUSTRIES = [
  { slug: 'manufacturing', title: 'Manufacturing', icon: 'factory', summary: 'Plant, production, quality and maintenance roles; contract and permanent staffing; shop-floor compliance.' },
  { slug: 'peb-and-engineering', title: 'PEB & Engineering', icon: 'settings', summary: 'Project engineers, site supervisors, design and fabrication talent; project-based staffing.' },
  { slug: 'construction', title: 'Construction', icon: 'hardhat', summary: 'Site and project teams, contract workforce coordination and labour law compliance.' },
  { slug: 'packaging', title: 'Packaging', icon: 'package', summary: 'Production, operations and supply-chain roles; workforce planning for volume demand.' },
  { slug: 'fmcg-and-distribution', title: 'FMCG & Distribution', icon: 'cart', summary: 'Sales, distribution, warehouse and supply-chain hiring; bulk and volume hiring.' },
  { slug: 'and-more', title: 'And More…', icon: 'building', summary: 'Pharmaceuticals & Healthcare, IT, Finance, and corporate and professional organisations.' },
]
