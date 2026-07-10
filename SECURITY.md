# Security Policy

## Scope

This repository (`ambrosia-dev`) is the static documentation portal for Ambrosia POS, built with Docusaurus. It contains no user data, authentication, or payment logic.

- **Vulnerabilities in the Ambrosia POS application itself** (the client, server, or Electron app) should be reported against the main **[olympus-btc/ambrosia](https://github.com/olympus-btc/ambrosia)** repository, following [its security policy](https://github.com/olympus-btc/ambrosia/blob/main/SECURITY.md).
- **Vulnerabilities specific to this site** are in scope here, for example:
  - A vulnerable dependency flagged by `npm audit` or GitHub's dependency review.
  - An XSS or injection vector through MDX rendering or user-supplied content.
  - Exposed secrets or credentials committed to this repository.
  - Build or deployment pipeline issues (GitHub Actions, GitHub Pages).

## Active Development

Ambrosia POS, including this documentation portal, is currently in an active development phase. We greatly appreciate the community's support in keeping the project secure.

## Reporting a Vulnerability

Please report security vulnerabilities privately via email to:

**contact@ambrosiapay.com**

Do not open a public issue for security reports. We are committed to investigating all reports and will do our best to address any issues promptly.

A more formal vulnerability reporting process will be established in the future. We appreciate your understanding and cooperation in helping us keep Ambrosia POS secure.
