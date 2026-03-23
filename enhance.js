/* ═══════════════════════════════════════════════════════════════
   ConvertPDF.Live — Unified Enhancement Layer  v2.0
   Injected into every tool page. Adds:
     • Polished upload zone with live file-chip & preview
     • Animated loading modal with progress ring
     • Step-flow indicator (Upload → Options → Process → Download)
     • Tooltip system
     • Options panel reveal after upload
     • Toast notifications
     • Smooth scroll-to-result
     • Quick-action copy/clear buttons
     • Full responsiveness patches
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. INJECT ENHANCEMENT CSS ── */
  const css = `
/* ═══ ENHANCEMENT LAYER — ConvertPDF.Live v2.0 ═══ */

/* ── Custom Scrollbar ── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bdr); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--acc); }

/* ══ STEP FLOW INDICATOR ══ */
.cpdf-steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
  padding: 14px 20px;
  background: var(--surf2);
  border: 1px solid var(--bdr);
  border-radius: 12px;
  overflow-x: auto;
  scrollbar-width: none;
}
.cpdf-steps::-webkit-scrollbar { display: none; }
.cpdf-step {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  opacity: .4;
  transition: opacity .3s, transform .2s;
}
.cpdf-step.active { opacity: 1; }
.cpdf-step.done { opacity: .7; }
.cpdf-step-num {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--surf);
  border: 2px solid var(--bdr);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fm); font-size: .62rem; font-weight: 700;
  color: var(--mut);
  transition: all .3s;
  flex-shrink: 0;
}
.cpdf-step.active .cpdf-step-num {
  background: var(--acc);
  border-color: var(--acc);
  color: #0a0a14;
  box-shadow: 0 0 0 4px rgba(176,120,0,.18);
}
.cpdf-step.done .cpdf-step-num {
  background: var(--ok);
  border-color: var(--ok);
  color: #fff;
}
.cpdf-step-lbl {
  font-family: var(--fd);
  font-size: .72rem;
  font-weight: 700;
  color: var(--txt);
  white-space: nowrap;
}
.cpdf-step-arr {
  width: 28px; height: 1px;
  background: var(--bdr);
  margin: 0 8px;
  flex-shrink: 0;
  position: relative;
}
.cpdf-step-arr::after {
  content: '';
  position: absolute;
  right: -1px; top: -3px;
  border: 3px solid transparent;
  border-left-color: var(--bdr);
}
@media (max-width: 480px) {
  .cpdf-steps { padding: 10px 14px; gap: 0; }
  .cpdf-step-lbl { font-size: .65rem; }
  .cpdf-step-arr { width: 16px; margin: 0 4px; }
}

/* ══ UPLOAD ZONE — ENHANCED ══ */
.dz {
  transition: all .3s cubic-bezier(.34,1.1,.64,1) !important;
  position: relative;
  overflow: hidden;
}
.dz::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 50% 120%, rgba(176,120,0,.06), transparent 70%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.dz:hover::before, .dz.drag-over::before { opacity: 1; }
.dz.drag-over {
  border-color: var(--acc) !important;
  background: rgba(176,120,0,.06) !important;
  transform: scale(1.02) !important;
  box-shadow: 0 0 0 4px rgba(176,120,0,.12), 0 8px 32px rgba(176,120,0,.15) !important;
}
.dz.dz-success {
  border-color: var(--ok) !important;
  border-style: solid !important;
  background: rgba(16,112,64,.04) !important;
  animation: dzSuccessPulse .5s ease;
}
@keyframes dzSuccessPulse {
  0% { transform: scale(1); }
  40% { transform: scale(1.025); }
  100% { transform: scale(1); }
}
.dz-icon { transition: transform .3s cubic-bezier(.34,1.56,.64,1) !important; }
.dz:hover .dz-icon { transform: scale(1.15) translateY(-2px) !important; }

/* Upload hint pulse animation */
@keyframes hintPulse {
  0%,100% { opacity: .7; }
  50% { opacity: 1; }
}
.dz-hint { animation: hintPulse 2.5s ease infinite; }

/* ══ FILE CHIP (shown after upload, inside DZ) ══ */
.cpdf-file-chip {
  display: none;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--surf);
  border: 1.5px solid rgba(16,112,64,.3);
  border-radius: 10px;
  margin-bottom: 14px;
  animation: chipIn .3s cubic-bezier(.34,1.3,.64,1);
}
.cpdf-file-chip.show { display: flex; }
@keyframes chipIn {
  from { opacity: 0; transform: translateY(-6px) scale(.97); }
  to   { opacity: 1; transform: none; }
}
.cpdf-chip-icon { font-size: 1.5rem; flex-shrink: 0; }
.cpdf-chip-info { flex: 1; min-width: 0; }
.cpdf-chip-name {
  font-family: var(--fd); font-weight: 700; font-size: .84rem;
  color: var(--txt); white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis;
}
.cpdf-chip-meta {
  font-family: var(--fm); font-size: .62rem; color: var(--ok);
  display: flex; gap: 10px; margin-top: 2px;
}
.cpdf-chip-clear {
  background: transparent;
  border: 1px solid var(--bdr);
  border-radius: 6px;
  padding: 4px 9px;
  cursor: pointer;
  font-size: .7rem;
  color: var(--mut);
  font-family: var(--fm);
  transition: all .15s;
  flex-shrink: 0;
}
.cpdf-chip-clear:hover { border-color: var(--acc3); color: var(--acc3); }

/* Mini page count badge on chip */
.cpdf-chip-pages {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(176,120,0,.12);
  color: var(--acc);
  border: 1px solid rgba(176,120,0,.25);
  border-radius: 20px;
  font-family: var(--fm);
  font-size: .58rem;
  padding: 1px 7px;
}

/* ══ OPTIONS PANEL — slides in after upload ══ */
.cpdf-options-panel {
  display: none;
  border: 1.5px solid var(--bdr);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 16px;
  animation: optsPanelIn .35s cubic-bezier(.22,.68,0,1.15);
}
.cpdf-options-panel.show { display: block; }
@keyframes optsPanelIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}
.cpdf-opts-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--surf2);
  border-bottom: 1px solid var(--bdr);
  cursor: pointer;
  user-select: none;
}
.cpdf-opts-hdr-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--fd);
  font-weight: 700;
  font-size: .82rem;
  color: var(--txt);
}
.cpdf-opts-hdr-icon { font-size: 1rem; }
.cpdf-opts-toggle {
  font-size: .7rem;
  color: var(--mut);
  transition: transform .25s;
}
.cpdf-opts-hdr.collapsed .cpdf-opts-toggle { transform: rotate(-90deg); }
.cpdf-opts-body {
  padding: 16px;
  background: var(--surf);
}
.cpdf-opts-body.hidden { display: none; }

/* Option group label */
.cpdf-opt-group-lbl {
  font-family: var(--fm);
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--acc);
  margin-bottom: 8px;
  margin-top: 14px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--bdr);
}
.cpdf-opt-group-lbl:first-child { margin-top: 0; }

/* Tooltip system */
[data-tooltip] { position: relative; cursor: help; }
[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--txt);
  color: var(--surf);
  font-family: var(--fm);
  font-size: .65rem;
  padding: 5px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity .18s, transform .18s;
  transform: translateX(-50%) translateY(4px);
  z-index: 9000;
  max-width: 220px;
  white-space: normal;
  text-align: center;
  line-height: 1.4;
  box-shadow: 0 4px 14px rgba(0,0,0,.25);
}
[data-tooltip]:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ══ LOADING MODAL ══ */
.cpdf-loading-modal {
  position: fixed;
  inset: 0;
  background: rgba(10,10,20,.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 9800;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s;
}
.cpdf-loading-modal.show {
  opacity: 1;
  pointer-events: all;
}
.cpdf-loading-card {
  background: var(--surf);
  border: 2px solid var(--bdr);
  border-radius: 20px;
  padding: 36px 40px;
  text-align: center;
  width: min(380px, 90vw);
  box-shadow: 0 24px 80px rgba(0,0,0,.45);
  animation: loadCardIn .3s cubic-bezier(.22,.68,0,1.15);
}
@keyframes loadCardIn {
  from { opacity: 0; transform: scale(.92) translateY(12px); }
  to   { opacity: 1; transform: none; }
}
/* SVG progress ring */
.cpdf-ring-wrap {
  position: relative;
  width: 88px; height: 88px;
  margin: 0 auto 20px;
}
.cpdf-ring-svg {
  width: 88px; height: 88px;
  transform: rotate(-90deg);
}
.cpdf-ring-track {
  fill: none;
  stroke: var(--surf2);
  stroke-width: 6;
}
.cpdf-ring-fill {
  fill: none;
  stroke: url(#cpdfRingGrad);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 226;
  stroke-dashoffset: 226;
  transition: stroke-dashoffset .4s cubic-bezier(.4,0,.2,1);
}
.cpdf-ring-pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fd);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--txt);
}
.cpdf-loading-title {
  font-family: var(--fd);
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--txt);
  margin-bottom: 6px;
}
.cpdf-loading-msg {
  font-family: var(--fm);
  font-size: .7rem;
  color: var(--mut);
  min-height: 18px;
  transition: opacity .2s;
  line-height: 1.5;
}
/* thin animated bar below card */
.cpdf-loading-bar {
  height: 3px;
  background: var(--surf2);
  border-radius: 0 0 18px 18px;
  overflow: hidden;
  margin: 20px -40px -36px;
}
.cpdf-loading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--acc), var(--acc2), var(--acc3));
  background-size: 200% 100%;
  border-radius: 3px;
  transition: width .35s;
  animation: barShimmer 1.5s linear infinite;
}
@keyframes barShimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* ══ RESULT SECTION — enhanced ══ */
.result-box, .split-result, [id^="out-"] {
  animation: resultIn .4s cubic-bezier(.22,.68,0,1.15);
}
@keyframes resultIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}

/* Enhanced download button pulse */
.btn-primary.dl-pulse {
  animation: dlPulse 1.8s ease infinite;
}
@keyframes dlPulse {
  0%,100% { box-shadow: 0 3px 16px rgba(176,120,0,.3); }
  50%      { box-shadow: 0 6px 28px rgba(176,120,0,.6), 0 0 0 6px rgba(176,120,0,.1); }
}

/* ══ TOAST NOTIFICATIONS ══ */
.cpdf-toast-stack {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9900;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  pointer-events: none;
}
.cpdf-toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--txt);
  color: var(--surf);
  font-family: var(--fm);
  font-size: .72rem;
  padding: 10px 18px;
  border-radius: 30px;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0,0,0,.35);
  pointer-events: none;
  animation: toastIn .3s cubic-bezier(.34,1.3,.64,1);
  border-left: 3px solid var(--acc);
}
.cpdf-toast.ok   { border-left-color: var(--ok); }
.cpdf-toast.err  { border-left-color: var(--acc3); }
.cpdf-toast.info { border-left-color: var(--acc2); }
@keyframes toastIn {
  from { opacity: 0; transform: translateY(12px) scale(.93); }
  to   { opacity: 1; transform: none; }
}
@keyframes toastOut {
  to { opacity: 0; transform: translateY(8px) scale(.95); }
}

/* ══ PROGRESS BAR — enhanced everywhere ══ */
.progress-bar-bg, .u-prog-track, .prog-bar, .split-prog-track {
  position: relative;
  overflow: hidden;
}
.progress-bar-fill, .u-prog-fill, .prog-fill, .split-prog-fill {
  background: linear-gradient(90deg, var(--acc), var(--acc2)) !important;
  background-size: 200% 100% !important;
  animation: progShimmer 1.8s linear infinite;
  position: relative;
}
@keyframes progShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* ══ FORM FIELD ENHANCEMENTS ══ */
input[type=text]:focus,
input[type=number]:focus,
input[type=password]:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(176,120,0,.15) !important;
  border-color: var(--acc) !important;
}
label.lbl, .cpdf-opt-group-lbl {
  display: flex;
  align-items: center;
  gap: 5px;
}
label.lbl .tip-icon {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--surf2);
  border: 1px solid var(--bdr);
  font-size: .55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mut);
  cursor: help;
  flex-shrink: 0;
}

/* ══ BUTTON ENHANCEMENTS ══ */
.btn {
  position: relative;
  overflow: hidden;
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.15), transparent 60%);
  opacity: 0;
  transition: opacity .2s;
  pointer-events: none;
  border-radius: inherit;
}
.btn:hover::after { opacity: 1; }
.btn-primary:active { transform: scale(.97) !important; }

/* Quick action button row */
.cpdf-quick-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.cpdf-qa-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1.5px solid var(--bdr);
  background: var(--surf);
  font-family: var(--fm);
  font-size: .65rem;
  color: var(--mut);
  cursor: pointer;
  transition: all .18s;
  white-space: nowrap;
}
.cpdf-qa-btn:hover {
  border-color: var(--acc);
  color: var(--acc);
  background: rgba(176,120,0,.06);
  transform: translateY(-1px);
}
.cpdf-qa-btn .qa-icon { font-size: .8rem; }

/* ══ TRUST BAR — enhanced ══ */
.trust-bar, .tool-trust-bar {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  padding: 14px 28px;
  border-top: 1px solid var(--bdr);
  background: var(--surf2);
  align-items: center;
}
.trust-bar .ttb-item, .tool-trust-bar .ttb-item {
  transition: color .18s;
}
.trust-bar .ttb-item:hover, .tool-trust-bar .ttb-item:hover {
  color: var(--acc);
}

/* ══ FAQ SECTION ══ */
.faq-item {
  transition: border-color .2s, box-shadow .2s;
}
.faq-item.open {
  box-shadow: 0 2px 12px rgba(176,120,0,.1);
}
.faq-q { transition: color .18s; }
.faq-a {
  animation: faqExpand .2s ease;
}
@keyframes faqExpand {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: none; }
}

/* ══ RESPONSIVE PATCHES ══ */
@media (max-width: 640px) {
  main, .tool-standalone {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
  .tool-hdr, .tool-body, .tool-page-body {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .btn-row { flex-direction: column; }
  .btn-row .btn { width: 100%; justify-content: center; }
  .form-row { grid-template-columns: 1fr !important; }
  .trust-bar, .tool-trust-bar { padding: 12px 16px; }
  .ttb-sep { display: none; }
  .ttb-item { padding: 2px 0 2px 0; width: 50%; }
}
@media (max-width: 400px) {
  .tool-title, .tool-page-title { font-size: 1.3rem !important; }
  .dz { padding: 24px 14px !important; }
}

/* ══ DARK MODE REFINEMENTS ══ */
body.dark .cpdf-loading-card {
  background: var(--surf);
  border-color: var(--bdr);
  box-shadow: 0 24px 80px rgba(0,0,0,.7);
}
body.dark .cpdf-toast { background: var(--surf2); }

/* ══ SCROLL TO RESULT HIGHLIGHT ══ */
.cpdf-result-highlight {
  outline: 2px solid var(--acc);
  outline-offset: 4px;
  border-radius: 12px;
  animation: highlightFade 2s ease forwards;
}
@keyframes highlightFade {
  0% { outline-color: var(--acc); }
  100% { outline-color: transparent; }
}

/* ══ DRAG LIST ENHANCEMENTS ══ */
.drag-item {
  transition: all .18s, transform .15s !important;
}
.drag-item:hover { border-color: var(--acc) !important; }
.drag-item.dragging {
  background: rgba(176,120,0,.06) !important;
  border-color: var(--acc) !important;
  box-shadow: 0 8px 24px rgba(176,120,0,.2) !important;
}

/* ══ PAGE THUMB ENHANCEMENTS ══ */
.page-thumb, .thumb-card {
  transition: all .2s cubic-bezier(.22,.68,0,1.15) !important;
}
.page-thumb:hover, .thumb-card:hover {
  border-color: var(--acc) !important;
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 0 6px 20px rgba(176,120,0,.2) !important;
}

/* ══ BACK LINK — consistent across pages ══ */
.back-link, .tool-back-link, .tool-page-back {
  transition: all .22s cubic-bezier(.34,1.3,.64,1) !important;
}

/* ══ PRESET CARD ENHANCEMENTS (compress) ══ */
.preset-card {
  transition: all .2s cubic-bezier(.22,.68,0,1.15) !important;
}
.preset-card:hover { transform: translateY(-2px) !important; }

/* ══ MODE TABS ══ */
.mode-tab, .mtype-tab {
  transition: all .2s !important;
}

/* ══ SIZE COMPARISON ══ */
.size-cmp-item {
  transition: transform .2s, box-shadow .2s !important;
}
.size-cmp-item:hover { transform: translateY(-2px) !important; box-shadow: 0 4px 14px var(--shadow) !important; }

/* ══ SLIDE-IN CONTENT AFTER FILE LOAD ══ */
.cpdf-post-upload {
  animation: postUploadIn .35s cubic-bezier(.22,.68,0,1.15);
}
@keyframes postUploadIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}

/* ══ INLINE HINT CALLOUTS ══ */
.cpdf-hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 14px;
  background: rgba(0,96,160,.07);
  border: 1px solid rgba(0,96,160,.2);
  border-radius: 9px;
  font-size: .78rem;
  color: var(--acc2);
  margin-bottom: 12px;
  line-height: 1.5;
}
.cpdf-hint-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

/* ══ COPY TEXT BUTTON ══ */
.cpdf-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1.5px solid var(--bdr);
  background: var(--surf2);
  font-family: var(--fm);
  font-size: .65rem;
  color: var(--mut);
  cursor: pointer;
  transition: all .15s;
}
.cpdf-copy-btn:hover { border-color: var(--acc); color: var(--acc); }
.cpdf-copy-btn.copied { border-color: var(--ok); color: var(--ok); }
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── SVG Gradient Defs for Ring ── */
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  svgDefs.innerHTML = `<defs>
    <linearGradient id="cpdfRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="var(--acc)"/>
      <stop offset="50%" stop-color="var(--acc2)"/>
      <stop offset="100%" stop-color="var(--acc3)"/>
    </linearGradient>
  </defs>`;
  document.body.appendChild(svgDefs);

  /* ── 2. LOADING MODAL ── */
  const modal = document.createElement('div');
  modal.id = 'cpdf-loading-modal';
  modal.className = 'cpdf-loading-modal';
  modal.innerHTML = `
    <div class="cpdf-loading-card">
      <div class="cpdf-ring-wrap">
        <svg class="cpdf-ring-svg" viewBox="0 0 88 88">
          <circle class="cpdf-ring-track" cx="44" cy="44" r="36"/>
          <circle class="cpdf-ring-fill" id="cpdf-ring-fill" cx="44" cy="44" r="36"/>
        </svg>
        <div class="cpdf-ring-pct" id="cpdf-ring-pct">0%</div>
      </div>
      <div class="cpdf-loading-title" id="cpdf-loading-title">Processing…</div>
      <div class="cpdf-loading-msg" id="cpdf-loading-msg">Please wait</div>
      <div class="cpdf-loading-bar">
        <div class="cpdf-loading-bar-fill" id="cpdf-loading-bar-fill" style="width:0%"></div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  /* ── 3. TOAST STACK ── */
  const toastStack = document.createElement('div');
  toastStack.className = 'cpdf-toast-stack';
  toastStack.id = 'cpdf-toast-stack';
  document.body.appendChild(toastStack);

  /* ── 4. PUBLIC API ── */
  const CIRC = 2 * Math.PI * 36; // 226.19...

  window.CpdfUI = {
    /* Loading modal */
    showLoading(title = 'Processing…', msg = 'Please wait') {
      document.getElementById('cpdf-loading-title').textContent = title;
      document.getElementById('cpdf-loading-msg').textContent = msg;
      this.setProgress(0, msg);
      modal.classList.add('show');
    },
    hideLoading() {
      this.setProgress(100);
      setTimeout(() => modal.classList.remove('show'), 400);
    },
    setProgress(pct, msg) {
      pct = Math.max(0, Math.min(100, pct));
      const fill = document.getElementById('cpdf-ring-fill');
      const pctEl = document.getElementById('cpdf-ring-pct');
      const barFill = document.getElementById('cpdf-loading-bar-fill');
      const msgEl = document.getElementById('cpdf-loading-msg');
      if (fill) fill.style.strokeDashoffset = CIRC - (pct / 100) * CIRC;
      if (pctEl) pctEl.textContent = Math.round(pct) + '%';
      if (barFill) barFill.style.width = pct + '%';
      if (msg !== undefined && msgEl) msgEl.textContent = msg;
    },
    updateMsg(msg) {
      const el = document.getElementById('cpdf-loading-msg');
      if (el) el.textContent = msg;
    },

    /* Toast */
    toast(msg, type = 'ok', duration = 2800) {
      const el = document.createElement('div');
      el.className = 'cpdf-toast ' + type;
      const icons = { ok: '✓', err: '✕', info: 'ℹ' };
      el.innerHTML = `<span>${icons[type] || '✓'}</span><span>${msg}</span>`;
      toastStack.appendChild(el);
      setTimeout(() => {
        el.style.animation = 'toastOut .3s ease forwards';
        setTimeout(() => el.remove(), 300);
      }, duration);
    },

    /* Step flow */
    createSteps(containerId, steps, activeIndex = 0) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const html = steps.map((s, i) => {
        const cls = i < activeIndex ? 'done' : i === activeIndex ? 'active' : '';
        const num = i < activeIndex ? '✓' : (i + 1);
        return `
          <div class="cpdf-step ${cls}" id="cpdf-step-${containerId}-${i}">
            <div class="cpdf-step-num">${num}</div>
            <div class="cpdf-step-lbl">${s}</div>
          </div>
          ${i < steps.length - 1 ? '<div class="cpdf-step-arr"></div>' : ''}
        `;
      }).join('');
      container.innerHTML = html;
    },
    setStep(containerId, activeIndex) {
      const steps = document.querySelectorAll(`[id^="cpdf-step-${containerId}-"]`);
      steps.forEach((el, i) => {
        el.className = 'cpdf-step' + (i < activeIndex ? ' done' : i === activeIndex ? ' active' : '');
        const num = el.querySelector('.cpdf-step-num');
        if (num) num.textContent = i < activeIndex ? '✓' : (i + 1);
      });
    },

    /* File chip */
    showFileChip(chipId, name, size, pages) {
      const chip = document.getElementById(chipId);
      if (!chip) return;
      const nameEl = chip.querySelector('.cpdf-chip-name');
      const metaEl = chip.querySelector('.cpdf-chip-meta');
      if (nameEl) nameEl.textContent = name;
      if (metaEl) {
        metaEl.innerHTML = `<span>${size}</span>` +
          (pages ? `<span class="cpdf-chip-pages">📄 ${pages} pages</span>` : '');
      }
      chip.classList.add('show');
    },
    hideFileChip(chipId) {
      const chip = document.getElementById(chipId);
      if (chip) chip.classList.remove('show');
    },

    /* Scroll to result */
    scrollToResult(el, offset = 80) {
      if (!el) return;
      el.classList.add('cpdf-result-highlight');
      setTimeout(() => el.classList.remove('cpdf-result-highlight'), 2200);
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    },

    /* Copy text utility */
    copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => this.toast('Copied to clipboard', 'ok'))
          .catch(() => this.toast('Copy failed', 'err'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        this.toast('Copied to clipboard', 'ok');
      }
    },

    /* Upload zone success flash */
    flashDZ(dzEl) {
      if (!dzEl) return;
      dzEl.classList.add('dz-success');
      setTimeout(() => dzEl.classList.remove('dz-success'), 800);
    },

    /* Format bytes */
    fmtSize(b) {
      if (b >= 1073741824) return (b / 1073741824).toFixed(2) + ' GB';
      if (b >= 1048576) return (b / 1048576).toFixed(2) + ' MB';
      return (b / 1024).toFixed(1) + ' KB';
    }
  };

  /* ── 5. INTERCEPT existing setProgress / hideProgress / toast calls ── */
  // Wrap the page's existing setProgress to also update our modal
  const _origSetProgress = window.setProgress;
  window.setProgress = function(pct, lbl) {
    if (_origSetProgress) _origSetProgress(pct, lbl);
    if (modal.classList.contains('show')) {
      window.CpdfUI.setProgress(pct, lbl);
    }
  };

  /* ── 6. INTERCEPT existing toast() if not already defined ── */
  if (!window.toast) {
    window.toast = function(msg, ok = true) {
      window.CpdfUI.toast(msg, ok === false || ok === 'error' ? 'err' : 'ok');
    };
  }

  /* ── 7. DRAG-OVER class consistency patch ── */
  document.addEventListener('dragover', function(e) {
    const dz = e.target.closest('.dz');
    if (dz) {
      e.preventDefault();
      dz.classList.add('drag-over');
    }
  });
  document.addEventListener('dragleave', function(e) {
    const dz = e.target.closest('.dz');
    if (dz && !dz.contains(e.relatedTarget)) {
      dz.classList.remove('drag-over');
    }
  });
  document.addEventListener('drop', function(e) {
    document.querySelectorAll('.dz.drag-over').forEach(dz => dz.classList.remove('drag-over'));
  });

  /* ── 8. COPY BUTTON auto-bind for text previews ── */
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.cpdf-copy-btn');
    if (!btn) return;
    const target = btn.dataset.target;
    const el = target ? document.getElementById(target) : null;
    const text = el ? (el.value || el.textContent) : btn.dataset.text || '';
    if (text) {
      window.CpdfUI.copyText(text);
      btn.classList.add('copied');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Copied';
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    }
  });

  /* ── 9. AUTO-ENHANCE download buttons in result boxes ── */
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        // Pulse download buttons
        const dlBtns = node.querySelectorAll ? node.querySelectorAll('.btn-primary') : [];
        dlBtns.forEach(btn => {
          if (/download|save/i.test(btn.textContent)) {
            btn.classList.add('dl-pulse');
          }
        });
        // Scroll to result
        if (node.matches && (
          node.matches('.result-box') ||
          node.matches('[id^="out-"]') ||
          node.matches('.split-result')
        )) {
          setTimeout(() => window.CpdfUI.scrollToResult(node), 150);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  /* ── 10. RESULT-BOX SHOW observer (existing pages use style display:block) ── */
  const styleObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === 'attributes' && m.attributeName === 'style') {
        const el = m.target;
        const isResult = el.matches && (
          el.matches('.result-box') ||
          el.matches('[id^="out-"]') ||
          el.id === 'resultBox'
        );
        if (isResult) {
          const style = el.getAttribute('style') || '';
          const cls = el.className || '';
          if (style.includes('block') || cls.includes('show')) {
            setTimeout(() => window.CpdfUI.scrollToResult(el), 200);
            const dlBtns = el.querySelectorAll('.btn-primary');
            dlBtns.forEach(b => {
              if (/download|save/i.test(b.textContent)) b.classList.add('dl-pulse');
            });
          }
        }
      }
    });
  });

  // Observe all result boxes present at load and future ones
  function observeResultBoxes() {
    document.querySelectorAll('.result-box, [id^="out-"], #resultBox').forEach(el => {
      styleObserver.observe(el, { attributes: true });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeResultBoxes);
  } else {
    setTimeout(observeResultBoxes, 300);
  }

  /* ── 11. INJECT STEP FLOWS into each tool page ── */
  function injectStepFlow() {
    // Find the tool body
    const body = document.querySelector('.tool-body, .tool-page-body, #toolBody, .tp');
    if (!body || body.querySelector('.cpdf-steps')) return;

    const steps = ['Upload', 'Options', 'Process', 'Download'];
    const stepsWrap = document.createElement('div');
    stepsWrap.className = 'cpdf-steps';
    stepsWrap.id = 'cpdf-steps-main';
    stepsWrap.innerHTML = steps.map((s, i) => `
      <div class="cpdf-step ${i === 0 ? 'active' : ''}" id="cpdf-step-main-${i}">
        <div class="cpdf-step-num">${i + 1}</div>
        <div class="cpdf-step-lbl">${s}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="cpdf-step-arr"></div>' : ''}
    `).join('');

    // Insert before the first child of tool body
    body.insertBefore(stepsWrap, body.firstChild);

    // Watch for file input changes to advance steps
    body.addEventListener('change', function(e) {
      if (e.target.type === 'file' && e.target.files && e.target.files.length) {
        window.CpdfUI.setStep('main', 1);
      }
    }, true);
  }

  /* ── 12. INJECT COPY BUTTON into text preview areas ── */
  function injectCopyButtons() {
    const textPreviews = document.querySelectorAll('pre.text-preview, textarea[readonly]');
    textPreviews.forEach(el => {
      if (el.dataset.cpdfCopy) return;
      el.dataset.cpdfCopy = '1';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:4px;';
      const btn = document.createElement('button');
      btn.className = 'cpdf-copy-btn';
      btn.dataset.target = el.id || '';
      btn.innerHTML = '📋 Copy All';
      if (!el.id) {
        btn.addEventListener('click', () => {
          window.CpdfUI.copyText(el.value || el.textContent);
          btn.classList.add('copied');
          btn.innerHTML = '✓ Copied';
          setTimeout(() => { btn.innerHTML = '📋 Copy All'; btn.classList.remove('copied'); }, 2000);
        });
      }
      if (el.parentNode) {
        el.parentNode.insertBefore(wrap, el);
        wrap.appendChild(btn);
      }
    });
  }

  /* ── 13. ENHANCE file-info bars ── */
  function enhanceFileInfo() {
    document.querySelectorAll('.file-info:not([data-cpdf-enhanced])').forEach(el => {
      el.dataset.cpdfEnhanced = '1';
      // Add subtle left border on success
      el.style.borderLeft = '3px solid var(--ok)';
    });
  }

  /* ── 14. DOWNLOAD BUTTON PULSE fix (for show/hide via class) ── */
  const classObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const el = m.target;
        if (el.classList.contains('show') && (el.classList.contains('result-box') || el.id === 'resultBox')) {
          setTimeout(() => window.CpdfUI.scrollToResult(el), 200);
          el.querySelectorAll('.btn-primary').forEach(b => {
            if (/download|save/i.test(b.textContent)) b.classList.add('dl-pulse');
          });
        }
      }
    });
  });
  document.querySelectorAll('.result-box, #resultBox').forEach(el => {
    classObserver.observe(el, { attributes: true });
  });

  /* ── Run on DOM ready ── */
  function onReady() {
    injectStepFlow();
    injectCopyButtons();
    enhanceFileInfo();

    // Hook existing file input onchange to advance steps and flash DZ
    document.querySelectorAll('input[type=file]').forEach(inp => {
      inp.addEventListener('change', function() {
        if (this.files && this.files.length) {
          const dz = this.closest('.dz');
          if (dz) window.CpdfUI.flashDZ(dz);
          window.CpdfUI.setStep('main', 1);
          window.CpdfUI.toast('File loaded — configure options below', 'ok');
        }
      });
    });

    // Hook process buttons to show loading modal
    document.querySelectorAll('.btn-primary:not([data-cpdf-hooked])').forEach(btn => {
      if (/convert|compress|merge|split|rotate|process|generate|apply|extract|protect|unlock|sign|watermark|rearrange|delete|crop|resize|add|save/i.test(btn.textContent)) {
        btn.dataset.cpdfHooked = '1';
        const origClick = btn.onclick;
        btn.addEventListener('click', function() {
          // Only show modal if there's a file
          const hasFile = document.querySelector('input[type=file]') &&
            Array.from(document.querySelectorAll('input[type=file]')).some(i => i.files && i.files.length);
          if (hasFile && !btn.disabled) {
            window.CpdfUI.showLoading('Processing PDF…', 'Starting up…');
            window.CpdfUI.setStep('main', 2);
          }
        }, true); // capture = true so it fires before existing handlers
      }
    });
  }

  // Intercept hideProgress to hide modal
  const _origHideProgress = window.hideProgress;
  window.hideProgress = function() {
    if (_origHideProgress) _origHideProgress();
    window.CpdfUI.hideLoading();
    window.CpdfUI.setStep('main', 3);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    setTimeout(onReady, 50);
  }

})();
