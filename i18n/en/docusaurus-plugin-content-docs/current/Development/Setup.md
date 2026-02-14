# Contributing to Ambrosia POS

Thank you for your interest in contributing to Ambrosia POS! We love community collaboration. Whether you're fixing a bug, adding a feature, improving documentation, or helping with community support, your help is welcome to build the future of Bitcoin payments.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Development Resources](#development-resources)
- [Community](#community)

## Code of Conduct

This project adheres to our **[Code of Conduct](https://github.com/olympus-btc/ambrosia/blob/main/CODE_OF_CONDUCT.md)**. By participating, you are expected to uphold this code. Please report unacceptable behavior to **contact@ambrosiapay.com**.

## Getting Started

### Prerequisites

Before you start, ensure you have the necessary dependencies installed. Please refer to our **[Project Dependencies Guide](https://github.com/olympus-btc/ambrosia/blob/main/doc/dependencies.md)** for detailed instructions on installing:

- **Java 21 (JDK)**
- **Node.js**
- **Docker**
- **Gradle**

### First-time Contributors

If you're new to open source, check out:
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- 🔍 **Review our code** on [GitHub](https://github.com/olympus-btc/ambrosia)
- 🐛 **Report bugs** or suggest improvements
- 💡 **Contribute ideas** for new features
- 🧪 **Test the beta** and report issues
- 📝 **Documentation**: 
    Improve our Docs, README, or code comments
    
    - [Development](https://github.com/olympus-btc/ambrosia-dev)
    - [Tutorial](https://github.com/olympus-btc/ambrosia-tutorial)
- 🍴 **Fork the repository** and send your Pull Requests (PRs)

### Before You Start

1. **Search existing issues** to avoid duplicates.
2. **Discuss major changes** by opening an issue first.

## Development Setup

A clean, structured guide to run Ambrosia‑POS locally with native tools.

### Requirements:
- SDKMAN (official: https://sdkman.io/)
  ```bash
  curl -s "https://get.sdkman.io" | bash
  source "$HOME/.sdkman/bin/sdkman-init.sh"
  ```
- Java 21 (Temurin):
  ```bash
  sdk list java
  sdk install java 21-tem
  java -version
  ```
- Gradle:
  ```bash
  sdk install gradle
  gradle -v
  ```
- Node.js >= 18 and npm.
- phoenixd (Lightning):
  ```bash
  curl -fsSL https://raw.githubusercontent.com/olympus-btc/ambrosia-dev/master/scripts/install.sh | bash -s -- --yes
  ```

### Quick check
```bash
java -version && gradle -v | head -n1 && node -v && npm -v
```

### Setup Steps

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ambrosia.git
   cd ambrosia
   ```

3. **Step 1 · Start phoenixd**
   After installation, ensure the service is running and `~/.phoenix` is initialized as per the Mastering phoenixd guide.

4. **Step 2 · Server / Backend (Kotlin/Ktor)**:
   ```bash
   cd server
   ./gradlew run    # API on :9154
   ```
   - Tests: `./gradlew test`

5. **Step 3 · Client / Frontend (Next.js)**:
   ```bash
   cd client
   npm install
   npm run dev      # web on :3000
   ```
   - Lint: `npm run lint`
   - Tests: `npm test`

6. **Step 4 · Electron Setup (Desktop)**:
   ```bash
   cd electron
   npm install
   npm run dev
   ```
   *(See [electron/README.md](electron/README.md) for more details)*

### Local endpoints
- API: http://127.0.0.1:9154
- Web: http://127.0.0.1:3000

### Troubleshooting
:::tip Tips
- Use the `./gradlew` wrapper to avoid PATH issues.
- If a port is busy, change `3000`/`9154` or stop the conflicting process.
- phoenixd: ensure it’s running and `~/.phoenix` contains expected config.
:::

## Coding Standards

### Style Guide

- **Client**: Follows standard React/Next.js practices. Use `npm run lint` to check for style issues.
- **Server**: Follows standard Kotlin conventions.
- **Commits**: Write meaningful commit messages.

### Commit Message Format

We encourage using [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description
```

Examples:
- `feat(auth): add login support`
- `fix(server): resolve null pointer exception`
- `docs(readme): update installation steps`

## Testing

### Client (Frontend)

Inside `client/`:
```bash
npm test
```

### Server (Backend)

Inside `server/`:
```bash
./gradlew test
```

### E2E Tests

The project includes end-to-end (E2E) tests for the server API written in Python.
For detailed instructions, see the **[E2E Tests README](server/e2e_tests_py/README.md)**.

## Pull Request Process

### How to submit a Pull Request?

1. **Create a branch** for your change (`git checkout -b feature/amazing-feature`).
2. **Make your modifications** and commit them.
3. **Run tests** to ensure no regressions.
4. **Push to your fork** and submit a Pull Request to the main repository.

### Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated if needed

## Issue Reporting

- **Bug Reports**: Include clear steps to reproduce, expected vs actual behavior, and environment details.
- **Feature Requests**: Describe the proposed feature, use case, and motivation.

## Development Resources

### Project Structure

*   `client/` - Frontend application (Next.js/React).
*   `server/` - Backend application (Kotlin/Ktor).
*   `electron/` - Desktop wrapper (Electron).
*   `doc/` - Project documentation.
*   `scripts/` - Utility and installation scripts.

### Useful Commands

**Server:**
```bash
./gradlew run   # Run server
./gradlew jar   # Build JAR
```

**Client:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
```

## Community

**Stay connected!**

Follow us on our social media and join the community of developers and entrepreneurs who are building the future of Bitcoin payments.
