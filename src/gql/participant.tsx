/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_PARTICIPANT_QUERY = gql(`
  query GetParticipant (
    $id: ID
  ) {
    listParticipants (
      id: $id
    ) {
      edges {
        node {
          id
          acceptance
          adminAcceptance
          adminAcceptanceUser {
            id
            firstName
            lastName
          }
          createdAt
          modifiedAt
          person {
            firstName
            lastName
            properties {
              edges {
                node {
                  id
                  name
                  group {
                    id
                    name
                    organization {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
          shift {
            id
            startTime
            endTime
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
            }
          }
          role {
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
`);

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
          shift {
            id
            startTime
            endTime
            task {
              id
              name
            }
          }
          role {
            id
            name
            needsAdminAcceptance
          }
        }
      }
    }
  }
`);

const ACCEPT_PARTICIPANT_MUTATION = gql(`
  mutation AcceptParticipant (
    $id: ID!
  ) {
    acceptParticipant (
      input: {
        id: $id
      }
    ) {
      participant {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DECLINE_PARTICIPANT_MUTATION = gql(`
  mutation DeclineParticipant (
    $id: ID!
  ) {
    declineParticipant (
      input: {
        id: $id
      }
    ) {
      participant {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ADMIN_ACCEPT_PARTICIPANT_MUTATION = gql(`
  mutation AdminAcceptParticipant (
    $id: ID!
  ) {
    adminAcceptParticipant (
      input: {
        id: $id
      }
    ) {
      participant {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ADMIN_DECLINE_PARTICIPANT_MUTATION = gql(`
  mutation AdminDeclineParticipant (
    $id: ID!
  ) {
    adminDeclineParticipant (
      input: {
        id: $id
      }
    ) {
      participant {
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
  GET_PARTICIPANT_QUERY,
  LIST_PARTICIPANTS_QUERY,
  ACCEPT_PARTICIPANT_MUTATION,
  DECLINE_PARTICIPANT_MUTATION,
  ADMIN_ACCEPT_PARTICIPANT_MUTATION,
  ADMIN_DECLINE_PARTICIPANT_MUTATION,
}
