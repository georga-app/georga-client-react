/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_PERSON_PROPERTIES_QUERY = gql(`
  query ListPersonProperties (
    $group_Organization: ID
  ) {
    listPersonProperties (
      group_Organization: $group_Organization
    ) {
      edges {
        node {
          id
          name
          group {
            id
            name
            selectionType
          }
        }
      }
    }
  }
`);

export {
  LIST_PERSON_PROPERTIES_QUERY,
}
