/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_TASK_QUERY = gql(`
  query GetTask (
    $id: ID!
  ) {
    listTasks (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          state
          field {
            id
            name
          }
          name
          description
          startTime
          endTime
          operation {
            id
            name
            project {
              id
              name
              organization {
                id
                name
              }
            }
          }
          roleSet {
            edges {
              node {
                id
                name
                description
                quantity
                needsAdminAcceptance
                mandatory {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                recommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                unrecommended {
                  id
                  name
                  group {
                    id
                    name
                  }
                }
                impossible {
                  id
                  name
                  group {
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
  }
`);

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

const CREATE_TASK_MUTATION = gql(`
  mutation CreateTask (
    $operation: ID!
    $field: ID!
    $name: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime
  ) {
    createTask (
      input: {
        operation: $operation
        field: $field
        name: $name
        description: $description
        startTime: $startTime
        endTime: $endTime
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

const UPDATE_TASK_MUTATION = gql(`
  mutation UpdateTask (
    $id: ID!
    $field: ID
    $name: String
    $description: String
    $startTime: DateTime
    $endTime: DateTime
  ) {
    updateTask (
      input: {
        id: $id
        field: $field
        name: $name
        description: $description
        startTime: $startTime
        endTime: $endTime
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
  GET_TASK_QUERY,
  LIST_TASKS_QUERY,
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  PUBLISH_TASK_MUTATION,
  ARCHIVE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
}
