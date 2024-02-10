import { META } from './meta';

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
`;

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
        dateFrom
        dateTo
        ${META}
      }
    }
  }
`;
