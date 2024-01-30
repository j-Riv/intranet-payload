import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { adminsOrManagers } from '../../access/adminsOrManagers';
import { adminsOrPublished } from '../../access/adminsOrPublished';
// import { Archive } from '../../blocks/ArchiveBlock'
// import { CallToAction } from '../../blocks/CallToAction'
// import { Content } from '../../blocks/Content'
// import { MediaBlock } from '../../blocks/MediaBlock'
// import { hero } from '../../fields/hero'
import { slugField } from '../../fields/slug';
// import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { populateUser } from './hooks/populateUser';
import { revalidateAbsenceRequest } from './hooks/revalidateAbsenceRequest';

export const AbsenceRequests: CollectionConfig = {
  slug: 'absence-requests',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/absence-requests/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateAbsenceRequest],
    afterRead: [
      // populateArchiveBlock,
      populateUser,
    ],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: adminsOrManagers,
    create: ({ req: { user } }) => {
      return Boolean(user);
    },
    delete: admins,
  },
  fields: [
    {
      name: 'approved',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Denied',
          value: 'denied',
        },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    // This field is only used to populate the user data via the `populateUser` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedUser',
      type: 'group',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    {
      name: 'approver',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dateFrom',
      type: 'date',
      required: true,
    },
    {
      name: 'dateTo',
      type: 'date',
      required: true,
    },
    {
      name: 'userComments',
      type: 'textarea',
    },
    {
      name: 'adminComments',
      type: 'textarea',
    },
    slugField(),
  ],
};
