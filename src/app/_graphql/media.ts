export const MEDIA_FIELDS = `
  mimeType
  filename
  width
  height
  alt
  caption
`

export const MEDIA = `#graphql
  media {
    ${MEDIA_FIELDS}
  }`
