/* ════════════════════════════════════════════════════════════════
   LMG Media — Resources §4 · Cover engine + publication data
   One <div class="cover"> renders a magazine-grade portrait cover.
   It is container-query scaled (everything in cqw/cqh) so the SAME
   markup is gorgeous at 180px on a shelf or 440px as a hero.
   ════════════════════════════════════════════════════════════════ */

const IMG = '../assets/';

/* Brand palette shorthands ----------------------------------------- */
const C = {
  pink:'#FF4D94', pinkD:'#E63F82', pinkS:'#FFD9E7',
  yellow:'#FFD700', yellowD:'#E6B800',
  blue:'#3AAFF4', blueD:'#1E94DA', blueS:'#D2EEFB',
  ink:'#0A0A0A', ink2:'#16151A', paper:'#FAF8F2', white:'#FFFFFF',
  plum:'#B341E8',
};

/* Type label → the publication "kind" (not audience-coded) --------- */
const TYPE = {
  Guide:'Guide', Report:'Report', Toolkit:'Toolkit',
  Framework:'Framework', Template:'Template',
};

/* Audience accent — the sacred color code (blue brands / pink creators / yellow universal) */
const AUD = {
  brand:      { line:C.blue,   label:'For Brands' },
  influencer: { line:C.pink,   label:'For Influencers' },
  universal:  { line:C.yellow, label:'Universal' },
};

/* ── 23 premium publications ──────────────────────────────────────
   cover.t = archetype: block | photo | type | report | editorial
   cover defines its own palette so each cover is a designed object. */
const PUBS = [
  { id:'strategy-framework', title:'The Complete Strategy Framework', type:'Framework', level:'Intermediate', aud:'universal',
    desc:'The end-to-end operating system for planning, briefing, and running creator campaigns that compound.',
    cover:{ t:'block', bg:C.ink, a:C.yellow, b:C.pink, fg:C.white } },
  { id:'negotiation-toolkit', title:'Brand Partnership Negotiation Toolkit', type:'Toolkit', level:'Advanced', aud:'influencer',
    desc:'Anchor, counter, and close. Scripts, rate floors, and objection rehearsals for creators.',
    cover:{ t:'type', bg:C.pink, a:C.white, fg:C.white } },
  { id:'industry-report', title:'2026 Influencer Marketing Industry Report', type:'Report', level:'Beginner', aud:'brand',
    desc:'The benchmark data set — spend, ROI, and platform shifts across eight verticals.',
    cover:{ t:'report', bg:C.ink, a:C.blue, fg:C.white, stat:'35.6%', statlbl:'YoY market growth' } },
  { id:'roi-calculator', title:'Micro-Influencer Campaign ROI Calculator', type:'Template', level:'Advanced', aud:'brand',
    desc:'A live spreadsheet model — plug in reach and rate, read back projected ROI by tier.',
    cover:{ t:'photo', photo:'ebook08-01-office-sm.png', pos:'center 30%', a:C.blue, fg:C.white } },
  { id:'pitch-playbook', title:'The Perfect Pitch Playbook', type:'Guide', level:'Beginner', aud:'influencer',
    desc:'The six-block pitch that gets replies — plus a follow-up cadence that closes.',
    cover:{ t:'block', bg:C.pink, a:C.yellow, b:C.ink, fg:C.white } },
  { id:'contract-essentials', title:'Creator Contract Essentials', type:'Guide', level:'Intermediate', aud:'influencer',
    desc:'Every clause that matters — usage, exclusivity, kill fees — in plain language.',
    cover:{ t:'editorial', bg:C.paper, a:C.pink, fg:C.ink } },
  { id:'tiktok-growth', title:'TikTok Growth Strategy Playbook', type:'Guide', level:'Beginner', aud:'influencer',
    desc:'The posting, hook, and series mechanics behind accounts that scale past 100K.',
    cover:{ t:'type', bg:C.yellow, a:C.ink, fg:C.ink } },
  { id:'platform-comparison', title:'Platform Comparison Guide', type:'Guide', level:'Beginner', aud:'brand',
    desc:'Instagram vs TikTok vs YouTube vs LinkedIn — audience, format, and where spend converts.',
    cover:{ t:'block', bg:C.blue, a:C.yellow, b:C.pink, fg:C.white } },
  { id:'vetting-scorecard', title:'Influencer Vetting Scorecard', type:'Template', level:'Intermediate', aud:'brand',
    desc:'A weighted scorecard that turns gut-feel vetting into an auditable number.',
    cover:{ t:'report', bg:C.blue, a:C.white, fg:C.white, stat:'A–F', statlbl:'auto-graded fit' } },
  { id:'rate-card', title:'The Rate Card Builder', type:'Template', level:'Beginner', aud:'influencer',
    desc:'Set defensible prices per deliverable and platform — with a one-page export.',
    cover:{ t:'editorial', bg:C.paper, a:C.yellow, fg:C.ink } },
  { id:'measurement-framework', title:'Campaign Measurement Framework', type:'Framework', level:'Advanced', aud:'brand',
    desc:'From impressions to incrementality — the metric tree for proving creator ROI.',
    cover:{ t:'report', bg:C.ink, a:C.blue, fg:C.white, stat:'86%', statlbl:'consumer influence rate' } },
  { id:'ftc-handbook', title:'FTC Disclosure & Compliance Handbook', type:'Guide', level:'Intermediate', aud:'universal',
    desc:'Stay clean: disclosure rules, sample language, and the gray areas to avoid.',
    cover:{ t:'type', bg:C.ink, a:C.yellow, fg:C.white } },
  { id:'luxury-beauty', title:'Luxury Beauty Creator Report', type:'Report', level:'Intermediate', aud:'brand',
    desc:'Inside the macro-to-micro shift reshaping prestige beauty partnerships.',
    cover:{ t:'photo', photo:'hero-03-pinkhair-tablet.jpg', pos:'center 22%', a:C.pink, fg:C.white } },
  { id:'media-kit', title:'The Media Kit Toolkit', type:'Toolkit', level:'Beginner', aud:'influencer',
    desc:'A designed, fill-in media kit that makes a 20K creator look like a pro studio.',
    cover:{ t:'block', bg:C.yellow, a:C.pink, b:C.blue, fg:C.ink } },
  { id:'retainer-model', title:'Long-Term Partnership Retainer Model', type:'Framework', level:'Expert', aud:'influencer',
    desc:'Turn one-off deals into recurring revenue — structure, pricing, and the pitch.',
    cover:{ t:'editorial', bg:C.paper, a:C.pink, fg:C.ink } },
  { id:'authenticity-audit', title:'Audience Authenticity Audit', type:'Template', level:'Advanced', aud:'brand',
    desc:'Spot inflated follower counts before you spend — the signals and the math.',
    cover:{ t:'report', bg:C.ink2, a:C.blue, fg:C.white, stat:'12pt', statlbl:'authenticity checks' } },
  { id:'ugc-brief', title:'UGC Content Brief Template', type:'Template', level:'Beginner', aud:'brand',
    desc:'Brief creators so the first cut is right — tone, must-haves, and a shot list.',
    cover:{ t:'type', bg:C.blue, a:C.white, fg:C.white } },
  { id:'cross-city', title:'Cross-City Campaign Sequencing Guide', type:'Guide', level:'Expert', aud:'brand',
    desc:'Sequence launches across NYC, London, and Dubai to compound reach, not dilute it.',
    cover:{ t:'photo', photo:'city-nyc.jpg', pos:'center 35%', a:C.yellow, fg:C.white } },
  { id:'creator-tax', title:'Creator Tax & Business Setup Guide', type:'Guide', level:'Intermediate', aud:'influencer',
    desc:'Entity, deductions, and quarterly basics so your brand deals do not bite at tax time.',
    cover:{ t:'editorial', bg:C.paper, a:C.blue, fg:C.ink } },
  { id:'brand-safety', title:'Brand Safety & Crisis Playbook', type:'Guide', level:'Advanced', aud:'brand',
    desc:'Vet, monitor, and respond — keep a partnership from becoming a headline.',
    cover:{ t:'block', bg:C.ink, a:C.blue, b:C.yellow, fg:C.white } },
  { id:'macro-micro', title:'The Macro-to-Micro Shift Report', type:'Report', level:'Intermediate', aud:'brand',
    desc:'Why budgets are moving down the follower curve — and what it means for reach.',
    cover:{ t:'report', bg:C.pink, a:C.white, fg:C.white, stat:'3.4×', statlbl:'micro engagement lift' } },
  { id:'analytics-kit', title:'Performance Analytics Dashboard Kit', type:'Toolkit', level:'Advanced', aud:'brand',
    desc:'A plug-in dashboard template that turns campaign exports into a board-ready read.',
    cover:{ t:'photo', photo:'m1-cover.jpg', pos:'center 40%', a:C.blue, fg:C.white } },
  { id:'collab-handbook', title:'The Authentic Collaboration Handbook', type:'Guide', level:'Beginner', aud:'universal',
    desc:'The principles behind partnerships that read as genuine — and convert because of it.',
    cover:{ t:'type', bg:C.plum, a:C.yellow, fg:C.white } },
];

/* ── Cover renderer ───────────────────────────────────────────────
   size: optional CSS width applied to the wrapper (e.g. '200px').
   The internal type/spacing scales to whatever width it ends up. */
function coverHTML(p, opts = {}) {
  const c = p.cover;
  const aud = AUD[p.aud];
  const wm = `<span class="cov-wm">LMG<i>MEDIA</i></span>`;
  const kind = `<span class="cov-kind">${p.type}</span>`;
  let inner = '';

  if (c.t === 'block') {
    inner = `
      <div class="cov-fill cov-block" style="--c1:${c.bg};--c2:${c.a};--c3:${c.b}"></div>
      <div class="cov-grain"></div>
      <div class="cov-content" style="--fg:${c.fg}">
        <div class="cov-top">${wm}${kind}</div>
        <h4 class="cov-title">${p.title}</h4>
      </div>`;
  } else if (c.t === 'type') {
    inner = `
      <div class="cov-fill" style="background:${c.bg}"></div>
      <div class="cov-content cov-content--type" style="--fg:${c.fg}">
        <div class="cov-top">${wm}${kind}</div>
        <h4 class="cov-title cov-title--big">${p.title}</h4>
        <div class="cov-rule" style="--fg:${c.a}"></div>
      </div>`;
  } else if (c.t === 'report') {
    inner = `
      <div class="cov-fill" style="background:${c.bg}"></div>
      <div class="cov-grid-lines" style="--ln:${c.a}"></div>
      <div class="cov-content cov-content--report" style="--fg:${c.fg}">
        <div class="cov-top">${wm}${kind}</div>
        <div class="cov-stat" style="--ac:${c.a}"><span class="cov-stat-n">${c.stat}</span><span class="cov-stat-l">${c.statlbl}</span></div>
        <h4 class="cov-title cov-title--rpt">${p.title}</h4>
      </div>`;
  } else if (c.t === 'photo') {
    inner = `
      <div class="cov-fill cov-photo" style="background-image:url('${IMG}${c.photo}');background-position:${c.pos||'center'}"></div>
      <div class="cov-scrim"></div>
      <div class="cov-bar" style="background:${c.a}"></div>
      <div class="cov-content" style="--fg:${c.fg}">
        <div class="cov-top">${wm}${kind}</div>
        <h4 class="cov-title">${p.title}</h4>
      </div>`;
  } else { /* editorial */
    inner = `
      <div class="cov-fill" style="background:${c.bg}"></div>
      <div class="cov-band" style="background:${c.a}"><span class="cov-wm cov-wm--band">LMG<i>MEDIA</i></span></div>
      <div class="cov-content cov-content--ed" style="--fg:${c.fg}">
        <span class="cov-kind cov-kind--ed" style="--ac:${c.a}">${p.type}</span>
        <h4 class="cov-title cov-title--ed">${p.title}</h4>
      </div>`;
  }

  const style = opts.size ? `style="width:${opts.size}"` : '';
  return `
    <article class="cover cov--${c.t}" data-id="${p.id}" ${style}>
      ${inner}
      <span class="cov-aud" style="background:${aud.line}"></span>
      <button class="cov-dl" type="button" aria-label="Download ${p.title} — free PDF">
        <i data-lucide="arrow-down-to-line"></i><span>Download</span>
      </button>
    </article>`;
}

/* Minimal caption shown beneath a cover (newsstand / wall) */
function captionHTML(p) {
  return `
    <div class="cap">
      <span class="cap-type" style="--ac:${AUD[p.aud].line}">${p.type}<i></i>${p.level}</span>
      <h5 class="cap-title">${p.title}</h5>
    </div>`;
}
