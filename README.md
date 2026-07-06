# Ambrosia POS Docs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Documentation portal for [Ambrosia POS](https://github.com/olympus-btc/ambrosia), a self-sovereign, Bitcoin/Lightning-native Point of Sale system. Live at **[dev.ambrosiapay.com](https://dev.ambrosiapay.com/)**.

This site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> **Note:** Search is not available in dev mode. To test search, run `npm run build && npm run serve` instead.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Contributing

Contributions are welcome! Please read our **[Contributing Guide](CONTRIBUTING.md)** and **[Code of Conduct](CODE_OF_CONDUCT.md)** before opening a PR or issue.
