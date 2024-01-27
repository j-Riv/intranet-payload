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
    {
      name: 'eventsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Events page',
    },
    {
      name: 'absenceRequestsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Absence Requests page',
    },
    {
      name: 'projectsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Projects page',
    },
  ],
};
