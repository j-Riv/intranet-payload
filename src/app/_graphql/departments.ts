export const ALL_DEPARTMENTS = `#graphql
  query Departments {
    Departments(limit: 300) {
      docs {
        id
        name
        manager {
          id
          name
          email
        }
        # populatedUser {
        #   id
        #   name
        #   email
        # }
      }
    }
  }
`;
