/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_PERSON_PROPERTY_GROUP_QUERY = gql(`
  query GetPersonPropertyGroups (
    $id: ID
  ) {
    listPersonPropertyGroups (
      id: $id
    ) {
      edges {
        node {
          id
          name
          selectionType
          necessity
          createdAt
          modifiedAt
          organization {
            id
            name
          }
          personpropertySet {
            edges {
              node {
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

const LIST_PERSON_PROPERTY_GROUPS_QUERY = gql(`
  query ListPersonPropertyGroups (
    $organization: ID
  ) {
    listPersonPropertyGroups (
      organization: $organization
    ) {
      edges {
        node {
          id
          name
          selectionType
          necessity
          personpropertySet {
            edges {
              node {
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

const CREATE_PERSON_PROPERTY_GROUP_MUTATION = gql(`
  mutation CreatePersonPropertyGroup (
    $organization: ID!
    $name: String!
    $selectionType: String!
    $necessity: String!
  ) {
    createPersonPropertyGroup (
      input: {
        organization: $organization
        name: $name
        selectionType: $selectionType
        necessity: $necessity
      }
    ) {
      personPropertyGroup {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_PERSON_PROPERTY_GROUP_MUTATION = gql(`
  mutation UpdatePersonPropertyGroup (
    $id: ID!
    $name: String!
    $selectionType: String!
    $necessity: String!
  ) {
    updatePersonPropertyGroup (
      input: {
        id: $id
        name: $name
        selectionType: $selectionType
        necessity: $necessity
      }
    ) {
      personPropertyGroup {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_PERSON_PROPERTY_GROUP_MUTATION = gql(`
  mutation DeletePersonPropertyGroup (
    $id: ID!
  ) {
    deletePersonPropertyGroup (
      input: {
        id: $id
      }
    ) {
      personPropertyGroup {
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
  GET_PERSON_PROPERTY_GROUP_QUERY,
  LIST_PERSON_PROPERTY_GROUPS_QUERY,
  CREATE_PERSON_PROPERTY_GROUP_MUTATION,
  UPDATE_PERSON_PROPERTY_GROUP_MUTATION,
  DELETE_PERSON_PROPERTY_GROUP_MUTATION,
}
