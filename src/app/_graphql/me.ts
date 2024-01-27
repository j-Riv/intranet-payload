export const ME_QUERY = `#graphql
  query {
    meUser {
      user {
        id
        email
        name
        roles
      }
      exp
    }
  }`
