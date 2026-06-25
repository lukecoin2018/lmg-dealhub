/* Module data types and content for the Brand Partnership Playbook lesson pages.
 *
 * IMAGE CONVENTION — all lesson images live in public/images/course/module-N/.
 * To swap an image: replace the file or update the path here — no component edits needed.
 * Shared assets (e.g. logo) live at public/images/course/.
 *
 * To add a new module: create a ModuleData object and a page at app/course/module-N/page.tsx
 * that imports it and renders <LessonLayout data={moduleN} />.
 */

export interface Segment {
  id: string
  eyebrow: string         // e.g. "Chapter 1.1"
  title: string
  summary: string         // Short one-liner — used in course index cards and rail tooltips
  paragraphs?: string[]   // Full lesson copy rendered in the lesson view; falls back to summary when absent
  visualId?: string       // Identifier for an injected visual component (e.g. 'revenue-streams')
  duration: string        // e.g. "12 min"
  videoEmbed: string | null  // null = show IN PRODUCTION placeholder; swap to embed URL to go live (one-line change)
  pullQuote?: {
    text: string
    highlight?: string   // substring of text to receive yellow-underline treatment
  }
  factors?: string[]
  dataNote?: { formula: string; description: string }
  benchmarks?: { value: string; label: string; variant?: 'avg' | 'good' | 'exc' }[]
}

export interface ModuleData {
  number: number
  slug: string            // e.g. "module-1" — used in localStorage key and URL
  title: string
  moduleIntro?: string    // Lead paragraph between hero and segments
  heroCopy: string        // Hero subheading paragraph
  heroImage: string       // Hero background — public/images/course/module-N/hero.jpg
  ebookCover: string      // Ebook book-mockup image — public/images/course/module-N/ebook-cover.jpg
  outroImage: string      // Outro/closing image — public/images/course/module-N/outro.jpg
  ebookSlug: string       // Used with /api/course/[slug]
  workbookSlug: string
  nextModule: {
    number: number
    title: string
    slug: string          // e.g. "module-2"
    coverImage: string    // Up-next card photo — public/images/course/module-N/hero.jpg
  } | null
  segments: Segment[]
}

export const module1: ModuleData = {
  number: 1,
  slug: 'module-1',
  title: 'The Partnership Landscape',
  moduleIntro:
    'Before the tactics, the lay of the land. This first module is your map of the entire business — how partnerships actually work, where the money comes from, and what separates creators who get paid well from those who get paid at all. Five short segments. One clear picture.',
  heroCopy:
    'Stop chasing one-off deals. This module gives you the complete map — every way creators get paid, the five variables that actually set your rates, and an honest baseline on your own business. Whether you\'re at 15K or 300K, the variable was never your size.',
  heroImage:    '/images/course/module-1/hero.jpg',
  ebookCover:   '/images/course/module-1/ebook-cover.jpg',
  outroImage:   '/images/course/module-1/outro.jpg',
  ebookSlug:    'module-1-ebook',
  workbookSlug: 'module-1-workbook',
  nextModule: {
    number: 2,
    title: 'Finding & Attracting Brands',
    slug: 'module-2',
    coverImage: '/images/course/module-2/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 1.1',
      title: 'What This Playbook Will Do For You',
      summary: 'The creators making real money from brand partnerships aren\'t the biggest ones — they\'re the ones who treat this like a business. This segment sets up the system you\'re about to build.',
      paragraphs: [
        'Here\'s something that\'s true at 20K followers and still true at 500K: the creators making real, reliable money from brand partnerships aren\'t the biggest ones. They\'re the ones who treat this like a business instead of taking whatever lands in their inbox.',
        'You already know the feeling. A brand offers a number, and you take it — because pushing back feels risky. You hand over usage rights, exclusivity, an extra deliverable "to keep them happy," and never charge for any of it. You run one great campaign, and then the brand goes quiet and so does the income. None of that is because your audience is too small or your content isn\'t good enough. It\'s because no one ever gave you the system. That\'s not a talent problem. It\'s a systems problem — and systems can be learned.',
        'That\'s what this course is. By the time you finish, you\'ll find and attract the specific brands you actually want to work with. You\'ll price your work with real confidence and defend that price without flinching. You\'ll stop saying yes to lowball offers — not because you\'re told to, but because you\'ll finally know what your time and creative energy are genuinely worth. And the biggest shift: you\'ll turn scattered one-off deals into steady, recurring income you can actually plan your life around.',
        'This isn\'t only knowledge, either. You get the tools that do the work with you — a rate calculator, a negotiation assistant, a contract builder — on every deal you take from here on out. The course teaches you to think like a professional; the tools keep you operating like one.',
        'This first module is where you get your bearings: every way you can get paid, what actually decides your rate, and an honest baseline on where your business stands today. Let\'s start with the money — because most creators are using a fraction of what\'s available to them.',
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 1.2',
      title: 'The Six Ways Creators Get Paid',
      summary: 'Most creators get paid one way. There are six — and the other five are where the real money usually hides.',
      visualId: 'revenue-streams',
      paragraphs: [
        'Most creators get paid one way: a flat fee for a post. That\'s one door out of six — and the other five are where the real money usually hides.',
        'Run through them honestly and count how many you\'re actually using. Sponsored content — the familiar flat fee per post. Affiliate — commission that keeps paying long after you\'ve posted, not just once. Ambassadorships — a 6-to-12-month relationship that turns one-off fees into recurring monthly income. Gifting — free product for content, fine early on, but your time has a price as you grow. Licensing — getting paid again when a brand reuses your content in their ads or emails, on top of your original fee. And co-creation — building something with a brand for an upfront fee plus ongoing royalties.',
        'Here\'s the part that should sting a little: whether you\'re at 20K or 500K, you\'re probably monetizing a quarter of what\'s actually available to you — not because the opportunities aren\'t there, but because no one handed you the full menu. Every stream you\'re not using is money a more deliberate creator at your exact size is already collecting.',
        'That\'s the difference this course makes. A professional doesn\'t depend on the next sponsored post landing in their DMs. They\'ve got several streams running at once, so when one brand goes quiet, the income doesn\'t. By Module 9 you\'ll be building the recurring ones on purpose. For now, just sit with how many doors you\'ve left closed.',
      ],
      duration: '14 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 1.3',
      title: 'What Actually Sets Your Rate',
      summary: 'Two creators, same follower count, $500 vs $2,000 a post. It\'s never the number under your name — five other things set your rate, and every one of them is buildable.',
      visualId: 'engagement-callout',
      paragraphs: [
        'Two creators have the same follower count. One charges $500 a post. The other charges $2,000 — and brands pay it happily. Same size. What\'s the difference?',
        'It\'s never the number under your name. Five things actually set your rate, and not one of them is follower count. Engagement — brands pay for an audience that genuinely responds, not one that scrolls past, so a creator at 6% engagement defends a far higher rate than a same-sized creator at 1%. Content quality — work that looks intentional and consistent, the kind a brand\'s in-house team can\'t make. Professionalism — the most underrated lever there is; reply on time, hit deadlines, be easy to work with, and you get rebooked and referred while flakier creators get dropped. Track record — every result you\'ve driven makes the next deal easier and better paid. And audience understanding — not just how many follow you, but who they are and what they buy.',
        'Read that list again, because it\'s quietly the best news in this whole module: every one of those is something you can build. Your size is mostly fixed in the short term. These aren\'t. Which means the rate you can command isn\'t capped by your follower count — it\'s capped by how professionally you run this. And that\'s entirely in your hands.',
        'This is the whole premise of the course in one idea: it was never your size. We sharpen all five of these as you go — and in Module 4, we turn them into your actual prices.',
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 1.4',
      title: 'Know Your Baseline',
      summary: 'You can\'t improve a number you\'ve never measured. Five minutes, one post, and you\'ll have the clearest honest read on where your business actually stands.',
      visualId: 'engagement-rate',
      paragraphs: [
        'You can\'t improve a number you\'ve never measured. So before any tactics, let\'s get one honest figure on the table — and it takes about five minutes.',
        'It\'s your engagement rate, and it\'s the fastest read on where you actually stand. Take a typical recent post. Add the likes and comments together, divide by your follower count, and multiply by 100. That\'s your number. As a rough map: 2–3% is average, 3–5% is good, 5% and above is excellent — and a strong argument for premium pricing. A real example: 1,500 likes plus 80 comments on a 22,000-follower account is 7.2%. That\'s excellent, and it\'s the kind of number you build a premium rate on. Run the same math on a 500K account with proportional engagement and the conclusion is identical — this is the figure that justifies your price at any size.',
        'Whatever your number comes out to, don\'t treat it as a verdict. It\'s a baseline and a lever. A lower number isn\'t a ceiling; it\'s the first thing this course helps you raise. A higher one is leverage you may not have known you were sitting on. Either way, you now know something most creators never bother to check — and knowing it is the first professional move you make.',
        'This is exactly the kind of thing the course doesn\'t just teach you once. The rate calculator in your dashboard does this math for you on every account, every time — so you\'re never guessing again.',
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 1.5',
      title: 'Where This Is Going',
      summary: 'You have your bearings. Here\'s the full build — ten modules that follow the exact path a real deal travels, from pipeline to recurring income.',
      visualId: 'course-roadmap',
      paragraphs: [
        'You now have your bearings: the full menu of how you get paid, the five levers that actually set your rate, and an honest baseline on your own business. That\'s the foundation. Here\'s the build.',
        'From here, the course follows the exact path a real deal travels — each module handing off to the next. You\'ll go on offense and build a pipeline of the specific brands you want, instead of waiting to be found. You\'ll learn to vet opportunities so you only say yes to deals worth your time. You\'ll set real rates — and finally charge for the usage, exclusivity, and add-ons you\'ve been giving away. You\'ll pitch so brands actually reply, negotiate without the knot in your stomach, and lock deals in with contracts you genuinely understand. You\'ll deliver work that gets you rebooked. And then the big one: you\'ll turn those scattered one-off wins into recurring monthly income through ambassadorships and retainers — before protecting the whole thing for the long haul.',
        'That\'s the journey from here. Every module builds on the numbers you just found, and every one comes with the tools to put it into practice on real deals — not someday, but the next time a brand reaches out.',
        'Before you go, open the Module 1 workbook and write down your "before" picture: your engagement rate, your audience snapshot, and where you want this to be in twelve months. That before picture is how you\'ll measure everything this course is about to change — so get it down honestly. Then I\'ll see you in Module 2.',
      ],
      duration: '13 min',
      videoEmbed: null,
    },
  ],
}
