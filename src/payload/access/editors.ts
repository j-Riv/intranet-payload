import type { AccessArgs } from 'payload/config';

import { checkRole } from '../collections/Users/checkRole';
import type { User } from '../payload-types';

type isEditor = (args: AccessArgs<unknown, User>) => boolean;

export const editors: isEditor = ({ req: { user } }) => {
  return checkRole(['editor'], user);
};
