import type { Media } from '../payload-types';

export const vacationImage: Omit<Media, 'id' | 'createdAt' | 'updatedAt'> = {
  alt: 'Vacation',
  caption: [
    {
      children: [
        {
          text: 'Photo by ',
        },
        {
          type: 'link',
          linkType: 'custom',
          url: 'https://unsplash.com/@clemono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          newTab: true,
          children: [
            {
              text: 'Clem Onojeghuo',
            },
          ],
        },
        {
          text: ' on ',
        },
        {
          type: 'link',
          linkType: 'custom',
          url: 'https://unsplash.com/photos/three-coconut-trees-on-brown-sand-near-body-of-water-during-daytime-7rrgPPljqYU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          newTab: true,
          children: [
            {
              text: 'Unsplash',
            },
          ],
        },
        {
          text: '.',
        },
      ],
    },
  ],
};
