import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { AbsenceRequest, Comment, Post } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Gutter } from '../../../_components/Gutter'
import { generateMeta } from '../../../_utilities/generateMeta'
import PendingAbsenceRequest from './AbsenceRequest'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function PendingAbsenceRequests({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let absenceRequests: AbsenceRequest[] | null = null

  try {
    absenceRequests = await fetchDocs<AbsenceRequest>('absence-requests', false, {
      status: 'pending',
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }
  if (!absenceRequests) {
    notFound()
  }

  // const comments = await fetchComments({
  //   doc: event?.id,
  // })

  // const { layout } = absenceRequest

  return (
    <Gutter>
      <React.Fragment>
        <p>Pending Absence Requests: {absenceRequests.length}</p>
        {absenceRequests.map(absenceRequest => (
          <PendingAbsenceRequest key={absenceRequest.id} absenceRequest={absenceRequest} />
        ))}
      </React.Fragment>
    </Gutter>
  )
}

export async function generateStaticParams() {
  try {
    const absenceRequests = await fetchDocs<Post>('absence-requests', false)
    return absenceRequests?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let absenceRequest: AbsenceRequest | null = null

  try {
    absenceRequest = await fetchDoc<AbsenceRequest>({
      collection: 'absence-requests',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: absenceRequest })
}
