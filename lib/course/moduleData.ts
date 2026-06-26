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
  outroImage?: string     // Outro/closing image — public/images/course/module-N/outro.jpg (optional)
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

export const module2: ModuleData = {
  number: 2,
  slug: 'module-2',
  title: 'Finding & Attracting Brands',
  moduleIntro:
    'You have your numbers. Now you put them to work — by building the system that brings the right brands to you, instead of waiting for them to show up.',
  heroCopy:
    "Go from reactive to proactive. Build a researched target-brand list, a media kit that sells for you, and an inbound setup that makes the right brands come to you — on purpose. The creators who win don't wait to be discovered; they run a system.",
  heroImage:    '/images/course/module-2/hero.jpg',
  ebookCover:   '/images/course/module-2/ebook-cover.jpg',
  ebookSlug:    'module-2-ebook',
  workbookSlug: 'module-2-workbook',
  nextModule: {
    number: 3,
    title: 'Vetting Opportunities',
    slug: 'module-3',
    coverImage: '/images/course/module-3/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 2.1',
      title: 'Stop Waiting to Be Discovered',
      summary: 'Most creators are reactive — they take whatever lands in the inbox. This segment flips that: three channels, running in parallel, so you generate the opportunities you want.',
      visualId: 'three-channels',
      paragraphs: [
        "In Module 1 you got your numbers. Now you put them to work — starting with the job most creators skip entirely: building a system that brings the right brands to you, instead of waiting and hoping one shows up.",
        "Here's the trap nearly everyone falls into, and it has nothing to do with size. You're reactive. You wait for the DM. You take whatever inbound lands. You don't really choose which brands you work with — you just respond to whoever happens to find you. And here's the uncomfortable part: a 300K creator can be every bit as reactive as a 20K one. The only difference is the size of the inbox. Being reactive means your income depends on luck and other people's timing — and that you're constantly working with brands you'd never have picked.",
        "Going proactive flips all of that. Instead of waiting, you generate a steady flow of opportunities from the brands you actually want. And the way you do it is by running three channels at once — because there are exactly three ways a brand opportunity reaches you. Channel one: you go to them (direct outreach). Channel two: a platform connects you (networks and marketplaces). Channel three: they come to you (inbound discovery). Most creators lean on one and ignore the rest. The ones who build reliable income run all three in parallel — so when one goes quiet, the others keep producing.",
        "That's the shift this module makes: from waiting by the phone to running a pipeline. Let's build it.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 2.2',
      title: 'Build Your Target-Brand List',
      summary: 'Direct outreach is the channel where you\'re in the driver\'s seat. It comes down to four moves — and the one most creators skip is the one that makes everything else work.',
      visualId: 'outreach-steps',
      paragraphs: [
        "The most powerful channel is the one where you're in the driver's seat: direct outreach. Instead of hoping the right brand finds you, you decide which brands you want — and go get them. It comes down to four moves.",
        "First, build the list — aim for 20 to 30 brands. Three things get a brand on it: ones you already use and love, ones whose aesthetic matches your content, and ones whose customers look like your audience. (This is where the audience snapshot you pulled in Module 1 starts earning its keep.) Second, look wide, not just big. See what creators similar to you already partner with — those brands clearly invest in creators — and don't ignore smaller or newer brands without a mature influencer program. They're often easier to start with and can grow into something long-term. Third, research each one before you reach out: their recent campaigns, their latest launches, who seems to make partnership decisions. You're hunting for specifics, because specifics are what separate a real pitch from a generic one. And fourth — the move most creators skip — warm them up first. Engage genuinely before you ever pitch: thoughtful comments, sharing their content, tagging them when you actually use the product. By the time your outreach lands, you're not a cold stranger. You're a name they've already seen.",
        "We write the actual pitch in Module 5. Right now you're building the list and the relationships that make that pitch impossible to ignore.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 2.3',
      title: 'The Media Kit That Sells For You',
      summary: 'One clean page that lets a brand understand your value in thirty seconds. This is where your Module 1 numbers go to work — and the framing of that first line is everything.',
      visualId: 'media-kit-callout',
      paragraphs: [
        "Before you go to market, you need the one document that does your selling for you: a single, clean page that lets a brand understand your value in about thirty seconds. Brands forward media kits around internally, so yours has to stand on its own — and this is exactly where your Module 1 numbers go to work.",
        "Four things belong on it. A short bio — your niche and what makes you valuable, in a sentence or two. Your audience demographics — real numbers from Module 1: age, location, gender split, interests. Your engagement metrics — your pricing-power number, the proof that your audience actually responds. And a few of your strongest pieces of content, with brief results if you have them. But here's the part that decides whether the kit works: lead with engagement and audience fit, not raw follower count. Don't open with \"50,000 followers.\" Open with \"50,000 followers, 6.8% engagement, audience 82% women 25–40 actively shopping for sustainable products.\" The first is a number. The second tells a brand their exact customer is already here — and that framing is your edge at any size. Update it every quarter so it never quietly undersells you.",
        "This is the asset that turns a cold brand warm before you've said a word. Build it once, sharpen it often.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 2.4',
      title: 'Let the Platforms Work For You',
      summary: 'Channels two and three work in the background while you sleep. Set them up once and they quietly generate opportunities on their own.',
      paragraphs: [
        "Channels two and three do something the first one can't: they work in the background while you sleep. Set them up once, and they quietly generate opportunities on their own.",
        "Channel two is platforms and networks — your matchmakers. Influencer platforms connect creators and brands and handle the contracts, approvals, and payments; you apply to campaigns or get discovered by brands searching your criteria, so a strong profile matters. Affiliate networks run underneath everything else: smaller per-sale payouts than a flat fee, but passive income that compounds, especially on evergreen content. And talent agencies are a later-stage option — they take 15–20% for premium deals and negotiation, but they're selective and sign proven creators, so don't chase representation early; build your foundation and the good ones come to you. Channel three is making yourself findable. Most of it is a one-time setup that works forever: a professional email and an explicit \"Partnership inquiries:\" line in your bio, a Business account, consistent niche hashtags (serving your audience first — and never #ad on content that isn't sponsored), and a simple one-page landing site with your media kit and contact form that signals you run a real business. Don't overlook your creator network either — brands ask creators they trust for referrals, so be the generous name that comes up.",
        "Run all three channels together and you've got a pipeline engine, not a waiting game.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 2.5',
      title: 'Where This Is Going',
      summary: 'You now have a pipeline engine. Here\'s the next problem it creates — and how Module 3 solves it.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You now have a pipeline engine: a researched target list, a media kit that sells for you, platforms working quietly in the background, and an inbound setup that makes the right brands come to you. That's the difference between waiting to be discovered and running a system — and it holds whether you're at 20K or 500K.",
        "But here's what happens next, and it's a good problem: once this pipeline starts producing, you'll have more offers than you can take. And not every brand deserves a yes. A single paycheck from the wrong partner can cost you the audience trust you spent years building. So Module 3 builds your filter — how to vet opportunities and say yes only to the deals worth your time, your content, and your credibility. From there the course keeps following the real path of a deal: pricing what you're worth, pitching so brands reply, negotiating without the knot in your stomach, locking it in with contracts you understand, and turning those wins into recurring income.",
        "Before you go, open your Module 2 workbook and start building: your target-brand list, your media-kit content, and a weekly outreach habit. Pipelines reward consistency, not bursts — so the habit matters more than the burst. Get it started, and I'll see you in Module 3.",
      ],
      duration: '8 min',
      videoEmbed: null,
    },
  ],
}
