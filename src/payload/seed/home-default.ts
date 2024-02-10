import type { Page } from '../payload-types';

export const home: Partial<Page> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'The Intranet',
    description: 'An open-source website built with Payload and Next.js.',
    // @ts-expect-error
    image: '{{IMAGE_1}}',
  },
  hero: {
    type: 'highImpact',
    richText: [
      {
        children: [
          {
            text: 'The Intranet',
          },
        ],
        type: 'h1',
      },
      {
        children: [
          {
            text: 'Welcome to the intranet! ',
          },
          {
            type: 'link',
            linkType: 'custom',
            url: '/login',
            children: [
              {
                text: 'Login to view employee only content.',
              },
            ],
          },
          {
            text: ' The code for this site is completely open-source and can be found ',
          },
          {
            type: 'link',
            linkType: 'custom',
            url: 'https://github.com/j-riv',
            newTab: true,
            children: [
              {
                text: 'here',
              },
            ],
          },
          {
            text: '.',
          },
        ],
        type: 'large-body',
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            // @ts-expect-error
            value: '{{POSTS_PAGE_ID}}',
          },
          label: 'All posts',
          url: '',
        },
      },
      {
        link: {
          type: 'reference',
          appearance: 'secondary',
          reference: {
            relationTo: 'pages',
            // @ts-expect-error
            value: '{{PROJECTS_PAGE_ID}}',
          },
          label: 'All projects',
          url: '',
        },
      },
    ],
    // @ts-expect-error
    media: '{{IMAGE_1}}',
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'Recent posts',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'posts',
      categories: [],
    },
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'Recent projects',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'projects',
      categories: [],
    },
  ],
};
