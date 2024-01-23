import moment from 'moment'

import type { Event } from '../payload-types'

export const event1: Partial<Event> = {
  title: 'Event 1',
  slug: 'event-1',
  _status: 'published',
  meta: {
    title: 'Event 1',
    description: 'This is the first event.',
    // @ts-expect-error
    image: '{{IMAGE}}',
  },
  users: ['{{USER}}'],
  hero: {
    type: 'lowImpact',
    links: null,
    richText: [
      {
        children: [
          {
            text: 'Event 1',
          },
        ],
        type: 'h1',
      },
    ],
    media: null,
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                },
              ],
            },
          ],
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  relatedEvents: [], // this is populated by the seed script
  dateFrom: moment('2024-01-12').startOf('day').toISOString(),
  dateTo: moment('2024-01-14').endOf('day').toISOString(),
}
