import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { AbsenceRequest, Page } from '../../../payload/payload-types';
import { fetchAbsenceRequests } from '../../_api/fetchAbsenceRequests';
import { fetchDoc } from '../../_api/fetchDoc';
import { fetchDocs } from '../../_api/fetchDocs';
import { Gutter } from '../../_components/Gutter';
import { Hero } from '../../_components/Hero';
import { generateMeta } from '../../_utilities/generateMeta';
import { getMeUser } from '../../_utilities/getMeUser';

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic';

export default async function Page({ params: { slug = 'absence-requests' } }) {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access absence requests.',
    )}&redirect=${encodeURIComponent('/absence-requests')}`,
  });

  const { isEnabled: isDraftMode } = draftMode();

  let page: Page | null = null;
  let absenceRequests: AbsenceRequest[] | null = null;

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    });

    absenceRequests = await fetchAbsenceRequests('absence-requests', {
      status: 'approved',
    });
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  if (!page) {
    return notFound();
  }

  const { hero } = page;

  // TODO: use this server component to fetch initial data then pass it to the client.
  // create client component to refetch on select change use state to hold current month selection

  return (
    <React.Fragment>
      <Hero {...hero} />
      <Gutter>
        <label htmlFor="month">Month: </label>
        <select>
          {Array.from(new Array(12), (x, i) => i + 1).map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <p>Approved Absence Requests: {absenceRequests.length}</p>
        {/* TODO: add absence LOG */}
        {absenceRequests.map(absenceRequest => (
          <p>{JSON.stringify(absenceRequest)}</p>
        ))}
      </Gutter>
    </React.Fragment>
  );
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages');
    return pages?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params: { slug = 'absence-requests' },
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let page: Page | null = null;

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  return generateMeta({ doc: page });
}
