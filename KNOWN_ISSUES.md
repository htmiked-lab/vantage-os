# KNOWN_ISSUES — BDC + Sales Manager OS Questionnaire

**As of**: v0.1-fix commit
**Location**: `bdc-sales-manager-os-questionnaire/`

## Current state

v0.1-fix restores page load after the aborted v0.2 attempt. The HTML had been
rebuilt with v0.2 scaffolding but `app.js` was still v0.1 and referenced a
removed element (`#exportBtn`), throwing on load. That single break is fixed;
v0.2 behavior is deferred.

## What works (v0.1 + fix)

- 9 modules, 75 prompts render correctly
- Answer persistence to localStorage, autosave (180ms debounce)
- Word count under each textarea
- Module expand/collapse, state persisted
- Expand All / Collapse All / Reset buttons
- Top-bar progress bar + "answered / total" counter
- Markdown export modal (top + bottom "Markdown (raw)" buttons both work)
- Copy to clipboard, download .md
- Ctrl/Cmd+S opens markdown export
- Esc closes modal

## What's dormant (HTML present, no JS behavior)

These elements render but do nothing until v0.2 ships their handlers:

- **Hamburger nav button** (`#burger`) — visible on mobile, no click handler.
  Sidenav stays hidden on mobile as a result.
- **Sidenav** (`aside#sidenav`) — renders on desktop but is empty because
  `#sideLinks` is never populated. Shows only the "▸ Sections" header.
- **Resume banner** (`#resumeBanner`) — CSS `display: none` by default; never
  toggled. No session-resume prompt on load.
- **Nav scrim** (`#navScrim`) — unused overlay for the mobile drawer.
- **"Export for Consulting Proposal"** button (`[data-export="proposal"]`) —
  shows `alert("Export mode coming in v0.2 — use 'Markdown (raw)' for now.")`
  instead of throwing. Same for "Export for Course Outline"
  (`[data-export="course"]`).

## v0.2 features not yet implemented

Full list from the v0.2 spec still outstanding:

1. Export for Consulting Proposal (third-person prose, exec summary template)
2. Export for Course Outline (module → lesson → teaching points)
3. Skip warning inline popups when leaving a section
4. Auto-capitalize first letter of each answer
5. Filler word stripping on blur (um, uh, like, you know, basically)
6. Under-30-word yellow "worth expanding?" flag
7. Over-200-word auto-append depth trigger prompt
8. Session resume banner wired up
9. Section completion % on sidenav links (red/yellow/green)
10. Mobile hamburger toggle JS
11. iOS textarea auto-grow

CSS classes for most of these (`.q-skipwarn`, `.q-depth`, `.thin`,
`.mod-pct.red/yellow/green`, `.sn-pct.*`, `.banner.show`, `.sidenav.open`)
are already present in `index.html` — v0.2 just needs to add them via JS.

## Verification performed

- `node --check app.js` → OK
- `node --check questions.js` → OK
- DOM-reference audit: all 13 `getElementById` calls in app.js map to IDs
  present in index.html; no null refs at load.
- Headless browser check: **NOT performed** — no jsdom, puppeteer, or
  chromium available in this environment. Visual/interactive verification
  required before shipping to users.

## Manual verification checklist

Open `bdc-sales-manager-os-questionnaire/index.html` in Chrome and confirm:

- [ ] No red errors in DevTools Console on load
- [ ] Typing in a textarea updates the word count below it
- [ ] Refreshing the page restores your answers
- [ ] Progress bar moves when you fill in answers
- [ ] Clicking "Markdown (raw)" (top or bottom) opens export modal
- [ ] Clicking "Consulting Proposal" or "Course Outline" shows the
      "coming in v0.2" alert (expected — not a bug)
- [ ] Module headers expand/collapse on click
- [ ] Mobile view (< 860px): page is still usable even though the
      hamburger button does nothing yet
