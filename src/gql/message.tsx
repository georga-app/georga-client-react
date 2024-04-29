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
          id
          title
          priority
          category
          state
          delivery
          emailDelivery
          pushDelivery
          smsDelivery
          scope {
            __typename
            ... on OrganizationType {
              id
              name
            }
            ... on ProjectType {
              id
              name
            }
            ... on OperationType {
              id
              name
            }
            ... on TaskType {
              id
              name
              operation {
                id
                name
              }
            }
            ... on ShiftType {
              id
              startTime
              endTime
              task {
                id
                name
                operation {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`);

export {
  LIST_MESSAGES_QUERY,
}
