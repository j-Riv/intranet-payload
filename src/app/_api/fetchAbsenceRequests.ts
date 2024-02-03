import type { AbsenceRequest, Department, User } from '../../payload/payload-types';
import {
  ABSENCE_REQUESTS,
  ABSENCE_REQUESTS_BY_DEPARTMENT,
  ABSENCE_REQUESTS_BY_MONTH,
  ABSENCE_REQUESTS_BY_MONTH_USER,
  ABSENCE_REQUESTS_BY_USER,
} from '../_graphql/absence-requests';
import { GRAPHQL_API_URL } from './shared';

const queryMap = {
  'absence-requests-by-user': {
    query: ABSENCE_REQUESTS_BY_USER,
    key: 'AbsenceRequestsByUser',
  },
  'absence-requests': {
    query: ABSENCE_REQUESTS,
    key: 'AbsenceRequests',
  },
  'absence-requests-by-month': {
    query: ABSENCE_REQUESTS_BY_MONTH,
    key: 'AbsenceRequestsByMonth',
  },
  'absence-requests-by-month-user': {
    query: ABSENCE_REQUESTS_BY_MONTH_USER,
    key: 'AbsenceRequestsByMonthUser',
  },
  'absence-requests-by-department': {
    query: ABSENCE_REQUESTS_BY_DEPARTMENT,
    key: 'AbsenceRequestsByDepartment',
  },
};

interface Args {
  user?: User['id'];
  status?: string;
  firstDay?: string;
  lastDay?: string;
  department?: User['department'];
}

export const fetchAbsenceRequests = async (
  query: keyof typeof queryMap,
  args: Args,
): Promise<AbsenceRequest[]> => {
  if (!queryMap[query]) throw new Error(`Query ${query} not found`);
  const { user, status = 'pending', firstDay, lastDay, department } = args || {};

  let variables: Args = {};

  if (user) variables.user = user;
  if (status) variables.status = status;
  if (firstDay) variables.firstDay = firstDay;
  if (lastDay) variables.lastDay = lastDay;
  if (department) variables.department = (department as Department).id;

  const docs: AbsenceRequest[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: queryMap[query].query,
      variables,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');

      return res?.data?.AbsenceRequests?.docs;
    });

  return docs;
};
