/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_SHIFTS_QUERY = gql(`
  query ListShifts (
    $task: ID
    $operation: ID
    $project: ID
    $organization: ID
  ) {
    listShifts (
      task: $task
      task_Operation: $operation
      task_Operation_Project: $project
      task_Operation_Project_Organization: $organization
    ) {
      edges {
        node {
          id
          state
          startTime
          endTime
          enrollmentDeadline
        }
      }
    }
  }
`);

export {
  LIST_SHIFTS_QUERY,
}
