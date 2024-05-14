import type { User } from '../../payload/payload-types';
import { ALL_USERS } from '../_graphql/absence-requests';
import { GRAPHQL_API_URL } from './shared';

export const fetchUsers = async (): Promise<User[]> => {
  // const { user, status = 'pending' } = args || {};

  const docs: User[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: ALL_USERS,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');

      return res?.data?.Users?.docs;
    });

  return docs;
};
