import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AbsenceRequest, Post } from '../../../../payload/payload-types';
import { fetchAbsenceRequests } from '../../../_api/fetchAbsenceRequests';
import { fetchDocs } from '../../../_api/fetchDocs';
import { Gutter } from '../../../_components/Gutter';
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph';
import PendingAbsenceRequest from './AbsenceRequest';

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic';

export default async function PendingAbsenceRequests({ params: { slug } }) {
  let absenceRequests: AbsenceRequest[] | null = null;
  const firstDay = new Date('2/01/2024').toISOString();
  const lastDay = new Date('2/31/2024').toISOString();
  try {
    absenceRequests = await fetchAbsenceRequests('absence-requests-by-month', {
      status: 'pending',
      firstDay: firstDay,
      lastDay: lastDay,
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  if (!absenceRequests) {
    notFound();
  }

  return (
    <Gutter>
      <React.Fragment>
        <p>Pending Absence Requests: {absenceRequests.length}</p>
        {absenceRequests.map(absenceRequest => (
          <PendingAbsenceRequest key={absenceRequest.id} absenceRequest={absenceRequest} />
        ))}
      </React.Fragment>
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
