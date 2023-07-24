const latestVersion = `3.23.0  🚀`

module.exports = {
  "title": "DOCUMENTATION",
  "tagline": "Genesis Documentation",
  "url": "https://netcoregenesis.com",
  "baseUrl": "/documentation/",
  "organizationName": "Net Core Genesis",
  "projectName": "documentation",
  "baseUrlIssueBanner": true,
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
  ],
  "stylesheets": [],
  "favicon": "img/favicon.ico",
  "customFields": {
    "users": [
      {
        "caption": "User1",
        "image": "/img/undraw_open_source.svg",
        "infoLink": "https://www.facebook.com",
        "pinned": true
      }
    ]
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": false,
          "showLastUpdateTime": true,
          "path": "docs",
          "sidebarPath": require.resolve('./sidebars.json'),
          "lastVersion": 'current',
          versions: {
            current: {
              label: latestVersion,
            },
          },
        },
        blog: {
          routeBasePath: 'posts',
          blogTitle: 'Posts',
          blogDescription: 'Net Core Genesis Posts',
        },
        "theme": {
          "customCss": [require.resolve("./src/css/customTheme.css")]
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": null,
      "logo": {
        "src": "img/Genesis_Logo_white_bg.png",
        "href": "/documentation/docs/",
      },
      "style": "dark",
      "items": [
        {
          to: 'posts',
          label: 'Release Notes',
          position: 'left'
        },
        {
          "href": "https://www.NetCoreGenesis.com",
          "label": "Official Web Site",
          "position": "right",
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          href: '#',
          dropdownActiveClassDisabled: true,
        },
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 Net Core Genesis",
      "logo": {
        "src": "img/Genesis_Logo_white_bg.png",
        "href": "https://www.NetCoreGenesis.com",
      },
      "style": "dark",
    },
    "algolia": {
      "apiKey": "2c4678c8f347c62247fa1504393b96a9",
      "indexName": "netcoregenesis",
      "algoliaOptions": {}
    },
    "prism": {
      "additionalLanguages": ['csharp'],
    },
  }
}