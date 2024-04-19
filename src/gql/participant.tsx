/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_PARTICIPANTS_QUERY = gql(`
  query ListParticipants (
    $shift: ID
    $task: ID
    $operation: ID
    $project: ID
    $organization: ID
  ) {
    listParticipants (
      shift: $shift
      shift_Task: $task
      shift_Task_Operation: $operation
      shift_Task_Operation_Project: $project
      shift_Task_Operation_Project_Organization: $organization
    ) {
      edges {
        node {
          id
          acceptance
          adminAcceptance
          person {
            firstName
            lastName
          }
        }
      }
    }
  }
`);

export {
  LIST_PARTICIPANTS_QUERY,
}
