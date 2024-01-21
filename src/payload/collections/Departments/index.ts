import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import type { Comment } from '../../payload-types'
import { populateUser } from './hooks/populateUser'
import { revalidatePost } from './hooks/revalidatePost'

const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    preview: (comment: Partial<Comment>) =>
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/departments/${
        comment?.doc && typeof comment?.doc === 'object' ? comment?.doc?.slug : comment?.doc
      }`,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateUser],
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'manager',
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
  ],
}

export default Departments
