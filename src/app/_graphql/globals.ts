import { LINK_FIELDS } from './link';

export const HEADER = `#graphql
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const HEADER_QUERY = `#graphql
  query Header {
    ${HEADER}
  }
`;

export const FOOTER = `#graphql
  Footer {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`;

export const FOOTER_QUERY = `#graphql
  query Footer {
    ${FOOTER}
  }
`;

export const SETTINGS = `#graphql
  Settings {
    postsPage {
      slug
    }
    # eventsPage {
    #   slug
    # }
    # absenceRequestsPage {
    #   slug
    # }
    projectsPage {
      slug
    }
    paidHolidays {
      id
      date
    }
    blackOutDays {
      id
      date
    }
  }
`;

export const SETTINGS_QUERY = `#graphql
  query Settings {
    ${SETTINGS}
  }
`;

export const SETTINGS_DATES_QUERY = `#graphql
  query SettingsDates {
    Settings {
      paidHolidays {
        id
        date
      }
      blackOutDays {
        id
        date
      }
    }
  }
`;
