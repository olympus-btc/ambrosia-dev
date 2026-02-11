# Ambrosia-Dev Context

## Project Overview
This repository (`ambrosia-dev`) contains the source code for the **Ambrosia-POS** documentation website and landing page. It is built using **Docusaurus**, a static site generator based on React.

**Ambrosia-POS** is an open-source Point of Sale (POS) system designed to accept Bitcoin and Lightning Network payments, aiming to provide a seamless, low-fee, and censorship-resistant payment solution for businesses.

### Key Technologies
*   **Framework:** [Docusaurus v3](https://docusaurus.io/)
*   **UI Library:** [React v19](https://react.dev/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Styling:** CSS (Custom styles in `src/css/custom.css`), Tailwind CSS (Pending setup)
*   **Localization:** i18n support (Spanish default, English available)

## Directory Structure
*   `docs/`: Contains the main documentation (API, Usage, Configuration).
*   `blog/`: Contains blog posts (Project updates, articles).
*   `team/`: Contains team member profiles (managed as a blog plugin instance).
*   `src/`: Source code for custom pages (like the homepage) and components.
    *   `src/pages/index.js`: The main landing page implementation.
    *   `src/css/custom.css`: Global custom styles.
*   `i18n/`: Localization files for supported languages.
*   `static/`: Static assets (images, logos, etc.).
*   `docusaurus.config.js`: Main configuration file for the site (plugins, presets, theme config).
*   `sidebars.js`: Definition of the documentation sidebar structure.

## Building and Running

### Prerequisites
*   Node.js (>=18.0)
*   Yarn (preferred) or npm

### Commands
*   **Install Dependencies:**
    ```bash
    yarn install
    ```
*   **Start Local Development Server:**
    ```bash
    yarn start
    ```
    Opens the site at `http://localhost:3000`. Hot reloading is enabled.
*   **Build for Production:**
    ```bash
    yarn build
    ```
    Generates static files in the `build/` directory.
*   **Serve Production Build:**
    ```bash
    yarn serve
    ```
*   **Deploy:**
    ```bash
    # With SSH
    USE_SSH=true yarn deploy
    # Without SSH
    GIT_USER=<username> yarn deploy
    ```

## Development Conventions
*   **Documentation:** Written in Markdown/MDX. Follow the structure in `docs/` or `blog/`.
*   **Components:** React components are located in `src/`.
*   **Styling:** Use CSS modules for component-specific styles (e.g., `index.module.css`) and `custom.css` for global overrides.
*   **Internationalization:** Ensure content is translatable. Use the `<Translate>` component or `i18n` folders.
*   **Team Profiles:** Add new team members in `team/authors.yml` and create a corresponding Markdown file in `team/` if they have a dedicated page.

## Notes
*   **Tailwind CSS:** The project is currently being configured to support Tailwind CSS.
*   **Repo:** The main application logic seems to be separate from this documentation repo (likely `olympus-btc/ambrosia`).
