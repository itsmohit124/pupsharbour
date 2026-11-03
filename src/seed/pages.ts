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
      title: 'Pups Harbour Consultancy | HR, Recruitment & Business Growth Partner',
      description:
        'Talent acquisition, staffing, HR policies, PMS, statutory compliance, POSH and business strategy for startups, MSMEs and growing organisations across India.',
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
        eyebrow: 'Brand · Marketing · HR · Strategy',
        heading: 'Our Four',
        highlight: 'Pillars',
        intro: 'One integrated approach across the areas that drive sustainable business growth.',
        items: [
          { icon: 'palette', title: 'Brand Strategy', description: 'Building strong brand identities, positioning and market differentiation to create meaningful connections with customers.' },
          { icon: 'megaphone', title: 'Marketing Strategy', description: 'Developing marketing approaches that improve brand visibility, customer engagement and business opportunities.' },
          { icon: 'team', title: 'HR & People Consulting', description: 'Transforming people management through structured HR systems, talent acquisition, performance management and employee development.' },
          { icon: 'compass', title: 'Business Strategy', description: 'Helping organisations assess their business, optimise operations and develop strategic roadmaps for sustainable growth.' },
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
    meta: { description: 'Pups Harbour Consultancy is a multidisciplinary growth partner bringing Brand, Marketing, HR and Strategy together for startups, MSMEs and growing organisations.' },
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
          'We understand that every organisation faces unique challenges as it grows.',
          'Some businesses need stronger HR systems. Others need organisational restructuring, improved performance management, better talent acquisition, stronger brand positioning or a clear business strategy.',
          'Our role is to understand these challenges and provide integrated, practical and customised solutions.',
          'We support startups, MSMEs and growing organisations across sectors through a combination of strategic thinking, professional expertise and implementation-focused consulting.',
        ].map(t),
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
        paragraphs: [t('We believe that sustainable business growth requires:')],
        bullets: [
          'Clear direction and strategic planning.',
          'Strong organisational foundations.',
          'Effective people management.',
          'Structured systems and processes.',
          'Continuous evaluation and improvement.',
        ].map(t),
        closing: 'Our philosophy is simple: help businesses navigate challenges with confidence and move towards sustainable success.',
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
    meta: { description: '13 HR, recruitment, compliance and business consulting services: policy drafting, 360° surveys, PMS, talent acquisition, staffing, HRMS, POSH, statutory audits and more.' },
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

  // ───────────────────────────── CAREERS ─────────────────────────────
  {
    title: 'Careers',
    slug: 'careers',
    meta: { description: 'Submit your resume to Pups Harbour Consultancy and explore career opportunities across engineering, sales, finance, HR, IT, operations, healthcare and leadership roles.' },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Careers',
        eyebrow: 'Careers',
        heading: 'Your Talent. Your Opportunity.',
        highlight: 'Your Future.',
        intro: 'At Pups Harbour Consultancy, we believe every professional deserves the right opportunity to grow.',
      },
      {
        blockType: 'richContent',
        heading: 'We Connect Talent With',
        highlight: 'Opportunity',
        layout: 'centered',
        paragraphs: [
          'We connect candidates with organisations seeking talented, skilled and motivated professionals across multiple industries and business functions.',
          'Whether you are starting your career or looking for your next professional opportunity, we are here to support your journey.',
        ].map(t),
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
          { icon: 'heart', text: 'Pharmaceuticals & Healthcare' },
          { icon: 'crown', text: 'Management & Leadership' },
        ],
        settings: soft,
      },
      {
        blockType: 'applicationForm',
        eyebrow: 'Submit your resume',
        heading: 'Your Next Opportunity Could',
        highlight: 'Start Here.',
        intro: 'Share your updated resume with our recruitment team to explore relevant career opportunities.',
        submitLabel: 'Submit Your Resume',
        note: 'All applications are subject to available opportunities, client requirements and candidate suitability.',
        successMessage: 'Thank you for sharing your profile. Our recruitment team will review it and contact you when a suitable opportunity matches.',
      },
    ],
  },

  // ───────────────────────────── CONTACT ─────────────────────────────
  {
    title: 'Contact Us',
    slug: 'contact',
    meta: { description: 'Contact Pups Harbour Consultancy for HR consulting, recruitment, staffing, compliance, business strategy or brand development.' },
    layout: [
      {
        blockType: 'pageHeader',
        breadcrumb: 'Contact Us',
        eyebrow: 'Contact us',
        heading: "Let's Build Your Business",
        highlight: 'Together.',
        intro: 'Every successful partnership begins with a conversation.',
      },
      {
        blockType: 'contactInfo',
        eyebrow: 'Get in touch',
        heading: 'We’re ready to understand your',
        highlight: 'requirements',
        intro: 'Whether you are looking for HR consulting, recruitment, staffing, business strategy or brand development, Pups Harbour Consultancy is ready to understand your requirements.',
        closing: 'Pups Harbour Consultancy – A Harbour for Your Business Journey.',
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
  location: 'India',
  linkedin: '',
}

export const HEADER = {
  nav: [
    { label: 'Home', href: '/', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'About Us', href: '/about', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Services', href: '/services', dropdown: 'services', hideWhenEmpty: 'never' },
    { label: 'Approach', href: '/approach', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Industries', href: '/industries', dropdown: 'none', hideWhenEmpty: 'never' },
    { label: 'Insights', href: '/insights', dropdown: 'none', hideWhenEmpty: 'insights' },
    { label: 'Careers', href: '/careers', dropdown: 'none', hideWhenEmpty: 'never' },
  ],
  secondaryCta: { label: 'Request a Demo', href: '/#demo' },
  primaryCta: { label: 'Contact Us', href: '/contact' },
}

export const FOOTER = {
  about: 'We connect business strategy, brand positioning and human capital to help organisations build stronger foundations and achieve sustainable growth.',
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Our Approach', href: '/approach' },
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
