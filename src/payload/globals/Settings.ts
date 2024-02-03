import type { GlobalConfig } from 'payload/types';

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'postsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Posts page',
    },
    // {
    //   name: 'eventsPage',
    //   type: 'relationship',
    //   relationTo: 'pages',
    //   label: 'Events page',
    // },
    // {
    //   name: 'absenceRequestsPage',
    //   type: 'relationship',
    //   relationTo: 'pages',
    //   label: 'Absence Requests page',
    // },
    {
      name: 'projectsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Projects page',
    },
    {
      name: 'paidHolidays',
      type: 'array',
      label: 'Paid Holidays',
      labels: {
        singular: 'Paid Holiday',
        plural: 'Paid Holidays',
      },
      fields: [
        {
          name: 'date',
          type: 'date',
        },
      ],
    },
    {
      name: 'blackOutDays',
      type: 'array',
      label: 'Black Out Days',
      labels: {
        singular: 'Black Out Day',
        plural: 'Black Out Days',
      },
      fields: [
        {
          name: 'date',
          type: 'date',
        },
      ],
    },
  ],
};
