import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const url = 'https://johnnyreilly.github.io/reillys-on-tour/';
const title = 'johnnyreilly';
// const tagline = "Hi! I'm John Reilly - welcome! ❤️🌻";
const description =
  "This is John Reilly's travel(ish) blog.";
const sameAs = [
  'https://github.com/johnnyreilly',
  'https://fosstodon.org/@johnny_reilly',
  'https://twitter.com/johnny_reilly',
  'https://bsky.app/profile/johnnyreilly.com',
  'https://dev.to/johnnyreilly',
  'https://app.daily.dev/johnnyreilly',
  'https://stackoverflow.com/users/761388/john-reilly',
  'https://blog.logrocket.com/author/johnreilly/',
  'https://www.reddit.com/user/johnny_reilly',
  'https://uk.linkedin.com/in/johnnyreilly',
];

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': 'https://johnnyreilly.github.io/reillys-on-tour/',
      '@type': 'WebSite',
      url,
      name: title,
      description,

      copyrightHolder: {
        '@id': 'https://johnnyreilly.com/about',
      },
      publisher: {
        '@id': 'https://johnnyreilly.com/about',
      },

      // potentialAction: {
      //   '@type': 'SearchAction',
      //   target: {
      //     '@type': 'EntryPoint',
      //     urlTemplate: 'https://johnnyreilly.com/search?q={search_term_string}',
      //   },
      //   'query-input': 'required name=search_term_string',
      // },
      inLanguage: 'en-UK',
    },

    {
      '@id': 'https://johnnyreilly.com/about',
      '@type': 'Person',
      name: 'John Reilly',
      alternateName: 'Johnny Reilly',
      image: {
        '@type': 'ImageObject',
        inLanguage: 'en-UK',
        '@id': 'https://johnnyreilly.com/about#image',
        url: 'https://johnnyreilly.com/img/profile.jpg',
        contentUrl: 'https://johnnyreilly.com/img/profile.jpg',
        width: 200,
        height: 200,
        caption: 'John Reilly',
      },

      description:
        'John is an Open Source Software Engineer working on TypeScript, Azure, React, Node.js, .NET and more. As well as writing code, John is a speaker at meetups, one of the founders of the TS Congress conference, and the author of the history of Definitely Typed, which he worked on in the early days of TypeScript.',
      url: 'https://johnnyreilly.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Twickenham',
        addressLocality: 'London',
        addressCountry: 'United Kingdom',
      },
      email: 'johnny_reilly@hotmail.com',
      birthPlace: 'Bristol',
      sameAs,
    },

    {
      '@id': 'https://johnnyreilly.com/about#organization',
      '@type': ['Organization', 'Brand'],
      url,
      name: title,
      description,
      logo: {
        '@type': 'ImageObject',
        inLanguage: 'en-UK',
        '@id': 'https://johnnyreilly.com/#logo',
        url: 'https://johnnyreilly.com/img/profile.jpg',
        contentUrl: 'https://johnnyreilly.com/img/profile.jpg',
        width: 200,
        height: 200,
        caption: 'John Reilly',
      },
      image: { '@id': 'https://johnnyreilly.com/#logo' },
      sameAs,
    },
  ],
};

const config: Config = {
  title: 'Reillys on Tour',
  tagline: 'The adventures of the Reilly family',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://johnnyreilly.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/reillys-on-tour/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'johnnyreilly', // Usually your GitHub org/user name.
  projectName: 'reillys-on-tour', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-NDP5T131PG',
          anonymizeIP: true,
        },
        docs: false,
        blog: {
          archiveBasePath: '/blog',
          blogTitle: 'Reillys on Tour',
          blogDescription: 'The adventures of the Reilly family',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          postsPerPage: 20,
          path: './blog',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/johnnyreilly/reillys-on-tour/tree/main/edit/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    // Structured data in the form of JSON-LD - inspired by https://moz.com/blog/writing-structured-data-guide
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(siteStructuredData),
    },
  ],

  themeConfig: {
    metadata: [
      { name: 'robots', content: 'max-image-preview:large' },
      // This would become <meta name="robots" content="max-image-preview:large"> in the generated HTML
    ],
  // Replace with your project's social card
    image: 'img/profile.jpg',
    navbar: {
      title: 'Reillys on Tour',
      logo: {
        alt: 'Profile picture of John Reilly',
        src: 'img/profile-64x64.jpg',
        width: 32,
        height: 32,
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {to: '/blog', label: 'Archive', position: 'left'},
        {
          href: 'https://github.com/johnnyreilly/reillys-on-tour',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} John Reilly. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
