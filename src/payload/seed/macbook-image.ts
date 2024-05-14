import type { Media } from '../payload-types';

export const macbookImage: Omit<Media, 'id' | 'createdAt' | 'updatedAt'> = {
  alt: 'MacBook Pro on a desk',
  caption: [
    {
      children: [
        {
          text: 'Photo by ',
        },
        {
          type: 'link',
          linkType: 'custom',
          url: 'https://unsplash.com/@emilep?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          newTab: true,
          children: [
            {
              text: 'Emile Perron',
            },
          ],
        },
        {
          text: ' on ',
        },
        {
          type: 'link',
          linkType: 'custom',
          url: 'https://unsplash.com/photos/macbook-pro-showing-programming-language-xrVDYZRGdw4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
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
