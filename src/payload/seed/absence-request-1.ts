import moment from 'moment'

import type { AbsenceRequest } from '../payload-types'

export const absenceRequest1: Partial<AbsenceRequest> = {
  title: 'Absence Request 1',
  slug: 'absence-request-1',
  _status: 'published',
  meta: {
    title: 'Absence Request 1',
    description: 'This is the first absence request.',
    // @ts-expect-error
    image: '{{IMAGE}}',
  },
  // @ts-expect-error
  author: '{{AUTHOR}}',
  // @ts-expect-error
  approver: '{{APPROVER}}',
  hero: {
    type: 'lowImpact',
    links: null,
    richText: [
      {
        children: [
          {
            text: 'Absence Request 1',
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
  // relatedAbsenceRequests: [], // this is populated by the seed script
  dateFrom: moment('2024-01-12').startOf('day').toISOString(),
  dateTo: moment('2024-01-12').endOf('day').toISOString(),
  userComments: 'Going out of Town',
  adminComments: null,
}
