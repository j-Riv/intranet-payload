import type { Page } from '../payload-types';

export const absenceRequestsPage: Partial<Page> = {
  title: 'Absence Requests',
  slug: 'absence-requests',
  _status: 'published',
  meta: {
    title: 'Payload Website Template',
    description: 'An open-source website built with Payload and Next.js.',
    // @ts-expect-error
    image: '{{IMAGE}}',
  },
  hero: {
    type: 'lowImpact',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Absence Request Form',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Absence Request page description will go here',
          },
        ],
      },
    ],
    media: undefined,
  },
};
