// @polsia:user-owned: neutral case narratives adapted from reviewed portfolio sources.
import type { CaseStudy } from '@/lib/contracts/portfolio';

type Story = [string, string, string, string];

function sections([challenge, approach, delivery, learning]: Story): CaseStudy['sections'] {
  return [
    { id: 'challenge', title: 'The challenge', paragraphs: [challenge] },
    { id: 'approach', title: 'My approach', paragraphs: [approach] },
    { id: 'delivery', title: 'The work', paragraphs: [delivery] },
    { id: 'learning', title: 'Why it matters', paragraphs: [learning] },
  ];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'everest-digital-experience',
    title: 'A\u00A0faster website for\u00A0a local business',
    subtitle: 'Everest Tower · Website redesign and analytics',
    category: 'Web & product',
    legs: ['I4I'],
    legNotes: {
      I4I: "The same approach could help immigrant-owned businesses improve their websites and understand customer activity. The client's immigration status is not part of this case.",
    },
    status: 'Delivered work',
    summary:
      'Rebuilt a slow appliance-service website and set up tracking for actions such as phone clicks.',
    role: 'Website redesign, implementation and analytics setup',
    highlight: 'Mobile performance score: 46 → 92',
    evidenceNote:
      "The PageSpeed figures come from tests on February 22, 2026. The public website was checked on September 12, 2026. These older test results don't guarantee today's speed or show an increase in revenue.",
    featured: true,
    tags: ['Small business', 'Website performance', 'GA4', 'Cloud Run'],
    sections: sections([
      'The WordPress site was slow, information that could reassure customers was hard to find, and the business had little visibility into what visitors did. People had to work too hard to understand the service and get in touch.',
      'I redesigned the site and set up its analytics together. I made service details and signs of credibility easier to scan, configured server-side Google Tag Manager and GA4 on Google Cloud Run, and checked events as they arrived.',
      'A plain-text list of serviced brands became a visual section with structured brand information. In the recorded mobile tests, the PageSpeed score rose from 46 to 92 and largest contentful paint fell from 27.5 seconds to 2.4 seconds. The live event check also showed phone clicks reaching GA4.',
      "The business got a faster, clearer site and a way to see customer actions. Those are useful improvements in their own right. The available records don't show whether sales or conversion rates increased.",
    ]),
    links: [
      { label: 'Explore the website', url: 'https://everest-tower.com/' },
      {
        label: 'See the performance test results',
        url: 'https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto/q_auto/v1778900349/everest-pagespeed-before-after-mobile-2026-02-22_boisvd.png',
      },
    ],
  },
  {
    slug: 'sports-equipment-distribution',
    title: 'Getting equipment out of storage and into play',
    subtitle: 'LA28 · Inventory and community distribution',
    category: 'Operations & automation',
    legs: ['A4A', 'P4P'],
    legNotes: {
      A4A: 'Keeping track of equipment and getting it to the right place is the kind of everyday sports operations work A4A aims to support.',
      P4P: 'This distribution method could help plan how adaptive equipment is managed in the future. This case did not document a parafencing delivery or result.',
    },
    status: 'Delivered work',
    summary:
      'Connected scattered inventory, locations and donation values so sports equipment could reach youth organizations.',
    role: 'Inventory system design and distribution coordination',
    highlight: 'Nearly $300k in equipment distributed',
    evidenceNote:
      'The project records report $1,100,699.66 in equipment tracked and $295,613.66 distributed. These amounts refer to equipment value, not money raised. They have not been independently audited.',
    featured: true,
    tags: ['Youth sport', 'Inventory', 'Smartsheet', 'Community access'],
    sections: sections([
      'Sports equipment was spread across several Los Angeles warehouses. There was no central place to see what was available, where it was, what it was worth or which organizations could use it.',
      'I built an inventory and distribution dashboard in Smartsheet. It brought locations, equipment values, donation values and distribution progress into one place. The wider team also worked with Workday, Salesforce and Agiloft.',
      'Project records show more than $1.1 million in equipment tracked and nearly $300,000 distributed to Los Angeles youth organizations. Alongside the dashboard, the work involved planning deliveries and building relationships with organizations including the YMCA and Science of Sport.',
      'Getting equipment to young people takes more than knowing it exists. Someone has to match it to a need, arrange the move and finish the handoff. The dashboard helped connect those steps.',
    ]),
    links: [
      {
        label: 'See where the inventory work started',
        url: 'https://res.cloudinary.com/dp9lnazkj/image/upload/f_auto,q_auto/v1778906126/before-la28-case-study_pksows.png',
      },
    ],
  },
  {
    slug: 'playla-operations',
    title: 'Connecting schools, parks and youth programs',
    subtitle: 'PlayLA · Program data and geographic planning',
    category: 'Operations & automation',
    legs: ['A4A'],
    legNotes: {
      A4A: 'A shared view of locations, coaches and programs helps with the coordination work A4A aims to simplify for sports operators.',
    },
    status: 'Delivered work',
    summary:
      'Organized school, park and program records so staff could use the same data for planning and public resources.',
    role: 'Data architecture, geographic mapping and workflow design',
    highlight: '1,520 schools and 419 parks mapped',
    evidenceNote:
      'The map covers far more places than the 15 active program sites. A mapped school or park is not a claim that a program ran there.',
    featured: false,
    tags: ['Airtable', 'Geographic data', 'Youth sport', 'Program operations'],
    sections: sections([
      'As the program grew, staff needed to coordinate schools, locations, coaches and logistics. Information was scattered across spreadsheets and conversations, so it was difficult to see how the pieces fit together.',
      'I designed a database that linked program records with their locations. Connecting schools and parks to nearby recreation centers gave staff a way to see coverage and plan outreach.',
      'The build mapped 1,520 schools and 419 parks across Los Angeles. There were 15 active program locations at the time. The same location data later became part of a separate public app, where families could find a program.',
      "Organizing the data once made it useful in two places: staff planning and a parent's search for a program. The records show what was built and how much was mapped; they don't measure a change in citywide participation.",
    ]),
    links: [
      {
        label: 'Explore the public program finder',
        url: 'https://playla-flagfootball.netlify.app/locations',
      },
    ],
  },
  {
    slug: 'playla-family-resource-app',
    title: 'A\u00A0few fewer steps between a\u00A0family and\u00A0a game',
    subtitle: 'PlayLA · Bilingual public resource app',
    category: 'Web & product',
    legs: ['A4A', 'P4P'],
    legNotes: {
      A4A: "Program details become useful when families and coaches can find directions and guidance without extra help. That connects this app to A4A's work in sports operations.",
      P4P: 'The bilingual information design could help with future P4P access work. This app does not document a parafencing program or outcome.',
    },
    status: 'Delivered work',
    summary:
      'Turned internal program data into mobile-friendly locations, directions and practical guidance for families and coaches.',
    role: 'Product design, frontend development and bilingual information architecture',
    highlight: '15 active locations · English and Spanish',
    evidenceNote:
      'The app and program finder were checked on September 12, 2026, and displayed 15 locations. Feature walkthroughs are also available. Usage and participation results have not been independently verified.',
    featured: true,
    tags: ['React', 'TypeScript', 'Bilingual UX', 'Family resources'],
    sections: sections([
      'Families needed to find an active program, know what to bring and arrive at the right recreation center. Coaches needed rules, practice material and game-day guidance they could read on a phone.',
      'I reused the location data from the operations database to build a public resource. I organized it around the tasks people came to do: find a location, get directions and prepare for the day. The app offered the same guidance in English and Spanish.',
      'Built with React and TypeScript, the app showed 15 active locations through search and program cards. Each location could open directions in Google Maps. Parent guidance, playbooks, equipment information, partner details and coach checklists lived alongside the finder.',
      'One small decision sums up the work: opening directions that were already filled in saved a parent a few clicks. Reusing the existing data left more room to work on details like that.',
    ]),
    links: [
      { label: 'Explore the public app', url: 'https://playla-flagfootball.netlify.app/' },
      {
        label: 'Try the program finder',
        url: 'https://playla-flagfootball.netlify.app/locations',
      },
    ],
  },
  {
    slug: 'sports-agency-business-operations',
    title: 'Making proposal work easier to repeat',
    subtitle: 'International sports PR agency · Client confidential',
    category: 'Operations & automation',
    legs: ['A4A'],
    legNotes: {
      A4A: "Keeping relationship records and proposals organized helps people run the businesses around sport. That is part of A4A's focus.",
    },
    status: 'Delivered work',
    summary: 'Organized client records, proposal preparation and review for a sports PR agency.',
    role: 'Business operations design and proposal automation',
    highlight: 'Proposal preparation: days to hours',
    evidenceNote:
      "The time improvement comes from my project account and has not been independently verified. The client's name and internal CRM, proposal and risk-review records remain private.",
    featured: false,
    tags: ['Business development', 'Airtable', 'n8n', 'Proposal workflows'],
    sections: sections([
      'An international sports PR agency relied on knowledge held by individual team members. Tracking opportunities and preparing proposals was hard to repeat consistently. Each proposal also needed a proper risk review.',
      'I designed a business-development workflow around organized relationship records, qualification and review. I used Airtable, n8n and iPhone Shortcuts to connect the information and automate parts of proposal preparation.',
      'The work covered the CRM, sales-funnel stages, risk assessment and proposals in several languages. My project account records proposal preparation falling from days to hours.',
      'The process reduced the work of assembling a proposal while keeping people responsible for its substance. Context, commitments and final decisions still needed human judgment.',
    ]),
    links: [],
  },
  {
    slug: 'hall-of-fame-governance',
    title: 'Making a\u00A0sensitive review process easier to\u00A0follow',
    subtitle: 'USA Fencing Hall of Fame · Governance system design',
    category: 'Operations & automation',
    legs: ['A4A'],
    legNotes: {
      A4A: 'Sports institutions need clear review criteria and consistent materials, with people responsible for the decisions. This is one way A4A can support their work.',
    },
    status: 'Prototype',
    summary:
      'Led committee work and developed a prototype for organizing review criteria, nominee information and ballots.',
    role: 'Committee chair, governance design and technical prototyping',
    highlight: 'Criteria → review → ballot',
    evidenceNote:
      'This is governance design and prototype work. It does not show an active official election system. Confidential committee records and portals remain private.',
    featured: false,
    tags: ['Governance', 'Review criteria', 'Data modeling', 'Decision records'],
    sections: sections([
      'Hall of Fame decisions carry weight for the people involved. As committee chair, I inherited a process that needed better organization around nominee information, review criteria and the preparation of committee materials.',
      'I organized the information model and clarified the order of review. I also explored a committee interface and repeatable ballot generation to reduce manual assembly and make the process easier to examine.',
      'The work included a governance model, a review portal prototype and tools for generating HTML and PDF ballots. This case explains how those parts fit together without sharing private committee information.',
      'Consistent materials and traceable steps help a committee review its decisions. The committee still owns those decisions. This prototype is not proof of error-free operation or use in a particular election.',
    ]),
    links: [],
  },
  {
    slug: 'sffa-brand-and-campaign-tools',
    title: 'A\u00A0welcoming brand a\u00A0small team can keep using',
    subtitle: 'San Francisco Fencing Academy · Identity and campaign tools',
    category: 'Web & product',
    legs: ['A4A'],
    legNotes: {
      A4A: 'A fencing academy has to produce campaign material repeatedly. A reusable tool for that job is a practical example of the support A4A aims to offer small sports teams.',
    },
    status: 'Delivered work',
    summary:
      'Designed a warmer identity for the academy and built a tool for creating campaign assets that follow it.',
    role: 'Brand design and frontend tool development',
    highlight: 'Brand book → campaign generator',
    evidenceNote:
      'Before-and-after designs and generator walkthroughs show the work. Enrollment, conversion rates and time saved in production were not measured.',
    featured: true,
    tags: ['Brand systems', 'Youth sport', 'React', 'Campaign tools'],
    sections: sections([
      'The academy needed an identity that welcomed families and held together across everyday marketing. A brand book would help, but the small team would still have to recreate layouts for each campaign.',
      'I developed a sunshine-and-tie-dye visual direction, then put its rules into a generator app. The app gave the team controls for creating branded assets, including summer-camp material.',
      'I worked on the identity and brand book, redesigned a public website section, and built the asset generator in React. Repeated design choices became controls people could use in the app.',
      "The team could work with the brand rules while making the material. They didn't have to rely entirely on a separate guide or remember every layout decision.",
    ]),
    links: [
      {
        label: 'View the before-and-after design',
        url: 'https://res.cloudinary.com/dp9lnazkj/image/upload/w_1600,f_auto,q_auto:best/v1778920665/sffa-hero-section-before-after_oo4mir.png',
      },
    ],
  },
  {
    slug: 'aisa-operations-plan',
    title: 'Planning courses, staffing and capacity together',
    subtitle: 'AI Start Academy · Capacity and operations planning',
    category: 'Operations & automation',
    legs: [],
    status: 'Delivered work',
    summary: 'Built a workbook that connected program dates and resources with financial planning.',
    role: 'Operations planning and spreadsheet modeling',
    highlight: 'One workbook for the program plan',
    evidenceNote:
      'The project record describes the operations workbook. It does not measure which business decisions or financial results followed from using it.',
    featured: false,
    tags: ['Education', 'Excel', 'Capacity planning', 'Resource allocation'],
    sections: sections([
      'Course plans, staffing, delivery dates and finances can end up in separate documents as a program grows. Before agreeing to another launch, the team has to work out how those plans affect one another.',
      'I built a master operations plan that connected timelines and resource allocation with financial modeling. The workbook made assumptions visible so the team could see the effects of a planning decision.',
      'The team had one place to examine capacity, timing and resources together. Course plans and budget lines could be considered as parts of the same program.',
      "A workbook won't remove uncertainty. It can make the assumptions easier to find and discuss before people commit time or money. That was the purpose of this model.",
    ]),
    links: [],
  },
  {
    slug: 'aisa-course-launch-generator',
    title: 'Turning a\u00A0course brief into\u00A0a launch package',
    subtitle: 'AI Start Academy · Course and funnel generator',
    category: 'Web & product',
    legs: [],
    status: 'Prototype',
    summary: 'Built an app that uses a course brief to generate curriculum and launch material.',
    role: 'Workflow design and application development',
    highlight: 'Course outlines and launch copy from one brief',
    evidenceNote:
      "The project notes describe the app's features and architecture. People still need to review the generated material. Production readiness and launch-time savings have not been verified.",
    featured: false,
    tags: ['Education', 'Generative AI', 'React', 'Firebase'],
    sections: sections([
      'Each new course needed a curriculum, an introduction to the instructor and marketing material. Writing these separately could leave the course promising one thing while its marketing said another.',
      'I designed a brief around the topic, audience, intended learning change and instructor context. The React app passed that brief through a Firebase backend to Gemini.',
      'The app generated curriculum outlines, lesson material and instructor positioning, along with a six-stage sales funnel, workshop guidance and marketing copy. All of it started from the same course brief.',
      'The prototype gives people a connected draft to review. It does not establish better learner outcomes, increased revenue or a specific amount of launch time saved.',
    ]),
    links: [],
  },
  {
    slug: 'aisa-branded-asset-generator',
    title: 'Building brand rules into\u00A0a content tool',
    subtitle: 'AI Start Academy · Visual asset and copy generator',
    category: 'Web & product',
    legs: [],
    status: 'Prototype',
    summary:
      'Built an internal tool for making branded visuals and copy, with approved formats and export options.',
    role: 'Product design, brand-system implementation and frontend development',
    highlight: 'Eight asset formats in one tool',
    evidenceNote:
      "A team-channel announcement dated March 16, 2026 and feature walkthroughs show the tool's introduction. The project notes identify it as an MVP that still needs production cleanup.",
    featured: false,
    tags: ['Brand systems', 'Content operations', 'React', 'AI assistance'],
    sections: sections([
      "The marketing team needed slides, social posts, certificates and campaign assets that followed the same brand. Checking every layout by hand would add more work to a small team's day.",
      'I built approved formats, themes, layouts and export rules into a React and TypeScript app. It had a visual design canvas and an AI Copywriter tab, with presets to keep the material consistent.',
      'The MVP had eight format presets and layout groups for essential slides, process diagrams, strategy material and utilities. Walkthroughs show generation, editing and export. A team announcement records when the app was introduced into the working channel.',
      'The brand rules were available where the team made the content. The tool had reached a working MVP and a team introduction, but it still needed cleanup before it could be described as a fully prepared production app.',
    ]),
    links: [],
  },
  {
    slug: 'baza-workflow-dashboard',
    title: 'Keeping track of work with AI assistants',
    subtitle: 'Baza · Self-directed workflow dashboard',
    category: 'Web & product',
    legs: ['A4A'],
    legNotes: {
      A4A: "The prototype's roles and handoffs could help shape oversight of future A4A agents. It does not show a functioning A4A production team.",
    },
    status: 'Prototype',
    summary:
      'Prototyped a dashboard for following several projects and coordinating handoffs between AI assistants.',
    role: 'Workflow modeling and dashboard prototyping',
    highlight: 'See the work and who takes it next',
    evidenceNote:
      'This is an earlier dashboard prototype. It does not demonstrate full autonomy, current live operation or the measured output of an entire agency.',
    featured: false,
    tags: ['Agent workflows', 'React', 'BPMN', 'Knowledge continuity'],
    sections: sections([
      'Working on several consulting and design projects at once makes it easy to lose track of a handoff. With AI assistants involved, roles and progress can also get buried in separate conversations.',
      'I explored a local dashboard with visible workflows and defined agent roles. BPMN diagrams described the steps and decision points. A React interface brought those views together.',
      'The prototype connected workflow views with agent context and transcript records. It was an attempt to give AI-assisted work a shared place where its progress could be followed.',
      'A project needs somewhere to live and a clear next owner. The dashboard explored how to make that visible. It did not prove that every proposed handoff or coordination step could run on its own.',
    ]),
    links: [],
  },
  {
    slug: 'grassroots-sport-ai-research',
    title: 'Practical AI for grassroots sports organizations',
    subtitle: 'Published research · Community sport operations',
    category: 'Strategy & storytelling',
    legs: ['A4A'],
    legNotes: {
      A4A: 'The paper examines everyday operational problems in small sports organizations. Those questions also inform the work A4A is being built to do.',
    },
    status: 'Strategy & research',
    summary:
      'Coauthored a conference paper on using AI in small sports organizations with limited time, budgets and technical support.',
    role: 'Coauthor; research and operational framework development',
    highlight: 'Conference paper · 2025 · pages 36 to 39',
    evidenceNote:
      "Coauthored conference paper, 2025, pages 36 to 39. The date follows the proceedings cover and colophon, although the page headers contain conflicting 2024 details. Meraki was research inspiration, not a client. The paper's reported implementation results have not been independently verified.",
    featured: false,
    tags: ['Research', 'Grassroots sport', 'AI adoption', 'Practical frameworks'],
    sections: sections([
      'Coaches and volunteers often handle the scheduling and administration as well as delivering the sport. A new tool has to fit the time, budget and technical help they have available.',
      'I contributed research on how AI could help with that work. We considered communication and scheduling, along with revenue tracking and athlete-development information, with practical adoption in mind.',
      'The coauthored paper sets out a framework and possible implementation steps. It appears in the 2025 SMART SPORT & TOURISM proceedings on printed pages 36 to 39. Meraki Tennis inspired the research context; this was an academic contribution, not a delivered client project.',
      'A useful starting point is a specific task that needs help. What information does it use? Can the people doing the work maintain the process after a new tool is introduced? Those questions matter for a small organization with little spare capacity.',
    ]),
    links: [
      {
        label: 'Read the published paper (PDF, 4 pages)',
        url: '/assets/portfolio/grassroots-sport-ai-paper.pdf',
      },
      {
        label: 'View the research paper on Academia.edu',
        url: 'https://www.academia.edu/167900290/Use_of_Artificial_Intelligence_for_Process_Automation_and_Optimization_in_Sports_Organizations_Meraki_Tennis_Case_Study',
      },
    ],
  },
  {
    slug: 'north-american-market-entry',
    title: 'Understanding a\u00A0market before entering it',
    subtitle: 'ArtDesignStory · Market-entry strategy',
    category: 'Strategy & storytelling',
    legs: ['I4I'],
    legNotes: {
      I4I: "Researching an unfamiliar market and translating an offer across cultures can help immigrant businesses. This case makes no claim about the founder's immigration status.",
    },
    status: 'Strategy & research',
    summary:
      'Developed market research, audience definition and positioning for a brand exploring North America.',
    role: 'Market research and go-to-market strategy',
    highlight: 'A plan for entering North America',
    evidenceNote:
      'This was a strategy engagement. Sales, market share and customer-acquisition results have not been verified.',
    featured: false,
    tags: ['Market entry', 'Positioning', 'Audience research', 'Cross-cultural work'],
    sections: sections([
      'A brand considering North America needed to understand the audience and competition there. It could not assume that the positioning it already used would work unchanged.',
      'I researched the market and worked on the audience, positioning and launch approach. The aim was to understand the new setting before committing to a rollout.',
      'The work brought the research and positioning together in a market-entry strategy. It considered how an existing offer could make sense to people in a different cultural and commercial setting.',
      'Entering a new market means learning what people recognize and trust. This project provided a direction for doing that; it does not establish successful market entry or a measured commercial return.',
    ]),
    links: [],
  },
  {
    slug: 'local-practice-digital-presence',
    title: 'Helping people find and\u00A0understand a\u00A0local practice',
    subtitle: 'Dermatology practice · Marketing and operations overview',
    category: 'Strategy & storytelling',
    legs: [],
    status: 'Strategy & research',
    summary:
      "Worked on local search and patient communication as part of the practice's marketing and operations strategy.",
    role: 'Local marketing and operational strategy',
    highlight: 'Clearer steps from search to contact',
    evidenceNote:
      'This is a brief project overview. It includes no patient information, clinical claims, compliance certification or acquisition figures.',
    featured: false,
    tags: ['Local discovery', 'Service communication', 'Marketing strategy'],
    sections: sections([
      'People searching for a healthcare practice need clear information and a straightforward next step. The practice has to be easy to find while taking care with the language it uses.',
      "I looked at local search and patient communication together with the practice's operating needs. I considered the steps between finding the practice and contacting it.",
      'The work covered local marketing and operations strategy. This overview stays within that scope and makes no claims about medical outcomes or work with individual patient records.',
      'Clear language matters when people are choosing a healthcare service. This is a strategy case; it does not measure patient-acquisition changes or demonstrate regulatory compliance.',
    ]),
    links: [],
  },
  {
    slug: 'tuganlyq-nonprofit-web-governance',
    title: 'A\u00A0nonprofit website with a\u00A0plan for its upkeep',
    subtitle: 'Tuganlyq · Nonprofit web and governance work',
    category: 'Community & access',
    legs: ['I4I'],
    legNotes: {
      I4I: "The work supports the American Bashqort & Tatar Association's website and governance. That connects directly to I4I's focus on immigrant communities sharing knowledge and helping one another.",
    },
    status: 'Delivered work',
    summary: "Worked on a nonprofit's website and the responsibilities behind keeping it current.",
    role: 'Web development and governance process support',
    highlight: 'A website people can keep looking after',
    evidenceNote:
      "The project record covers website and governance work. It is not a legal certification and does not mean the organization's liability was eliminated.",
    featured: false,
    tags: ['Nonprofit', 'Community', 'Web presence', 'Governance'],
    sections: sections([
      "A nonprofit's website needs attention after launch. With volunteers doing the work, it helps to be clear about who looks after the information and how updates happen.",
      "I worked on the website and governance processes together. The aim was to make the public site manageable within the organization's day-to-day responsibilities.",
      "The work covered Tuganlyq's web presence and a governance framework. This case is about organizing that work; it is not a technical or legal audit of the whole nonprofit.",
      'When the next person can see what needs updating and who is responsible, a community website is easier to maintain. That continuity matters beyond the launch.',
    ]),
    links: [],
  },
  {
    slug: 'fencing-curriculum-architecture',
    title: 'A\u00A0curriculum coaches can share',
    subtitle: 'Fencing education · Curriculum design',
    category: 'Community & access',
    legs: ['A4A'],
    legNotes: {
      A4A: "A shared curriculum helps coaching knowledge stay with an academy as people change. That is a practical need within A4A's work.",
    },
    status: 'Delivered work',
    summary:
      "Organized coaching knowledge into a common curriculum for an academy's teaching team.",
    role: 'Curriculum design and educational content organization',
    highlight: 'Make coaching knowledge reusable',
    evidenceNote:
      'The project account records curriculum development. It does not measure athlete-performance gains or establish that coaching capacity later increased.',
    featured: false,
    tags: ['Coaching', 'Curriculum', 'Youth sport', 'Knowledge transfer'],
    sections: sections([
      'Coaches develop knowledge through practice, but it can be hard to share when it stays with each person. An academy needs a common teaching structure with room for different learners.',
      'I organized the educational content into a standardized curriculum. It gave coaches material they could refer to together and carry into their own teaching.',
      "The curriculum put the academy's teaching knowledge into a reusable form. It could support new-coach onboarding and give the team a common reference for planning lessons.",
      'A shared curriculum helps coaches take responsibility for the program together. It still needs to leave room for their judgment and for what each participant needs.',
    ]),
    links: [],
  },
  {
    slug: 'fencing-organization-data-model',
    title: "Connecting a\u00A0sports organization's scattered records",
    subtitle: 'Fencing operations · Database design',
    category: 'Operations & automation',
    legs: ['A4A'],
    legNotes: {
      A4A: 'Connected records can help sports organizations run their daily work. This database design is relevant to A4A, but it is not evidence of an adopted A4A service.',
    },
    status: 'Prototype',
    summary:
      'Designed an Airtable database to connect information that had been kept in separate records.',
    role: 'Relational database design',
    highlight: 'One model for related records',
    evidenceNote:
      'The project record identifies an Airtable database design. Deployment, adoption and operational improvements have not been verified.',
    featured: false,
    tags: ['Airtable', 'Data modeling', 'Sport operations', 'Information design'],
    sections: sections([
      'When related information lives in separate spreadsheets, people have to reconcile it before they can use it. The connections between records are also easy to miss.',
      "I designed a relational database in Airtable so the organization's records could be connected. The model was intended to support shared views of the work.",
      "The design brings the organization's data into one model. This case presents the database design, without claiming that a complete operating platform was adopted.",
      'Before automating work, it helps to decide how its information fits together. The model creates options for later workflows. It does not prove that those workflows are already running.',
    ]),
    links: [],
  },
  {
    slug: 'creator-partnership-infrastructure',
    title: 'The work behind a creator partnership',
    subtitle: 'Athlete creators · Partnerships and campaigns',
    category: 'Strategy & storytelling',
    legs: ['A4A'],
    legNotes: {
      A4A: "Athletes who work as creators and business owners need help organizing sponsorships and campaigns. That connects this work to A4A's focus on athlete enterprise.",
    },
    status: 'Delivered work',
    summary: 'Helped creators organize sponsorship proposals, websites and campaign delivery.',
    role: 'Partnership development, sponsorship proposals and campaign coordination',
    highlight: 'Support the business behind the audience',
    evidenceNote:
      'The project account covers partnerships and campaign delivery. It includes no outdated follower counts or unverified claims about financial returns.',
    featured: false,
    tags: ['Athlete creators', 'Sponsorship', 'Campaign operations', 'Partnerships'],
    sections: sections([
      'Before a creator campaign goes live, both sides need to agree on the offer and who will do what. The proposal, website and delivery plan all play a part.',
      'I worked with creators as people building businesses. I prepared sponsorship proposals, coordinated campaigns and worked on websites that helped explain and support the partnership.',
      'The work included formal sponsorship proposals and the Fit Ramadan social campaign from planning through delivery. It also covered creator websites and the structure of the partnerships around them.',
      'Clear roles make it easier for both sides to deliver what they agreed. The case is about that work, without using audience size as proof of impact or claiming returns that were not measured.',
    ]),
    links: [],
  },
  {
    slug: 'community-presence-and-school-sport',
    title: 'BE THERE: trust starts with showing up',
    subtitle: 'Schools and youth organizations · Community practice',
    category: 'Community & access',
    legs: ['A4A'],
    legNotes: {
      A4A: 'Time spent in schools and youth programs helps sports-system design respond to what participants, coaches and community partners need.',
    },
    status: 'Delivered work',
    summary:
      'Showing up in schools and youth programs, leading fencing activities and building relationships over time.',
    role: 'Community partner, fencing activity leader and Olympic mentor',
    highlight: 'Friendship, excellence and respect in practice',
    evidenceNote:
      'I contributed to these programs alongside their teams and partners. The full reach of an event or organization is not my individual impact.',
    featured: false,
    tags: ['Community trust', 'Youth sport', 'School partnerships', 'Olympic values'],
    sections: sections([
      'Trust in a school or youth program grows through relationships. Being there repeatedly gives people time to know one another and understand what the community needs.',
      'My first rule is BE THERE. I bring my Olympic experience into practical activities with young people. Friendship, excellence and respect guide how I work with them.',
      'I have worked with programs including PlayLA, YMCA Metro LA and Ready, Set, Gold! A 2026 newsletter records me leading fencing activity at a Girls Empowerment Day. Earlier work included community fencing education in Singapore.',
      'These programs are a shared effort. My contribution sits alongside the work of educators, organizers and other partners. Time spent with them also informs how I approach program and system design.',
    ]),
    links: [
      { label: 'Ready, Set, Gold!', url: 'https://www.readysetgold.org/' },
      { label: 'YMCA Girls Empowerment Day', url: 'https://www.ymcala.org/girls-empowerment-day/' },
    ],
  },
  {
    slug: 'organic-short-form-storytelling',
    title: 'Making short videos people want to share',
    subtitle: 'Independent content · Production and distribution',
    category: 'Strategy & storytelling',
    legs: [],
    status: 'Delivered work',
    summary:
      'Wrote, filmed, edited and published short videos, then looked at what people watched, shared and saved.',
    role: 'Content creator and short-form producer',
    highlight: 'A reported 191,719 views on one reel',
    evidenceNote:
      'My earlier account records 191,719 views, 367 shares and 228 saves. The original analytics export has not been reviewed for this portfolio. These numbers measure engagement, not customers or revenue.',
    featured: false,
    tags: ['Video', 'Organic content', 'Editing', 'Audience engagement'],
    sections: sections([
      'A short video has little time to explain what is happening and give someone a reason to keep watching. The story has to work in the format people will see.',
      'I handled the scripting, filming, editing and publishing. I paid attention to the opening and pace, then looked at shares and saves as well as views.',
      'My earlier account records one reel at 191,719 views, 367 shares and 228 saves. Those figures are a historical snapshot of the response to a piece of content I produced.',
      'Publishing the work gives me something concrete to learn from. A widely shared video shows attention, but it does not by itself show customer acquisition, zero production cost or a result that will repeat every time.',
    ]),
    links: [],
  },
  {
    slug: 'social-brand-consistency',
    title: 'Making the social feed match the business',
    subtitle: 'Everest Tower · Social identity and templates',
    category: 'Strategy & storytelling',
    legs: ['I4I'],
    legNotes: {
      I4I: "Reusable content templates could help immigrant-owned businesses with little time for production. This case makes no claim about the client's immigration status.",
    },
    status: 'Delivered work',
    summary:
      'Designed readable social templates that looked consistent with one another and with the website.',
    role: 'Visual identity and social-template design',
    highlight: 'Readable posts with a consistent look',
    evidenceNote:
      'Before-and-after material shows the visual changes. Conversion improvements were not measured, and the work did not include a formal accessibility audit.',
    featured: false,
    tags: ['Visual identity', 'Templates', 'Content design', 'Small business'],
    sections: sections([
      "People often check a business's social feed before contacting it. Here, dense graphics and inconsistent layouts made posts difficult to read. Some text was also cropped by the platform.",
      "I designed templates with stronger contrast and consistent typography, drawing on the website's identity. Helpful tips and testimonials had distinct formats but still looked like they came from the same business.",
      'The result was an orange-and-dark visual direction, reusable templates and a more consistent feed. The before-and-after material shows how the posts became clearer and more closely connected to the website.',
      'Templates give a small team a starting point each time it posts. This case shows that design work; it does not establish a commercial return from the visual changes.',
    ]),
    links: [],
  },
  {
    slug: 'cloud-concepts-in-motion',
    title: 'Explaining cloud systems through animation',
    subtitle: 'Technical storytelling · Short educational animations',
    category: 'Strategy & storytelling',
    legs: [],
    status: 'Delivered work',
    summary:
      'Created three short animations that use a character to explain how cloud systems behave.',
    role: 'Technical storytelling and animation production',
    highlight: 'Three concepts, three small stories',
    evidenceNote:
      "The animations are available to view. They were made to explain technical concepts; viewers' understanding or learning gains have not been measured.",
    featured: false,
    tags: ['Technical education', 'Animation', 'AI-assisted media', 'Storytelling'],
    sections: sections([
      'Cloud processes can be hard to picture when all you see are logs and diagrams. Cold starts, data retrieval and temporary build systems each involve a sequence that an animation can show.',
      'I used a small Cloud Agent character to act out the process. An idle agent wakes for a request. A search agent follows connections, while a builder finishes a job and shuts down.',
      'The three looping animations cover scale-to-zero, retrieval and temporary CI/CD execution. Each has a clear trigger and sequence, so it can be reused in an explanation or a short educational post.',
      'The character gives people a way into the explanation. It remains a metaphor, not a complete architecture lesson, and I have not tested how much viewers learned from it.',
    ]),
    links: [
      {
        label: 'Scale-to-zero animation',
        url: 'https://giphy.com/gifs/aisa-ai-agent-start-academy-clqNdSFgdDX2bAQSrf',
      },
      {
        label: 'Retrieval animation',
        url: 'https://giphy.com/gifs/ai-agent-start-academy-search-mEvD5HDXxo7kjfaFeE',
      },
      { label: 'Builder animation', url: 'https://giphy.com/gifs/WUpg253jBhk1xEUlKU' },
    ],
  },
  {
    slug: 'strategy-decision-dashboard',
    title: 'Making a\u00A0dense technical dashboard easier to\u00A0read',
    subtitle: 'Self-directed work · Strategy decision dashboard',
    category: 'Web & product',
    legs: [],
    status: 'Prototype',
    summary:
      'Refined a dashboard with synthetic data, fixing its hierarchy and layout across screen sizes.',
    role: 'Product framing, frontend development and responsive layout work',
    highlight: 'Synthetic data · Presentation prototype',
    evidenceNote:
      "This self-directed prototype uses synthetic telemetry. It has no connection to production systems, private research data or an organization's internal tools.",
    featured: false,
    tags: ['Dashboard design', 'React', 'TypeScript', 'Responsive UX'],
    sections: sections([
      'The dashboard had awkward labels, overlapping log text and panels that broke on narrow screens. Those small problems made an already dense technical concept harder to follow.',
      'I clarified what the interface was meant to show, standardized its typography and fixed repeated wrapping and overflow problems. Shared layout rules helped the panels stay readable without stripping out the detail.',
      'Built with React, TypeScript, Vite and Tailwind, the prototype presents synthetic utilization data, log traces and scheduling scenarios. I improved the responsive layout and made it clearer that the data was for demonstration.',
      'The work was about deciding what readers needed to see first and making the rest readable. It is a presentation prototype, with no connection to real research infrastructure.',
    ]),
    links: [],
  },
  {
    slug: 'nonprofit-content-publishing',
    title: 'A\u00A0publishing workflow volunteers can follow',
    subtitle: 'Workforce development nonprofit · Content operations',
    category: 'Operations & automation',
    legs: [],
    status: 'Delivered work',
    summary:
      'Used SharePoint and Power Automate to organize content and the steps for reviewing and publishing it.',
    role: 'Content workflow design and automation implementation',
    highlight: 'Draft → review → approval → publication',
    evidenceNote:
      'The earlier case study describes the implementation. Deployment logs, publishing speed and compliance outcomes have not been independently reviewed.',
    featured: false,
    tags: ['Nonprofit', 'SharePoint', 'Power Automate', 'Content governance'],
    sections: sections([
      'A small nonprofit needed to keep articles, events and program details current. Manual page edits and unclear versions made each update more technical than it needed to be.',
      'I designed a content workflow around SharePoint records and Power Automate. Volunteers and reviewers could follow the content through draft, review, approval and publication.',
      "The implementation described in the earlier case study connected approved content records to the website. It included approval routing and used tools already close to the organization's internal work.",
      'The review steps make the publishing process easier to follow. People still have to check privacy, copyright and legal requirements; an approval state cannot do that on its own.',
    ]),
    links: [],
  },
];
