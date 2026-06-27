#!/usr/bin/env node
// Idempotent patch: injects mobile CSS + fixes button text in all 20 bundled course-content HTMLs.
// Safe to run twice — checks for `lmg-mobile-v1` sentinel before injecting.
// Usage: node scripts/patch-ebook-mobile.js [--dry-run] [file.html]
//   --dry-run : print diff for one file (first match or the named file), do not write
//   file.html : patch only this file (full path or basename)

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'course-content');
const SENTINEL = 'lmg-mobile-v1';
const DRY_RUN = process.argv.includes('--dry-run');
const TARGET = process.argv.find(a => a.endsWith('.html') && !a.includes('--'));

const MOBILE_CSS = `
/* ─── Mobile reflow  (screen only, ≤ 860px) ────────────────────────────
   @media print locks .page back to 816 × 1056 px — PDF output unchanged.
   lmg-mobile-v1 */
@media screen and (max-width: 860px) {
  body    { padding: 0 0 60px; gap: 0; align-items: stretch; }
  .page   { width: 100%; min-height: 0; border-radius: 0; box-shadow: none; border-bottom: 1px solid var(--line); }
  .toolbar { top: 0; border-radius: 0; padding: 10px 16px; justify-content: space-between; }
  .toolbar .meta, .toolbar .sep { display: none; }

  /* ebook multi-column → collapsed */
  .eb-body.cols  { grid-template-columns: 1fr; column-gap: 0; }
  .eb-deals      { grid-template-columns: 1fr 1fr; }
  .eb-mult       { grid-template-columns: 1fr 1fr; }
  .eb-timing     { grid-template-columns: 1fr 1fr; }
  .eb-bench      { grid-template-columns: 1fr 1fr; }
  .eb-plan       { grid-template-columns: 1fr 1fr; }
  .eb-objrow     { grid-template-columns: 1fr; }
  .eb-seq        { grid-template-columns: 1fr; }
  .eb-seq .arr   { display: none; }
  .eb-anat .bd   { grid-template-columns: 1fr; }
  .eb-reprow .bd { grid-template-columns: 1fr; }

  /* workbook multi-column → collapsed */
  .wb-row2       { grid-template-columns: 1fr; gap: 12px; }
  .wb-checks     { grid-template-columns: 1fr 1fr; }
  .wb-objrow     { grid-template-columns: 1fr; }
  .wb-polrow     { grid-template-columns: 1fr; border-radius: 12px; }
  .wb-sign       { grid-template-columns: 1fr; }
  .wb-sched      { grid-template-columns: 1fr; }
  .wb-sched .arr { display: none; }
  .wb-reviewrow  { grid-template-columns: 30px 1fr; }
  .wb-reviewrow .rt { display: none; }
  .wb-brief-meta { grid-template-columns: 1fr 1fr; }
  .wb-tkcards    { grid-template-columns: 1fr 1fr; }
  .wb-flaggroup.span2 .items { grid-template-columns: 1fr 1fr; }
  .atf           { grid-template-columns: 1fr 1fr; }
  .calc-cta      { grid-template-columns: 1fr; gap: 14px; }
}`;

function patchHtml(html) {
  // 1. Locate the bundled template script
  const scriptRe = /(<script type="__bundler\/template">)([\s\S]*?)(<\/script>)/;
  const scriptMatch = html.match(scriptRe);
  if (!scriptMatch) throw new Error('No __bundler/template script found');

  const jsonStr = scriptMatch[2];
  let inner = JSON.parse(jsonStr); // the embedded HTML string

  // 2. Idempotency check
  if (inner.includes(SENTINEL)) return null; // already patched

  // 3. Inject mobile CSS before the last </style> in the embedded HTML
  const lastStyle = inner.lastIndexOf('</style>');
  if (lastStyle === -1) throw new Error('No </style> found in template');
  inner = inner.slice(0, lastStyle) + MOBILE_CSS + '\n' + inner.slice(lastStyle);

  // 4. Fix button text (preserve onclick, just clean the label)
  inner = inner.replace(/⌘P · Save PDF/g, 'Save PDF');

  // 5. Re-encode and splice back in.
  // Escape </ so the HTML parser doesn't end the outer <script> tag on embedded
  // </script> or </style> in the JSON string — mirrors the original bundler's / encoding.
  // Use a replacer function (not a string) so $ signs in jsonEncoded aren't treated as
  // replacement patterns ($', $`, $&, etc.) by String.replace.
  const jsonEncoded = JSON.stringify(inner).replace(/<\//g, '<\\u002F');
  const [, open, , close] = scriptMatch;
  return html.replace(scriptRe, () => open + jsonEncoded + close);
}

function shortDiff(original, patched, filename) {
  // Decode the inner HTML from both versions to show accurate context
  const scriptRe = /(<script type="__bundler\/template">)([\s\S]*?)(<\/script>)/;
  const innerOrig = JSON.parse(original.match(scriptRe)[2]);
  const innerPatched = JSON.parse(patched.match(scriptRe)[2]);

  const lastStyleOrig = innerOrig.lastIndexOf('</style>');
  const before = innerOrig.slice(Math.max(0, lastStyleOrig - 120), lastStyleOrig + 8);
  const sentinelIdx = innerPatched.lastIndexOf(SENTINEL);
  const after = innerPatched.slice(Math.max(0, sentinelIdx - 20), sentinelIdx + 380);

  console.log(`\n── ${filename} ──────────────────────────────`);
  console.log('BEFORE (last </style> in inner HTML):');
  console.log(before);
  console.log('\nAFTER (injection site in inner HTML):');
  console.log(after + '\n  ...[truncated]');
  const btnBefore = (innerOrig.match(/⌘P · Save PDF/g) || []).length;
  const btnAfter  = (innerPatched.match(/Save PDF/g) || []).length;
  console.log(`\nButton text: "⌘P · Save PDF" × ${btnBefore} → "Save PDF" × ${btnAfter}`);
}

const files = fs.readdirSync(CONTENT_DIR)
  .filter(f => f.endsWith('.html'))
  .sort()
  .map(f => path.join(CONTENT_DIR, f));

const targets = TARGET
  ? files.filter(f => f.endsWith(path.basename(TARGET)))
  : files;

let patched = 0, skipped = 0, errored = 0;

for (const file of targets) {
  const name = path.basename(file);
  try {
    const original = fs.readFileSync(file, 'utf8');
    const result = patchHtml(original);
    if (result === null) {
      console.log(`SKIP  ${name}  (already patched)`);
      skipped++;
      continue;
    }
    if (DRY_RUN) {
      shortDiff(original, result, name);
      console.log('\n[dry-run] No files written.');
      break; // show only one file in dry-run mode
    }
    fs.writeFileSync(file, result, 'utf8');
    console.log(`OK    ${name}`);
    patched++;
  } catch (e) {
    console.error(`ERROR ${name}: ${e.message}`);
    errored++;
  }
}

if (!DRY_RUN) {
  console.log(`\nDone: ${patched} patched, ${skipped} skipped, ${errored} errors`);
}
