import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DSO Dev2Dev Portaal',
  tagline: 'Documentatie voor Ontwikkelaars',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://dso-devs.github.io',
  baseUrl: '/',

  organizationName: 'dso-devs', // Usually your GitHub org/user name.
  projectName: 'dso-devs.github.io', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/dso-devs/dso-devs.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/dso-devs/dso-devs.github.io/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'DSO Dev2Dev Portaal',
      logo: {
        alt: 'DSO Dev2Dev Portaal',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://github.com/dso-devs/dso-devs.github.io',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://omgevingswet.overheid.nl/home',
          label: 'Omgevingsloket',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://community.developer.overheid.nl/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'Informatiepunt Leefomgeving',
              href: 'https://iplo.nl/',
            },
            {
              label: 'API Register',
              href: 'https://apis.developer.overheid.nl/apis?thema=dso',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DSO-LV | OSvD | TBO Kadaster`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
