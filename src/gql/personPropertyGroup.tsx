/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_PERSON_PROPERTY_GROUPS_QUERY = gql(`
  query ListPersonPropertyGroups (
    $organization: ID
  ) {
    listPersonPropertyGroups (
      organization: $organization
    ) {
      edges {
        node {
          id
          codename
          name
          selectionType
          personpropertySet {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`);

export {
  LIST_PERSON_PROPERTY_GROUPS_QUERY,
}
