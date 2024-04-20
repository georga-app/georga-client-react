/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_SHIFT_QUERY = gql(`
  query GetShift (
    $id: ID!
  ) {
    listShifts (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          startTime
          endTime
          enrollmentDeadline
          state
          task {
            id
            name
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

const LIST_SHIFTS_QUERY = gql(`
  query ListShifts (
    $task: ID
    $operation: ID
    $project: ID
    $organization: ID
    $state_In: [GeorgaShiftStateChoices]
  ) {
    listShifts (
      task: $task
      task_Operation: $operation
      task_Operation_Project: $project
      task_Operation_Project_Organization: $organization
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          startTime
          endTime
          enrollmentDeadline
          task {
            id
            name
          }
        }
      }
    }
  }
`);

const CREATE_SHIFT_MUTATION = gql(`
  mutation CreateShift (
    $publish: Boolean
    $task: ID!
    $startTime: DateTime!
    $endTime: DateTime!
    $enrollmentDeadline: DateTime!
  ) {
    createShift (
      input: {
        publish: $publish
        task: $task
        startTime: $startTime
        endTime: $endTime
        enrollmentDeadline: $enrollmentDeadline
      }
    ) {
      shift {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_SHIFT_MUTATION = gql(`
  mutation UpdateShift (
    $id: ID!
    $startTime: DateTime
    $endTime: DateTime
    $enrollmentDeadline: DateTime
  ) {
    updateShift (
      input: {
        id: $id
        startTime: $startTime
        endTime: $endTime
        enrollmentDeadline: $enrollmentDeadline
      }
    ) {
      shift {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const PUBLISH_SHIFT_MUTATION = gql(`
  mutation PublishShift (
    $id: ID!
  ) {
    publishShift (
      input: {
        id: $id
      }
    ) {
      shift {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_SHIFT_MUTATION = gql(`
  mutation ArchiveShift (
    $id: ID!
  ) {
    archiveShift (
      input: {
        id: $id
      }
    ) {
      shift {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_SHIFT_MUTATION = gql(`
  mutation DeleteShift (
    $id: ID!
  ) {
    deleteShift (
      input: {
        id: $id
      }
    ) {
      shift {
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
  GET_SHIFT_QUERY,
  LIST_SHIFTS_QUERY,
  CREATE_SHIFT_MUTATION,
  UPDATE_SHIFT_MUTATION,
  PUBLISH_SHIFT_MUTATION,
  ARCHIVE_SHIFT_MUTATION,
  DELETE_SHIFT_MUTATION,
}
