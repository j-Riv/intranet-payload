import type { AbsenceRequest, User } from '../../payload/payload-types';
import { ABSENCE_REQUESTS_BY_USER } from '../_graphql/absence-requests';
import { GRAPHQL_API_URL } from './shared';

export const fetchAbsenceRequests = async (args: {
  user: User['id'];
  status?: string;
}): Promise<AbsenceRequest[]> => {
  const { user, status = 'pending' } = args || {};

  const docs: AbsenceRequest[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: ABSENCE_REQUESTS_BY_USER,
      variables: {
        user,
        status,
      },
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');

      return res?.data?.AbsenceRequests?.docs;
    });

  return docs;
};
