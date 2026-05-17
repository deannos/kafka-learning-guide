# Contributing to KafkaGuide

Thank you for your interest in improving KafkaGuide. Contributions of all kinds are welcome — content corrections, UX improvements, accessibility fixes, new pages, and bug reports.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Improvements](#suggesting-improvements)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Content Style Guide](#content-style-guide)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards.

---

## Reporting Bugs

Use the [Bug Report template](https://github.com/deannos/kafka-learning-guide/issues/new?template=bug_report.md) and include:

- Which page / browser / OS
- Steps to reproduce
- What you expected vs what happened
- Screenshot if relevant

---

## Suggesting Improvements

Use the [Feature Request template](https://github.com/deannos/kafka-learning-guide/issues/new?template=feature_request.md). Check [existing issues](https://github.com/deannos/kafka-learning-guide/issues) first to avoid duplicates.

---

## Development Setup

No build tooling required. The site is pure HTML/CSS/JS.

```bash
git clone https://github.com/deannos/kafka-learning-guide.git
cd kafka-learning-guide

# Serve locally (any of these)
python3 -m http.server 8080
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## Making Changes

### File Structure

```
kafka-learning-guide/
├── css/style.css        # All styles — single file, sections marked with comments
├── js/app.js            # All JS — sidebar, search, theme, TOC, copy, etc.
├── js/search-data.js    # Search index — update when adding/changing content
├── *.html               # One file per page — sidebar HTML is duplicated across pages
└── favicon.svg
```

### Key Conventions

- **No build step** — do not introduce npm/webpack/bundlers
- **No external runtime dependencies** — icons are inline SVG (Lucide), no CDN icon fonts
- **CSS custom properties** — all colours/spacing use variables defined at `:root`. Do not hardcode hex values in component rules
- **Lucide icons only** — use SVG paths from [lucide.dev](https://lucide.dev). No emoji, no Unicode symbols as icons
- **One CSS file** — add styles to the appropriate section in `style.css`, marked with `/* ── Section Name ── */` comments
- **Sidebar HTML is duplicated** — when adding a new nav item, add it to all 11 `.html` files

### Adding a New Page

1. Copy an existing page (e.g. `cheatsheet.html`) as a starting point
2. Update `<title>`, `<meta name="description">`, breadcrumb text, `header-tag`, and page content
3. Add the nav icon SVG for the new page in `js/app.js` → `NAV_ICONS` object
4. Add the nav item `<a>` to the sidebar in all 11 existing HTML files
5. Add an entry to `js/search-data.js` for the new page sections
6. Update `README.md` content table

---

## Pull Request Guidelines

- **One concern per PR** — a content fix, a UX change, and a new feature should be separate PRs
- **Reference the issue** — include `Closes #N` or `Relates to #N` in the PR description
- **Test on mobile** — use browser DevTools device emulation at 375px and 768px
- **Test both themes** — verify dark and light mode
- **No commented-out code** — clean up before opening PR
- **Update CHANGELOG.md** — add your change under `## [Unreleased]`

---

## Content Style Guide

- Write in second person ("you") for instructional content
- Use sentence case for headings (not Title Case)
- Code examples should be minimal — show only what is needed to illustrate the concept
- Kafka-specific terms: always capitalise `Kafka`, `ZooKeeper`, `KRaft`, `Schema Registry`
- Prefer `monospace` for all config keys, CLI flags, and code values inline
