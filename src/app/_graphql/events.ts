import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const EVENTS = `#graphql
  query Events {
    Events(limit: 300) {
      docs {
        id
        slug
        title
        dateFrom
        dateTo
        categories {
          title
        }
      }
    }
  }
`

export const EVENT = `#graphql
  query Event($slug: String, $draft: Boolean) {
    Events(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        categories {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        relatedEvents {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`
