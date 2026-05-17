# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Active  |

## Scope

KafkaGuide is a **static documentation site** with no backend, no database, no authentication, and no user data collection. The attack surface is limited to:

- Client-side JavaScript (`js/app.js`, `js/search-data.js`)
- HTML content rendered in the browser
- GitHub Actions CI/CD pipeline (`.github/workflows/deploy.yml`)

## Reporting a Vulnerability

If you discover a security issue (e.g. XSS via search result rendering, dependency in the CI pipeline with a known CVE, or a content injection vector), please **do not open a public GitHub Issue**.

Instead:

1. Go to the [Security tab](https://github.com/deannos/kafka-learning-guide/security) on GitHub
2. Click **"Report a vulnerability"**
3. Provide a clear description, reproduction steps, and potential impact

You will receive an acknowledgement within **72 hours** and a resolution or status update within **14 days**.

## Known Non-Issues

The following are intentional design decisions and are **not** security vulnerabilities:

- **No HTTPS enforcement at the repo level** — HTTPS is enforced by GitHub Pages
- **Inline SVGs** — all SVG icons are static, authored strings with no user input
- **`localStorage` usage** — stores only `kguide-theme` (dark/light) and `kguide-sidebar` (expanded/collapsed). No PII.
- **Search index** — `search-data.js` is a static JS file with hardcoded strings, not user-generated content
