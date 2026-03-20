/* ═══════════════════════════════════════════════════════════════
   ConvertPDF.Live — Unified Header
   Single source of truth for header HTML, CSS, theme, and nav JS.
   Injected into every page via <script src="./header.js"></script>
   placed immediately before </body>.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. INJECT HEADER CSS ── */
  var css = `
/* ═══ UNIFIED HEADER STYLES ═══ */
.u-hdr {
  background: var(--surf);
  border-bottom: 2px solid var(--acc);
  padding: 0;
  height: 58px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 600;
  box-shadow: 0 2px 14px var(--shadow, rgba(0,0,0,.10));
  transition: background .3s, border-color .3s;
}
.u-hdr-inner {
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 18px;
}
/* Logo */
.u-logo {
  font-family: var(--fd, 'Syne', sans-serif);
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--acc, #b07800);
  letter-spacing: -.02em;
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity .2s;
}
.u-logo:hover { opacity: .8; }
.u-logo span { color: var(--txt, #1a1a2e); }

/* Nav */
.u-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: nowrap;
}
@media(max-width: 800px) { .u-nav { display: none; } }

.u-nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.u-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  background: transparent;
  font-family: var(--fd, 'Syne', sans-serif);
  font-size: .75rem;
  font-weight: 700;
  color: var(--mut, #4a4a6a);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: color .18s, background .18s;
  letter-spacing: .01em;
}
.u-nav-link:hover,
.u-nav-item:hover > .u-nav-link {
  color: var(--acc, #b07800);
  background: rgba(176,120,0,.10);
}
/* Active nav link */
.u-nav-link.u-active {
  color: var(--acc, #b07800);
  background: rgba(176,120,0,.13);
  box-shadow: inset 0 -2px 0 var(--acc, #b07800);
}
body.light .u-nav-link.u-active {
  color: #c8880a;
  background: rgba(200,136,10,.11);
  box-shadow: inset 0 -2px 0 #c8880a;
}
.u-nav-arr {
  font-size: .5rem;
  opacity: .6;
  transition: transform .2s;
  pointer-events: none;
}
.u-nav-item:hover > .u-nav-link .u-nav-arr,
.u-nav-item.dd-open > .u-nav-link .u-nav-arr {
  transform: rotate(180deg);
}

/* Dropdown */
.u-nav-dd {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--surf, #fff);
  border: 1.5px solid var(--bdr, #c4c6d8);
  border-radius: 14px;
  padding: 16px;
  min-width: 420px;
  box-shadow: 0 16px 50px rgba(0,0,0,.28);
  display: none;
  z-index: 700;
  transition: background .3s;
  animation: uDdIn .18s ease;
}
@keyframes uDdIn {
  from { opacity:0; transform:translateY(6px); }
  to   { opacity:1; transform:translateY(0); }
}
.u-dd-right > .u-nav-dd { left: auto; right: 0; }
.u-nav-dd.open { display: block; }
body.dark .u-nav-dd {
  background: #16162a;
  border-color: #2e2e4e;
  box-shadow: 0 16px 50px rgba(0,0,0,.55);
}
body.light .u-nav-dd {
  background: #fff;
  border-color: #c4c6d8;
}

.u-ndd-title {
  font-family: var(--fm, 'Space Mono', monospace);
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--acc, #b07800);
  margin-bottom: 8px;
  margin-top: 12px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--bdr, #c4c6d8);
}
.u-ndd-title:first-child { margin-top: 0; }
body.light .u-ndd-title { color: #c8880a; }

.u-ndd-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  gap: 4px;
  margin-bottom: 4px;
}
.u-ndd-grid-2 {
  grid-template-columns: 1fr 1fr;
}

.u-ndd-item {
  display: block;
  padding: 7px 10px;
  border-radius: 7px;
  font-family: var(--fb, 'DM Sans', sans-serif);
  font-size: .74rem;
  color: var(--txt, #1a1a2e);
  text-decoration: none;
  transition: background .14s, color .14s, padding-left .14s, box-shadow .14s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid transparent;
}
.u-ndd-item:hover {
  background: rgba(176,120,0,.13);
  color: var(--acc, #b07800);
  padding-left: 14px;
  box-shadow: inset 3px 0 0 var(--acc, #b07800);
}
/* Active item in dropdown (current page) */
.u-ndd-item.u-active {
  background: rgba(176,120,0,.15);
  color: var(--acc, #b07800);
  border-color: rgba(176,120,0,.25);
  font-weight: 700;
}
body.light .u-ndd-item { color: #1a1400; }
body.light .u-ndd-item:hover { background: rgba(200,136,10,.09); color: #c8880a; }
body.light .u-ndd-item.u-active { background: rgba(200,136,10,.12); color: #c8880a; }

/* New badge on nav item */

@keyframes uPulseBadge {
  0%,100%{opacity:1;transform:scale(1)}
  50%{opacity:.8;transform:scale(1.06)}
}

/* Right controls */
.u-hdr-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.u-theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 20px;
  border: 1.5px solid var(--bdr, #c4c6d8);
  background: transparent;
  cursor: pointer;
  transition: background .2s, border-color .2s;
}
.u-theme-toggle:hover {
  background: var(--surf2, #e8eaf0);
  border-color: var(--acc, #b07800);
}
.u-toggle-track {
  width: 42px;
  height: 24px;
  border-radius: 12px;
  background: var(--surf2, #e8eaf0);
  border: 2px solid var(--bdr, #c4c6d8);
  position: relative;
  transition: background .3s, border-color .3s;
  flex-shrink: 0;
  pointer-events: none;
}
body.light .u-toggle-track {
  background: var(--acc, #b07800);
  border-color: var(--acc, #b07800);
}
.u-toggle-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform .3s;
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  pointer-events: none;
}
body.light .u-toggle-thumb { transform: translateX(18px); }
.u-toggle-lbl {
  font-family: var(--fm, 'Space Mono', monospace);
  font-size: .68rem;
  font-weight: 600;
  color: var(--txt, #1a1a2e);
  white-space: nowrap;
  pointer-events: none;
}

/* Mobile hamburger */
.u-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 7px;
  border: 1.5px solid var(--bdr, #c4c6d8);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: border-color .2s;
}
.u-hamburger:hover { border-color: var(--acc, #b07800); }
.u-hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--txt, #1a1a2e);
  border-radius: 2px;
  transition: transform .25s, opacity .25s;
}
@media(max-width: 800px) { .u-hamburger { display: flex; } }

/* Mobile nav drawer */
.u-mobile-nav {
  display: none;
  position: fixed;
  top: 58px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--surf, #fff);
  z-index: 599;
  overflow-y: auto;
  padding: 16px;
  border-top: 1px solid var(--bdr, #c4c6d8);
  animation: uSlideDown .22s ease;
}
@keyframes uSlideDown {
  from { opacity:0; transform:translateY(-8px); }
  to   { opacity:1; transform:translateY(0); }
}
.u-mobile-nav.open { display: block; }
.u-mobile-section { margin-bottom: 18px; }
.u-mobile-section-title {
  font-family: var(--fm, 'Space Mono', monospace);
  font-size: .58rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--acc, #b07800);
  padding: 6px 0;
  border-bottom: 1px solid var(--bdr, #c4c6d8);
  margin-bottom: 8px;
}
.u-mobile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.u-mobile-item {
  display: block;
  padding: 9px 12px;
  background: var(--surf2, #e8eaf0);
  border: 1px solid var(--bdr, #c4c6d8);
  border-radius: 8px;
  font-family: var(--fb, 'DM Sans', sans-serif);
  font-size: .76rem;
  color: var(--txt, #1a1a2e);
  text-decoration: none;
  transition: border-color .15s, color .15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.u-mobile-item:hover,
.u-mobile-item.u-active {
  border-color: var(--acc, #b07800);
  color: var(--acc, #b07800);
}
`;

  var styleEl = document.createElement('style');
  styleEl.id = 'unified-header-css';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── 2. DETERMINE ACTIVE PAGE ── */
  var page = location.pathname.split('/').pop() || 'index.html';

  // Map filename → which top-level nav tab is "active"
  var NAV_MAP = {
    'index.html':            'home',
    'pdf-merge.html':        'merge',
    'pdf-split.html':        'split',
    'pdf-compress.html':     'compress',
    'pdf-header-footer.html':'headerfooter',
    'pdf-to-word.html':      'convert',
    'pdf-to-excel.html':     'convert',
    'pdf-to-powerpoint.html':'convert',
    'pdf-to-text.html':      'convert',
    'pdf-to-images.html':    'convert',
    'word-to-pdf.html':      'convert',
    'excel-to-pdf.html':     'convert',
    'image-to-pdf.html':     'convert',
    'powerpoint-to-pdf.html':'convert',
    'text-to-pdf.html':      'convert',
    'pdf-edit.html':         'more',
    'pdf-rotate.html':       'more',
    'pdf-watermark.html':    'more',
    'pdf-sign.html':         'more',
    'pdf-page-numbers.html': 'more',
    'pdf-delete-pages.html': 'more',
    'pdf-crop-resize.html':  'more',
    'pdf-unlock.html':       'more',
    'protect.html':          'more',
    'rearrange-pdf.html':    'more',
  };
  var activeTab = NAV_MAP[page] || '';

  function isActive(tab) {
    return activeTab === tab ? ' u-active' : '';
  }
  function itemActive(file) {
    return page === file ? ' u-active' : '';
  }

  /* ── 3. BUILD HEADER HTML ── */
  var html = `
<header class="u-hdr" id="unified-header">
  <div class="u-hdr-inner">

    <!-- LOGO -->
    <a href="./index.html" class="u-logo">Convert<span>PDF</span>.Live</a>

    <!-- DESKTOP NAV -->
    <nav class="u-nav" id="u-nav-desktop">

      <!-- ALL TOOLS -->
      <div class="u-nav-item">
        <button class="u-nav-link${isActive('all')}" data-tab="all">🗂️ All Tools <span class="u-nav-arr">▾</span></button>
        <div class="u-nav-dd" style="min-width:600px" data-dd="all">
          <div class="u-ndd-title">⭐ Convert From PDF</div>
          <div class="u-ndd-grid">
            <a href="./pdf-to-word.html"        class="u-ndd-item${itemActive('pdf-to-word.html')}">📝 PDF → Word</a>
            <a href="./pdf-to-excel.html"       class="u-ndd-item${itemActive('pdf-to-excel.html')}">📊 PDF → Excel</a>
            <a href="./pdf-to-powerpoint.html"  class="u-ndd-item${itemActive('pdf-to-powerpoint.html')}">📑 PDF → PowerPoint</a>
            <a href="./pdf-to-text.html"        class="u-ndd-item${itemActive('pdf-to-text.html')}">📄 PDF → Text</a>
            <a href="./pdf-to-images.html"      class="u-ndd-item${itemActive('pdf-to-images.html')}">🎨 PDF → Images</a>
          </div>
          <div class="u-ndd-title">▼ Convert To PDF</div>
          <div class="u-ndd-grid">
            <a href="./word-to-pdf.html"        class="u-ndd-item${itemActive('word-to-pdf.html')}">📝 Word → PDF</a>
            <a href="./excel-to-pdf.html"       class="u-ndd-item${itemActive('excel-to-pdf.html')}">📊 Excel → PDF</a>
            <a href="./image-to-pdf.html"       class="u-ndd-item${itemActive('image-to-pdf.html')}">🖼️ Image → PDF</a>
            <a href="./powerpoint-to-pdf.html"  class="u-ndd-item${itemActive('powerpoint-to-pdf.html')}">📑 PowerPoint → PDF</a>
            <a href="./text-to-pdf.html"        class="u-ndd-item${itemActive('text-to-pdf.html')}">📄 Text → PDF</a>
          </div>
          <div class="u-ndd-title">📂 Organise &amp; Edit</div>
          <div class="u-ndd-grid">
            <a href="./pdf-merge.html"          class="u-ndd-item${itemActive('pdf-merge.html')}">📂 Merge PDF</a>
            <a href="./pdf-split.html"          class="u-ndd-item${itemActive('pdf-split.html')}">✂️ Split PDF</a>
            <a href="./pdf-compress.html"       class="u-ndd-item${itemActive('pdf-compress.html')}">🗜️ Compress PDF</a>
            <a href="./pdf-rotate.html"         class="u-ndd-item${itemActive('pdf-rotate.html')}">🔄 Rotate PDF</a>
            <a href="./pdf-delete-pages.html"   class="u-ndd-item${itemActive('pdf-delete-pages.html')}">🗑️ Delete Pages</a>
            <a href="./rearrange-pdf.html"      class="u-ndd-item${itemActive('rearrange-pdf.html')}">🔀 Rearrange Pages</a>
            <a href="./pdf-edit.html"           class="u-ndd-item${itemActive('pdf-edit.html')}">✏️ Edit PDF</a>
            <a href="./protect.html"            class="u-ndd-item${itemActive('protect.html')}">🔒 Protect Files</a>
            <a href="./pdf-watermark.html"      class="u-ndd-item${itemActive('pdf-watermark.html')}">💧 Watermark</a>
            <a href="./pdf-unlock.html"         class="u-ndd-item${itemActive('pdf-unlock.html')}">🔓 Unlock</a>
            <a href="./pdf-sign.html"           class="u-ndd-item${itemActive('pdf-sign.html')}">📸 Sign / Stamp</a>
            <a href="./pdf-page-numbers.html"   class="u-ndd-item${itemActive('pdf-page-numbers.html')}">🔢 Page Numbers</a>
            <a href="./pdf-header-footer.html"  class="u-ndd-item${itemActive('pdf-header-footer.html')}">📋 Header &amp; Footer</a>
            <a href="./pdf-crop-resize.html"    class="u-ndd-item${itemActive('pdf-crop-resize.html')}">✂️ Crop / Resize</a>
          </div>
        </div>
      </div>

      <!-- CONVERT PDF -->
      <div class="u-nav-item">
        <button class="u-nav-link${isActive('convert')}" data-tab="convert">🔄 Convert <span class="u-nav-arr">▾</span></button>
        <div class="u-nav-dd" style="min-width:500px" data-dd="convert">
          <div class="u-ndd-title">⭐ Convert From PDF</div>
          <div class="u-ndd-grid">
            <a href="./pdf-to-word.html"        class="u-ndd-item${itemActive('pdf-to-word.html')}">📝 PDF → Word (.docx)</a>
            <a href="./pdf-to-excel.html"       class="u-ndd-item${itemActive('pdf-to-excel.html')}">📊 PDF → Excel (.xlsx)</a>
            <a href="./pdf-to-powerpoint.html"  class="u-ndd-item${itemActive('pdf-to-powerpoint.html')}">📑 PDF → PowerPoint</a>
            <a href="./pdf-to-text.html"        class="u-ndd-item${itemActive('pdf-to-text.html')}">📄 PDF → Text (.txt)</a>
            <a href="./pdf-to-images.html"      class="u-ndd-item${itemActive('pdf-to-images.html')}">🎨 PDF → Images (.jpg)</a>
          </div>
          <div class="u-ndd-title">▼ Convert To PDF</div>
          <div class="u-ndd-grid">
            <a href="./word-to-pdf.html"        class="u-ndd-item${itemActive('word-to-pdf.html')}">📝 Word → PDF</a>
            <a href="./excel-to-pdf.html"       class="u-ndd-item${itemActive('excel-to-pdf.html')}">📊 Excel → PDF</a>
            <a href="./image-to-pdf.html"       class="u-ndd-item${itemActive('image-to-pdf.html')}">🖼️ Image → PDF</a>
            <a href="./powerpoint-to-pdf.html"  class="u-ndd-item${itemActive('powerpoint-to-pdf.html')}">📑 PowerPoint → PDF</a>
            <a href="./text-to-pdf.html"        class="u-ndd-item${itemActive('text-to-pdf.html')}">📄 Text → PDF</a>
          </div>
        </div>
      </div>

      <!-- MERGE -->
      <a href="./pdf-merge.html" class="u-nav-link${isActive('merge')}">📂 Merge</a>

      <!-- SPLIT -->
      <a href="./pdf-split.html" class="u-nav-link${isActive('split')}">✂️ Split</a>

      <!-- COMPRESS -->
      <a href="./pdf-compress.html" class="u-nav-link${isActive('compress')}">🗜️ Compress</a>

      <!-- HEADER & FOOTER (New) -->
      <div class="u-nav-item">
        <a href="./pdf-header-footer.html" class="u-nav-link${isActive('headerfooter')}" style="flex-direction:column;align-items:flex-start;gap:2px;padding:5px 12px">
          <span>📋 Header &amp; Footer</span>
        </a>
      </div>

      <!-- MORE -->
      <div class="u-nav-item u-dd-right">
        <button class="u-nav-link${isActive('more')}" data-tab="more">⋯ More <span class="u-nav-arr">▾</span></button>
        <div class="u-nav-dd u-ndd-grid-2" data-dd="more">
          <div class="u-ndd-title" style="grid-column:1/-1">✏️ Edit &amp; Enhance</div>
          <div class="u-ndd-grid u-ndd-grid-2" style="grid-column:1/-1">
            <a href="./pdf-edit.html"           class="u-ndd-item${itemActive('pdf-edit.html')}">✏️ Edit PDF</a>
            <a href="./protect.html"            class="u-ndd-item${itemActive('protect.html')}">🔒 Protect Files</a>
            <a href="./pdf-watermark.html"      class="u-ndd-item${itemActive('pdf-watermark.html')}">💧 Watermark PDF</a>
            <a href="./pdf-unlock.html"         class="u-ndd-item${itemActive('pdf-unlock.html')}">🔓 Unlock PDF</a>
            <a href="./pdf-sign.html"           class="u-ndd-item${itemActive('pdf-sign.html')}">📸 Sign / Stamp</a>
            <a href="./pdf-page-numbers.html"   class="u-ndd-item${itemActive('pdf-page-numbers.html')}">🔢 Page Numbers</a>
            <a href="./pdf-header-footer.html"  class="u-ndd-item${itemActive('pdf-header-footer.html')}">📋 Header &amp; Footer</a>
            <a href="./pdf-crop-resize.html"    class="u-ndd-item${itemActive('pdf-crop-resize.html')}">✂️ Crop / Resize</a>
            <a href="./pdf-rotate.html"         class="u-ndd-item${itemActive('pdf-rotate.html')}">🔄 Rotate PDF</a>
            <a href="./pdf-delete-pages.html"   class="u-ndd-item${itemActive('pdf-delete-pages.html')}">🗑️ Delete Pages</a>
            <a href="./rearrange-pdf.html"      class="u-ndd-item${itemActive('rearrange-pdf.html')}">🔀 Rearrange Pages</a>
          </div>
        </div>
      </div>

    </nav>

    <!-- RIGHT CONTROLS -->
    <div class="u-hdr-controls">
      <button class="u-theme-toggle" id="u-theme-btn" aria-label="Toggle dark/light theme" title="Toggle theme">
        <span class="u-toggle-track"><span class="u-toggle-thumb"></span></span>
        <span class="u-toggle-lbl" id="u-theme-lbl">☀️ Light</span>
      </button>
      <button class="u-hamburger" id="u-hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</header>

<!-- MOBILE NAV DRAWER -->
<div class="u-mobile-nav" id="u-mobile-nav">
  <div class="u-mobile-section">
    <div class="u-mobile-section-title">⭐ Convert From PDF</div>
    <div class="u-mobile-grid">
      <a href="./pdf-to-word.html"       class="u-mobile-item${itemActive('pdf-to-word.html')}">📝 PDF → Word</a>
      <a href="./pdf-to-excel.html"      class="u-mobile-item${itemActive('pdf-to-excel.html')}">📊 PDF → Excel</a>
      <a href="./pdf-to-powerpoint.html" class="u-mobile-item${itemActive('pdf-to-powerpoint.html')}">📑 PDF → PPT</a>
      <a href="./pdf-to-text.html"       class="u-mobile-item${itemActive('pdf-to-text.html')}">📄 PDF → Text</a>
      <a href="./pdf-to-images.html"     class="u-mobile-item${itemActive('pdf-to-images.html')}">🎨 PDF → Images</a>
    </div>
  </div>
  <div class="u-mobile-section">
    <div class="u-mobile-section-title">▼ Convert To PDF</div>
    <div class="u-mobile-grid">
      <a href="./word-to-pdf.html"        class="u-mobile-item${itemActive('word-to-pdf.html')}">📝 Word → PDF</a>
      <a href="./excel-to-pdf.html"       class="u-mobile-item${itemActive('excel-to-pdf.html')}">📊 Excel → PDF</a>
      <a href="./image-to-pdf.html"       class="u-mobile-item${itemActive('image-to-pdf.html')}">🖼️ Image → PDF</a>
      <a href="./powerpoint-to-pdf.html"  class="u-mobile-item${itemActive('powerpoint-to-pdf.html')}">📑 PPT → PDF</a>
      <a href="./text-to-pdf.html"        class="u-mobile-item${itemActive('text-to-pdf.html')}">📄 Text → PDF</a>
    </div>
  </div>
  <div class="u-mobile-section">
    <div class="u-mobile-section-title">📂 Organise &amp; Edit</div>
    <div class="u-mobile-grid">
      <a href="./pdf-merge.html"         class="u-mobile-item${itemActive('pdf-merge.html')}">📂 Merge</a>
      <a href="./pdf-split.html"         class="u-mobile-item${itemActive('pdf-split.html')}">✂️ Split</a>
      <a href="./pdf-compress.html"      class="u-mobile-item${itemActive('pdf-compress.html')}">🗜️ Compress</a>
      <a href="./pdf-rotate.html"        class="u-mobile-item${itemActive('pdf-rotate.html')}">🔄 Rotate</a>
      <a href="./pdf-delete-pages.html"  class="u-mobile-item${itemActive('pdf-delete-pages.html')}">🗑️ Delete Pages</a>
      <a href="./rearrange-pdf.html"     class="u-mobile-item${itemActive('rearrange-pdf.html')}">🔀 Rearrange</a>
      <a href="./pdf-edit.html"          class="u-mobile-item${itemActive('pdf-edit.html')}">✏️ Edit PDF</a>
      <a href="./protect.html"           class="u-mobile-item${itemActive('protect.html')}">🔒 Protect</a>
      <a href="./pdf-watermark.html"     class="u-mobile-item${itemActive('pdf-watermark.html')}">💧 Watermark</a>
      <a href="./pdf-unlock.html"        class="u-mobile-item${itemActive('pdf-unlock.html')}">🔓 Unlock</a>
      <a href="./pdf-sign.html"          class="u-mobile-item${itemActive('pdf-sign.html')}">📸 Sign</a>
      <a href="./pdf-page-numbers.html"  class="u-mobile-item${itemActive('pdf-page-numbers.html')}">🔢 Page Numbers</a>
      <a href="./pdf-header-footer.html" class="u-mobile-item${itemActive('pdf-header-footer.html')}">📋 Header &amp; Footer</a>
      <a href="./pdf-crop-resize.html"   class="u-mobile-item${itemActive('pdf-crop-resize.html')}">✂️ Crop / Resize</a>
    </div>
  </div>
</div>
`;

  /* ── 4. INJECT HEADER INTO DOM ── */
  // Insert before the first child of body (or as first element)
  document.body.insertAdjacentHTML('afterbegin', html);

  /* ── 5. THEME SYSTEM ── */
  // Read saved theme or default to light
  var savedTheme = (function() {
    try { return localStorage.getItem('cpdf-theme') || 'light'; } catch(e) { return 'light'; }
  })();

  function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    var lbl = document.getElementById('u-theme-lbl');
    if (lbl) lbl.textContent = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
    try { localStorage.setItem('cpdf-theme', theme); } catch(e) {}
  }

  // Apply on load
  applyTheme(savedTheme);

  // Toggle on click — only attach once
  var themeBtn = document.getElementById('u-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var isDark = document.body.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  // Override any existing page-level toggleTheme so it syncs with ours
  window.toggleTheme = function() {
    var isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  };

  /* ── 6. DESKTOP DROPDOWN NAV ── */
  var timers = {};
  var navItems = document.querySelectorAll('#unified-header .u-nav-item');
  navItems.forEach(function(item, i) {
    var dd = item.querySelector('.u-nav-dd');
    if (!dd) return;
    function openDD() {
      clearTimeout(timers[i]);
      document.querySelectorAll('#unified-header .u-nav-dd.open').forEach(function(o) {
        if (o !== dd) o.classList.remove('open');
      });
      dd.classList.add('open');
    }
    function closeDD() {
      timers[i] = setTimeout(function() { dd.classList.remove('open'); }, 280);
    }
    item.addEventListener('mouseenter', openDD);
    item.addEventListener('mouseleave', closeDD);
    dd.addEventListener('mouseenter', function() { clearTimeout(timers[i]); });
    dd.addEventListener('mouseleave', closeDD);
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#unified-header .u-nav-item')) {
      document.querySelectorAll('#unified-header .u-nav-dd.open').forEach(function(d) {
        d.classList.remove('open');
      });
    }
  });

  /* ── 7. MOBILE HAMBURGER ── */
  var hamburger = document.getElementById('u-hamburger');
  var mobileNav = document.getElementById('u-mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      // Animate hamburger lines to X
      var spans = hamburger.querySelectorAll('span');
      if (!isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#unified-header') && !e.target.closest('#u-mobile-nav')) {
        mobileNav.classList.remove('open');
        var spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

})();
