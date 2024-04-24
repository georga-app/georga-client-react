/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_TASK_FIELD_QUERY = gql(`
  query GetTaskField (
    $id: ID!
  ) {
    listTaskFields (
      id: $id
    ) {
      edges {
        node {
          id
          name
          description
          createdAt
          modifiedAt
        }
      }
    }
  }
`);

const LIST_TASK_FIELDS_QUERY = gql(`
  query ListTaskFields (
    $organization: ID
  ) {
    listTaskFields (
      organization: $organization
    ) {
      edges {
        node {
          id
          name
          description
          createdAt
          modifiedAt
        }
      }
    }
  }
`);

const CREATE_TASK_FIELD_MUTATION = gql(`
  mutation CreateTaskField (
    $organization: ID!
    $name: String!
    $description: String
  ) {
    createTaskField (
      input: {
        organization: $organization
        name: $name
        description: $description
      }
    ) {
      taskField {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_TASK_FIELD_MUTATION = gql(`
  mutation UpdateTaskField (
    $id: ID!
    $name: String
    $description: String
  ) {
    updateTaskField (
      input: {
        id: $id
        name: $name
        description: $description
      }
    ) {
      taskField {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_TASK_FIELD_MUTATION = gql(`
  mutation DeleteTaskField (
    $id: ID!
  ) {
    deleteTaskField (
      input: {
        id: $id
      }
    ) {
      taskField {
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
  GET_TASK_FIELD_QUERY,
  LIST_TASK_FIELDS_QUERY,
  CREATE_TASK_FIELD_MUTATION,
  UPDATE_TASK_FIELD_MUTATION,
  DELETE_TASK_FIELD_MUTATION,
}
