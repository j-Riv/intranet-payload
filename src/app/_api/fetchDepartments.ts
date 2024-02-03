import type { Department } from '../../payload/payload-types';
import { ALL_DEPARTMENTS } from '../_graphql/departments';
import { GRAPHQL_API_URL } from './shared';

export const fetchDepartments = async (): Promise<Department[]> => {
  const docs: Department[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: ALL_DEPARTMENTS,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');
      return res?.data?.Departments?.docs;
    });
  return docs;
};
