/* @ds-bundle: {"format":3,"namespace":"LMGMediaDesignSystem_019e25","components":[{"name":"Badge","sourcePath":"components/Badge/Badge.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"ServiceCard","sourcePath":"components/ServiceCard/ServiceCard.jsx"},{"name":"StatTile","sourcePath":"components/StatTile/StatTile.jsx"}],"sourceHashes":{"components/Badge/Badge.jsx":"8bbd9070c249","components/Button/Button.jsx":"1a789f128c4b","components/ServiceCard/ServiceCard.jsx":"cc71a0548e7e","components/StatTile/StatTile.jsx":"5e54310bd158","design-canvas.jsx":"c9095ef15594","explorations/resources-covers.js":"1cf0fb4a762c","ui_kits/website/AudienceSplit.jsx":"e8374142fb98","ui_kits/website/AuthModal.jsx":"0922d84d16fb","ui_kits/website/FAQs.jsx":"6ce25a3c1639","ui_kits/website/Footer.jsx":"d0bd8a4bb27d","ui_kits/website/Header.jsx":"8f351f3090f8","ui_kits/website/Hero.jsx":"f3e1265d5e32","ui_kits/website/InsightsPage.jsx":"8eb420d1ee1e","ui_kits/website/NichesGrid.jsx":"30d41b4d34f7","ui_kits/website/ResourceDetailPage.jsx":"671d5699ecdb","ui_kits/website/ResourcesPage.jsx":"aef0b5baa3dc","ui_kits/website/ServicesList.jsx":"9cf6033bfad7","ui_kits/website/shared.jsx":"87321da40ada"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LMGMediaDesignSystem_019e25 = window.LMGMediaDesignSystem_019e25 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Badge/Badge.jsx
try { (() => {
/* global React */
// LMG Media — Badge / pill
// Maps to .lmg-badge in components.css. Use tone for audience color-coding.
function Badge({
  tone = 'neutral',
  icon,
  children,
  className = '',
  style
}) {
  const toneCls = {
    neutral: '',
    yellow: 'yellow',
    pink: 'pink',
    blue: 'blue',
    dark: 'dark',
    outline: 'outline'
  }[tone] || '';
  const cls = ['lmg-badge', toneCls, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: style
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 13,
      height: 13
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
/* global React */
// LMG Media — Button
// Reusable button atom. Maps to .lmg-btn / .lmg-btn-* in components.css.
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  onClick,
  type = 'button',
  className = '',
  style
}) {
  const cls = ['lmg-btn', `lmg-btn-${variant}`, size !== 'md' ? `lmg-btn-${size}` : '', className].filter(Boolean).join(' ');
  const isz = size === 'lg' ? 20 : size === 'sm' ? 16 : 18;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    className: cls,
    onClick: onClick,
    style: style
  }, icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    className: "lmg-icon",
    style: {
      width: isz,
      height: isz
    }
  }), children, iconRight && /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight,
    className: "lmg-icon",
    style: {
      width: isz,
      height: isz
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/ServiceCard/ServiceCard.jsx
try { (() => {
/* global React */
// LMG Media — ServiceCard
// The workhorse audience-color-coded service card. Maps to .lmg-svc-card.
// Set audience to 'brand' (blue) or 'influencer' (pink).
function ServiceCard({
  audience = 'brand',
  pill,
  photo,
  icon,
  title,
  description,
  features = [],
  moreCount,
  primaryLabel = 'Get Started',
  secondaryLabel = 'Learn More',
  onPrimary,
  onSecondary
}) {
  const cls = `lmg-svc-card ${audience === 'influencer' ? 'audience-influencer' : ''}`;
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-photo",
    style: {
      backgroundImage: photo ? `url(${photo})` : undefined
    }
  }, pill && /*#__PURE__*/React.createElement("span", {
    className: "lmg-pill"
  }, pill)), /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-head"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "lmg-svc-badge"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("h3", {
    className: "lmg-svc-title"
  }, title)), description && /*#__PURE__*/React.createElement("p", {
    className: "lmg-svc-desc"
  }, description), features.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Key Features:"), /*#__PURE__*/React.createElement("ul", null, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, f)))), moreCount ? /*#__PURE__*/React.createElement("a", {
    className: "lmg-svc-more",
    href: "#"
  }, "+", moreCount, " more features") : null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary",
    onClick: onPrimary
  }, primaryLabel), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-outline",
    onClick: onSecondary
  }, secondaryLabel))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ServiceCard/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/StatTile/StatTile.jsx
try { (() => {
/* global React */
// LMG Media — StatTile
// Signature stat callout. Maps to .lmg-stat in components.css. Blue = data.
function StatTile({
  value,
  label,
  tone = 'blue'
}) {
  const toneCls = {
    blue: 'blue',
    pink: 'pink',
    yellow: 'yellow'
  }[tone] || 'blue';
  return /*#__PURE__*/React.createElement("div", {
    className: `lmg-stat ${toneCls}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, label));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StatTile/StatTile.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-noncommentable": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// explorations/resources-covers.js
try { (() => {
/* ════════════════════════════════════════════════════════════════
   LMG Media — Resources §4 · Cover engine + publication data
   One <div class="cover"> renders a magazine-grade portrait cover.
   It is container-query scaled (everything in cqw/cqh) so the SAME
   markup is gorgeous at 180px on a shelf or 440px as a hero.
   ════════════════════════════════════════════════════════════════ */

const IMG = '../assets/';

/* Brand palette shorthands ----------------------------------------- */
const C = {
  pink: '#FF4D94',
  pinkD: '#E63F82',
  pinkS: '#FFD9E7',
  yellow: '#FFD700',
  yellowD: '#E6B800',
  blue: '#3AAFF4',
  blueD: '#1E94DA',
  blueS: '#D2EEFB',
  ink: '#0A0A0A',
  ink2: '#16151A',
  paper: '#FAF8F2',
  white: '#FFFFFF',
  plum: '#B341E8'
};

/* Type label → the publication "kind" (not audience-coded) --------- */
const TYPE = {
  Guide: 'Guide',
  Report: 'Report',
  Toolkit: 'Toolkit',
  Framework: 'Framework',
  Template: 'Template'
};

/* Audience accent — the sacred color code (blue brands / pink creators / yellow universal) */
const AUD = {
  brand: {
    line: C.blue,
    label: 'For Brands'
  },
  influencer: {
    line: C.pink,
    label: 'For Influencers'
  },
  universal: {
    line: C.yellow,
    label: 'Universal'
  }
};

/* ── 23 premium publications ──────────────────────────────────────
   cover.t = archetype: block | photo | type | report | editorial
   cover defines its own palette so each cover is a designed object. */
const PUBS = [{
  id: 'strategy-framework',
  title: 'The Complete Strategy Framework',
  type: 'Framework',
  level: 'Intermediate',
  aud: 'universal',
  desc: 'The end-to-end operating system for planning, briefing, and running creator campaigns that compound.',
  cover: {
    t: 'block',
    bg: C.ink,
    a: C.yellow,
    b: C.pink,
    fg: C.white
  }
}, {
  id: 'negotiation-toolkit',
  title: 'Brand Partnership Negotiation Toolkit',
  type: 'Toolkit',
  level: 'Advanced',
  aud: 'influencer',
  desc: 'Anchor, counter, and close. Scripts, rate floors, and objection rehearsals for creators.',
  cover: {
    t: 'type',
    bg: C.pink,
    a: C.white,
    fg: C.white
  }
}, {
  id: 'industry-report',
  title: '2026 Influencer Marketing Industry Report',
  type: 'Report',
  level: 'Beginner',
  aud: 'brand',
  desc: 'The benchmark data set — spend, ROI, and platform shifts across eight verticals.',
  cover: {
    t: 'report',
    bg: C.ink,
    a: C.blue,
    fg: C.white,
    stat: '35.6%',
    statlbl: 'YoY market growth'
  }
}, {
  id: 'roi-calculator',
  title: 'Micro-Influencer Campaign ROI Calculator',
  type: 'Template',
  level: 'Advanced',
  aud: 'brand',
  desc: 'A live spreadsheet model — plug in reach and rate, read back projected ROI by tier.',
  cover: {
    t: 'photo',
    photo: 'ebook08-01-office-sm.png',
    pos: 'center 30%',
    a: C.blue,
    fg: C.white
  }
}, {
  id: 'pitch-playbook',
  title: 'The Perfect Pitch Playbook',
  type: 'Guide',
  level: 'Beginner',
  aud: 'influencer',
  desc: 'The six-block pitch that gets replies — plus a follow-up cadence that closes.',
  cover: {
    t: 'block',
    bg: C.pink,
    a: C.yellow,
    b: C.ink,
    fg: C.white
  }
}, {
  id: 'contract-essentials',
  title: 'Creator Contract Essentials',
  type: 'Guide',
  level: 'Intermediate',
  aud: 'influencer',
  desc: 'Every clause that matters — usage, exclusivity, kill fees — in plain language.',
  cover: {
    t: 'editorial',
    bg: C.paper,
    a: C.pink,
    fg: C.ink
  }
}, {
  id: 'tiktok-growth',
  title: 'TikTok Growth Strategy Playbook',
  type: 'Guide',
  level: 'Beginner',
  aud: 'influencer',
  desc: 'The posting, hook, and series mechanics behind accounts that scale past 100K.',
  cover: {
    t: 'type',
    bg: C.yellow,
    a: C.ink,
    fg: C.ink
  }
}, {
  id: 'platform-comparison',
  title: 'Platform Comparison Guide',
  type: 'Guide',
  level: 'Beginner',
  aud: 'brand',
  desc: 'Instagram vs TikTok vs YouTube vs LinkedIn — audience, format, and where spend converts.',
  cover: {
    t: 'block',
    bg: C.blue,
    a: C.yellow,
    b: C.pink,
    fg: C.white
  }
}, {
  id: 'vetting-scorecard',
  title: 'Influencer Vetting Scorecard',
  type: 'Template',
  level: 'Intermediate',
  aud: 'brand',
  desc: 'A weighted scorecard that turns gut-feel vetting into an auditable number.',
  cover: {
    t: 'report',
    bg: C.blue,
    a: C.white,
    fg: C.white,
    stat: 'A–F',
    statlbl: 'auto-graded fit'
  }
}, {
  id: 'rate-card',
  title: 'The Rate Card Builder',
  type: 'Template',
  level: 'Beginner',
  aud: 'influencer',
  desc: 'Set defensible prices per deliverable and platform — with a one-page export.',
  cover: {
    t: 'editorial',
    bg: C.paper,
    a: C.yellow,
    fg: C.ink
  }
}, {
  id: 'measurement-framework',
  title: 'Campaign Measurement Framework',
  type: 'Framework',
  level: 'Advanced',
  aud: 'brand',
  desc: 'From impressions to incrementality — the metric tree for proving creator ROI.',
  cover: {
    t: 'report',
    bg: C.ink,
    a: C.blue,
    fg: C.white,
    stat: '86%',
    statlbl: 'consumer influence rate'
  }
}, {
  id: 'ftc-handbook',
  title: 'FTC Disclosure & Compliance Handbook',
  type: 'Guide',
  level: 'Intermediate',
  aud: 'universal',
  desc: 'Stay clean: disclosure rules, sample language, and the gray areas to avoid.',
  cover: {
    t: 'type',
    bg: C.ink,
    a: C.yellow,
    fg: C.white
  }
}, {
  id: 'luxury-beauty',
  title: 'Luxury Beauty Creator Report',
  type: 'Report',
  level: 'Intermediate',
  aud: 'brand',
  desc: 'Inside the macro-to-micro shift reshaping prestige beauty partnerships.',
  cover: {
    t: 'photo',
    photo: 'hero-03-pinkhair-tablet.jpg',
    pos: 'center 22%',
    a: C.pink,
    fg: C.white
  }
}, {
  id: 'media-kit',
  title: 'The Media Kit Toolkit',
  type: 'Toolkit',
  level: 'Beginner',
  aud: 'influencer',
  desc: 'A designed, fill-in media kit that makes a 20K creator look like a pro studio.',
  cover: {
    t: 'block',
    bg: C.yellow,
    a: C.pink,
    b: C.blue,
    fg: C.ink
  }
}, {
  id: 'retainer-model',
  title: 'Long-Term Partnership Retainer Model',
  type: 'Framework',
  level: 'Expert',
  aud: 'influencer',
  desc: 'Turn one-off deals into recurring revenue — structure, pricing, and the pitch.',
  cover: {
    t: 'editorial',
    bg: C.paper,
    a: C.pink,
    fg: C.ink
  }
}, {
  id: 'authenticity-audit',
  title: 'Audience Authenticity Audit',
  type: 'Template',
  level: 'Advanced',
  aud: 'brand',
  desc: 'Spot inflated follower counts before you spend — the signals and the math.',
  cover: {
    t: 'report',
    bg: C.ink2,
    a: C.blue,
    fg: C.white,
    stat: '12pt',
    statlbl: 'authenticity checks'
  }
}, {
  id: 'ugc-brief',
  title: 'UGC Content Brief Template',
  type: 'Template',
  level: 'Beginner',
  aud: 'brand',
  desc: 'Brief creators so the first cut is right — tone, must-haves, and a shot list.',
  cover: {
    t: 'type',
    bg: C.blue,
    a: C.white,
    fg: C.white
  }
}, {
  id: 'cross-city',
  title: 'Cross-City Campaign Sequencing Guide',
  type: 'Guide',
  level: 'Expert',
  aud: 'brand',
  desc: 'Sequence launches across NYC, London, and Dubai to compound reach, not dilute it.',
  cover: {
    t: 'photo',
    photo: 'city-nyc.jpg',
    pos: 'center 35%',
    a: C.yellow,
    fg: C.white
  }
}, {
  id: 'creator-tax',
  title: 'Creator Tax & Business Setup Guide',
  type: 'Guide',
  level: 'Intermediate',
  aud: 'influencer',
  desc: 'Entity, deductions, and quarterly basics so your brand deals do not bite at tax time.',
  cover: {
    t: 'editorial',
    bg: C.paper,
    a: C.blue,
    fg: C.ink
  }
}, {
  id: 'brand-safety',
  title: 'Brand Safety & Crisis Playbook',
  type: 'Guide',
  level: 'Advanced',
  aud: 'brand',
  desc: 'Vet, monitor, and respond — keep a partnership from becoming a headline.',
  cover: {
    t: 'block',
    bg: C.ink,
    a: C.blue,
    b: C.yellow,
    fg: C.white
  }
}, {
  id: 'macro-micro',
  title: 'The Macro-to-Micro Shift Report',
  type: 'Report',
  level: 'Intermediate',
  aud: 'brand',
  desc: 'Why budgets are moving down the follower curve — and what it means for reach.',
  cover: {
    t: 'report',
    bg: C.pink,
    a: C.white,
    fg: C.white,
    stat: '3.4×',
    statlbl: 'micro engagement lift'
  }
}, {
  id: 'analytics-kit',
  title: 'Performance Analytics Dashboard Kit',
  type: 'Toolkit',
  level: 'Advanced',
  aud: 'brand',
  desc: 'A plug-in dashboard template that turns campaign exports into a board-ready read.',
  cover: {
    t: 'photo',
    photo: 'm1-cover.jpg',
    pos: 'center 40%',
    a: C.blue,
    fg: C.white
  }
}, {
  id: 'collab-handbook',
  title: 'The Authentic Collaboration Handbook',
  type: 'Guide',
  level: 'Beginner',
  aud: 'universal',
  desc: 'The principles behind partnerships that read as genuine — and convert because of it.',
  cover: {
    t: 'type',
    bg: C.plum,
    a: C.yellow,
    fg: C.white
  }
}];

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
      <div class="cov-fill cov-photo" style="background-image:url('${IMG}${c.photo}');background-position:${c.pos || 'center'}"></div>
      <div class="cov-scrim"></div>
      <div class="cov-bar" style="background:${c.a}"></div>
      <div class="cov-content" style="--fg:${c.fg}">
        <div class="cov-top">${wm}${kind}</div>
        <h4 class="cov-title">${p.title}</h4>
      </div>`;
  } else {
    /* editorial */
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/resources-covers.js", error: String((e && e.message) || e) }); }

// ui_kits/website/AudienceSplit.jsx
try { (() => {
/* global React, useApp, Button, Eyebrow, Icon */
function AudienceSplit() {
  const {
    setModal
  } = useApp();
  return /*#__PURE__*/React.createElement("section", {
    className: "lmg-section lmg-audience",
    id: "brands"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-audience-grid"
  }, /*#__PURE__*/React.createElement("article", {
    className: "lmg-audience-card"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--lmg-yellow-deep)"
  }, "For Brands"), /*#__PURE__*/React.createElement("h2", null, "Authentic creator partnerships, scaled."), /*#__PURE__*/React.createElement("p", null, "Strategic matchmaking, end-to-end campaign execution, and real-time performance tracking \u2014 built for marketing leaders who need ROI without compromising taste."), /*#__PURE__*/React.createElement("ul", {
    className: "lmg-tick-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " AI-powered creator vetting"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Performance-driven campaign development"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Cross-platform content strategy")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => setModal('brand')
  }, "Start Your Campaign")), /*#__PURE__*/React.createElement("article", {
    className: "lmg-audience-card lmg-audience-card--pink",
    id: "influencers"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--lmg-pink)"
  }, "For Influencers"), /*#__PURE__*/React.createElement("h2", null, "Brand deals that respect your work."), /*#__PURE__*/React.createElement("p", null, "Curated partnerships with brands that align with your audience, fair compensation, and the operational backbone to scale your business sustainably."), /*#__PURE__*/React.createElement("ul", {
    className: "lmg-tick-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Exclusive brand partnerships"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Contract negotiation & representation"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Content production support")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => setModal('influencer')
  }, "Join as Influencer")))));
}
window.AudienceSplit = AudienceSplit;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AudienceSplit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AuthModal.jsx
try { (() => {
/* global React, useApp, Button, Field, Icon, Eyebrow */
const {
  useState: useStateA,
  useEffect: useEffectA
} = React;
function AuthModal() {
  const {
    modal,
    setModal,
    showToast
  } = useApp();
  const [tab, setTab] = useStateA('brand');
  useEffectA(() => {
    if (modal) setTab(modal);
  }, [modal]);
  if (!modal) return null;
  const submit = e => {
    e.preventDefault();
    setModal(null);
    showToast(tab === 'brand' ? 'Thanks — a partnerships lead will be in touch within 1 business day.' : 'Thanks — our talent team will review your application this week.');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "lmg-modal-overlay",
    onClick: e => e.target === e.currentTarget && setModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-modal"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-modal-close",
    onClick: () => setModal(null),
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "lmg-modal-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, tab === 'brand' ? 'For Brands' : 'For Influencers'), /*#__PURE__*/React.createElement("h2", null, tab === 'brand' ? 'Start your campaign' : 'Join the LMG roster'), /*#__PURE__*/React.createElement("p", null, tab === 'brand' ? 'Tell us about your brand and goals — we’ll match you with the right creators.' : 'Apply in two minutes. Our talent team reviews every application personally.')), /*#__PURE__*/React.createElement("div", {
    className: "lmg-modal-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'brand' ? 'active' : '',
    onClick: () => setTab('brand')
  }, "Brand / Advertiser"), /*#__PURE__*/React.createElement("button", {
    className: tab === 'influencer' ? 'active' : '',
    onClick: () => setTab('influencer')
  }, "Influencer / Creator")), /*#__PURE__*/React.createElement("form", {
    className: "lmg-modal-form",
    onSubmit: submit
  }, tab === 'brand' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Your name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    placeholder: "Alex Rivera"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Work email"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    type: "email",
    placeholder: "alex@brand.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Brand / Company"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    placeholder: "Maison \xC9toile"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Campaign budget"
  }, /*#__PURE__*/React.createElement("select", {
    className: "lmg-select"
  }, /*#__PURE__*/React.createElement("option", null, "$25k \u2013 $50k"), /*#__PURE__*/React.createElement("option", null, "$50k \u2013 $150k"), /*#__PURE__*/React.createElement("option", null, "$150k \u2013 $500k"), /*#__PURE__*/React.createElement("option", null, "$500k +"))), /*#__PURE__*/React.createElement(Field, {
    label: "Goals"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "lmg-textarea",
    placeholder: "Audience, timing, KPIs\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    iconRight: "arrow-right"
  }, "Submit brief")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    placeholder: "Iris Castel"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    type: "email",
    placeholder: "iris@gmail.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Primary handle"
  }, /*#__PURE__*/React.createElement("input", {
    className: "lmg-input",
    required: true,
    placeholder: "@iris.styles"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Niche"
  }, /*#__PURE__*/React.createElement("select", {
    className: "lmg-select"
  }, /*#__PURE__*/React.createElement("option", null, "Lifestyle"), /*#__PURE__*/React.createElement("option", null, "Fashion"), /*#__PURE__*/React.createElement("option", null, "Luxury"), /*#__PURE__*/React.createElement("option", null, "Travel"), /*#__PURE__*/React.createElement("option", null, "Wellness"), /*#__PURE__*/React.createElement("option", null, "Fitness"), /*#__PURE__*/React.createElement("option", null, "AI"))), /*#__PURE__*/React.createElement(Field, {
    label: "Follower count"
  }, /*#__PURE__*/React.createElement("select", {
    className: "lmg-select"
  }, /*#__PURE__*/React.createElement("option", null, "10K \u2013 50K"), /*#__PURE__*/React.createElement("option", null, "50K \u2013 250K"), /*#__PURE__*/React.createElement("option", null, "250K \u2013 1M"), /*#__PURE__*/React.createElement("option", null, "1M +"))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    type: "submit",
    iconRight: "arrow-right"
  }, "Apply now")), /*#__PURE__*/React.createElement("p", {
    className: "lmg-modal-fine"
  }, "By submitting, you agree to LMG Media\u2019s Terms & Privacy Policy."))));
}
window.AuthModal = AuthModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AuthModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FAQs.jsx
try { (() => {
/* global React, Eyebrow, Icon */
const FAQS = [{
  q: 'Why do brands partner with influencers?',
  a: 'Influencers bring trusted, audience-aligned voice that paid media cannot replicate. The right creator drives measurable lift in awareness, consideration, and conversion.'
}, {
  q: 'How do you find influencers?',
  a: 'A combination of AI-powered vetting (audience demographics, engagement quality, brand-safety) and human curation by our talent partnerships team.'
}, {
  q: 'What is a micro influencer?',
  a: 'A creator with roughly 10K–50K followers. Micro-influencers typically have higher engagement rates and tightly-defined niche audiences.'
}, {
  q: 'What is a macro influencer?',
  a: 'A creator with 500K–1M+ followers — broader reach, premium pricing, and larger production requirements.'
}, {
  q: 'How do I best hire influencers?',
  a: 'Work with an agency that vets audience quality, negotiates fair contracts, and measures performance against pre-agreed KPIs — not surface metrics.'
}, {
  q: 'Why work with an influencer agency?',
  a: 'You get strategic match-making, contractual & legal protection, and unified reporting across all creators — without standing up an in-house team.'
}];
const {
  useState: useStateF
} = React;
function FAQs() {
  const [open, setOpen] = useStateF(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "lmg-section lmg-section-alt",
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container lmg-container--narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-section-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "FAQs"), /*#__PURE__*/React.createElement("h2", null, "Common questions.")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-faq"
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `lmg-faq-item ${open === i ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-faq-q",
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("span", null, f.q), /*#__PURE__*/React.createElement(Icon, {
    name: open === i ? 'minus' : 'plus',
    size: 18
  })), open === i && /*#__PURE__*/React.createElement("div", {
    className: "lmg-faq-a"
  }, f.a))))));
}
window.FAQs = FAQs;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FAQs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React, Wordmark, Icon */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "lmg-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-brand"
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  }), /*#__PURE__*/React.createElement("p", null, "Where quality brands meet iconic influence."), /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "YouTube"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "youtube",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "LinkedIn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "X / Twitter"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "twitter",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-h"
  }, "For Brands"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Strategic Campaigns"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Influencer Sourcing"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Performance Analytics"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Case Studies")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-h"
  }, "For Influencers"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Personal Branding"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Monetization"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Apply to Join"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Creator Resources")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-h"
  }, "Company"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Press"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Careers"))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-footer-fine"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 LMG Media. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Privacy \xB7 Terms \xB7 Cookies"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* global React, useApp, Wordmark, Icon, Button */
const {
  useEffect: useEffectH,
  useState: useStateH
} = React;
function Header() {
  const {
    theme,
    setTheme,
    lang,
    setLang,
    setModal
  } = useApp();
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `lmg-header ${scrolled ? 'scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "lmg-header-logo",
    "aria-label": "LMG Media"
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  })), /*#__PURE__*/React.createElement("nav", {
    className: "lmg-nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html#influencers"
  }, "For Influencers"), /*#__PURE__*/React.createElement("a", {
    href: "index.html#brands"
  }, "For Brands"), /*#__PURE__*/React.createElement("a", {
    href: "resources.html"
  }, "Resources"), /*#__PURE__*/React.createElement("a", {
    href: "insights.html"
  }, "Insights"), /*#__PURE__*/React.createElement("a", {
    href: "index.html#about"
  }, "About")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-header-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-icon-btn",
    "aria-label": "Toggle theme",
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === 'dark' ? 'moon' : 'sun',
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    className: "lmg-link-btn",
    onClick: () => setModal('brand')
  }, "Sign In"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => setModal('brand')
  }, "Get Started"), /*#__PURE__*/React.createElement("div", {
    className: "lmg-lang"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 16
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang('EN'),
    className: lang === 'EN' ? 'active' : ''
  }, "EN"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "|"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLang('ES'),
    className: lang === 'ES' ? 'active' : ''
  }, "ES")))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React, useApp, Button, Icon */
function Hero() {
  const {
    setModal
  } = useApp();
  return /*#__PURE__*/React.createElement("section", {
    className: "lmg-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-fade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-inner"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "lmg-display-1"
  }, "Where Quality Brands", /*#__PURE__*/React.createElement("br", null), "Meet ", /*#__PURE__*/React.createElement("span", {
    className: "lmg-accent-yellow"
  }, "Iconic"), " ", /*#__PURE__*/React.createElement("span", {
    className: "lmg-accent-pink"
  }, "Influence")), /*#__PURE__*/React.createElement("p", {
    className: "lmg-hero-sub"
  }, "Connecting visionary brands with influential voices in lifestyle,", /*#__PURE__*/React.createElement("br", null), "luxury, fashion, wellness and travel"), /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "35.6%"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "YoY Growth")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-ctas"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => setModal('brand')
  }, "Start Your Campaign"), /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "lg",
    iconRight: "users",
    onClick: () => setModal('influencer')
  }, "Join as Influencer")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-hero-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-inline-stat blue"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up"
  }), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "86%"), " Consumer Influence Rate")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-inline-stat pink"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play"
  }), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "TikTok 18%"), " Engagement")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-inline-stat yellow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "10K-1M"), " Follower Range")))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/InsightsPage.jsx
try { (() => {
/* global React, Icon */
const BLOG_CATS = [{
  n: 'All Posts',
  c: 54,
  d: 'var(--lmg-blue)'
}, {
  n: 'Strategy',
  c: 14,
  d: 'var(--lmg-blue)'
}, {
  n: 'Partnerships',
  c: 1,
  d: '#8E5CE6'
}, {
  n: 'Platforms',
  c: 7,
  d: 'var(--lmg-pink)'
}, {
  n: 'Analytics',
  c: 0,
  d: 'var(--success)'
}, {
  n: 'Industry',
  c: 19,
  d: '#E69500'
}, {
  n: 'Legal',
  c: 1,
  d: 'var(--danger)'
}];
const BLOG_POSTS = [{
  cat: 'Uncategorized',
  tag: 'Creator Economy',
  tagAccent: true,
  title: 'Influencer Marketing Agency vs In-House: Which Is Right for Your Brand?',
  excerpt: 'Deciding between an influencer marketing agency and building in-house? This complete guide cove...',
  photo: '../../assets/svc-brd-strategy.jpg',
  views: 3,
  comments: 0
}, {
  cat: 'Uncategorized',
  tag: 'location',
  title: 'Sydney Influencer Marketing: The Complete Brand Guide for Australia',
  excerpt: 'Learn how brands run effective influencer marketing campaigns in Sydney and across...',
  photo: '../../assets/svc-inf-personal-brand.jpg',
  views: 4,
  comments: 0
}, {
  cat: 'Uncategorized',
  tag: 'location',
  title: 'Chicago Influencer Marketing: The Midwest Playbook',
  excerpt: 'Why Chicago has become a quietly powerful hub for mid-market influencer programs...',
  photo: '../../assets/svc-brd-campaign.jpg',
  views: 7,
  comments: 1
}, {
  cat: 'Uncategorized',
  tag: 'Platforms',
  tagAccent: true,
  title: 'Tech Influencer Marketing in 2026: New Formats, New Buyers',
  excerpt: 'B2B and consumer tech are both pivoting toward creator-led storytelling. Here is how...',
  photo: '../../assets/svc-inf-deal-flow.jpg',
  views: 9,
  comments: 2
}];
function InsightsPage() {
  const [activeCat, setActiveCat] = React.useState('All Posts');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "lmg-blog-hero"
  }, /*#__PURE__*/React.createElement("h1", null, "Influencer Marketing Insights"), /*#__PURE__*/React.createElement("p", null, "Stay ahead of the curve with expert insights, industry trends, and actionable strategies for successful influencer marketing campaigns.")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "lmg-blog-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Categories"), /*#__PURE__*/React.createElement("ul", null, BLOG_CATS.map(c => /*#__PURE__*/React.createElement("li", {
    key: c.n,
    className: activeCat === c.n ? 'active' : '',
    onClick: () => setActiveCat(c.n)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: c.d
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, c.n), /*#__PURE__*/React.createElement("span", {
    className: "ct"
  }, c.c))))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-subscribe-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Stay Updated"), /*#__PURE__*/React.createElement("p", null, "Get the latest influencer marketing insights delivered to your inbox."), /*#__PURE__*/React.createElement("input", {
    placeholder: "Your email"
  }), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary"
  }, "Subscribe"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search articles..."
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-2)'
    }
  }, "54 articles found")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-grid"
  }, BLOG_POSTS.map((p, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    className: "lmg-blog-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-photo",
    style: {
      backgroundImage: `url(${p.photo})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-tags"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, p.cat), /*#__PURE__*/React.createElement("span", {
    className: `t ${p.tagAccent ? 'accent' : ''}`
  }, p.tag)), /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "lmg-blog-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "author"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }), " Anonymous"), /*#__PURE__*/React.createElement("span", {
    className: "stats"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 12
  }), " ", p.views), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 12
  }), " ", p.comments))))))))));
}
window.InsightsPage = InsightsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/InsightsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NichesGrid.jsx
try { (() => {
/* global React, Eyebrow */
const NICHES = [{
  id: 'lifestyle',
  label: 'Lifestyle',
  accent: 'yellow',
  icon: 'sparkles',
  tag: '+820 creators'
}, {
  id: 'fashion',
  label: 'Fashion',
  accent: 'pink',
  icon: 'shirt',
  tag: '+540'
}, {
  id: 'luxury',
  label: 'Luxury',
  accent: 'dark',
  icon: 'gem',
  tag: '+210'
}, {
  id: 'travel',
  label: 'Travel',
  accent: 'blue',
  icon: 'plane',
  tag: '+390'
}, {
  id: 'wellness',
  label: 'Wellness',
  accent: 'yellow',
  icon: 'leaf',
  tag: '+470'
}, {
  id: 'fitness',
  label: 'Fitness & Health',
  accent: 'pink',
  icon: 'dumbbell',
  tag: '+330'
}, {
  id: 'ai',
  label: 'AI Influencers',
  accent: 'blue',
  icon: 'cpu',
  tag: '+45'
}];
function NichesGrid({
  active,
  onPick
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "lmg-section lmg-section-alt",
    id: "niches"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-section-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Verticals"), /*#__PURE__*/React.createElement("h2", null, "A curated roster across seven niches."), /*#__PURE__*/React.createElement("p", null, "Every creator in our network is hand-vetted for audience quality, engagement, and brand alignment.")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-niche-grid"
  }, NICHES.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    className: `lmg-niche-tile lmg-niche-tile--${n.accent} ${active === n.id ? 'active' : ''}`,
    onClick: () => onPick(n.id === active ? null : n.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, n.label), /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, n.tag))))));
}
window.NichesGrid = NichesGrid;
window.NICHES = NICHES;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NichesGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ResourceDetailPage.jsx
try { (() => {
/* global React, Icon, Eyebrow */
function ResourceDetailPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "lmg-detail-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-tags"
  }, /*#__PURE__*/React.createElement("span", {
    className: "level"
  }, "beginner"), /*#__PURE__*/React.createElement("span", {
    className: "cat"
  }, "General")), /*#__PURE__*/React.createElement("h1", null, "Platform Comparison Guide: Instagram vs TikTok vs YouTube vs LinkedIn"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "A comprehensive side-by-side comparison of the four primary influencer marketing platforms. Covers audience demographics, content formats, pricing norms, best-fit brand categories, and how to decide where to invest your influencer marketing budget."), /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 14
  }), " ebook"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " 18 minutes"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 14
  }), " 2 views"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " 0 downloads")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary lmg-btn-lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 18
  }), " Download Free"), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-outline lmg-btn-lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 18
  }), " Like"), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-outline lmg-btn-lg",
    "aria-label": "Share"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share-2",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-photo",
    style: {
      backgroundImage: 'url(../../assets/svc-brd-strategy.jpg)'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    className: "lmg-section-alt",
    style: {
      padding: '56px 0 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 14
  }), " Published Wed Mar 18 2026"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 14
  }), " For brands"), /*#__PURE__*/React.createElement("span", {
    className: "audtag"
  }, "brands")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "One of the most common \u2014 and most expensive \u2014 mistakes brands make in influencer marketing is choosing platforms based on assumptions rather than data. Brands invest in Instagram because it feels like the obvious choice. They avoid LinkedIn because it does not feel relevant. They chase TikTok because it is what every executive is asking about."), /*#__PURE__*/React.createElement("p", null, "This guide breaks down each of the four major platforms \u2014 Instagram, TikTok, YouTube, and LinkedIn \u2014 across the dimensions that actually matter: audience size and quality, average engagement rate, content format constraints, creator pricing norms (CPM, flat-fee, and performance), conversion behavior, and the brand categories that consistently perform on each."), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22,
      marginTop: 28,
      marginBottom: 8
    }
  }, "What you'll learn"), /*#__PURE__*/React.createElement("ul", {
    style: {
      paddingLeft: 18,
      lineHeight: 1.8,
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("li", null, "Audience demographics & behavior on each platform"), /*#__PURE__*/React.createElement("li", null, "Engagement-rate benchmarks (and how to read them honestly)"), /*#__PURE__*/React.createElement("li", null, "Creator pricing norms by follower tier"), /*#__PURE__*/React.createElement("li", null, "A decision framework for allocating budget across platforms"), /*#__PURE__*/React.createElement("li", null, "Case studies from luxury, fashion, beauty, and B2B brands"))), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    className: "lmg-detail-download"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 24
  })), /*#__PURE__*/React.createElement("h3", null, "Free Download"), /*#__PURE__*/React.createElement("p", null, "Get instant access to this professional template."), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary",
    style: {
      background: 'var(--lmg-pink)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 16
  }), " Download Free")))))));
}
window.ResourceDetailPage = ResourceDetailPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ResourceDetailPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ResourcesPage.jsx
try { (() => {
/* global React, Eyebrow, Icon, Button, useApp */
function ResourcesPage() {
  const [tab, setTab] = React.useState('all');
  const [activeCat, setActiveCat] = React.useState('All Resources');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "lmg-section",
    style: {
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 20,
    color: "var(--lmg-yellow-deep)"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 36
    }
  }, "Featured This Week"), /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 20,
    color: "var(--lmg-yellow-deep)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "lmg-featured-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-featured-photo",
    style: {
      backgroundImage: 'url(../../assets/featured-photo.jpg), linear-gradient(135deg,#222,#444)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lmg-featured-pill"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 12
  }), " Featured")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-featured-body"
  }, /*#__PURE__*/React.createElement("h3", null, "Complete Brand Partnership Guide"), /*#__PURE__*/React.createElement("p", null, "Everything you need to know about securing and managing brand partnerships. Learn proven strategies for pitching to brands, negotiating contracts, and building long-term profitable relationships that elevate your influencer career."), /*#__PURE__*/React.createElement("div", {
    className: "lmg-featured-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 14
  }), " 2,547 views"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " 892 downloads"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " 15 min read")), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary lmg-btn-lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 18
  }), " Download Now - Free"))))), /*#__PURE__*/React.createElement("section", {
    className: "lmg-section-alt",
    style: {
      paddingTop: 48,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search resources... (Press Enter)"
  })), /*#__PURE__*/React.createElement("select", {
    className: "lmg-select",
    style: {
      width: 140
    }
  }, /*#__PURE__*/React.createElement("option", null, "All"), /*#__PURE__*/React.createElement("option", null, "Strategy"), /*#__PURE__*/React.createElement("option", null, "Analytics")), /*#__PURE__*/React.createElement("select", {
    className: "lmg-select",
    style: {
      width: 140
    }
  }, /*#__PURE__*/React.createElement("option", null, "All Types"), /*#__PURE__*/React.createElement("option", null, "Guide"), /*#__PURE__*/React.createElement("option", null, "Template"), /*#__PURE__*/React.createElement("option", null, "Report")), /*#__PURE__*/React.createElement("select", {
    className: "lmg-select",
    style: {
      width: 140
    }
  }, /*#__PURE__*/React.createElement("option", null, "All Levels"), /*#__PURE__*/React.createElement("option", null, "Beginner"), /*#__PURE__*/React.createElement("option", null, "Advanced"))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "lmg-res-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Categories"), /*#__PURE__*/React.createElement("ul", null, [{
    n: 'All Resources',
    c: '13',
    d: 'var(--lmg-blue)'
  }, {
    n: 'Strategy',
    c: '3',
    d: '#8E5CE6'
  }, {
    n: 'Analytics',
    c: '2',
    d: 'var(--success)'
  }, {
    n: 'Campaign Management',
    c: '1',
    d: 'var(--lmg-yellow-deep)'
  }, {
    n: 'Legal & Compliance',
    c: '2',
    d: 'var(--danger)'
  }, {
    n: 'Platform Strategy',
    c: '1',
    d: 'var(--lmg-pink)'
  }, {
    n: 'Industry Insights',
    c: '1',
    d: '#E69500'
  }, {
    n: 'Case Studies',
    c: '1',
    d: '#5BBFE9'
  }].map(cat => /*#__PURE__*/React.createElement("li", {
    key: cat.n,
    className: activeCat === cat.n ? 'active' : '',
    onClick: () => setActiveCat(cat.n)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: cat.d
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, cat.n), /*#__PURE__*/React.createElement("span", {
    className: "ct"
  }, cat.c)))))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-tabs"
  }, ['all', 'influencers', 'brands', 'universal'].map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: tab === k ? 'active' : '',
    onClick: () => setTab(k)
  }, k === 'all' ? 'All Resources' : k === 'influencers' ? 'For Influencers' : k === 'brands' ? 'For Brands' : 'Universal'))), /*#__PURE__*/React.createElement("div", {
    className: "lmg-caption",
    style: {
      margin: '12px 0 20px'
    }
  }, "Showing 12 of 23 resources"), /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-grid"
  }, [{
    tag: 'beginner',
    tagColor: 'var(--success)',
    icon: 'image',
    title: '2026 Influencer Marketing Industry Report',
    excerpt: 'Comprehensive analysis of trends, budgets, and ROI benchmarks across the 2026 creator economy.',
    featured: true,
    photo: '../../assets/svc-inf-deal-flow.jpg',
    accent: 'var(--lmg-pink)'
  }, {
    tag: 'beginner',
    tagColor: 'var(--success)',
    icon: 'book-open',
    title: 'TikTok Growth Strategy Playbook 2025',
    excerpt: 'A step-by-step playbook for organic and paid TikTok growth in 2025.',
    featured: true,
    photo: '../../assets/ref-instagram-grid.png',
    accent: 'var(--lmg-pink)'
  }, {
    tag: 'advanced',
    tagColor: 'var(--lmg-pink-soft)',
    tagText: '#99214C',
    icon: 'image',
    title: 'Micro-Influencer Campaign ROI Calculator',
    excerpt: 'A spreadsheet model + worked examples for projecting ROI on micro-influencer programs.',
    featured: true,
    photo: '../../assets/svc-inf-personal-brand.jpg',
    accent: 'var(--lmg-pink)'
  }, {
    tag: 'beginner',
    tagColor: 'var(--success)',
    icon: 'file-text',
    title: 'Influencer Contract Template Pack',
    excerpt: 'Three battle-tested contract templates for IG, TikTok, and long-form deals.',
    photo: '../../assets/svc-brd-partnership.jpg',
    accent: 'var(--audience-brand)'
  }, {
    tag: 'intermediate',
    tagColor: 'var(--lmg-yellow-soft)',
    tagText: '#6B5500',
    icon: 'bar-chart-3',
    title: 'AI-Powered Influencer Vetting Workflow',
    excerpt: 'How LMG’s AI vetting stack works — and how to replicate the methodology in-house.',
    photo: '../../assets/svc-brd-strategy.jpg',
    accent: 'var(--audience-brand)'
  }, {
    tag: 'beginner',
    tagColor: 'var(--success)',
    icon: 'sparkles',
    title: 'Personal Brand Workbook for Creators',
    excerpt: 'Twelve worksheets for nailing positioning, story, and visual identity.',
    photo: '../../assets/svc-inf-personal-brand.jpg',
    accent: 'var(--lmg-pink)'
  }].map((r, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    className: "lmg-res-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-photo",
    style: {
      backgroundImage: `url(${r.photo})`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lmg-res-level",
    style: {
      background: r.tagColor,
      color: r.tagText || '#0a5e34'
    }
  }, r.tag), /*#__PURE__*/React.createElement("span", {
    className: "lmg-res-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 16
  })), r.featured && /*#__PURE__*/React.createElement("span", {
    className: "lmg-res-featured"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 11
  }), " Featured"), /*#__PURE__*/React.createElement("span", {
    className: "lmg-res-accent",
    style: {
      background: r.accent
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "lmg-res-body"
  }, /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.excerpt))))))))));
}
window.ResourcesPage = ResourcesPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ResourcesPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicesList.jsx
try { (() => {
/* global React, useApp, Button, Eyebrow, Icon */
const SVC_DATA = {
  brand: [{
    photo: '../../assets/svc-brd-strategy.jpg',
    icon: 'target',
    title: 'Influencer Marketing Strategy',
    desc: 'Develop data-driven strategies that identify the perfect creators for your brand. We analyze audience demographics, engagement patterns, and content alignment to ensure maximum campaign impact and authentic brand partnerships.',
    features: ['Data-driven influencer identification and vetting', 'Comprehensive audience demographic analysis', 'Platform strategy and channel optimization'],
    more: 2
  }, {
    photo: '../../assets/svc-brd-partnership.jpg',
    icon: 'handshake',
    title: 'Brand Partnership Development',
    desc: 'Build long-term, mutually beneficial relationships with top-tier influencers. Our team facilitates partnership opportunities, negotiates favorable terms, and manages ongoing collaborations that deliver consistent value for your brand.',
    features: ['Strategic partnership opportunity identification', 'Professional negotiation and contract structuring', 'Ongoing relationship management and support'],
    more: 2
  }, {
    photo: '../../assets/svc-brd-campaign.jpg',
    icon: 'settings',
    title: 'Campaign Management',
    desc: 'From concept to completion, we handle every aspect of your influencer campaigns. Our end-to-end management includes creator outreach, content approval, performance tracking, and detailed reporting to ensure seamless execution and measurable results.',
    features: ['End-to-end campaign execution and coordination', 'Professional influencer outreach and negotiation', 'Content review and brand guideline compliance'],
    more: 2
  }],
  influencer: [{
    photo: '../../assets/svc-inf-deal-flow.jpg',
    icon: 'briefcase',
    title: 'Brand Opportunities and Deal Flow',
    desc: 'Gain exclusive access to premium brand partnerships tailored to your niche and audience. We connect you with quality brands seeking authentic collaborations, negotiate competitive rates, and ensure a steady pipeline of opportunities that align with your personal brand.',
    features: ['Exclusive access to premium brand partnerships', 'Personalized opportunity matching and curation', 'Competitive rate negotiation on your behalf'],
    more: 2
  }, {
    photo: '../../assets/svc-inf-personal-brand.jpg',
    icon: 'sparkles',
    title: 'Personal Brand Development',
    desc: 'Elevate your creator business with strategic brand positioning and growth planning. We help you define your unique value proposition, optimize your content strategy, and develop a cohesive brand identity that attracts premium partnerships and expands your influence.',
    features: ['Strategic brand positioning and identity development', 'Unique value proposition definition', 'Content strategy optimization and planning'],
    more: 2
  }, {
    photo: '../../assets/svc-inf-production.jpg',
    icon: 'video',
    title: 'Creative and Production Support',
    desc: 'Access professional creative direction and production resources to enhance your content quality. From concept development to post-production, we provide the tools and expertise needed to create standout content that captivates your audience and exceeds brand expectations.',
    features: ['Professional creative direction and concept development', 'High-quality production resources and support', 'Content editing and post-production services'],
    more: 2
  }]
};
function ServicesList() {
  const [tab, setTab] = React.useState('influencer');
  const items = SVC_DATA[tab];
  return /*#__PURE__*/React.createElement("section", {
    className: "lmg-section",
    id: "services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: `lmg-pill-tab lmg-pill-tab--${tab}`
  }, tab === 'brand' ? 'For Brands' : 'For Influencers'), /*#__PURE__*/React.createElement("h2", null, tab === 'brand' ? 'Our Most Requested Brand Services' : 'Our Most Requested Influencer Services'), /*#__PURE__*/React.createElement("p", null, tab === 'brand' ? 'Everything you need to run high-performing influencer campaigns with measurable ROI.' : 'Everything you need to build a sustainable creator business and maximize your earning potential.')), /*#__PURE__*/React.createElement("div", {
    className: "lmg-aud-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'influencer' ? 'active influencer' : '',
    onClick: () => setTab('influencer')
  }, "For Influencers"), /*#__PURE__*/React.createElement("button", {
    className: tab === 'brand' ? 'active brand' : '',
    onClick: () => setTab('brand')
  }, "For Brands")), /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-grid"
  }, items.map((s, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    className: `lmg-svc-card audience-${tab === 'brand' ? 'brand' : 'influencer'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-photo",
    style: {
      backgroundImage: `url(${s.photo})`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lmg-pill"
  }, tab === 'brand' ? 'For Brands' : 'For Influencers')), /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-badge"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    className: "lmg-svc-title"
  }, s.title)), /*#__PURE__*/React.createElement("p", {
    className: "lmg-svc-desc"
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Key Features:"), /*#__PURE__*/React.createElement("ul", null, s.features.map((f, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, f)))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "lmg-svc-more"
  }, "+", s.more, " more features"), /*#__PURE__*/React.createElement("div", {
    className: "lmg-svc-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-primary"
  }, /*#__PURE__*/React.createElement("span", null, "Learn More"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    className: "lmg-btn lmg-btn-outline"
  }, tab === 'brand' ? 'Get Quote' : 'Apply Now'))))))));
}
window.ServicesList = ServicesList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicesList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext
} = React;

/* ─── App context (theme + lang + modal) ─── */
const AppCtx = createContext(null);
function AppProvider({
  children
}) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('EN');
  const [modal, setModal] = useState(null); // null | 'brand' | 'influencer'
  const [toast, setToast] = useState(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : '';
  }, [theme]);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };
  return /*#__PURE__*/React.createElement(AppCtx.Provider, {
    value: {
      theme,
      setTheme,
      lang,
      setLang,
      modal,
      setModal,
      showToast
    }
  }, children, toast && /*#__PURE__*/React.createElement("div", {
    className: "lmg-toast"
  }, toast));
}
const useApp = () => useContext(AppCtx);

/* ─── Wordmark ─── */
function Wordmark({
  size = 22
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/lmg-logo.png",
    alt: "LMG Media",
    className: "lmg-wordmark-img",
    style: {
      height: `${size * 1.8}px`,
      display: 'block'
    }
  });
}

/* ─── Icon (Lucide) ─── */
function Icon({
  name,
  size = 18,
  color,
  className = '',
  ...rest
}) {
  const ref = useRef();
  useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({
      icons: window.lucide.icons,
      attrs: {},
      nameAttr: 'data-lucide'
    });
  });
  return /*#__PURE__*/React.createElement("i", _extends({
    ref: ref,
    "data-lucide": name,
    className: `lmg-icon ${className}`,
    style: {
      width: size,
      height: size,
      color
    }
  }, rest));
}

/* ─── Button ─── */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  onClick,
  type = 'button',
  className = '',
  style = {}
}) {
  const cls = `lmg-btn lmg-btn-${variant} ${size !== 'md' ? `lmg-btn-${size}` : ''} ${className}`;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    className: cls,
    onClick: onClick,
    style: style
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === 'lg' ? 20 : 18
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight,
    size: size === 'lg' ? 20 : 18
  }));
}

/* ─── Eyebrow / label ─── */
function Eyebrow({
  children,
  color,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `lmg-eyebrow ${className}`,
    style: {
      color
    }
  }, children);
}

/* ─── Field ─── */
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "lmg-field"
  }, /*#__PURE__*/React.createElement("span", null, label), children);
}
Object.assign(window, {
  AppCtx,
  AppProvider,
  useApp,
  Wordmark,
  Icon,
  Button,
  Eyebrow,
  Field
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
