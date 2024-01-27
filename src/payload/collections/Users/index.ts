import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import adminsAndUser from './access/adminsAndUser';
import { checkRole } from './checkRole';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';
import { loginAfterCreate } from './hooks/loginAfterCreate';

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user) || checkRole(['editor'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'editor',
          value: 'editor',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      hasMany: false,
    },
    {
      name: 'isManager',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
};

export default Users;
