/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const LIST_TASKS_QUERY = gql(`
  query ListTasks (
    $operation: ID
    $project: ID
    $organization: ID
    $state_In: [GeorgaTaskStateChoices]
  ) {
    listTasks (
      operation: $operation
      operation_Project: $project
      operation_Project_Organization: $organization
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          name
          description
          field {
            name
            description
          }
          startTime
          endTime
        }
      }
    }
  }
`);

const PUBLISH_TASK_MUTATION = gql(`
  mutation PublishTask (
    $id: ID!
  ) {
    publishTask (
      input: {
        id: $id
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_TASK_MUTATION = gql(`
  mutation ArchiveTask (
    $id: ID!
  ) {
    archiveTask (
      input: {
        id: $id
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_TASK_MUTATION = gql(`
  mutation DeleteTask (
    $id: ID!
  ) {
    deleteTask (
      input: {
        id: $id
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

export {
  LIST_TASKS_QUERY,
  PUBLISH_TASK_MUTATION,
  ARCHIVE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
}
