// import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks';
// import { LINK_FIELDS } from './link';
// import { MEDIA } from './media';
// import { META } from './meta';

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
          email
          department
        }
        populatedApprover {
          name
          id
          email
          department
        }
        type
        userComments
        adminComments
        ${META}
      }
    }
  }
`;

export const ABSENCE_REQUESTS = `#graphql
  query AbsenceRequests($status: AbsenceRequest_approved_Input) {
    AbsenceRequests(where: { approved: { equals: $status }}, limit: 300, sort: "dateFrom") {
      docs {
        id
        approved
        slug
        title
        dateFrom
        dateTo
        decisionDate
        populatedUser {
          name
          id
          email
          department
        }
        populatedApprover {
          name
          id
          email
          department
        }
        categories {
          title
        }
        type
        userComments
        adminComments
        ${META}
      }
    }
  }
`;

export const ABSENCE_REQUESTS_BY_USER = `#graphql
  query AbsenceRequests($user: JSON, $status: AbsenceRequest_approved_Input) {
    AbsenceRequests(where: {
      user: { equals: $user },
      approved: { equals: $status }
    }
    , sort: "dateFrom") {
      docs {
        id
        slug
        title
        dateFrom
        dateTo
        decisionDate
        categories {
          title
        }
        populatedUser {
          name
          id
          email
          department
        }
        populatedApprover {
          name
          id
          email
          department
        }
        type
        userComments
        adminComments
      }
    }
  }
`;

export const ABSENCE_REQUESTS_BY_MONTH = `#graphql
  query AbsenceRequests($status: AbsenceRequest_approved_Input, $firstDay: DateTime, $lastDay: DateTime) {
    AbsenceRequests(where: {
      approved: { equals: $status },
      dateFrom: { greater_than_equal: $firstDay }, 
      dateTo: { less_than_equal: $lastDay }}) {
      docs {
        id
        slug
        title
        dateFrom
        dateTo
        decisionDate
        categories {
          title
        }
        populatedUser {
          name
          id
          email
        }
        populatedApprover {
          name
          id
          email
          department
        }
        type
        userComments
        adminComments
      }
    }
  }
`;

export const ABSENCE_REQUESTS_BY_MONTH_USER = `#graphql
  query AbsenceRequests($user: JSON, $status: AbsenceRequest_approved_Input, $firstDay: DateTime, $lastDay: DateTime) {
    AbsenceRequests(where: {
      user: { equals: $user },
      approved: { equals: $status },
      dateFrom: { greater_than_equal: $firstDay }, 
      dateTo: { less_than_equal: $lastDay }}) {
      docs {
        id
        slug
        title
        dateFrom
        dateTo
        categories {
          title
        }
        populatedUser {
          name
          id
          email
        }
        populatedApprover {
          name
          id
          email
          department
        }
        type
        userComments
        adminComments
      }
    }
  }
`;

export const ABSENCE_REQUESTS_BY_DEPARTMENT = `#graphql
  query AbsenceRequestsDepartment($department: JSON, $status: AbsenceRequest_approved_Input) {
    AbsenceRequests(where: {
        department: { equals: $department },
        approved: { equals: $status }
      }) {
      docs {
        id
        slug
        title
        dateFrom
        dateTo
        decisionDate
        categories {
          title
        }
        populatedUser {
          name
          id
          email
        }
        populatedApprover {
          name
          id
          email
          department
        }
        populatedDepartment {
          name
          id
          email
        }
        type
        userComments
        adminComments
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
