import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import type { AbsenceRequest, Department } from '../../../../payload/payload-types';
import { fetchAbsenceRequests } from '../../../_api/fetchAbsenceRequests';
import { fetchDepartments } from '../../../_api/fetchDepartments';
import { Gutter } from '../../../_components/Gutter';
import { getMeUser } from '../../../_utilities/getMeUser';
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph';
import AbsenceRequests from './AbsenceRequests';

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic';

export default async function PendingAbsenceRequests({ params: { slug } }) {
  const userData = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access absence requests.',
    )}&redirect=${encodeURIComponent('/absence-requests')}`,
  });

  const { user } = userData;

  let absenceRequests: AbsenceRequest[] | null = null;
  let departments: Department[] | null = null;

  try {
    absenceRequests = await fetchAbsenceRequests('absence-requests-by-department', {
      status: 'pending',
      department: user.department,
    });

    departments = await fetchDepartments();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  if (!absenceRequests) {
    notFound();
  }

  if (!user.isManager) {
    redirect('/account');
  }

  return (
    <Gutter>
      <h1>Pending Absence Requests</h1>
      <AbsenceRequests
        absenceRequests={absenceRequests}
        // @ts-expect-error
        defaultDepartment={user.department?.id.toString()}
        departments={departments}
      />
    </Gutter>
  );
}

export async function generateStaticParams() {
  try {
    const absenceRequests = await fetchAbsenceRequests('absence-requests', {
      status: 'pending',
    });
    return absenceRequests?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Pending Absence Requests',
  description: 'Pending Absence Requests',
  openGraph: mergeOpenGraph({
    title: 'Pending Absence Requests',
    url: '/absence-requests/pending',
  }),
};
