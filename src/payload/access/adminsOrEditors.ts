import type { Access } from 'payload/config';

import { checkRole } from '../collections/Users/checkRole';

export const adminsOrEditors: Access = ({ req: { user } }) => {
  if ((user && checkRole(['admin'], user)) || (user && checkRole(['editor'], user))) {
    return true;
  }
};
