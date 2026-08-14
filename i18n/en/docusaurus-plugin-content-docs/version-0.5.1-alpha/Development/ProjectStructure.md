# Project Structure

This section describes the directory structure of the main **Ambrosia POS** repository, a comprehensive system for restaurants and retail with Bitcoin integration.

```text
ambrosia/
├── .github/                # CI/CD Workflows (Linter, Tests, E2E)
├── client/                 # Next.js Frontend (React 19, Tailwind CSS)
│   ├── __tests__/          # Client unit tests
│   ├── public/             # Static assets (SVG, images)
│   └── src/                # Frontend source code
│       ├── app/            # Next.js App Router (pages and layouts)
│       ├── components/     # Reusable React components
│       ├── hooks/          # Custom React Hooks
│       ├── i18n/           # Internationalization configuration
│       ├── lib/            # Shared libraries and configurations
│       ├── modules/        # App-specific modules
│       └── services/       # Services for API calls
├── doc/                    # Additional documentation (installation, proposal)
├── electron/               # Desktop wrapper for the application
│   ├── scripts/            # Build scripts for different platforms
│   ├── services/           # System-side logic (Backend, Phoenixd)
│   └── utils/              # Health utilities and port management
├── imgs/                   # Visual assets and project icons
├── scripts/                # Utility scripts (install, uninstall, run)
├── server/                 # Kotlin Backend (Ktor Framework)
│   ├── app/                # Main server application
│   │   └── src/            # Source code (Kotlin/Java)
│   ├── e2e_tests_py/       # End-to-End tests in Python (Pytest)
│   └── gradle/             # Gradle Wrapper configuration
├── docker-compose.yml      # Service orchestration (Server, Client, Phoenixd)
├── Makefile                # Task automation for build and execution
└── README.md               # Main project documentation
```

:::info Main Repository
You can find the full source code in our [official GitHub repository](https://github.com/olympus-btc/ambrosia).
:::
