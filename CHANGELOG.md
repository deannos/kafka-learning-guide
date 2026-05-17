# Changelog

All notable changes to KafkaGuide are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased] — v1.1

> Issues tracked and planned — see [GitHub Issues](https://github.com/deannos/kafka-learning-guide/issues)

### Accessibility
- #1 Add skip-to-content link for keyboard navigation
- #4 Sidebar nav items missing `:focus-visible` ring
- #10 Light mode `--text-muted` fails WCAG AA contrast
- #12 Breadcrumb missing `aria-current="page"`
- #21 Add `prefers-reduced-motion` support across all animations
- #22 Interview question tap targets: enforce `min-height: 56px`

### UX — Critical
- #2 Back-to-top button touch target too small (36×36px → 44×44px)
- #3 Search modal shows no fallback UI when `SEARCH_INDEX` is empty

### UX — High
- #5 Interview accordion chevron has no CSS transition (snaps vs 0.3s content)
- #6 Interview answer expansion sluggish due to `max-height: 2000px` trick
- #7 Sidebar collapse label crowds icon — stagger opacity/width transitions
- #8 Cards grid overflows on mobile (`cards-grid-2` uses `minmax(400px)`)
- #9 TOC has no sticky positioning — scrolls off screen

### UX — Medium
- #11 Copy button "Copied!" feedback too long (2000ms → 1400ms)
- #13 Section divider `margin: 52px` too aggressive on mobile
- #14 Quiz option buttons have no visual `:disabled` state
- #15 Config/cheatsheet tables not readable on mobile
- #16 Hero stat labels unreadable at 12px fixed on small phones
- #17 Mobile sidebar backdrop missing `cursor: pointer`

### UX — Polish
- #18 Sticky header should compress on scroll
- #19 TOC intersection observer misses fast scroll (`rootMargin -80%`)
- #20 Tall code blocks give no scroll indicator (no bottom gradient)
- #23 `pre` scrollbar too thin (5px → 7px)
- #24 No visual feedback when async clipboard write is in-flight

---

## [1.0.0] — 2026-05-17

Initial public release of the KafkaGuide Developer Portal.

### Added
- **11-page static site** covering the full Kafka learning journey
  - `index.html` — Introduction & event streaming fundamentals
  - `roadmap.html` — Structured learning path (Beginner → Expert)
  - `architecture.html` — Brokers, partitions, replication, KRaft vs ZooKeeper
  - `advanced.html` — EOS, log compaction, Kafka Streams, Schema Registry, Connect
  - `security.html` — TLS, SASL, ACLs, network isolation, audit logging
  - `performance.html` — Producer/consumer/broker tuning, compression, JVM
  - `usecases.html` — Event sourcing, CDC, microservices, real-time analytics
  - `comparison.html` — Kafka vs RabbitMQ, Pulsar, Kinesis, Redis Streams
  - `operations.html` — Monitoring, consumer lag, scaling, rebalancing runbook
  - `cheatsheet.html` — CLI commands and configuration quick reference
  - `interview.html` — 13 interview Q&A with expandable answers (Beginner → Advanced)

- **Global features**
  - Cmd+K / Ctrl+K search modal with 60+ indexed sections
  - Dark / Light theme toggle, persisted via `localStorage`
  - Collapsible sidebar with icon-only collapsed state (desktop)
  - Mobile-responsive sidebar with backdrop overlay
  - Auto-generated Table of Contents on pages with 2+ headings
  - Back-to-top button with smooth scroll
  - Syntax-highlighted code blocks with one-click copy
  - Fade-in scroll animations via `IntersectionObserver`
  - Mermaid.js diagrams (architecture, roadmap pages)

- **Design system**
  - Dark-first design with full light mode support
  - CSS custom properties for all colours, spacing, and typography
  - Lucide icon set (SVG, inline) — no icon font dependency
  - Google Fonts: Outfit (UI) + DM Mono (code)
  - Responsive grid layouts (`cards-grid`, `cards-grid-2`, `cards-grid-3`)

- **CI/CD**
  - GitHub Actions workflow for automated GitHub Pages deployment on push to `master`

- **Repository**
  - `README.md` with project overview, features table, getting started, and structure
  - `CHANGELOG.md` (this file)
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
  - GitHub Issue templates (bug report, feature request)
  - GitHub Pull Request template

### Fixed (pre-release polish)
- Collapsed sidebar icons centred correctly — `nav-badge` changed from `visibility: hidden` to `display: none` to prevent layout offset
- Active nav item `::before` accent bar hidden in collapsed state for cleaner icon-only view
- Sidebar collapse button moved from bottom to top (below logo, above nav) for consistent discoverability
- Interview accordion toggle replaced `›` text character with Lucide `ChevronRight` SVG for proper alignment
- Operations page Backup & DR card icons replaced emoji with Lucide SVGs (`RefreshCw`, `Cloud`, `Camera`)
- Mobile sidebar toggle replaced `☰` Unicode with Lucide `Menu` SVG across all pages
- Back-to-top `↑` replaced with Lucide `ArrowUp` SVG
- Copy button replaced text-only `COPY` with Lucide `Copy`/`Check` icon + label

[Unreleased]: https://github.com/deannos/kafka-learning-guide/compare/v1.0...HEAD
[1.0.0]: https://github.com/deannos/kafka-learning-guide/releases/tag/v1.0
