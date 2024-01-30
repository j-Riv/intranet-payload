import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks';
import { LINK_FIELDS } from './link';
import { MEDIA } from './media';
import { META } from './meta';

// export const ABSENCE_REQUESTS = `#graphql
//   query AbsenceRequests {
//     AbsenceRequests(limit: 300) {
//       docs {
//         id
//         slug
//         title
//         dateFrom
//         dateTo
//         categories {
//           title
//         }
//       }
//     }
//   }
// `

export const ABSENCE_REQUEST = `#graphql
  query AbsenceRequest($slug: String, $draft: Boolean) {
    AbsenceRequests(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        categories {
          title
        }
        createdAt
        publishedAt
        populatedUser {
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
        ${META}
      }
    }
  }
`;

export const ABSENCE_REQUESTS = `#graphql
  query AbsenceRequests($status: AbsenceRequest_approved_Input) {
    AbsenceRequests(where: { approved: { equals: $status }}, limit: 300) {
      docs {
        id
        approved
        slug
        title
        dateFrom
        dateTo
        populatedUser {
          name
          id
          email
        }
        categories {
          title
        }
        userComments
      }
    }
  }
`;

// export const ABSENCE_REQUESTS_BY_USER = `#graphql
//   query AbsenceRequests($user: JSON) {
//     AbsenceRequests(where: { user: { equals: $user } }) {
//       docs {
//         id
//         slug
//         title
//         dateFrom
//         dateTo
//         categories {
//           title
//         }
//       }
//     }
//   }
// `;

export const ABSENCE_REQUESTS_BY_USER = `#graphql
  query AbsenceRequests($user: JSON, $status: AbsenceRequest_approved_Input) {
    AbsenceRequests(where: { and: [
      { user: { equals: $user } },
      { approved: { equals: $status } }
    ]}) {
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
`;

export const ABSENCE_REQUESTS_BY_MONTH = `#graphql
  query AbsenceRequests($user: JSON, $status: AbsenceRequest_approved_Input, $firstDay: DateTime, $lastDay: DateTime) {
    AbsenceRequests(where: { and: [
      { user: { equals: $user } },
      { approved: { equals: $status } },
      { dateFrom: { gte: $firstDay } },
      { dateTo: { lte: $lastDay } }
    ]}) {
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
`;

export const ALL_USERS = `#graphql
  query Users {
    Users(limit: 300) {
      docs {
        id
        name
        email
      }
    }
  }
`;
