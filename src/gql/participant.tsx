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
      role_Shift: $shift
      role_Shift_Task: $task
      role_Shift_Task_Operation: $operation
      role_Shift_Task_Operation_Project: $project
      role_Shift_Task_Operation_Project_Organization: $organization
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
