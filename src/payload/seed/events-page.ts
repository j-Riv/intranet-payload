import type { Page } from '../payload-types'

export const eventsPage: Partial<Page> = {
  title: 'Events',
  slug: 'events',
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
            text: 'All Events',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'This page displays all events and absence requests.',
          },
        ],
      },
    ],
    media: undefined,
  },
  // layout: [
  //   {
  //     blockName: 'Archive Block',
  //     blockType: 'archive',
  //     introContent: [
  //       {
  //         type: 'h4',
  //         children: [
  //           {
  //             text: 'All Events',
  //           },
  //         ],
  //       },
  //       {
  //         type: 'p',
  //         children: [
  //           {
  //             text: 'The events below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or posts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.',
  //           },
  //         ],
  //       },
  //     ],
  //     populateBy: 'collection',
  //     relationTo: 'events',
  //     limit: 10,
  //     categories: [],
  //   },
  // ],
}
