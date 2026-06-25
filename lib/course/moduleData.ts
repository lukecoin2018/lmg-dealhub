/* Module data types and content for the Brand Partnership Playbook lesson pages.
 * To add a new module: create a new ModuleData object in its own file and import it
 * in that module's page.tsx. The LessonLayout component renders from this shape.
 */

export interface Segment {
  id: string
  eyebrow: string         // e.g. "Chapter 1.1"
  title: string
  summary: string         // Teaching summary shown below the video
  duration: string        // e.g. "12 min"
  videoEmbed: string | null  // null = show IN PRODUCTION placeholder; swap to embed URL/code to go live
}

export interface ModuleData {
  number: number
  slug: string            // e.g. "module-1"
  title: string
  heroCopy: string        // Hero subheading
  coverImage: string      // Path under /public — e.g. "/course/m1-cover.jpg"
  outroImage: string
  ebookSlug: string       // Used with /api/course/[slug]
  workbookSlug: string
  nextModule: {
    number: number
    title: string
    slug: string
  } | null
  segments: Segment[]
}

export const module1: ModuleData = {
  number: 1,
  slug: 'module-1',
  title: 'The Partnership Landscape',
  heroCopy:
    'Stop chasing one-off deals. This module gives you the complete map — every way creators get paid, the five variables that actually set your rates, and an honest baseline on your own business. Whether you\'re at 15K or 300K, the variable was never your size.',
  coverImage: '/course/m1-cover.jpg',
  outroImage: '/course/m1-outro.jpg',
  ebookSlug: 'module-1-ebook',
  workbookSlug: 'module-1-workbook',
  nextModule: {
    number: 2,
    title: 'Finding & Attracting Brands',
    slug: 'module-2',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 1.1',
      title: 'The Six Ways Creators Get Paid',
      summary:
        'Most creators monetize a fraction of what\'s available. This segment maps all six revenue streams — sponsored content, affiliate, ambassadorships, gifting, licensing, and co-creation — so you can see exactly which doors you haven\'t opened yet.',
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 1.2',
      title: 'What Actually Sets Your Rate',
      summary:
        'It\'s not your follower count. The five variables that determine what you can charge are niche authority, engagement quality, deliverable scope, usage rights, and exclusivity. This segment breaks each one down with real examples — and shows you which levers you can move right now.',
      duration: '14 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 1.3',
      title: 'Know Your Baseline',
      summary:
        'Before you can raise your rates, you need to know where you stand. This segment walks you through an honest audit of your current deal history, deliverable mix, and rate consistency — the same audit that reveals your single biggest missed revenue opportunity.',
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 1.4',
      title: 'The One-Off Trap',
      summary:
        'The one-off deal treadmill is the most common revenue pattern for creators — and the most exhausting. This segment explains why it happens, what it costs you, and what a recurring partnership model actually looks like at the deal level.',
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 1.5',
      title: 'Build the System',
      summary:
        'The difference between creators who build reliable partnership income and those who don\'t isn\'t talent — it\'s process. This segment sets up the operating system we\'ll build over the next nine modules: how leads flow in, how deals move forward, and how partnerships compound.',
      duration: '13 min',
      videoEmbed: null,
    },
  ],
}
