/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_MESSAGES_QUERY = gql(`
  query ListMessages {
    listMessages {
      edges {
        node {
          title
          priority
          category
          state
          delivery
        }
      }
    }
  }
`);

export {
  LIST_MESSAGES_QUERY,
}
