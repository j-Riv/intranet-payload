import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Event as CalendarEvent, Post } from '../../../../payload/payload-types';
import { fetchComments } from '../../../_api/fetchComments';
import { fetchDoc } from '../../../_api/fetchDoc';
import { fetchDocs } from '../../../_api/fetchDocs';
import { EventHero } from '../../../_heros/EventHero';
import { generateMeta } from '../../../_utilities/generateMeta';

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic';

export default async function Event({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode();

  let event: CalendarEvent | null = null;

  try {
    event = await fetchDoc<CalendarEvent>({
      collection: 'events',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  if (!event) {
    notFound();
  }

  const comments = await fetchComments({
    doc: event?.id,
  });

  return (
    <React.Fragment>
      <EventHero event={event} />
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

  let event: CalendarEvent | null = null;

  try {
    event = await fetchDoc<CalendarEvent>({
      collection: 'events',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {}
  // @ts-expect-error
  return generateMeta({ doc: event });
}
