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

export const module6: ModuleData = {
  number: 6,
  slug: 'module-6',
  title: 'Negotiating Like a Pro',
  moduleIntro:
    "In Module 4 you figured out what you're worth. This is where that number stops being a private calculation and becomes money in your account.",
  heroCopy:
    "Where knowing your worth turns into getting paid it. Walk in prepared, trade variables instead of cutting your price, handle the seven objections you'll actually hear, and hold the boundaries that make brands respect you — and want you back.",
  heroImage:    '/images/course/module-6/hero.jpg',
  ebookCover:   '/images/course/module-6/ebook-cover.jpg',
  ebookSlug:    'module-6-ebook',
  workbookSlug: 'module-6-workbook',
  nextModule: {
    number: 7,
    title: 'Contracts & Legal Essentials',
    slug: 'module-7',
    coverImage: '/images/course/module-7/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 6.1',
      title: 'Everything Is Negotiable',
      summary: "A first offer isn't a fixed reality — it's an opening position. Negotiating professionally doesn't make brands like you less; it makes them want to build with you.",
      paragraphs: [
        "In Module 4 you figured out what you're worth. This is where that number stops being a private calculation and becomes money in your account. There's an offer on the table — and what you do next is the line between creators who get paid their worth and creators who accept whatever they're handed.",
        "Here's the reframe that changes everything: every part of a partnership is negotiable. Not just the fee — the deliverables, the timeline, the usage rights, exclusivity, payment terms, all of it. A first offer isn't a fixed reality you have to react to. It's an opening position. And here's what most creators get backwards: negotiating doesn't make brands like you less. The brands that become your best long-term partners actually respect creators who negotiate professionally, because it signals you treat this as a business — which makes you someone worth building with.",
        "This module gives you three things: how to walk in prepared, the tactics that actually move a deal, and the boundaries that tell you when to hold firm and when to walk. You've also got the Negotiation Assistant in your dashboard, which drafts professional replies for any stage of a deal. But we teach the logic first — because on a live call there's no time to open an app, and real confidence doesn't come from a tool or from bravado. It comes from preparation and a walk-away number you know cold. Most negotiations are won before they begin, in how prepared you walked in. So that's where we start.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 6.2',
      title: 'Won Before You Say a Word',
      summary: 'Three things to lock down before you ever reply — and the third is the one that gives you real power.',
      visualId: 'negotiation-prep',
      paragraphs: [
        "The single biggest predictor of how a negotiation goes is how prepared you were walking in. Three things to lock down before you ever reply — and the third is the one that gives you real power.",
        "First, market context, because knowledge is leverage. Know roughly what creators with your stats, niche, and engagement actually charge — creator communities and rate-sharing groups are gold here. The more you know what's normal, the harder you are to lowball, because you can hear a bad offer for what it is. Second, performance proof — your leverage made concrete. \"My last three sponsored posts averaged 9% engagement and drove around 500 clicks\" is a far stronger position than hoping the brand sees your potential. You're not asking them to imagine your value; you're showing them the receipts. And third — the one that quietly decides everything — your floor, the absolute walk-away minimum you set back in Module 4. Knowing it cold is what gives you the nerve to politely walk away, and the willingness to walk is the single greatest source of power in any negotiation. Desperation weakens you and brands can feel it; a known number strengthens you, and they can feel that too.",
        "Prepared, not hopeful. Lock these three down and you stop negotiating from your back foot — you negotiate every deal from strength.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 6.3',
      title: 'The Tactics That Move a Deal',
      summary: 'Five tactics that actually move the number — without the one move most creators reach for first: cutting their own price.',
      visualId: 'negotiation-tactics',
      paragraphs: [
        "Preparation gets you to the table. These five tactics are how you actually move the number — without the one move most creators reach for first, which is cutting their own price.",
        "Anchor high: open about 15–20% above your target. That's standard practice, not greed — it gives you room to concede and still land on your real number. Then the most important tactic of all: trade variables, don't drop price. \"Over budget\"? Don't lower your rate — change what they get. Fewer deliverables, a shorter usage window, no exclusivity. Price is the last lever you touch, not the first. Bundle to grow the deal: \"One post is $2,000; three over two months is $5,400.\" Better per-post rate for them, sustained visibility, and you held your positioning while growing the total. Add value instead of shrinking it: an extra story, a longer window, some BTS footage, a testimonial — things that cost you little but feel substantial, and keep your core rate intact. And finally, use silence: state your rate, give one brief reason it's fair, then stop talking. Most creators panic in the pause and discount themselves before the brand even responds. Don't. Let them fill the silence — they'll often accept, or counter close to your target.",
        "There's one rule you never break around all of this: get everything in writing before any work begins — deliverables, payment amount and schedule, timeline, usage, exclusivity, revisions. A verbal \"yes\" is worth nothing if it's later disputed. No contract from them? Send a summary email and ask them to confirm. That's your bridge straight into Module 7. Notice what every one of these has in common: not one of them is \"lower your price and hope.\" That's the whole point.",
      ],
      duration: '14 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 6.4',
      title: 'The Seven Objections You\'ll Hear',
      summary: "Brands don't invent new objections — you'll hear the same seven lines over and over. Prepare for every one of them.",
      visualId: 'objections',
      paragraphs: [
        "Here's the reassuring part: brands don't invent new objections. You'll hear the same seven lines over and over — which means you can prepare for every one of them. The pattern across all seven is identical: don't drop your price reflexively, redirect to a variable you can trade, and frame your answer as a professional standard, not a defensive reaction.",
        "\"That's above our budget.\" Don't drop price — trade: \"Let's look at what we can adjust: deliverables, usage window, or exclusivity.\" \"Other creators charge way less.\" Don't take the bait — educate: \"Engagement and fit vary widely. My rate reflects 6.8% engagement and an audience that's 82% your demographic.\" \"We can only do $X maximum.\" If that's at or above your floor, you can accept — but ask for something back. Below your floor? Trade scope. Won't work at all? Walk, politely. \"Can you be flexible on price?\" That's a trap — reframe it: \"I'm flexible on scope, timing, and usage. What matters most to you, so we find a structure that works?\" \"We're offering great exposure.\" A red flag — polite and firm: \"Exposure isn't a currency I can pay rent with. Professional brands compensate fairly.\" \"That's our standard rate, take it or leave it.\" Pressure, and rarely true — call it gently: \"If there's no room on price, can we look at scope to find a fit?\" And the seventh, the stalled deal — \"I'll get back to you,\" then silence: wait three to five days, follow up warmly, one final nudge a week later, then stop and revisit in a few months.",
        "Read those out loud a few times before your next call. The creator who's heard these lines before never gets caught flat-footed — and sounding unbothered is half the battle.",
      ],
      duration: '15 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 6.5',
      title: 'Where This Is Going',
      summary: 'You now have the full negotiation toolkit — how to prepare, the tactics that move deals, and the seven objections with exactly how to meet each one.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You now have the full negotiation toolkit: how to prepare so you walk in from strength, the tactics that move a deal without cutting your price, the seven objections and exactly how to meet each one, and your non-negotiables — your floor, your creative control, your usage and exclusivity limits — framed as professional policies rather than personal refusals. (\"I maintain a policy of not granting unlimited usage rights without compensation that reflects that value\" lands very differently than \"no, I won't do that.\") And you know the red flags worth walking away from: a brand that won't discuss payment upfront, wants unlimited-everything for minimal pay, offers \"exposure\" instead of money, or refuses to put anything in writing. This all holds at 20K or 500K — confidence comes from preparation, not size.",
        "Once the negotiation lands on \"yes,\" there's exactly one step before you create anything: getting it all in writing, properly, so it actually protects what you just won. That's Module 7 — the eight standard contract sections, FTC disclosure done right, and how to keep ownership of your own content. From there it's delivering the work and turning these wins into recurring income.",
        "Before you go, open your Module 6 workbook. Fill your prep sheet — context, proof, floor — plan what you'll trade before you ever discuss price, rehearse the seven objections out loud until they're automatic, and write your non-negotiables as policy statements you can use word-for-word. Negotiation rewards the prepared. Get prepared, and I'll see you in Module 7.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
  ],
}

export const module7: ModuleData = {
  number: 7,
  slug: 'module-7',
  title: 'Contracts & Legal Essentials',
  moduleIntro:
    "The deal is done. One thing stands between you and starting work — and it's the thing most creators rush or skip entirely: getting it in writing, properly.",
  heroCopy:
    "Contracts are protection, not paperwork — the document that turns the deal you negotiated into terms you can enforce. Understand the eight standard sections, get FTC disclosure right, keep your content rights, and produce a real, signable agreement.",
  heroImage:    '/images/course/module-7/hero.jpg',
  ebookCover:   '/images/course/module-7/ebook-cover.jpg',
  ebookSlug:    'module-7-ebook',
  workbookSlug: 'module-7-workbook',
  nextModule: {
    number: 8,
    title: 'Delivering Results & Reporting',
    slug: 'module-8',
    coverImage: '/images/course/module-8/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 7.1',
      title: 'Contracts Are Protection, Not Paperwork',
      summary: "A contract turns your negotiated yes into terms you can actually enforce — and a brand that resists putting things in writing is telling you something important.",
      paragraphs: [
        "The negotiation lands on a yes. There's one thing standing between you and starting work — and it's the thing most creators rush or skip entirely: getting the deal in writing, properly.",
        "A contract turns the conversation you just won in Module 6 into terms you can actually enforce. It protects you from scope creep, from late payment, and from a brand using your content in ways you never agreed to. It protects the brand too — which is exactly why a brand that resists putting things in writing is telling you something important about how this partnership would go. Here's the part that removes the intimidation: you don't write contracts from scratch, and you don't need a law degree. The Contract Builder in your dashboard gives you a lawyer-grade starting document for any of seven deal types, in four steps. What this module gives you is the understanding underneath it — what each section actually protects, and how to spot a clause that's quietly bad for you before you sign it.",
        "One honest note up front: this is educational, not legal advice. The Builder produces a strong starting document, but for high-value or complex deals, have a qualified attorney review it before signing. With that said — every contract has eight standard sections, six required and two optional. Once you understand what each one is doing, a contract stops being scary and starts being your shield. Let's walk through them.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 7.2',
      title: 'The Eight Sections That Protect You',
      summary: 'Eight sections, each guarding against a specific way creators get burned. Six are required; two are optional but matter more than their label suggests.',
      visualId: 'contract-sections',
      paragraphs: [
        "Eight sections, and each one is guarding against a specific way creators get burned. Six are required; two are optional but matter more than their label suggests.",
        "The first four are the foundation. Parties & Scope (required): who's actually in the contract, which changes your legal exposure — signing as an individual puts your personal name and assets on the line, while a business entity carries that exposure instead. Deliverables & Timeline (required): your shield against scope creep — platform, count, content type, due date, specs, plus the approval cadence and a minimum days-live (30 is standard) so they can't pull a post early or sit on your draft. Payment Terms (required): at least 50% upfront for new brands, Net 30 as standard (shorter is better), a late fee of around 1.5% a month to give them a reason to pay on time, and the payment method in writing. And Usage Rights & Licensing (critical) — limit the duration (one year default; perpetual costs 2–3× rate), specify platforms and organic-vs-paid, and never accept \"general marketing purposes.\" You keep ownership; they get a license.",
        "The next four are the protective layers. Revisions & Approvals (required): 2–3 rounds standard, and define what counts — a caption tweak is a revision, reshooting a Reel is new work, billed separately. Exclusivity Terms (optional): never free, priced in Module 4, with specific competitor categories and a capped period. Kill Fee & Termination (optional): the one creators forget until they need it — 25–50% if cancelled after work begins, 100% after delivery; include it on anything over a few hundred dollars. And FTC Compliance & Disclosures (required): non-negotiable, the section a brand may try to soften — don't let them, because the fines fall on you. You keep ownership; they get a license. Hold onto that one line — it's the difference between renting your work and giving it away.",
      ],
      duration: '14 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 7.3',
      title: 'FTC Disclosure, Done Right',
      summary: 'Always required, always your liability — because when disclosure is wrong, the fines land on you, not the brand. The rules are clear and completely learnable.',
      visualId: 'ftc-disclosure',
      paragraphs: [
        "Of all eight sections, this is the one that's always required, always your liability, and always worth getting exactly right — because when disclosure is wrong, the fines land on you, not the brand. The good news: the rules are clear and completely learnable.",
        "The principle is \"clear and conspicuous\" — impossible to miss. That means disclosure before the \"more\" button (the first 125 characters of a caption), and on video, spoken in the first 30 seconds and shown on screen. Use unambiguous language: #ad, #sponsored, #partner all work; #collab, #sp, or a vague \"thanks [brand]\" do not. Cover every frame — Stories need disclosure on every frame, not just the first, because viewers land anywhere. And platform tags like \"Paid Partnership\" supplement your disclosure, they never replace it — use both.",
        "Format by format: feed posts disclose in the caption before the \"more\" cutoff; Stories on every frame (a text sticker is fine); Reels and TikTok in the caption and verbally or visually in the first 30 seconds; affiliate links need \"may earn a commission\" even without direct payment; and gifted product still requires disclosure — #gifted or \"[brand] sent me this.\" One more thing if your audience is international: other countries differ in detail — the UK's ASA, Canada's standards, the EU's rules — but they all converge on the same principle. Disclose clearly, and follow the strictest standard that applies to you. This isn't the fun part of the business, but it's the part that protects everything else you've built. Get it right once, build the habit, and it's never something you have to worry about again.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 7.4',
      title: 'The Business Layer Under Your Deals',
      summary: 'Two practical things outside the contract that separate a creator with some brand deals from a creator running an actual business.',
      visualId: 'business-basics',
      paragraphs: [
        "Two practical things sit outside the contract but exist for the same reason — protection. They're not glamorous, but they're what separates a creator with some brand deals from a creator running an actual business.",
        "The simplest thing you can do today: open a separate bank account for business income and expenses, so at tax time you're not untangling a year of mixed personal-and-business spending. While you're at it, track everything that reduces your taxable income — equipment, software, props, a portion of your phone and internet, professional services. Then two bigger moves as you grow. Form an LLC once you're earning real partnership revenue (around $20K+ a year): it insulates your personal assets from lawsuits and debt, and it costs only a few hundred dollars and a couple of hours through an accountant or formation service. And handle your taxes proactively — you owe income and self-employment tax, so set aside 25–30% of every payment in a separate account, track every business expense, and consider quarterly estimated payments to avoid penalties.",
        "As with the contracts themselves, this is educational, not legal or tax advice — for your specific situation, country, and income level, a qualified attorney or accountant pays back the investment several times over. None of this is the reason you became a creator. But it's the unglamorous infrastructure that lets the creative part become a career instead of a side hustle that stresses you out every April.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 7.5',
      title: 'Where This Is Going',
      summary: 'You now understand all eight contract sections, FTC disclosure across every format, and the business basics that sit underneath your deals.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You now understand all eight contract sections and what each one protects, FTC disclosure across every format, and the business basics that sit underneath your deals. That's the difference between a handshake you hope holds and an agreement that actually protects what you negotiated — and it matters just as much at 20K as at 500K, because a bad clause costs you the same either way.",
        "Here's what comes next. The deal is locked in and protected — now you have to deliver. And delivery is where deals quietly compound: the work you produce and the way you report on it decide whether you get rebooked, referred, and able to raise your rate without resistance. Module 8 is about delivering content brands brag about and reporting like a strategic partner instead of a vendor — the difference between a one-off payment and the doorway to recurring income. From there, Module 9 turns that doorway into actual retainers.",
        "Before you go, open your Module 7 workbook: run a real deal through the Contract Builder, review it against the eight-section checklist, self-audit your last sponsored post with the FTC cheat sheet, and pick your next business-basics step. Make one real contract, and the whole thing stops being abstract. I'll see you in Module 8.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
  ],
}

export const module8: ModuleData = {
  number: 8,
  slug: 'module-8',
  title: 'Delivering Results & Reporting',
  moduleIntro:
    'Pricing earns this deal. Delivery and reporting earn the next ten.',
  heroCopy:
    "Pricing earns this deal; delivery and reporting earn the next ten. Plan content that won't waste a day, produce it to a standard brands brag about, optimize the first hour after posting, and report like a strategic partner — not a vendor.",
  heroImage:    '/images/course/module-8/hero.jpg',
  ebookCover:   '/images/course/module-8/ebook-cover.jpg',
  ebookSlug:    'module-8-ebook',
  workbookSlug: 'module-8-workbook',
  nextModule: {
    number: 9,
    title: 'Building Long-Term Partnerships',
    slug: 'module-9',
    coverImage: '/images/course/module-9/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 8.1',
      title: 'Delivery Is Where Deals Compound',
      summary: 'Pricing decides what you earn on this deal. Delivery and reporting decide what you earn on the next ten. This is the line between being treated as a vendor and being treated as a partner.',
      visualId: 'vendor-vs-partner',
      paragraphs: [
        "You found the brand, vetted it, priced it, pitched, negotiated, and locked it down. Now comes the part that quietly does more for your future income than every step before it combined: actually delivering the work, and reporting on what it did.",
        "Here's the mental model that should reframe how you treat every deliverable. Pricing decides what you earn on this deal. Delivery and reporting decide what you earn on the next ten. Deliver content that performs, report it clearly, and you get rebooked, referred, and able to raise your rate without resistance. The flip side is just as real: a bad delivery — late, off-brief, low-quality, or missing the FTC disclosure — can torch a relationship and end any shot at a retainer. So this is the line between being treated as a vendor and being treated as a partner. A vendor delivers something average, on time at best, hits publish, and goes silent — the brand never sees the impact, and the vendor gets replaced. A partner delivers to a standard the brand brags about, optimizes the first hour, then sends a report that proves the value — and gets retained and referred.",
        "Vendors get replaced. Partners get retained. Everything in this module is about which one you become — and the gap between them isn't talent or follower count. It's a handful of habits most creators simply never build.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 8.2',
      title: 'Plan Before You Shoot',
      summary: 'Two documents — 10 to 20 minutes each — that save hours and prevent the most common loss in creator content: finishing the day without the one essential frame.',
      paragraphs: [
        "The single biggest difference between content that lands and content that wastes a whole day is whether you planned it before you picked up the camera. Two documents handle this — and you only ever need these two. They take 10–20 minutes and save you hours.",
        "The first is the content brief — about one page, pulled straight from your contract. It captures everything that has to be true before you start: the key message, the brand's value prop, the required elements (specific shots, hashtags, the CTA), your creative angle, the emotional tone — and the FTC disclosure plan, written out in advance. If anything on it is unclear, you ask the brand before you shoot, not after. The second is the shot list — the practical companion — the specific shots you need, in order: a wide shot for context, close-ups for product detail, action shots, the hero beauty shot, some BTS. It prevents the most common loss in all of creator content: finishing the day, sitting down to edit, and realizing you never got the one essential frame.",
        "And one underrated habit that sits alongside both: draft your caption now, when you write the brief — not in the five rushed minutes before posting, which is exactly where disclosure errors creep in and the CTA gets dropped. Write it with the disclosure in the first 125 characters and the CTA worked in naturally, then read it back the next day. On posting day, all you do is post. Planning isn't the exciting part of creating, but it's the difference between a shoot that produces brand-ready work and one that produces a folder of footage you can't actually use.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 8.3',
      title: 'Production Quality, in Order of Impact',
      summary: 'Four things that move the needle far more than your camera does — listed in the order they actually matter.',
      visualId: 'production-quality',
      paragraphs: [
        "You don't need expensive gear, and you don't need to be a filmmaker. You need work that looks intentional and consistent — and four things move that needle far more than your camera does, listed in the order they actually matter.",
        "Lighting is the biggest visible difference, full stop. Natural light is the gold standard — golden hour or a big window — and failing that, a ring light or LED panel. Never the built-in flash or a single harsh overhead. Audio is where creators quietly lose viewers: bad audio makes even a beautiful shot feel amateur, and a cheap lav or shotgun mic transforms it instantly (test it before you commit to a full shoot). Composition is what separates \"intentional\" from \"snapshot\": rule of thirds rather than dead-center, a watchful eye on your background because clutter reads as careless, and varied angles for visual rhythm. And brand integration is what makes the difference between landing and getting scrolled past — not the stiff product-to-camera pose, but the product woven into your real style, so a viewer thinks \"useful\" before they realize it's an ad.",
        "The principle underneath all four: intentional beats expensive. A well-lit phone video with clean audio will outperform a $3,000 camera that's badly lit and recorded on the built-in mic, every single time. This is genuinely good news for anyone worried they're not \"professional\" enough. The brands rebooking creators aren't chasing the most gear — they're rebooking the ones whose work looks like they cared.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 8.4',
      title: 'Send a Report — Without Being Asked',
      summary: 'The single habit that most separates creators who build recurring income from ones who stay on the one-off treadmill. Almost nobody does it.',
      visualId: 'performance-report',
      paragraphs: [
        "This is the single habit that most separates the creators who build recurring income from the ones who stay on the one-off treadmill — and almost nobody does it. Most creators finish a campaign and wait for the brand to follow up. Most brands never do. So within 48–72 hours of the reporting window closing, you send a clean, short performance report, unprompted. It proves professionalism, hands them the data to rebook you, and quietly repositions you from vendor to partner.",
        "It has four parts. A headline — one forward-up-able summary line with your strongest result: \"The Reel reached 47,000 impressions at 7.2% engagement, both above benchmarks.\" (Make it the kind of line your contact can paste straight into a message to their boss.) The metrics — impressions, reach, engagement rate, the specific numbers, with saves and shares called out as strong signals, plus any link clicks or code uses; screenshots are completely fine. The context — compare it to your typical content, and if something underperformed, say so honestly, because brands value honest analysis over hidden bad news. And the qualitative layer, which is where you sound like a strategist instead of a vendor: the comments, questions, and themes you saw — market research they genuinely can't get anywhere else. \"Several people asked where it's stocked in the UK — might be worth a regional page.\"",
        "Then end with a soft prompt: \"Happy to share full insights on a call, and to talk about what we could do next.\" That one line turns a finished deal into a conversation about the next one — and it's the hinge the whole back half of this course turns on, because a great campaign plus a thoughtful report is the exact doorway into a retainer. Which is precisely where we're headed.",
      ],
      duration: '13 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 8.5',
      title: 'Where This Is Going',
      summary: 'You now have the full delivery system. A successful campaign plus a thoughtful report is the doorway to the biggest shift in the entire course: retainers.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You now have the full delivery system: two planning documents so a shoot never wastes a day, the four production levers that make work look intentional regardless of your gear, the first-hour optimization habits that signal the algorithm to push your content further, and the unprompted performance report that quietly turns you from a vendor into a partner. That's what gets you rebooked, referred, and able to raise your rate — at 20K or 500K, because it was never about size; it was about being the creator brands want to keep.",
        "And that's the doorway to the biggest shift in the entire course. A successful campaign plus a thoughtful report is how a one-off deal becomes a recurring one. Module 9 — the one this whole course has been building toward — is where you turn those wins into ambassadorships and retainers: stable, recurring monthly income that doesn't depend on landing the next deal from scratch. From there, Module 10 protects the whole thing for the long haul.",
        "Before you go, open your Module 8 workbook: fill the content brief and shot list for your next deliverable, self-audit your production quality, build the posting-day checklist into your routine, and — the one that matters most — write and actually send a real performance report. Send one report you weren't asked for, and you'll feel the relationship change. I'll see you in Module 9.",
      ],
      duration: '9 min',
      videoEmbed: null,
    },
  ],
}

export const module9: ModuleData = {
  number: 9,
  slug: 'module-9',
  title: 'Building Long-Term Partnerships',
  moduleIntro:
    "By now you can find brands, price your work, pitch, negotiate, contract, and deliver content that gets you rebooked. This module is the shift that ends the hustle.",
  heroCopy:
    "The business-model shift the whole course has been building toward. Turn successful one-off deals into ambassadorships and retainers — income that shows up every month, whether you're pitching or not. From creator-as-freelancer to creator-as-business.",
  heroImage:    '/images/course/module-9/hero.jpg',
  ebookCover:   '/images/course/module-9/ebook-cover.jpg',
  ebookSlug:    'module-9-ebook',
  workbookSlug: 'module-9-workbook',
  nextModule: {
    number: 10,
    title: 'Protect & Scale (Capstone)',
    slug: 'module-10',
    coverImage: '/images/course/module-10/hero.jpg',
  },
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 9.1',
      title: 'One-Offs Are a Hustle. Retainers Are a Business.',
      summary: 'The math makes the case: a six-month ambassadorship with one brand earns more than six separate one-off deals — and costs a fraction of the pitching.',
      visualId: 'oneoff-vs-retainer',
      paragraphs: [
        "By now you can find brands, price your work, pitch, negotiate, contract, and deliver content that gets you rebooked. That's a real creator business — and most creators never get this far. But here's the honest truth about where you still are: structurally, it's still a hustle. You're only as good as your next pitch, and when the pitches go quiet, so does your income.",
        "This module is the shift that ends that — from selling content one piece at a time to a roster of brands paying you every single month, whether you're actively pitching or not. And the math makes the case better than any pep talk. A single post might earn you $1,500. A six-month ambassadorship with that same brand — four posts a month plus ongoing Stories — might earn you $40,000. Not because each post is suddenly worth more, but because you've cut the friction of re-pitching and re-onboarding six separate times. You're getting paid for the relationship, not just the content. But the bigger shift is mental, and it's the one that compounds. With three retainers paying you every month, you stop saying yes to deals that don't fit — which makes you more selective, which makes you more valuable, which gets you better deals. That's the loop the most successful creators are quietly running.",
        "This is the line between a job and a business. Twenty-five one-off deals a year is a job without benefits — constant re-pitching, re-negotiating, re-onboarding, your income always one quiet month from a problem. Three solid retainers is a real, predictable business you can plan your life around. This module is how you cross that line.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 9.2',
      title: 'Why Long-Term Works — for Both Sides',
      summary: "Ambassadorships exist because they're better for the brand too. Once you understand why, you stop asking for a favor and start proposing something you both win from.",
      visualId: 'ambassador-benefits',
      paragraphs: [
        "Here's what changes how you'll pitch a retainer: ambassadorships exist because they're better for the brand, too. Once you understand why, you stop asking for a favor and start proposing something you both win from.",
        "On the brand's side, a retainer is cheaper and it performs better. They've already vetted you once — they know your voice, your audience, your reliability — so they skip the cost and risk of onboarding a new creator every quarter. And the campaigns themselves perform better, because repeated exposure compounds: the audience starts to genuinely associate the brand with you. On your side, income stability replaces month-to-month uncertainty, each piece of content gets easier and performs better as you learn the brand, and — crucially — because you've already proven your value, you have far more leverage to negotiate a rate increase at renewal than you ever had pitching cold. And there's a bonus most creators miss entirely: the credibility flywheel. A roster of named ambassadorships on your media kit signals to other brands that you're the kind of creator companies invest in long-term. Your first ambassadorship isn't just income — it's a credential that helps you land the next one, at a higher rate.",
        "One important note so you don't overcorrect: one-off deals still have a place — for cash-flow gaps, for testing new categories, for brands that aren't a fit for the long haul. The point isn't to never do a one-off again. It's that your base layer of income should be recurring, not one-off. Build the stable floor first, then let the one-offs be the upside.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 9.3',
      title: 'Converting a One-Off Into a Retainer',
      summary: 'The best time to start a retainer conversation is right after a successful campaign. That performance report from Module 8 was setting up this email.',
      visualId: 'conversion-email',
      paragraphs: [
        "Here's the moment most creators walk right past without realizing it's the most valuable one they'll get. The best time to start a retainer conversation is right after a successful campaign — when the brand is happy, the data is fresh, and you're top of mind. That performance report you sent in Module 8? It wasn't only about getting paid for that deal. It was setting up this one.",
        "Within a week of a strong post, you send a short email that does four things. First, lead with the result — remind them it worked: \"The Reel hit 7.2% engagement and drove 480 site clicks, both above our projections.\" Second, show genuine enthusiasm, so you read as invested rather than transactional: \"I really enjoyed working with the team, and the response was strong — people are still commenting and asking where to buy.\" Third, propose the next stage as a shape, not a vague \"more deals\": \"I'd love to explore an ongoing partnership — something like 2–3 pieces a month over the next quarter, to build sustained visibility.\" And fourth, suggest a low-commitment next step: \"Could we set up a 20-minute call next week to talk through what this could look like?\"",
        "Notice what you're actually asking for — not a yes, just a conversation. That's a far easier thing for a brand to agree to. And if they're not ready for a full retainer, propose a test phase: \"three campaigns over the next quarter, then we decide.\" An easier yes still — and three more reports to build the case. This single email, sent at the right moment, is how a one-time check quietly becomes a monthly one. Most creators never send it. You will.",
      ],
      duration: '13 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 9.4',
      title: 'Structuring the Ambassadorship',
      summary: 'When the brand says yes, arrive with a structure — not negotiate it live. Five components make up a mid-tier ambassador deal.',
      visualId: 'retainer-structure',
      paragraphs: [
        "When the brand says yes to something longer, you want to arrive at the table with a structure — not negotiate it live, scrambling. Most mid-tier ambassador deals use a monthly retainer built from five parts, and knowing them cold is what makes you look like someone who's done this before.",
        "One: the core deliverables, guaranteed each month — say, 2 Reels, 4 Story sets, 1 long-form piece — consistent enough that both sides can plan around them. Two: standing usage rights, granted once for the whole term — organic use on the brand's channels for the duration, with paid advertising as a priced add-on rather than an assumption. Three: non-sponsored mentions — you naturally using or wearing the product in your regular content, not as a formal deliverable but as the thing that makes the whole partnership feel authentic to your audience. Four: add-ons priced separately and agreed up front — launch posts, events, whitelisting — so nothing has to be re-negotiated awkwardly mid-deal. And five: a built-in quarterly review, a month-three checkpoint to assess, adjust, and — the real purpose — discuss renewal before the term runs out, which makes renewing feel natural instead of like a fresh negotiation. If the deal includes category exclusivity, price it into the retainer; it's real lost opportunity, and it isn't free.",
        "Arriving with this structure does something subtle but powerful: it tells the brand they're dealing with a professional who runs a business — which is exactly the creator they want to commit to for six months. The Contract Builder's \"Brand Ambassador\" deal type from Module 7 handles the actual paperwork.",
      ],
      duration: '14 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 9.5',
      title: 'Where This Is Going',
      summary: 'The engine is complete. Module 10 — the capstone — is about protecting everything you built: the red flags, the long-game systems, and a concrete 90-day plan.',
      visualId: 'course-roadmap',
      paragraphs: [
        "You can now make the shift the whole course has been building toward: convert a successful one-off, structure and price an ambassadorship that's genuinely fair to both sides, and maintain it so it actually renews. A quick word on the pricing, because it's where creators most often sabotage a good thing — the biggest retainer mistake is over-discounting. Brands expect some discount for the commitment, but the standard is 10–15% off your per-deliverable rate, not 30–40%. Take your Module 4 numbers, apply a modest cut, and you'll land somewhere like $4,800 a month against a $5,500 stand-alone rate — a discount the brand can justify, still well above what you'd net from one-offs after all the pitching and onboarding.",
        "Build a renewal increase into the original contract so it's never awkward later, index your add-ons to your full one-off rates rather than the discounted retainer rate, and then nurture it: quarterly check-ins even when nothing's broken, proactive sharing of wins, replying within 24 hours, saying thank you. A retainer that's signed but not nurtured doesn't renew. And all of this holds at 20K or 500K — recurring income was never about your size; it was about building the relationship.",
        "That's the engine complete: finding, pricing, pitching, contracting, delivering, and now turning deals into recurring monthly revenue. Module 10 — the capstone — is about protecting all of it: the red flags that threaten your reputation, the systems that keep this running for years, and how you scale it without it scaling you into the ground. Before you go, open your Module 9 workbook and do the thing that turns this from theory into income: pick your strongest recent campaign, write the four-part conversion email, and actually send it. Then build your proposal, price the retainer with your Module 4 rates, and put your check-in dates on the calendar. One sent email is how the recurring income starts. I'll see you in Module 10 — the last one.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
  ],
}

export const module10: ModuleData = {
  number: 10,
  slug: 'module-10',
  title: 'Protect & Scale (Capstone)',
  moduleIntro:
    "You've built the business. This final module is about protecting it — and running it for years, not weeks.",
  heroCopy:
    "You've built the business. This final module is about protecting it — and running it for years, not weeks. A filter for the deals worth walking away from, the long-game systems that compound, and a concrete 90-day plan that turns this course into a business.",
  heroImage:    '/images/course/module-10/hero.jpg',
  ebookCover:   '/images/course/module-10/ebook-cover.jpg',
  ebookSlug:    'module-10-ebook',
  workbookSlug: 'module-10-workbook',
  nextModule: null,
  segments: [
    {
      id: 'seg-1',
      eyebrow: 'Chapter 10.1',
      title: "You've Built the Business. Now You Protect It.",
      summary: "The threats to a creator business are usually slow — a reputation chipped away, trust that quietly drains. This capstone gives you the filter and the systems to stop that drift.",
      paragraphs: [
        "Nine modules ago, you started with an honest baseline. Since then you've learned to find the right brands, vet them, price your work, pitch, negotiate, contract, deliver, report, and turn one-off deals into recurring income. Take a second to register that, because it matters: that's not a new way to do brand deals. It's a new way to run a creator business.",
        "This final module is about protecting what you built — because the threats to a creator business usually aren't dramatic. They're slow. The wrong partnership taken because the money was tempting. A reputation chipped away by deals that didn't quite fit. Trust that quietly drains because your audience can sense, over time, that you're saying yes for the wrong reasons. None of it looks dangerous in the moment. And all of it is how creator businesses quietly die — not in a single bad decision, but in a slow drift nobody notices until the engagement's gone.",
        "So this capstone gives you three things: a filter for the deals worth walking away from, the long-game systems that compound over years, and a concrete 90-day plan that turns everything you've learned into an actual business. One distinction worth holding: Module 3 was your front-door filter — is this specific deal right for me? This is the foundation — the systemic threats, the scams, and the slow drift that erode a business over years. Two different layers of defense, and you need both. Let's protect what you've built.",
      ],
      duration: '10 min',
      videoEmbed: null,
    },
    {
      id: 'seg-2',
      eyebrow: 'Chapter 10.2',
      title: 'The Deals Worth Walking Away From',
      summary: 'Five red flags that tell you to walk — not about fit, but about brand behavior. Pattern recognition beats any single flag.',
      visualId: 'red-flags',
      paragraphs: [
        "Some deals pass every test in Module 3 and are still wrong — because the danger isn't in the fit, it's in the behavior of the brand. Five red flags tell you to walk, and learning to spot them fast is what keeps one bad actor from costing you months.",
        "First, payment red flags — the clearest signals you won't get paid: a brand that won't discuss payment until after the content's made, one that asks you to pay them (that's a scam, full stop), Net-90+ with no flexibility, or a refusal to put any money upfront on a new partnership. Second, \"exposure\" as currency — \"think of the exposure\" doesn't pay bills, and established brands know it; the only real exception is very early on, for specific, substantial placement, never a vague \"you'll get followers.\" Third, structural exploitation — when the math simply doesn't add up: ten posts, full usage, year-long exclusivity, and total creative control, all at one-post pricing. Decline or restructure. Fourth, refusal to put it in writing — \"let's keep it casual\" means a brand that's either inexperienced or planning to change the terms later; the Contract Builder takes fifteen minutes, so no contract, no work. And fifth, pressure tactics — \"decide today,\" \"other creators are waiting,\" \"take it or leave it.\" Real opportunities give you time to think; manufactured urgency is designed to make you skip the very steps that protect you.",
        "Here's the skill that ties it together: pattern recognition beats any single flag. One red flag might just be a disorganized brand having a bad week. But two or three together is a pattern — and patterns don't reverse themselves. Trust them, and walk.",
      ],
      duration: '12 min',
      videoEmbed: null,
    },
    {
      id: 'seg-3',
      eyebrow: 'Chapter 10.3',
      title: 'Decline Gracefully, Protect the Asset',
      summary: 'Saying no is a skill — and a graceful no keeps the door open. Your audience\'s trust is the single most valuable asset you have.',
      visualId: 'graceful-decline',
      paragraphs: [
        "Saying no is a skill, and saying it well is a more valuable one than it looks — because a graceful no keeps the door open for a future deal on better terms, which happens far more often than you'd think. A good decline does three things: it appreciates being considered, names the mismatch briefly, and leaves the door open.",
        "Don't over-explain, don't apologize for your rates, don't lecture. Short, professional, gracious. Then protect your single most valuable asset — your audience's trust — at the system level, not just deal by deal. Be selectively visible, because your audience reads the cumulative pattern of what you say yes to, not any single post. Choose transparency over perfection. Run a quarterly audit of every paid post to catch drift early. Hold your FTC line — disclosure is the floor, never a negotiation point. And don't burn bridges: the contact you're frustrated with today may resurface at a much better brand in two years, and creators have long memories on both sides.",
        "The throughline of this whole business comes back to one thing here: your trust is the asset. Every \"no\" that protects it is quietly making every future \"yes\" worth more.",
      ],
      duration: '11 min',
      videoEmbed: null,
    },
    {
      id: 'seg-4',
      eyebrow: 'Chapter 10.4',
      title: 'The Long Game: Five Systems',
      summary: "Creators who last aren't the most talented — they're the ones who run systems instead of relying on motivation. Five systems matter for the phase you're entering.",
      visualId: 'five-systems',
      paragraphs: [
        "Here's the truth nobody tells you about creators who last: the ones who build career-long businesses aren't the most talented. They're the ones who run systems instead of relying on motivation. Five systems matter for the phase you're entering — and you've already started most of them in this course.",
        "The pipeline habit: ninety minutes, same day each week — add brands, prep outreach, send pitches. Consistency beats bursts; three pitches a week beats twenty in one frantic month. The quarterly review: one hour, four times a year — look at revenue by deal type, what renewed, where your time actually went, so you spot trends before they become problems. Reinvestment: put 10–15% of revenue back in — gear, an accountant, education, time-saving software — because it compounds, and better work earns better rates. Creator community: peers refer you, share rate intel, and pass along work they can't take; give before you ask, because the generous get helped most — abundance, not rivalry. And boundaries: working hours, a 24-hour response policy, minimum project sizes — brands respect what you communicate consistently, and the boundaries you hold are the ones they learn to work within.",
        "None of these run on willpower, and that's the entire point. The creators who build careers aren't grinding harder than everyone else — they're running the system, week after week, so the work compounds whether they're feeling motivated or not. The business runs because the systems run.",
      ],
      duration: '13 min',
      videoEmbed: null,
    },
    {
      id: 'seg-5',
      eyebrow: 'Chapter 10.5',
      title: 'Your 90-Day Plan — Go Build the Business',
      summary: "You now have your numbers, your filter, your range, your contract, and your retainer pitch. The only thing left is to run it.",
      visualId: 'ninety-day-plan',
      paragraphs: [
        "You made it. And here's the thing worth sitting with for a moment: most people who buy a course like this never finish it. You did. You now have your numbers, your filter, your range, your contract, and your retainer pitch — not as theory, but as tools you can use on a real deal this week.",
        "So the only thing left is to run it, and a plan turns all of this from inspiration into income over the next ninety days. Days 1–30, get your foundation in place: lock in your numbers — your rate, your range, your floor — finalize your media kit, build your target list to 20–30 brands, put your weekly pipeline habit on the calendar, and send your first three pitches. Days 31–60, deals in motion: at least one real negotiation underway, a contract generated for a live deal, a brief and shot list on your sponsored content, and a performance report on every post. Days 61–90, scale the model: send a retainer conversion email, build an ambassadorship proposal, set your quarterly check-in dates, and run your first quarterly review.",
        "Most of that is just executing work you already understand now — the only variable that decides whether you build the business you came here for is whether you actually do it, consistently, for ninety days. So define success on your own terms — a full-time business or meaningful side income, a few big ambassadorships or many smaller deals. You have the tools to choose now, and that choice was the whole point. The opportunity is real, the work is legitimate, and the next ninety days are yours. Reading didn't build the business; running the system does — week after week. Send the pitch. Send the report. Build the contract. Have the call. Do the thing. The work compounds, and so does the business. Now go build it — we're rooting for you.",
      ],
      duration: '14 min',
      videoEmbed: null,
    },
  ],
}
