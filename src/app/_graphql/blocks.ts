import { CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `#graphql
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `#graphql
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `#graphql
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `#graphql
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  ${CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Post {
        id
        slug
        title
        ${META}
      }
      ...on Project {
        id
        slug
        title
        ${META}
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Post {
        id
        slug
        title
        ${CATEGORIES}
        ${META}
      }
      ...on Project {
        id
        slug
        title
        ${CATEGORIES}
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`

export const PRODUCT_BLOCK = `#graphql
...on ProductBlock {
  blockType
  invertBackground
  ${MEDIA}
  title {
    appearance
    value
  }
  sku {
    appearance
    value
  }
}
`

export const CARDS = `#graphql
...on Cards {
  blockType
  invertBackground
  cards {
    size
    ${MEDIA}
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`
