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

export const module3: ModuleData = {
  number: 3,
  slug: 'module-3',
  title: 'Vetting Opportunities',
  moduleIntro:
    'The pipeline you built in Module 2 is about to produce. This module is the filter — so a single paycheck never costs you the trust that makes you valuable.',
  heroCopy:
    'A repeatable filter for deciding which deals to pursue — five questions to ask yourself, the questions to ask every brand, and a real audience-fit check. So a single paycheck never costs you the trust that makes you valuable.',
  heroImage:    '/images/course/module-3/hero.jpg',
  ebookCover:   '/images/course/module-3/ebook-cover.jpg',
  ebookSlug:    'module-3-ebook',
  workbookSlug: 'module-3-workbook',
  nextModule: {
    number: 4,
    title: 'Know Your Worth (Pricing)',
    slug: 'module-4',
    coverImage: '/images/course/module-4/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 3.1',
      title: "Why 'Yes to Everything' Quietly Kills Your Business",
      summary: "Every deal looks like money — but your audience's trust is the only currency that makes you valuable. This segment reframes vetting from a chore into a growth strategy.",
      paragraphs: [
        "In Module 2 you built a pipeline. As it starts producing, you'll run into a good problem: more opportunities than you should take. And this is exactly where a lot of creators quietly sabotage themselves — they say yes to everything, because every deal looks like money.",
        "Here's what they're missing. Your single most valuable asset isn't your follower count, and it isn't even your content. It's your audience's trust. That trust is the thing that turns your recommendation into a brand's sales — it's the entire reason a brand pays you instead of buying an ad. And it's fragile: years to build, and one partnership that doesn't fit can erode it in a moment. Every time you promote something your audience can tell you don't really believe in, you spend a little of the only currency that actually makes you valuable.",
        "But here's the part that reframes vetting from a chore into a growth strategy: being selective doesn't cost you money — it makes you more. Aligned partnerships simply perform better. When you promote something your audience genuinely wants, the content converts, the brand sees real results, and you get rebooked at higher rates and referred to others. Misaligned deals do the opposite: they flop, and that flop becomes part of your track record. So saying no to the wrong deals isn't leaving money on the table. It's how you earn the right to charge premium rates for the right ones. The most discerning creators have the most trusting audiences — which is precisely why they can charge the most.",
        "This module is your filter. Let's build it.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 3.2',
      title: 'Five Questions to Ask Yourself',
      summary: 'Before you reply to a brand, run five questions — the first two are deal-breakers that end the conversation no matter the fee.',
      visualId: 'self-questions',
      paragraphs: [
        "Before you even reply to a brand, run the opportunity through five questions about you and your audience. The first two are deal-breakers — fail either one and it's a no, no matter what they're paying.",
        "One: does it align with my values and content style? The simplest version of this test — would my audience be surprised to see me promoting this? Surprise is a red flag. If it feels like something you'd recommend anyway, green light. Two: can I authentically recommend the product? Ideally you already use and love it; at minimum, test it thoroughly first. If the quality isn't there, or you wouldn't spend your own money on it, decline — whatever the fee. Your recommendations are your currency, and you don't spend currency you'll regret. Those first two are non-negotiable. The next three sharpen the decision. Three: would my audience genuinely benefit? The best partnership content is useful — it solves a problem or speaks to a real interest, and audiences can always tell the difference between genuine enthusiasm and a paycheck. Four: does it fit my long-term brand? Every deal shapes how brands and audiences see you, so ask where you want to be in three years and whether this moves you toward it or blurs your identity. And five, the gut-check: am I comfortable with the whole company? You're endorsing the business, not just the product — a quick search for the company name plus \"controversy\" surfaces most of what you'd want to know before you attach your name to it.",
        "Five questions, about ninety seconds. That's the cost of never waking up to a comment section asking why you'd promote that.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 3.3',
      title: 'The Questions to Ask the Brand',
      summary: "These reveal whether the deal is actually a good one — ask them before you commit, not after. You're not negotiating yet. You're gathering the facts you need.",
      visualId: 'brand-questions',
      paragraphs: [
        "The first five questions were about whether you want the deal. These next ones reveal whether it's actually a good one — and you ask them before you commit, not after. You're not negotiating yet. You're gathering the facts you need to decide with your eyes open.",
        "Four questions do most of the work. What does a win look like? Ask for their goals and success metrics — awareness, traffic, or conversions — because it tells you what to create and flags unrealistic expectations early, before they become your problem. How much creative freedom do I have? The best partnerships let you apply what you actually know about your audience; a brand that wants to script every word produces stiff content that flops (and the flop lands on your feed, not theirs). What's the timeline? Concepts due, review window, post date, revision rounds — it's far easier to ask for time before you say yes than to scramble after. And exactly what are the deliverables? How many posts, which platforms, what formats, plus any events or extras. That single question kills scope creep before it starts. Then, once those are clear, get the three details that decide what the deal is actually worth: usage rights, compensation structure, and exclusivity. You don't price them yet — that's Module 4 — but you need them on the table now, because a \"great\" flat fee can hide a year of free ad usage you never agreed to charge for.",
        "Asking these isn't being difficult. It's what a professional does — and brands notice the difference immediately.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 3.4',
      title: 'Should I Take This Deal?',
      summary: 'Three deals, same creator, scored out of thirty. Watch how the scorecard turns a vague gut feeling into a clear reason — to say yes, no, or not yet.',
      visualId: 'scorecard',
      paragraphs: [
        "Here's how it all comes together in practice. Picture the same home-cooking creator weighing three different offers, each scored one to five across six criteria — out of thirty. Watch how the decision falls out.",
        "The obvious yes: a cookware brand she already owns and uses daily, the exact thing her followers ask about. It scores 29 out of 30. Say yes fast, and price it well. The tempting trap: a detox-tea brand offering double her usual rate. But it scores a 2 on values fit and a 1 on authentic recommendation — both deal-breakers, in the danger zone. The double rate is exactly what makes it dangerous; it's bait. Pass. And the maybe, done right: a meal-kit company she hasn't tried yet, scoring 21. Not a no — a \"not yet.\" Test the product to move the authenticity score, find an angle that genuinely fits, and turn the maybe into a yes — or walk, with no guilt. The lesson sitting underneath all three: a low score on the first two deal-breakers is a no regardless of the total. A tempting fee never overrides a values failure.",
        "That's what a scorecard buys you — it turns a vague gut feeling into a clear reason. So you can say yes with confidence, no without guilt, and \"let's adjust\" with an actual plan instead of a maybe.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 3.5',
      title: 'Where This Is Going',
      summary: "You now have a complete filter. The deals that clear it are, by definition, the ones worth pricing well — which is exactly where Module 4 takes you.",
      visualId: 'course-roadmap',
      paragraphs: [
        "You now have a complete filter: five questions about whether you want a deal, a set that reveals whether it's a good one, and a two-layer audience-fit check that goes beyond demographics to whether your people will actually care. That filter is what protects the trust that makes you valuable — and it holds whether you're at 20K or 500K.",
        "And notice what just happened: the deals that clear this filter are, by definition, the ones worth pricing well. Which is exactly where we go next. In Module 4 — the pricing core of this whole course — we set your rates with confidence and start charging for everything you've been giving away free: the usage rights, the whitelisting, the exclusivity that most creators hand over without realizing it has a price. From there the course keeps following the real arc of a deal: pitching so brands reply, negotiating without flinching, locking it in with contracts you understand, and turning these wins into recurring income.",
        "Before you go, open your Module 3 workbook. Name what your audience actually trusts you for — get it in words — then score a real opportunity you're weighing right now, and note what you still need to ask the brand. Run one real deal through the filter, and it stops being theory. I'll see you in Module 4.",
      ],
      duration: '8 min',
      videoEmbed: null,
    },
  ],
}

export const module4: ModuleData = {
  number: 4,
  slug: 'module-4',
  title: 'Know Your Worth (Pricing)',
  moduleIntro:
    'Most creators undercharge in the same three ways. This module fixes all three — and gives you a rate you can defend out loud.',
  heroCopy:
    'Stop undercharging and start charging for what you give away free. Understand exactly what sets your rate, price the usage rights and whitelisting most creators don\'t know they can, and present a number you can defend.',
  heroImage:    '/images/course/module-4/hero.jpg',
  ebookCover:   '/images/course/module-4/ebook-cover.jpg',
  ebookSlug:    'module-4-ebook',
  workbookSlug: 'module-4-workbook',
  nextModule: {
    number: 5,
    title: 'The Perfect Pitch',
    slug: 'module-5',
    coverImage: '/images/course/module-5/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 4.1',
      title: 'Why Most Creators Undercharge',
      summary: 'Three reasons creators undercharge — and almost always in the same direction. Naming them is the first step to never doing it again.',
      paragraphs: [
        "Pricing is the part of this business creators get most wrong — and almost always in the same direction: too low. If you've ever quoted a number and immediately wondered if you'd aimed too high, only to find out later the brand would have paid double, this module is the fix. There are three reasons creators undercharge, and naming them is the first step to never doing it again.",
        "One: they anchor to a single number they heard once — \"$100 per 10K followers\" — and treat it as a ceiling instead of a floor. Two: they price on follower count alone and ignore the thing that actually makes them valuable, which is engagement. And three, the big one: they give away usage rights, whitelisting, and exclusivity completely free, because nobody ever told them those things have a price. You quote a number for \"a post,\" and the brand walks away with the right to run that content as paid ads for a year — at no extra cost. That's not a rounding error. It's often the entire difference between a deal worth taking and one that isn't.",
        "This module fixes all three: what truly sets your rate, how to charge for everything of value you currently give away, and how to defend your number when a brand pushes back. And you've got an unfair advantage built right into your dashboard — the rate calculator does the math across four steps, no guesswork. But here's the important part: the calculator gives you a number; understanding gives you the argument. We're going to teach you the logic underneath every step, so you're fluent, not dependent. A creator who understands their own price is a creator who can defend it.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 4.2',
      title: 'What Actually Sets Your Number',
      summary: "Follower count is the floor. Two factors move it significantly — and they're where your real worth lives.",
      visualId: 'pricing-levers',
      paragraphs: [
        "Start with the baseline everyone half-knows: roughly $100 per 10K followers for a single post, so 50K starts around $500. Use that as a sanity-check floor — never your final number — because two factors move it significantly, and they're where your real worth lives.",
        "The first is your niche, because not all audiences are worth the same to a brand. Finance, tech, and B2B command higher rates — high-value products, real buying power behind the audience. Lifestyle and fashion are more competitive. But here's the lever inside the lever: specialization beats breadth. A focused \"sustainable home\" creator out-earns a general lifestyle creator of the exact same size, because the brand knows precisely who they're reaching. The second factor is the big one — engagement. A creator whose audience interacts and buys is worth dramatically more than a same-sized creator whose followers scroll past. This is the number you calculated back in Module 1, and this is where it finally sets your price. Average engagement sits around 2–3%, good is 3–5%, excellent is above 5% — and if you're above average, you price above baseline, full stop. This is why some creators with smaller but highly engaged audiences out-charge larger, flatter accounts — and why brands increasingly respect that math.",
        "So your number was never just your follower count. It's your follower count, run through your niche and your engagement. That's the foundation everything else stacks on top of.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 4.3',
      title: 'Charge for What You Give Away Free',
      summary: "This is the segment that pays for the whole course. Most of what you've been handing over for free lives here — and once you see it, you can't unsee it.",
      visualId: 'usage-rights',
      paragraphs: [
        "This is the segment that pays for the whole course. Most of what you've been handing over for free lives here — and once you see it, you can't unsee it.",
        "First, your deliverables aren't all worth the same. A feed post is your baseline — call it 1×. Stories run lighter, around 0.5–0.7× for a set of frames. Reels and video run 1.5–2×, for the reach and the editing skill involved. And platform matters: Instagram and TikTok use similar math, while YouTube commands a premium because it's higher production and keeps working for months. When a brand wants several pieces, bundle them with a modest 10–20% package discount — but reward volume, don't punish yourself for it; be crystal clear what's included and never discount so hard you've undervalued the whole thing just to win it. But here's where the real money hides — the step the calculator literally labels \"where most creators undervalue themselves\": usage rights, whitelisting, and exclusivity. How the brand uses your content matters enormously — organic only is baseline, but paid advertising, with real media spend behind your content, is worth substantially more (creator content in ads outperforms brand ads, and they know it). Duration matters: 30 days, 90 days, a year, perpetual — the longer the window, the more you charge, and \"perpetual\" is a red flag you price like selling an asset or decline. Whitelisting — running ads from your handle, with your credibility — starts at +30% and climbs toward 1.5–2× base for serious spend. And exclusivity — agreeing not to work with competitors — is real income you're giving up, so get paid for it and pin down in writing exactly what counts as a \"competitor.\"",
        "This single step is the difference between getting paid like a hobbyist and getting paid like a professional. It's not extra. It's what you were always owed.",
      ],
      duration: '13 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 4.4',
      title: 'Present a Number You Can Defend',
      summary: 'How you quote is almost as important as what you quote. Quote a range, keep a private floor, and sound like a business.',
      visualId: 'quote-range',
      paragraphs: [
        "You've got your real number. The last skill is presenting it so a brand takes it seriously — because how you quote is almost as important as what you quote.",
        "First, two value-adds that sit outside the calculator, which you apply by hand: rush work — faster than your normal turnaround — justifies +25–50%, and concepting and strategy is separate billable work, often a flat fee from around $500. (And watch scope while you're at it: two revision rounds is standard, three is the ceiling, four-plus is a warning sign.) Then, the move that changes everything: quote a range, not a single number. \"A single Reel typically runs $1,500–$2,000, depending on usage rights and timeline.\" The bottom is your minimum for a straightforward project; the top accounts for rush, extensive usage, or complex deliverables. A range anchors the brand at your real value and gives you room to flex without seeming arbitrary. Underneath that range is one number you keep entirely private — your floor, the minimum below which a deal simply doesn't make sense. Know it cold before any conversation, because it's the line that tells you when to walk away. And since this also sets up your negotiation, you'll open slightly above your target so you have room to move — we do that properly in Module 6. Two rules that protect everything above: clear payment terms with 50% upfront, and never, ever accept \"exposure\" as payment.",
        "The shift here is subtle but total. A creator who quotes a defended range sounds like a business. A creator who whispers a single hopeful number sounds like they're asking permission. Same person — completely different outcome.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 4.5',
      title: 'Where This Is Going',
      summary: "You now know the three things that fix undercharging. For most creators, this single module is the difference between income that's a nice bonus and income you can build a life on.",
      visualId: 'course-roadmap',
      paragraphs: [
        "You now know the three things that fix undercharging: what actually sets your rate, how to charge for everything you used to give away, and how to present a number you can defend without flinching. That's not a small upgrade — for most creators, this single module is the difference between partnership income that's a nice bonus and partnership income you can build a life on. And it holds at 20K or 500K, because it was never about your size; it was about what you knew to charge for.",
        "Here's what changes next. A creator who knows their worth pitches completely differently than one who's hoping — there's a confidence that comes through in every line when you actually know your number. So Module 5 turns that number into pitches brands answer: the exact anatomy of a pitch that gets read, when to send it so it lands while budgets are live, and how to follow up so persistence reads as professionalism. From there it's negotiating, contracts, and the recurring income the whole course builds toward.",
        "Before you go, open your Module 4 workbook and run a real deal through the rate calculator — then turn the output into three things you'll reuse forever: a presentable range, a private floor, and a rate card. Do it with a real opportunity, not a hypothetical. Knowing your worth only matters the moment you have to say it out loud. I'll see you in Module 5.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
  ],
}

export const module5: ModuleData = {
  number: 5,
  slug: 'module-5',
  title: 'The Perfect Pitch',
  moduleIntro:
    'Everything you\'ve built so far has been pointing at this moment. Now you go get the deals — on purpose, with the brands you want.',
  heroCopy:
    "The moment all your prep goes to market. Write a personalized pitch using a six-part structure that gets read, time it to land when budgets are live, and follow up so persistence reads as professionalism — never pestering.",
  heroImage:    '/images/course/module-5/hero.jpg',
  ebookCover:   '/images/course/module-5/ebook-cover.jpg',
  ebookSlug:    'module-5-ebook',
  workbookSlug: 'module-5-workbook',
  nextModule: {
    number: 6,
    title: 'Negotiating Like a Pro',
    slug: 'module-6',
    coverImage: '/images/course/module-6/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 5.1',
      title: 'From Hoping to Creating',
      summary: 'Everything you\'ve built has been pointing at this moment. Proactive pitching flips you from a creator hoping to be discovered into one who creates opportunities on purpose.',
      paragraphs: [
        "Everything you've built so far has been pointing at this exact moment. You have your numbers from Module 1, a target list and media kit from Module 2, a filter from Module 3, and — after Module 4 — a rate you can actually defend. Now you go get the deals. On purpose.",
        "Proactive pitching is the thing that flips you from a creator hoping to be discovered into one who creates opportunities — on your terms, with the brands you actually want. But let's be clear about what a pitch is and isn't, because this is where most creators lose before they start. A pitch is not a shot in the dark, and it is emphatically not \"I love your brand, let's collab!\" A pitch that works is a small, deliberate piece of writing with one job: to make a busy brand contact stop scrolling, recognize that you understand them, and want to reply. That's it. Every line earns its place toward that outcome.",
        "And here's the genuinely good news — this is a learnable structure, not a talent you either have or don't. There's an exact anatomy to a pitch that gets read, a right time to send it, and a way to follow up that works. You'll also never start from a blank page: you've got proven email, DM, and follow-up templates in your dashboard as a starting point to personalize — not copy-paste, but a running start. The pitch is the moment all your prior work finally goes to market. A creator who knows their worth pitches like a business, not a fan. Let's build the email.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 5.2',
      title: 'The Anatomy of a Pitch That Gets a Reply',
      summary: 'Six parts, each earning the next. Skip one and the whole thing falls back into the delete pile.',
      visualId: 'pitch-anatomy',
      paragraphs: [
        "A pitch that works has six parts, and each one earns the next. Skip a part and the whole thing falls back into the \"delete\" pile.",
        "It starts with the subject line, whose only job is to get opened — specific and value-focused, never \"Collaboration Opportunity.\" Something like \"Partnership Proposal: Reaching 50,000 Engaged Home-Design Enthusiasts,\" where the value is obvious before it's even clicked. Then the opening, two or three sentences referencing something specific and recent — a launch, a campaign, a value you share. This is your Module 2 research paying off, and it's what proves the email isn't mass-blasted. Next, the value proposition: one tight paragraph that leads with engagement and demographics from Module 1, not a raw follower count — \"50K, 6.8% engagement, 82% women 25–40 shopping eco.\" Then alignment, the strategic case: the specific overlap between your audience's need and their product, ideally with a number — \"73% of my audience said they want to switch but can't find a brand they trust.\" Then content ideas — two or three concrete concepts that show natural integration, like a swap series or a myth-busting Reel, because specifics make the partnership feel real and imminent. And finally the CTA and signature: one clear, low-pressure next step (\"fifteen minutes next week?\"), a mention that your media kit's attached, and a clean signature with your handles. One note for the warmer, smaller brands you've been engaging since Module 2 — a DM can beat email. Same recipe, shorter: specific opener, one line of value, one ask.",
        "Six parts, each doing a job, each about them, not you. That's the difference between writing to a brand and writing at one.",
      ],
      duration: '13 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 5.3',
      title: 'Timing: The 8–10 Week Rule',
      summary: 'The best pitch sent at the wrong time still loses. Brands plan 6–12 weeks ahead — pitch inside that window, and time it to seasonal budgets.',
      visualId: 'pitch-timing',
      paragraphs: [
        "The best-written pitch sent at the wrong time still loses. So before you hit send, understand how brands actually plan — because timing isn't an afterthought, it's strategy.",
        "Brands plan roughly six to twelve weeks ahead. Pitch too early and you're forgotten; pitch too late and the budget's already spent. The sweet spot is about eight to ten weeks before a campaign would run. Seasonal campaigns reward planning backward from the date: holiday content gets pitched in August–September (wait until November and you've missed it entirely), back-to-school in June–July, summer in January–February, Mother's and Father's Day roughly two months ahead. But don't assume any season is off-limits — plenty of brands run year-round budgets for ongoing awareness and have a constant need for content. And even when this quarter is locked, they're already planning the next: a Q4 budget that closed in September doesn't stop Q1 planning, which makes fall a great time to pitch for winter and spring. One more high-leverage trigger: watch for product launches in your niche. A brand launching something new urgently needs creators to build buzz — so follow your targets, sign up for their newsletters, and pitch right around a launch.",
        "Put these windows in your calendar with reminders. The creator who pitches the right brand at the right moment beats the better creator who pitches it a month too late.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 5.4',
      title: 'Following Up Without Being Annoying',
      summary: 'Most pitches that become deals do so after a follow-up. The skill is persistence that reads as professional — and the trick is to run it on a plan, not a mood.',
      visualId: 'followup-cadence',
      paragraphs: [
        "Here's something that'll change how you feel about silence: most pitches that become deals do so after a follow-up. Your pitch usually wasn't rejected — it was missed, in an inbox getting hundreds of emails a week. The skill is persistence that reads as professional. And the trick is to run it on a plan, not a mood.",
        "The cadence is simple. Day zero: your six-part pitch, sent on the right timing. Then five to seven business days later, follow-up one — brief and warm, referencing the original and keeping it in the same thread. Then five to seven days after that, follow-up two — even shorter, something like \"I'd love to stay on your radar\" — and then you stop. After two follow-ups with no reply, stop, because pushing past that works against you. And here's the reframe that takes the sting out: a non-response almost always just means no budget right now, or they're already working with someone. None of it is personal, and all of it can change. Add the brand back to your list and try again in six months to a year — the brand that ignores you today can become an enthusiastic partner later. Log every pitch in your outreach tracker from Module 2; it stops you re-pitching too soon and shows you what's actually getting replies.",
        "Send enough of these, run on a calm and consistent plan, and you'll start getting the reply every creator is working toward: \"let's set up a call.\"",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 5.5',
      title: 'Where This Is Going',
      summary: 'You now have the full pitching system. When a brand replies "let\'s set up a call," you\'ve crossed a line — and Module 6 walks you into what comes next.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You now have the full pitching system: a six-part email that gets read, the timing to land it while budgets are live, and a follow-up cadence that's persistent without being pushy. Put together, that's the machine that converts all your earlier prep — your numbers, your list, your rate — into actual conversations with brands. And it works the same whether you're at 20K or 500K, because a great pitch is built on specificity and understanding, not size.",
        "Here's the moment it all leads to. When a brand replies \"let's set up a call,\" you've crossed a line — you've moved from pitching to negotiating. And that's where knowing your worth turns into actually getting paid it. Module 6 walks you into every negotiation without the knot in your stomach: how to hold your number, handle pushback, and trade concessions without giving away the deal. From there it's contracts, delivery, and the recurring income this whole course is building toward.",
        "Before you go, open your Module 5 workbook and do the thing that separates this course from every PDF you've ever saved and ignored: pick a real brand from your Module 2 list, build your pitch with the pitch-builder and your templates, set your timing and follow-up dates — and actually send it. Don't just draft it. A pitch in your drafts folder has never landed a single deal. I'll see you in Module 6.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
  ],
}
