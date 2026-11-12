/**
 * Page layouts for the seed, built from docs/content/source.md and the client's design references.
 * After seeding, everything here is edited in /admin; this file is only the starting point.
 */
type B = Record<string, unknown> & { blockType: string }

const link = (label: string, href: string) => ({ label, href })
const t = (text: string) => ({ text })
const dark = { theme: 'dark' }
const soft = { theme: 'soft' }

const finalCta = (heading: string, highlight: string, intro: string, primary = link('Book Your Consultation', '/contact#enquiry')): B => ({
  blockType: 'cta',
  heading,
  highlight,
  intro,
  primaryCta: primary,
  secondaryCta: link('Explore Our Services', '/services'),
  showWhatsApp: true,
  settings: dark,
})

const approachSteps = [
  {
    icon: 'search',
    title: 'Discover',
    subtitle: 'Business Needs Analysis',
    description: 'We begin by understanding your organisation, existing systems, challenges, objectives and growth opportunities.',
    activities: ['Business Discovery Sessions', 'Organisational Assessment', 'HR Process Evaluation', 'Gap Identification', 'Stakeholder Discussions'].map(t),
  },
  {
    icon: 'target',
    title: 'Plan',
    subtitle: 'Strategy Development',
    description: 'We develop a customised roadmap based on your business requirements, priorities and desired outcomes.',
    activities: ['Strategic Recommendations', 'Customised Action Plans', 'HR Framework Development', 'Implementation Roadmap', 'Defined Milestones'].map(t),
  },
  {
    icon: 'settings',
    title: 'Execute',
    subtitle: 'Implementation & Support',
    description: 'We work alongside your organisation to implement the proposed solutions with clarity, coordination and accountability.',
    activities: ['Policy and SOP Implementation', 'HR Process Setup', 'Recruitment and Staffing Support', 'PMS Framework Implementation', 'Training and Development', 'HRMS Integration Support'].map(t),
  },
  {
    icon: 'chart',
    title: 'Review',
    subtitle: 'Evaluation & Optimisation',
    description: 'We continuously assess progress, review outcomes and recommend improvements to support sustainable growth.',
    activities: ['Performance Reviews', 'HR Metrics and Reporting', 'Progress Evaluation', 'Feedback and Recommendations', 'Continuous Improvement Planning'].map(t),
  },
]

export type SeedPage = { title: string; slug: string; meta: { title?: string; description: string }; layout: B[] }

export const PAGES: SeedPage[] = [
  // ───────────────────────────── HOME ─────────────────────────────
  {
    title: 'Home',
    slug: 'home',
    meta: {
      title: 'HR Consultancy & Recruitment Agency in Ahmedabad | Pups Harbour',
      description:
        'HR consultancy and recruitment agency in Ahmedabad, Gujarat: talent acquisition, staffing solutions, payroll and statutory compliance, HR policies, PMS, POSH and business strategy for startups, MSMEs and growing organisations.',
    },
    layout: [
      {
        blockType: 'hero',
        heading: 'Your Strategic HR & Workforce',
        highlight: 'Solutions Partner',
        intro:
          'From building the right teams to creating compliant, digital and high-performing workplaces, we help businesses hire, manage and grow their people with confidence.',
        primaryCta: link('Book a Consultation', '/contact#enquiry'),
        secondaryCta: link('Explore Live Demo', '/#demo'),
        waypoints: [
          { icon: 'chart', label: 'Talent Development' },
          { icon: 'laptop', label: 'Digital HR Transformation' },
          { icon: 'scale', label: 'HR & Compliance' },
          { icon: 'usersearch', label: 'Talent Acquisition' },
          { icon: 'team', label: 'Workforce Planning' },
        ],
        highlights: [
          { icon: 'target', title: 'Hire Smarter' },
          { icon: 'settings', title: 'Operate Compliantly' },
          { icon: 'chart', title: 'Manage Efficiently' },
          { icon: 'team', title: 'Grow Sustainably' },
        ],
      },
      {
        blockType: 'stats',
        items: [
          { icon: 'team', value: '10,000+', label: 'Talent Placements' },
          { icon: 'building', value: '200+', label: 'Trusted Clients' },
          { icon: 'pin', value: 'Pan-India', label: 'Hiring Network' },
          { icon: 'award', value: '15+', label: 'Industry Expertise' },
        ],
      },
      {
        blockType: 'audienceSplit',
        eyebrow: 'How can we help you?',
        heading: 'Your People. Your Growth.',
        highlight: 'Our Commitment.',
        intro: 'Building stronger businesses through the right talent, smarter HR solutions and strategic business consulting.',
        cards: [
          {
            icon: 'building',
            eyebrow: "I'm an Employer",
            title: 'Find the Right Talent',
            text: 'From finding the right professionals to building effective HR systems, we help businesses move forward with confidence.',
            bullets: ['Recruitment & staffing across industries', 'HR systems, policies & compliance', 'Business & organisational consulting'].map(t),
            phone: 'business',
            cta: link('Submit Hiring Requirement', '/employers#hiring'),
          },
          {
            icon: 'usersearch',
            eyebrow: "I'm a Job Seeker",
            title: 'Submit Your Resume',
            text: 'Share your updated resume and let our recruitment team explore opportunities aligned with your qualifications, skills and aspirations.',
            bullets: ['Opportunities across multiple industries', 'Professional recruitment coordination', 'Interview scheduling assistance'].map(t),
            phone: 'recruitment',
            cta: link('Submit Your Resume', '/careers#apply'),
          },
        ],
      },
      {
        blockType: 'richContent',
        eyebrow: 'Who we are',
        heading: 'Build Your Business. Strengthen Your People.',
        highlight: 'Accelerate Your Growth.',
        layout: 'split',
        paragraphs: [
          'Every successful business needs the right strategy, strong people, effective systems and a clear direction.',
          'At Pups Harbour Consultancy, we bring Brand, Marketing, HR and Business Strategy together to help startups, MSMEs and growing organisations build stronger foundations and achieve sustainable growth.',
          'A multidisciplinary growth firm, we connect brand positioning, business strategy and human capital into one coherent growth engine. From organisational assessment and HR transformation to talent acquisition, business strategy and brand development, we deliver integrated solutions tailored to your business journey.',
          'Our approach goes beyond traditional consultancy. We work alongside businesses to strengthen their people, processes, positioning and performance.',
          'Since 2021, we have been supporting businesses with recruitment, staffing, HR operations, payroll management, statutory compliance and organisational development.',
        ].map(t),
        closing: 'A harbour for your business journey.',
      },
      {
        blockType: 'serviceEcosystem',
        eyebrow: 'What we do',
        heading: 'Our Service Ecosystem',
        intro: 'Integrated HR solutions across the entire employee lifecycle.',
        centerLabel: 'End-to-End People Solutions',
        showServices: false,
        cta: link('Explore Our Services', '/services'),
        settings: soft,
      },
      {
        blockType: 'pillars',
        heading: 'Our Four',
        highlight: 'Pillars',
        tagline: 'Built on trust. Driven by results. Designed for long-term growth.',
        intro: 'At Pups Harbour, we do more than fill positions. We build dependable talent partnerships that help businesses grow with confidence. Four pillars guide everything we do.',
        items: [
          {
            icon: 'handshake',
            title: 'Trusted to Deliver',
            tagline: 'Every promise. Every placement. Every time.',
            description: 'Trust is earned through consistent action. From the first conversation to well beyond the final delivery, we take full ownership of our commitments.',
            bullets: ['Honest, open communication', 'Accountable execution', 'Complete confidentiality', 'Reliable, on-time delivery', 'Long-term commitment to every assignment'].map(t),
            closing: 'When we say we’re with you, we stay until the job is done right.',
          },
          {
            icon: 'eye',
            title: 'The Lighthouse View',
            tagline: 'One beam. Your whole business in sight.',
            description: 'The right talent solution starts with the full picture. We look beyond the job description to understand your culture, workforce, growth plans, challenges and future hiring needs.',
            bulletsIntro: 'This 360-degree view lets us:',
            bullets: ['Match the right talent to the right environment', 'Align hiring with your business strategy', 'Anticipate workforce challenges early', 'Build solutions that support sustainable growth'].map(t),
            closing: 'We don’t just fill roles. We connect talent to the bigger picture of your business.',
          },
          {
            icon: 'rocket',
            title: 'Full Sail',
            tagline: 'Hire right. Sail faster.',
            description: 'Talent should move your business forward. Every placement, training programme and HR solution we deliver is built to create measurable value.',
            bulletsIntro: 'You can expect:',
            bullets: ['Faster, more effective hiring', 'Lower employee attrition', 'Higher workforce productivity', 'Better cost per hire', 'Stronger team performance'].map(t),
            closing: 'We turn HR from a cost centre into an engine for growth.',
          },
          {
            icon: 'anchor',
            title: 'Safe Harbour',
            tagline: 'Where talent and businesses come to stay.',
            description: 'Our partnership doesn’t end when a candidate joins your team. We stay involved to support lasting success for both the employee and the business.',
            bulletsIntro: 'Our ongoing support strengthens:',
            bullets: ['Retention and employee engagement', 'Upskilling and workforce development', 'Compliance and HR processes', 'Performance and integration', 'Regular reviews and continuous improvement'].map(t),
            closing: 'We build partnerships that last: stronger teams, better outcomes, lasting trust.',
          },
        ],
      },
      {
        blockType: 'features',
        heading: 'Why Choose Pups Harbour?',
        intro: 'More than a service provider: we are your long-term workforce partner.',
        variant: 'aside',
        columns: '3',
        items: [
          { icon: 'globe', title: 'Pan-India Talent Reach', description: 'Access to a wide and diverse talent pool.' },
          { icon: 'settings', title: 'Industry Expertise', description: 'Specialised hiring across key industries.' },
          { icon: 'layers', title: 'Tech-Enabled Processes', description: 'Faster, transparent and more efficient HR operations.' },
          { icon: 'shield', title: 'Compliance Focused', description: 'Stay compliant and minimise business risk.' },
          { icon: 'chart', title: 'Data-Driven Decisions', description: 'Workforce insights for better business outcomes.' },
          { icon: 'team', title: 'End-to-End Support', description: 'From hiring to workforce development and beyond.' },
        ],
        settings: soft,
      },
      {
        blockType: 'process',
        eyebrow: 'Our approach',
        heading: 'From Business Challenges to',
        highlight: 'Sustainable Growth',
        intro: 'We understand your organisation, develop a customised strategy, implement practical solutions and continuously evaluate performance to drive improvement.',
        steps: approachSteps,
        showActivities: false,
        cta: link('See Our Approach & Packages', '/approach'),
      },
      {
        blockType: 'industries',
        heading: 'Industries We Serve',
        intro: 'HR solutions tailored to the unique needs of diverse industries.',
        variant: 'strip',
        cta: link('Explore Industry Solutions', '/industries'),
        settings: dark,
      },
      {
        blockType: 'liveDemo',
        eyebrow: 'Live demo',
        heading: 'Experience Our Solutions',
        highlight: 'in Action',
        intro: 'See how our digital HR and recruitment solutions work in real time, before you make a decision.',
        modules: [
          { icon: 'gauge', label: 'Recruitment Dashboard' },
          { icon: 'settings', label: 'HRMS Overview' },
          { icon: 'shield', label: 'Compliance Tracker' },
          { icon: 'chart', label: 'Workforce Analytics' },
          { icon: 'calendar', label: 'Digital Onboarding' },
        ],
        cta: link('Request Full Demo', '/contact?industry=Demo%20request#enquiry'),
        settings: { anchorId: 'demo', theme: 'soft' },
      },
      {
        blockType: 'testimonials',
        eyebrow: 'Client outcomes',
        heading: 'Results Our Clients',
        highlight: 'Talk About',
      },
      finalCta(
        "Let's Build Your Business",
        'Together.',
        'Ready to strengthen your organisation, improve your HR systems or take your business to the next level? Let’s start a conversation.',
      ),
    ],
  },

  // ───────────────────────────── ABOUT ─────────────────────────────
  {
    title: 'About Us',
    slug: 'about',
    meta: {
      title: 'About Pups Harbour Consultancy | HR Consulting since 2021',
      description: 'Established in 2021, Pups Harbour Consultancy is a multidisciplinary growth partner bringing Brand, Marketing, HR and Strategy together for startups, MSMEs and growing organisations in Gujarat and across India.',
    },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'About Us',
        eyebrow: 'Who we are',
        heading: 'A Multidisciplinary',
        highlight: 'Growth Partner',
        intro:
          'Pups Harbour Consultancy is a business growth and consulting firm that brings together Brand, Marketing, HR and Strategy to support organisations in building stronger and more effective businesses.',
      },
      {
        blockType: 'richContent',
        eyebrow: 'Our story',
        heading: 'Integrated, practical and',
        highlight: 'customised solutions',
        layout: 'split',
        paragraphs: [
          'At Pups Harbour Consultancy, we believe that people are the most valuable asset of any organisation.',
          'Established in 2021, Pups Harbour Consultancy was built with a vision to help businesses overcome people-management challenges, streamline HR operations and achieve sustainable growth.',
          'We understand that every organisation faces unique challenges as it grows.',
          'Some businesses need stronger HR systems. Others need organisational restructuring, improved performance management, better talent acquisition, stronger brand positioning or a clear business strategy.',
          'Our role is to understand these challenges and provide integrated, practical and customised solutions.',
          'We support startups, MSMEs and growing organisations across sectors through a combination of strategic thinking, professional expertise and implementation-focused consulting.',
          'Our approach combines industry understanding, professional coordination and a commitment to building long-term relationships.',
        ].map(t),
        closing: 'Guiding People. Building Futures.',
      },
      {
        blockType: 'visionMission',
        visionHeading: 'Our Vision',
        vision:
          'To become a trusted multidisciplinary consulting partner, empowering organisations to achieve sustainable growth through strategic thinking, strong people practices and effective business solutions.',
        missionHeading: 'Our Mission',
        mission: [
          'Help businesses build structured and scalable organisations.',
          'Strengthen human capital and organisational effectiveness.',
          'Develop strategic business and brand positioning.',
          'Improve operational efficiency and workforce productivity.',
          'Deliver practical, customised and outcome-oriented consulting solutions.',
          'Build long-term relationships based on trust and professional integrity.',
        ].map(t),
      },
      {
        blockType: 'richContent',
        eyebrow: 'Our philosophy',
        heading: 'The Safe Harbour',
        highlight: 'Approach',
        intro: 'Like a harbour that provides direction, stability and safety, Pups Harbour Consultancy aims to guide businesses through their growth journey.',
        layout: 'centered',
        paragraphs: [
          'We believe that business success is not achieved through recruitment alone. It requires the right people, structured processes, effective management and a clear growth strategy.',
          'We believe that sustainable business growth requires:',
        ].map(t),
        bullets: [
          'Clear direction and strategic planning.',
          'Strong organisational foundations.',
          'Effective people management.',
          'Structured systems and processes.',
          'Continuous evaluation and improvement.',
        ].map(t),
        closing: 'Right People. Right Processes. Better Performance.',
        settings: dark,
      },
      {
        blockType: 'features',
        eyebrow: 'What guides us',
        heading: 'Our Core',
        highlight: 'Values',
        columns: '3',
        variant: 'cards',
        items: [
          { icon: 'shield', title: 'Integrity', description: 'Transparent and ethical professional relationships.' },
          { icon: 'handshake', title: 'Commitment', description: 'Dedicated support towards understanding and fulfilling client requirements.' },
          { icon: 'heart', title: 'People First', description: 'Recognising people as the foundation of organisational success.' },
          { icon: 'lightbulb', title: 'Innovation', description: 'Encouraging new ideas, digitalisation and better ways of working.' },
          { icon: 'award', title: 'Excellence', description: 'Maintaining professional standards and continuously improving our approach.' },
          { icon: 'target', title: 'Results', description: 'Focusing on meaningful business outcomes rather than recommendations alone.' },
          { icon: 'briefcase', title: 'Professionalism', description: 'Maintaining professional standards throughout our interactions and service delivery.' },
          { icon: 'usercheck', title: 'Customer Focus', description: 'Every organisation has unique requirements. We focus on solutions that address individual business needs.' },
          { icon: 'trending', title: 'Continuous Improvement', description: 'Learning, adapting and continuously improving our services.' },
        ],
      },
      {
        blockType: 'features',
        heading: 'The Pups Harbour Advantage',
        columns: '4',
        variant: 'cards',
        items: [
          { icon: 'puzzle', title: 'All-in-One Expertise', description: 'Brand, Marketing, HR and Business Consulting under one roof. One integrated approach, fewer gaps.' },
          { icon: 'rocket', title: 'Built for Ambition', description: 'Tailored solutions for startups, MSMEs and established organisations at different stages of growth.' },
          { icon: 'heart', title: 'People-First Culture', description: 'Ethical, transparent and people-centric consulting because sustainable growth starts with trust.' },
          { icon: 'trending', title: 'Outcomes-Driven Strategy', description: 'Practical recommendations and implementation-focused strategies designed around real business requirements.' },
        ],
        settings: soft,
      },
      finalCta("Let's Build Your Business", 'Together.', 'Every successful partnership begins with a conversation.'),
    ],
  },

  // ───────────────────────────── SERVICES ─────────────────────────────
  {
    title: 'Our Services',
    slug: 'services',
    meta: {
      title: 'Recruitment, Payroll & HR Consulting Services | Pups Harbour',
      description: '13 HR, recruitment, payroll, compliance and business consulting services: policy drafting, 360° surveys, PMS, talent acquisition, staffing solutions, HRMS, POSH, PF/ESIC statutory audits and more.',
    },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Our Services',
        eyebrow: 'Transforming businesses through people, processes and strategy',
        heading: 'Comprehensive Business, HR &',
        highlight: 'Organisational Consulting Solutions',
        intro:
          'We offer integrated consulting services designed to help organisations establish strong foundations, improve efficiency and prepare for sustainable growth, covering the complete organisational lifecycle from business assessment and policy development to talent acquisition, performance management and leadership succession.',
      },
      {
        blockType: 'serviceEcosystem',
        eyebrow: 'Our service ecosystem',
        heading: 'End-to-End HR &',
        highlight: 'Workforce Solutions',
        intro: 'A comprehensive suite of services to help you attract, manage and grow the right talent for your business.',
        centerLabel: 'End-to-End People Solutions',
        showServices: true,
        settings: soft,
      },
      {
        blockType: 'servicesDetail',
        eyebrow: 'All services',
        heading: 'Explore Our',
        highlight: '13 Services',
        intro: 'Company Analysis & 360° Survey is our flagship service: the clearest starting point for understanding your organisation.',
      },
      {
        blockType: 'richContent',
        eyebrow: 'Our service promise',
        heading: 'More Than Consultancy.',
        highlight: 'We Partner in Your Growth.',
        layout: 'centered',
        paragraphs: [
          'We don’t believe in one-size-fits-all solutions.',
          'Every organisation has a different structure, culture, workforce and business objective. We understand your requirements and develop solutions that align with your organisational needs.',
        ].map(t),
        settings: dark,
      },
      finalCta('Discuss Your Business', 'Requirements', 'Tell us where you are today and where you want to go. We will recommend the right services and engagement model.', link('Discuss Your Business Requirements', '/contact#enquiry')),
    ],
  },

  // ───────────────────────────── APPROACH ─────────────────────────────
  {
    title: 'Our Approach',
    slug: 'approach',
    meta: { description: 'Our four-step methodology (Discover, Plan, Execute, Review) and engagement packages: Basic, Standard and Premium.' },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Our Approach',
        eyebrow: 'How we work',
        heading: 'Our Process',
        highlight: 'Methodology',
        intro: 'A structured four-step journey from understanding your business to delivering lasting impact.',
      },
      {
        blockType: 'process',
        eyebrow: 'Four steps',
        heading: 'Discover → Plan → Execute →',
        highlight: 'Review',
        steps: approachSteps,
        showActivities: true,
      },
      {
        blockType: 'packages',
        eyebrow: 'Engagement packages',
        heading: 'Choose Your',
        highlight: 'Growth Path',
        intro: 'Our engagement models are designed to accommodate different organisational requirements and growth stages.',
        tiers: [
          {
            name: 'Basic',
            subtitle: 'Discovery & Assessment',
            description: 'For businesses looking to understand their existing position and identify improvement opportunities.',
            includesPrevious: 'Includes:',
            items: ['One-to-One Business Discovery Session', 'Needs Assessment Report', 'Strategic Recommendations Brief', '30-Day Follow-Up Check-In'].map(t),
          },
          {
            name: 'Standard',
            subtitle: 'Strategy & Implementation',
            description: 'For organisations ready to move from assessment to structured implementation.',
            includesPrevious: 'Everything in Basic, plus:',
            items: ['Customised Strategy Roadmap', 'HR / Brand Implementation Plan', 'Performance Framework Design', 'Monthly Progress Reviews'].map(t),
            featured: true,
          },
          {
            name: 'Premium',
            subtitle: 'Full Support & Monitoring',
            description: 'For organisations seeking continuous consulting and implementation support.',
            includesPrevious: 'Everything in Standard, plus:',
            items: ['Ongoing HR Operations Support', 'Performance Monitoring', 'Leadership Training Programs', 'Quarterly Business Reviews', 'Dedicated Account Management'].map(t),
          },
        ],
        note: 'Engagement scope, timelines and commercials are customised based on organisational size and requirements.',
        cta: link('Schedule a Consultation', '/contact#enquiry'),
        settings: soft,
      },
      {
        blockType: 'list',
        eyebrow: 'Who we serve',
        heading: 'Built for Every Stage of',
        highlight: 'Growth',
        variant: 'tiles',
        items: [
          { icon: 'rocket', text: 'Startups and Emerging Businesses' },
          { icon: 'building', text: 'Micro, Small and Medium Enterprises (MSMEs)' },
          { icon: 'factory', text: 'Growing Manufacturing Organisations' },
          { icon: 'briefcase', text: 'Corporate and Professional Organisations' },
          { icon: 'trending', text: 'Businesses Undergoing Expansion' },
          { icon: 'workflow', text: 'Organisations Seeking HR Transformation' },
        ],
      },
      finalCta(
        "Let's Find the Right Growth Path for",
        'Your Business.',
        'Whether you need an organisational assessment, HR transformation, recruitment support or a complete consulting partnership, we are ready to understand your requirements.',
        link('Schedule a Consultation', '/contact#enquiry'),
      ),
    ],
  },

  // ───────────────────────────── INDUSTRIES ─────────────────────────────
  {
    title: 'Industries',
    slug: 'industries',
    meta: { description: 'HR, recruitment, staffing and compliance solutions for manufacturing, PEB & engineering, construction, packaging, FMCG & distribution and more.' },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Industries',
        eyebrow: 'Industries we serve',
        heading: 'HR solutions tailored to the unique needs of',
        highlight: 'diverse industries',
        intro:
          'Every industry has its own workforce patterns, skill requirements and compliance obligations. We bring sector-specific understanding to hiring, staffing, HR systems and compliance.',
      },
      {
        blockType: 'industries',
        heading: 'Sectors We Support',
        intro: 'Select an industry to start an enquiry tailored to it.',
        variant: 'detailed',
      },
      finalCta('Discuss Your Industry', 'Requirements', 'Tell us about your sector, workforce and hiring plans. We will build a solution around them.', link('Discuss Your Industry Requirements', '/contact#enquiry')),
    ],
  },

  // ───────────────────────────── INSIGHTS ─────────────────────────────
  {
    title: 'Insights',
    slug: 'insights',
    meta: { description: 'HR, compliance and workforce updates for growing businesses from Pups Harbour Consultancy.' },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Insights',
        eyebrow: 'Insights',
        heading: 'HR, compliance and workforce updates for',
        highlight: 'growing businesses',
      },
      { blockType: 'insightsList', heading: 'Latest Articles', limit: 12 },
      finalCta('Have a question about', 'your workforce?', 'Talk to our team about HR, compliance or hiring for your organisation.'),
    ],
  },

  // ───────────────────────────── FOR EMPLOYERS ─────────────────────────────
  {
    title: 'For Employers',
    slug: 'employers',
    meta: {
      title: 'Recruitment & Staffing Solutions for Businesses | Pups Harbour',
      description:
        'Recruitment agency in Ahmedabad, Gujarat for engineering, manufacturing, pharma, FMCG, IT, construction, sales, finance and HR hiring. Share your hiring requirement with Pups Harbour Consultancy.',
    },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'For Employers',
        eyebrow: 'Your hiring & HR partner for sustainable growth',
        heading: 'Build Your Team.',
        highlight: 'Strengthen Your Business.',
        intro: 'Finding the right talent and managing people effectively can be challenging for growing organisations.',
      },
      {
        blockType: 'richContent',
        eyebrow: 'For employers',
        heading: 'Recruitment and HR support',
        highlight: 'that fits your business',
        layout: 'split',
        paragraphs: [
          'Pups Harbour Consultancy works with employers to simplify recruitment, strengthen HR functions and support workforce management.',
          'Whether you are a startup, MSME or established organisation, we help you access professional HR and recruitment support.',
        ].map(t),
      },
      {
        blockType: 'list',
        eyebrow: 'Recruitment solutions for every business need',
        heading: 'We Support Hiring',
        highlight: 'Requirements Across',
        variant: 'tiles',
        items: [
          { icon: 'factory', text: 'Engineering & Manufacturing' },
          { icon: 'heart', text: 'Pharmaceuticals & Healthcare' },
          { icon: 'cart', text: 'FMCG & Consumer Products' },
          { icon: 'laptop', text: 'Information Technology' },
          { icon: 'hardhat', text: 'Infrastructure & Construction' },
          { icon: 'trending', text: 'Sales & Distribution' },
          { icon: 'wallet', text: 'Finance & Accounts' },
          { icon: 'team', text: 'Human Resources' },
          { icon: 'clipboard', text: 'Administration & Operations' },
        ],
        settings: soft,
      },
      {
        blockType: 'process',
        eyebrow: 'Our recruitment process',
        heading: 'Six Steps From Requirement to',
        highlight: 'Joining',
        showActivities: false,
        steps: [
          { icon: 'clipboard', title: 'Understand Your Requirement', description: 'We understand your job description, experience expectations, qualifications, salary budget and organisational requirements.' },
          { icon: 'search', title: 'Talent Sourcing', description: 'We identify potential candidates through relevant sourcing channels and professional networks.' },
          { icon: 'usersearch', title: 'Screening & Shortlisting', description: 'We evaluate candidate profiles against the agreed job requirements.' },
          { icon: 'calendar', title: 'Interview Coordination', description: 'We coordinate interview schedules and facilitate communication between employers and candidates.' },
          { icon: 'handshake', title: 'Selection & Offer Coordination', description: 'We support the selection process and coordinate offer-related communication.' },
          { icon: 'usercheck', title: 'Joining & Follow-Up', description: 'We coordinate joining formalities and follow up on the placement as agreed.' },
        ],
      },
      {
        blockType: 'features',
        heading: 'Why Partner',
        highlight: 'With Us?',
        variant: 'aside',
        columns: '3',
        items: [
          { icon: 'usercheck', title: 'Dedicated Recruitment Coordination', description: 'A single point of contact who manages your hiring end to end.' },
          { icon: 'layers', title: 'Multiple Industry Hiring Capabilities', description: 'Experience across engineering, manufacturing, pharma, FMCG, IT and more.' },
          { icon: 'target', title: 'Focus on Relevant Candidate Profiles', description: 'Shortlists matched to your requirement, not bulk CVs.' },
          { icon: 'workflow', title: 'Flexible Hiring Support', description: 'Permanent, contract, project-based and volume hiring.' },
          { icon: 'eye', title: 'Transparent Communication', description: 'Clear updates at every stage of the process.' },
          { icon: 'handshake', title: 'Relationship-Driven Approach', description: 'We build long-term partnerships, not one-off placements.' },
        ],
        settings: soft,
      },
      {
        blockType: 'hiringForm',
        eyebrow: 'Employer enquiry',
        heading: 'Let Us Help You Find the',
        highlight: 'Right Talent.',
        intro: 'Share your hiring requirements with us, and our team will connect with you to understand your needs.',
        submitLabel: 'Submit Hiring Requirement',
        successMessage: 'Thank you. Our recruitment team will contact you shortly to understand your hiring needs.',
      },
      finalCta(
        'Looking for the Right Solution for',
        'Your Business?',
        "Let's understand your requirements and develop a solution that works for your organisation.",
        link('Discuss Your Requirements', '/contact#enquiry'),
      ),
    ],
  },

  // ───────────────────────────── CAREERS ─────────────────────────────
  {
    title: 'Careers',
    slug: 'careers',
    meta: {
      title: 'Jobs in Gujarat | Submit Your Resume | Pups Harbour',
      description: 'Submit your resume to Pups Harbour Consultancy and explore job opportunities in Ahmedabad, Vadodara, Gujarat and across India in engineering, manufacturing, sales, finance, HR, IT, supply chain, healthcare and leadership roles.',
    },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Careers',
        eyebrow: 'Careers',
        heading: 'Your Talent. Your Opportunity.',
        highlight: 'Your Future.',
        intro: 'Your next career opportunity starts here. At Pups Harbour Consultancy, we believe every professional deserves the right opportunity to grow.',
      },
      {
        blockType: 'richContent',
        heading: 'We Connect Talent With',
        highlight: 'Opportunity',
        layout: 'centered',
        paragraphs: [
          'We connect candidates with organisations seeking talented, skilled and motivated professionals across multiple industries and business functions.',
          'Whether you are starting your career or looking for your next professional opportunity, we are here to support your journey.',
          'We help you explore opportunities aligned with your qualifications, skills and professional aspirations.',
        ].map(t),
      },
      {
        blockType: 'features',
        eyebrow: 'For job seekers',
        heading: 'Why Apply Through',
        highlight: 'Pups Harbour?',
        columns: '3',
        variant: 'cards',
        items: [
          { icon: 'briefcase', title: 'Diverse Job Opportunities', description: 'Access to a wide range of roles with organisations that are hiring.' },
          { icon: 'layers', title: 'Multiple Industries', description: 'Opportunities across engineering, manufacturing, IT, sales, finance, healthcare and more.' },
          { icon: 'handshake', title: 'Professional Recruitment Coordination', description: 'A dedicated team that coordinates between you and the employer.' },
          { icon: 'calendar', title: 'Interview Scheduling Assistance', description: 'We schedule interviews and keep communication clear.' },
          { icon: 'megaphone', title: 'Career Opportunity Updates', description: 'Hear about relevant openings that match your profile.' },
        ],
      },
      {
        blockType: 'list',
        eyebrow: 'Explore career opportunities',
        heading: 'We Support Opportunities',
        highlight: 'Across',
        variant: 'chips',
        items: [
          { icon: 'settings', text: 'Engineering & Manufacturing' },
          { icon: 'megaphone', text: 'Sales & Marketing' },
          { icon: 'wallet', text: 'Finance & Accounts' },
          { icon: 'team', text: 'Human Resources' },
          { icon: 'laptop', text: 'Information Technology' },
          { icon: 'clipboard', text: 'Administration' },
          { icon: 'boxes', text: 'Operations & Supply Chain' },
          { icon: 'package', text: 'Supply Chain & Logistics' },
          { icon: 'clipboard', text: 'Operations & Project Management' },
          { icon: 'laptop', text: 'IT & Software' },
          { icon: 'heart', text: 'Pharmaceuticals & Healthcare' },
          { icon: 'crown', text: 'Management & Leadership' },
        ],
        settings: soft,
      },
      {
        blockType: 'applicationForm',
        eyebrow: 'Submit your resume',
        heading: 'Take the Next Step in',
        highlight: 'Your Career.',
        intro: 'Your next opportunity could start here. Share your updated resume with our recruitment team to explore suitable opportunities.',
        submitLabel: 'Submit Your Resume',
        note: 'Registration does not guarantee employment or an interview. Opportunities are subject to client requirements and candidate suitability.',
        successMessage: 'Thank you for sharing your profile. Our recruitment team will review it and contact you when a suitable opportunity matches.',
      },
    ],
  },

  // ───────────────────────────── CONTACT ─────────────────────────────
  {
    title: 'Contact Us',
    slug: 'contact',
    meta: {
      title: 'Contact Pups Harbour Consultancy | HR & Recruitment in Gujarat',
      description: 'Contact Pups Harbour Consultancy in Gujarat for HR consulting, recruitment, staffing, payroll and compliance, business strategy or brand development. Call, WhatsApp or send an enquiry.',
    },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Contact Us',
        eyebrow: 'Contact us',
        heading: "Let's Build Your Business",
        highlight: 'Together.',
        intro: 'Whether you are an employer looking for reliable recruitment and HR support or a professional searching for new career opportunities, we would be happy to hear from you.',
      },
      {
        blockType: 'audienceSplit',
        eyebrow: "Let's start a conversation",
        heading: 'Who would you like to',
        highlight: 'talk to?',
        cards: [
          {
            icon: 'briefcase',
            eyebrow: 'Business enquiries',
            title: 'For employers & businesses',
            text: 'For recruitment partnerships, HR consulting, payroll support and business consulting requirements, connect with our team.',
            phone: 'business',
            cta: link('Send Business Enquiry', '/contact#enquiry'),
          },
          {
            icon: 'usersearch',
            eyebrow: 'Candidate enquiries',
            title: 'For job seekers',
            text: 'For job opportunities and resume submissions, contact our recruitment team.',
            phone: 'recruitment',
            cta: link('Submit Your Resume', '/careers#apply'),
          },
        ],
      },
      {
        blockType: 'contactInfo',
        eyebrow: 'Get in touch',
        heading: 'We’re ready to understand your',
        highlight: 'requirements',
        intro: 'Whether you are looking for HR consulting, recruitment, staffing, business strategy or brand development, Pups Harbour Consultancy is ready to understand your requirements.',
        closing: "Let's Build Better Workplaces and Brighter Careers Together.",
      },
      {
        blockType: 'enquiryForm',
        eyebrow: 'Business enquiry form',
        heading: 'Tell us about your',
        highlight: 'business',
        intro: 'Share a few details and our team will get back to you within one business day. Looking for a job? Please use the Careers page instead.',
        submitLabel: 'Send Business Enquiry',
        successMessage: 'Thank you for your enquiry. Our team will contact you within one business day.',
      },
      {
        blockType: 'cta',
        heading: 'Your Business Deserves the Right',
        highlight: 'Direction.',
        intro: 'Let’s connect, understand your challenges and build a roadmap for sustainable growth.',
        showWhatsApp: true,
        settings: dark,
      },
    ],
  },

  // ───────────────────────────── LEGAL ─────────────────────────────
  ...legal(),
]

function legal(): SeedPage[] {
  const page = (title: string, slug: string, intro: string, paragraphs: string[], bullets: string[] = []): SeedPage => ({
    title,
    slug,
    meta: { description: `${title} of Pups Harbour Consultancy.` },
    layout: [
      { blockType: 'pageHeader', breadcrumb: title, heading: title, intro },
      {
        blockType: 'richContent',
        heading: 'Summary',
        layout: 'split',
        paragraphs: paragraphs.map(t),
        bullets: bullets.map(t),
        closing: 'This page is a starting draft and should be reviewed by a qualified legal professional before launch.',
      },
    ],
  })
  return [
    page(
      'Privacy Policy',
      'privacy-policy',
      'How we collect, use and protect the information you share with us.',
      [
        'We collect the details you submit through our business enquiry and job application forms (such as your name, contact details, company information, career details and resume) only to respond to your request and, for job seekers, to match you with suitable opportunities.',
        'Your information is stored securely, is accessible only to authorised Pups Harbour staff, and is not sold. Candidate profiles may be shared with prospective employers only in connection with relevant opportunities.',
        'You can ask us to access, correct or delete your personal data at any time by writing to the email address on our Contact page. We retain applications only for as long as they are useful for recruitment, after which they are deleted.',
      ],
      ['Purpose-limited use of your data', 'Secure storage with restricted staff access', 'Right to access, correct and delete', 'Consent recorded with every submission'],
    ),
    page('Terms & Conditions', 'terms', 'Terms that apply to using this website.', [
      'The content on this website is provided for general information about our services. Engagement scope, timelines and commercials for any service are agreed separately in writing.',
      'You agree not to misuse the website, submit false information or attempt to interfere with its security.',
    ]),
    page('Disclaimer', 'disclaimer', 'Important information about the content on this website.', [
      'Information on this website is general in nature and is not legal, tax or financial advice. Legal documents and contractual frameworks should be reviewed by qualified legal professionals for applicable enforceability and legal compliance.',
      'All job applications are subject to available opportunities, client requirements and candidate suitability.',
    ]),
  ]
}

export const SITE_SETTINGS = {
  siteName: 'Pups Harbour Consultancy',
  tagline: 'Your Partner in Business Growth',
  strapline: 'Guiding People. Building Futures.',
  pillarsLine: 'Brand · Marketing · HR · Strategy',
  phone: '+91 62064 54663',
  whatsapp: '+91 62064 54663',
  whatsappMessage: 'Hello Pups Harbour, I would like to know more about your services.',
  email: 'pups.harbour@gmail.com',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM',
  businessPhone: '+91 99985 29394',
  recruitmentPhone: '+91 97248 75844',
  location: 'Gujarat, India',
  website: 'www.pupsharbour.com',
  foundedYear: 2021,
  linkedin: '',
}

export const HEADER = {
  nav: [
    { label: 'Home', href: '/', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'About Us', href: '/about', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Services', href: '/services', dropdown: 'services', hideWhenEmpty: 'never' },
    { label: 'For Employers', href: '/employers', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Industries', href: '/industries', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Insights', href: '/insights', dropdown: 'none', hideWhenEmpty: 'insights' },
    { label: 'Careers', href: '/careers', dropdown: 'none', hideWhenEmpty: 'never' },
  ],
  secondaryCta: { label: 'Request a Demo', href: '/#demo' },
  primaryCta: { label: 'Contact Us', href: '/contact' },
}

export const FOOTER = {
  about:
    'Your trusted partner for Recruitment, Staffing, HR Management and Business Consulting. We connect business strategy, brand positioning and human capital to help organisations build stronger foundations and achieve sustainable growth.',
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Our Approach', href: '/approach' },
    { label: 'For Employers', href: '/employers' },
    { label: 'Industries', href: '/industries' },
    { label: 'Insights', href: '/insights' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
  closingLine: 'A Harbour for Your Business Journey.',
}
