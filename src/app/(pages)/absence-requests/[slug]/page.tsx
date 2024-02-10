import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { AbsenceRequest, Comment, Post } from '../../../../payload/payload-types';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { AbsenceRequestHero } from '../../../_heros/AbsenceRequestHero';
import { generateMeta } from '../../../_utilities/generateMeta';

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic';

export default async function AbsenceRequests({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode();

  let absenceRequest: AbsenceRequest | null = null;

  try {
    absenceRequest = await fetchDoc<AbsenceRequest>({
      collection: 'absence-requests',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  if (!absenceRequest) {
    notFound();
  }

  return (
    <React.Fragment>
      <AbsenceRequestHero absenceRequest={absenceRequest} />
    </React.Fragment>
  );
}

export async function generateStaticParams() {
  try {
    const events = await fetchDocs<Post>('events');
    return events?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let absenceRequest: AbsenceRequest | null = null;

  try {
    absenceRequest = await fetchDoc<AbsenceRequest>({
      collection: 'absence-requests',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {}
  // @ts-expect-error
  return generateMeta({ doc: absenceRequest });
}
