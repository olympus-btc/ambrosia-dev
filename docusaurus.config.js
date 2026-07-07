// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ambrosia-POS",
  tagline: "The best experience POS with BTC",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://dev.ambrosiapay.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "olympus-btc", // Usually your GitHub org/user name.
  projectName: "ambrosia-dev", // Usually your repo name.
  onBrokenLinks: "throw",
  trailingSlash: true,
  
  markdown: {
    format: "mdx",
    mermaid: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/olympus-btc/ambrosia/tree/main/docs/api",
          lastVersion: "0.5.1-alpha",
          versions: {
            current: {
              label: "Next 🚧",
              path: "next",
              banner: "unreleased",
            },
            "0.5.1-alpha": {
              label: "v0.5.1-alpha",
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          blogSidebarTitle: "Entradas Recientes",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["es", "en"],
        indexBlog: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "team",
        routeBasePath: "team",
        path: "./team",
        blogTitle: "Nuestro Equipo",
        blogDescription: "Conoce a nuestro increíble equipo",
        blogSidebarCount: 0,
        postsPerPage: "ALL",
        showReadingTime: false,
        feedOptions: {
          type: null,
        },
      },
    ],
    function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: ' ',
        logo: {
          alt: "Ambrosia Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "apiSidebar",
            position: "left",
            label: "API",
          },
          {
            type: "docSidebar",
            sidebarId: "phoenixSidebar",
            position: "left",
            label: "Phoenix",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/team", label: "Equipo", position: "left" },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          { type: "localeDropdown", position: "right" },
          {
            href: "https://github.com/olympus-btc/ambrosia",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Recursos",
            items: [
              {
                label: "Tutorial",
                href: "https://tutorial.ambrosiapay.com/",
              },
              {
                label: "Página Principal",
                href: "https://ambrosiapay.com/en",
              },
              {
                label: "GitHub",
                href: "https://github.com/olympus-btc/ambrosia",
              },
              {
                label: "Issues",
                href: "https://github.com/olympus-btc/ambrosia/issues",
              },
              {
                label: "Contribuir",
                href: "https://github.com/olympus-btc/ambrosia/blob/main/CONTRIBUTING.md",
              },
            ],
          },
          {
            title: "Comunidad",
            items: [
              {
                label: "Nostr",
                href: "https://nosta.me/npub1flqcduq8q9rtqen4axufyqjngkml3kdsn4q7tgexldl2lut68k5qag4pt8?t=black",
              },
              {
                label: "X (Twitter)",
                href: "https://x.com/AmbrosiaPoS",
              },
              {
                label: "Discord",
                href: "https://discord.gg/ZXk2hsRpm2",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ambrosia-POS. Open Source under MIT License.`,
      },
      prism: {
        theme: prismThemes.oceanicNext,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
