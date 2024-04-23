/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_TASK_FIELDS_QUERY = gql(`
  query ListTaskFields (
    $organization: ID
  ) {
    listTaskFields (
      organization: $organization
    ) {
      edges {
        node {
          id
          name
          description
          createdAt
          modifiedAt
        }
      }
    }
  }
`);

export {
  LIST_TASK_FIELDS_QUERY,
}
