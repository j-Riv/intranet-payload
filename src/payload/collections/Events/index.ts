import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { adminsOrEditors } from '../../access/adminsOrEditors';
import { adminsOrPublished } from '../../access/adminsOrPublished';
// import { Archive } from '../../blocks/ArchiveBlock'
// import { CallToAction } from '../../blocks/CallToAction'
// import { Content } from '../../blocks/Content'
// import { MediaBlock } from '../../blocks/MediaBlock'
// import { hero } from '../../fields/hero'
import { slugField } from '../../fields/slug';
// import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedAt } from '../../hooks/populatePublishedAt';
import { populateAuthors } from './hooks/populateAuthors';
import { revalidateEvent } from './hooks/revalidateEvent';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/events/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateEvent],
    afterRead: [
      // populateArchiveBlock,
      populateAuthors,
    ],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: adminsOrEditors,
    create: adminsOrEditors,
    delete: admins,
  },
  fields: [
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
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
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
      ],
    },
    // {
    //   type: 'tabs',
    //   tabs: [
    //     {
    //       label: 'Hero',
    //       fields: [hero],
    //     },
    //     {
    //       label: 'Content',
    //       fields: [
    //         {
    //           name: 'layout',
    //           type: 'blocks',
    //           required: true,
    //           blocks: [CallToAction, Content, MediaBlock, Archive],
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: 'relatedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        };
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
    slugField(),
  ],
};
