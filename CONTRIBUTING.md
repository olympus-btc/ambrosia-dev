# Contributing to Ambrosia POS Docs

Thank you for your interest in contributing to the Ambrosia POS documentation portal! This repository (`ambrosia-dev`) holds the Docusaurus site that documents the Ambrosia POS API, the `phoenixd` integration, and developer guides. If you're looking to contribute to the POS application itself (client, server, or Electron app), see **[olympus-btc/ambrosia](https://github.com/olympus-btc/ambrosia)** instead.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Content Conventions](#content-conventions)
- [Internationalization (i18n)](#internationalization-i18n)
- [Versioning](#versioning)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Other Ambrosia Repositories](#other-ambrosia-repositories)

## Code of Conduct

This project adheres to our **[Code of Conduct](CODE_OF_CONDUCT.md)**. By participating, you are expected to uphold this code. Please report unacceptable behavior to **contact@ambrosiapay.com**.

## Getting Started

### Prerequisites

- **Node.js** (>= 24, see `engines` in `package.json`)
- **npm**

### First-time Contributors

If you're new to open source, check out:
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

## How to Contribute

- 🐛 **Report bugs**: broken links, typos, outdated instructions, rendering issues.
- 📝 **Improve docs**: clarify existing pages, add missing endpoints, fix examples.
- 🌐 **Help with translations**: the site is bilingual (Spanish/English) — see [Internationalization](#internationalization-i18n).
- 💡 **Suggest new sections or guides** you think are missing.

### Before You Start

1. **Search existing issues** to avoid duplicates.
2. **Discuss major restructuring** (new sidebar sections, navigation changes) by opening an issue first.

## Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ambrosia-dev.git
   cd ambrosia-dev
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the dev server**:
   ```bash
   npm start
   ```
   Opens `http://localhost:3000` with live reload.

   > **Note:** Search is not available in dev mode. To test search, run `npm run build && npm run serve` instead.

## Content Conventions

- Documentation pages live under `docs/` and are written in **MDX** (Markdown + React components).
- Blog posts live under `blog/`.
- Homepage/landing page sections are modular React components under `src/components/`.
- Styling uses **Tailwind CSS** (`tailwind.config.js`); avoid adding large custom CSS blocks to `src/css/custom.css` when a Tailwind utility will do.
- Use `lucide-react` for icons, for consistency with the rest of the site.

## Internationalization (i18n)

The site supports Spanish (`es`, the default/authored locale) and English (`en`).

- Write new documentation directly in Spanish under `docs/`. English translations live under `i18n/en/docusaurus-plugin-content-docs/current/`.
- UI strings (navbar, buttons, etc.) go in `i18n/en/code.json`.
- Run `bash scripts/find_unused_translations.sh` to find stale/unused keys in `code.json`.
- **Avoid running `npm run write-translations` without `--locale en`** — it creates an unneeded `i18n/es/` folder (Spanish is authored directly, not extracted). Even with `--locale en`, it strips the hand-written `description` fields from `i18n/en/code.json`. Prefer editing the i18n JSON files by hand.

## Versioning

Docs are versioned using Docusaurus's native versioning:

- `docs/` (labeled "Next 🚧") is where in-progress documentation for the upcoming release is written.
- `versioned_docs/version-X.Y.Z/` holds frozen documentation for a released product version — only edit these to backport a fix, not to add new content.

When cutting a new version, use `npm run docusaurus docs:version <version>` and update `lastVersion` in `docusaurus.config.js`.

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description
```

Examples:
- `docs(api): document new webhook payload fields`
- `fix(i18n): correct broken English translation key`
- `chore(deps): bump docusaurus to 3.10.2`

## Pull Request Process

1. **Create a branch** for your change (`git checkout -b docs/amazing-improvement`).
2. **Make your changes** and commit them.
3. **Run `npm run build`** to make sure the site still builds cleanly.
4. **Push to your fork** and open a Pull Request against `development`.

### Checklist

- [ ] Content is accurate and, where applicable, translated (or a translation gap is called out in the PR)
- [ ] `npm run build` succeeds
- [ ] No broken internal links or images
- [ ] Documentation is updated if behavior described elsewhere changed

## Issue Reporting

- **Documentation bugs**: use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) — include the affected page URL and locale.
- **Feature requests**: use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).
- **POS application bugs**: report them on [olympus-btc/ambrosia](https://github.com/olympus-btc/ambrosia/issues) instead.

## Other Ambrosia Repositories

- [olympus-btc/ambrosia](https://github.com/olympus-btc/ambrosia) — the POS application (client, server, Electron app).
- [olympus-btc/ambrosia-tutorial](https://github.com/olympus-btc/ambrosia-tutorial) — step-by-step tutorial project.

## Community

Follow us on our social media and join the community of developers and entrepreneurs building the future of Bitcoin payments.
