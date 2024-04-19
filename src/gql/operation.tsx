/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_OPERATION_QUERY = gql(`
  query GetOperation (
    $id: ID!
  ) {
    listOperations (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          state
          name
          description
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
  }
`);

const LIST_OPERATIONS_QUERY = gql(`
  query ListOperations (
    $project: ID
    $organization: ID
    $state_In: [GeorgaOperationStateChoices]
  ) {
    listOperations (
      project: $project
      project_Organization: $organization
      state_In: $state_In
    ){
      edges {
        node {
          id
          state
          name
          description
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
  }
`);

const CREATE_OPERATION_MUTATION = gql(`
  mutation CreateOperation (
    $publish: Boolean
    $project: ID!
    $name: String!
    $description: String
  ) {
    createOperation (
      input: {
        publish: $publish
        project: $project
        name: $name
        description: $description
      }
    ) {
      operation {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_OPERATION_MUTATION = gql(`
  mutation UpdateOperation (
    $id: ID!
    $name: String
    $description: String
  ) {
    updateOperation (
      input: {
        id: $id
        name: $name
        description: $description
      }
    ) {
      operation {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const PUBLISH_OPERATION_MUTATION = gql(`
  mutation PublishOperation (
    $id: ID!
  ) {
    publishOperation (
      input: {
        id: $id
      }
    ) {
      operation {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_OPERATION_MUTATION = gql(`
  mutation ArchiveOperation (
    $id: ID!
  ) {
    archiveOperation (
      input: {
        id: $id
      }
    ) {
      operation {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_OPERATION_MUTATION = gql(`
  mutation DeleteOperation (
    $id: ID!
  ) {
    deleteOperation (
      input: {
        id: $id
      }
    ) {
      operation {
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
  GET_OPERATION_QUERY,
  LIST_OPERATIONS_QUERY,
  CREATE_OPERATION_MUTATION,
  UPDATE_OPERATION_MUTATION,
  PUBLISH_OPERATION_MUTATION,
  ARCHIVE_OPERATION_MUTATION,
  DELETE_OPERATION_MUTATION,
}
