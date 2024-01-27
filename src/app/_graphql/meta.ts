import { MEDIA_FIELDS } from './media'

export const META = `#graphql
  meta {
    title
    image {
      ${MEDIA_FIELDS}
    }
    description
  }`
