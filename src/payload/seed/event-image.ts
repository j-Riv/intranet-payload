import type { Media } from '../payload-types';

export const eventImage: Omit<Media, 'id' | 'createdAt' | 'updatedAt'> = {
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
          url: 'https://henrythepug.com',
          newTab: true,
          children: [
            {
              text: 'Henry the Pug',
            },
          ],
        },
        {
          text: ' on ',
        },
        {
          type: 'link',
          linkType: 'custom',
          url: 'https://instagram.com/puganddestroy',
          newTab: true,
          children: [
            {
              text: 'Instagram',
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
