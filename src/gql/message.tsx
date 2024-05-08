/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_MESSAGE_QUERY = gql(`
  query GetMessage (
    $id: ID!
  ) {
    listMessages (
      id: $id
    ) {
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

const LIST_MESSAGES_QUERY = gql(`
  query ListMessages (
    $organization: ID
    $state_In: [GeorgaMessageStateChoices]
  ) {
    listMessages (
      organization: $organization
      state_In: $state_In
    ) {
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

const CREATE_MESSAGE_MUTATION = gql(`
  mutation CreateMessage (
    $publish: Boolean
    $title: String!
    $contents: String!
    $priority: String!
    $scope: ID!
  ) {
    createMessage (
      input: {
        publish: $publish
        title: $title
        contents: $contents
        priority: $priority
        scope: $scope
      }
    ) {
      message {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_MESSAGE_MUTATION = gql(`
  mutation UpdateMessage (
    $id: ID!
    $title: String
    $contents: String
    $priority: String
    $scope: ID
  ) {
    updateMessage (
      input: {
        id: $id
        title: $title
        contents: $contents
        priority: $priority
        scope: $scope
      }
    ) {
      message {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const PUBLISH_MESSAGE_MUTATION = gql(`
  mutation PublishMessage (
    $id: ID!
  ) {
    publishMessage (
      input: {
        id: $id
      }
    ) {
      message {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_MESSAGE_MUTATION = gql(`
  mutation ArchiveMessage (
    $id: ID!
  ) {
    archiveMessage (
      input: {
        id: $id
      }
    ) {
      message {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_MESSAGE_MUTATION = gql(`
  mutation DeleteMessage (
    $id: ID!
  ) {
    deleteMessage (
      input: {
        id: $id
      }
    ) {
      message {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const SEND_MESSAGE_MUTATION = gql(`
  mutation SendMessage (
    $id: ID!
  ) {
    sendMessage (
      input: {
        id: $id
      }
    ) {
      message {
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
  GET_MESSAGE_QUERY,
  LIST_MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  UPDATE_MESSAGE_MUTATION,
  PUBLISH_MESSAGE_MUTATION,
  ARCHIVE_MESSAGE_MUTATION,
  DELETE_MESSAGE_MUTATION,
  SEND_MESSAGE_MUTATION,
}
