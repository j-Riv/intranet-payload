import type { AfterChangeHook } from 'payload/dist/collections/config/types';

import { revalidate } from '../../../utilities/revalidate';

// Revalidate the event in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo posts
export const revalidateAbsenceRequest: AfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') {
    revalidate({ payload, collection: 'absenceRequests', slug: doc.slug });
  }

  return doc;
};
