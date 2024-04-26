/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_PERSON_PROPERTY_QUERY = gql(`
  query GetPersonProperties (
    $id: ID
  ) {
    listPersonProperties (
      id: $id
    ) {
      edges {
        node {
          id
          name
          group {
            id
            name
            selectionType
          }
        }
      }
    }
  }
`);

const LIST_PERSON_PROPERTIES_QUERY = gql(`
  query ListPersonProperties (
    $group_Organization: ID
  ) {
    listPersonProperties (
      group_Organization: $group_Organization
    ) {
      edges {
        node {
          id
          name
          group {
            id
            name
            selectionType
          }
        }
      }
    }
  }
`);

const CREATE_PERSON_PROPERTY_MUTATION = gql(`
  mutation CreatePersonProperty (
    $group: ID!
    $name: String!
  ) {
    createPersonProperty (
      input: {
        group: $group
        name: $name
      }
    ) {
      personProperty {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_PERSON_PROPERTY_MUTATION = gql(`
  mutation UpdatePersonProperty (
    $id: ID!
    $name: String!
  ) {
    updatePersonProperty (
      input: {
        id: $id
        name: $name
      }
    ) {
      personProperty {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_PERSON_PROPERTY_MUTATION = gql(`
  mutation DeletePersonProperty (
    $id: ID!
  ) {
    deletePersonProperty (
      input: {
        id: $id
      }
    ) {
      personProperty {
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
  GET_PERSON_PROPERTY_QUERY,
  LIST_PERSON_PROPERTIES_QUERY,
  CREATE_PERSON_PROPERTY_MUTATION,
  UPDATE_PERSON_PROPERTY_MUTATION,
  DELETE_PERSON_PROPERTY_MUTATION,
}
