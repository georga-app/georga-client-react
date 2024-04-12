/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_PERSON_PROFILE_QUERY = gql(`
  query GetPersonProfile {
    getPersonProfile {
      firstName
      lastName
      email
      occupation
      street
      number
      postalCode
      city
      privatePhone
      mobilePhone
      onlyJobRelatedTopics
    }
  }
`);

const GET_PERSON_PROFILE_PROPERTIES_QUERY = gql(`
  query GetPersonProfileProperties {
    getPersonProfile {
      properties {
        edges {
          node {
            id
            group {
              id
            }
          }
        }
      }
    }
  }
`);

const LIST_PERSONS_QUERY = gql(`
  query ListPersons {
    listPersons {
      edges {
        node {
          id
          email
          firstName
          lastName
          dateJoined
          organizationsSubscribed {
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

const REGISTER_PERSON_MUTATION = gql(`
  mutation RegisterPerson (
    $email: String!
    $password: String!
  ) {
    registerPerson(
      input: {
        email: $email
        password: $password
      }
    ) {
      id
      errors {
        field
        messages
      }
    }
  }
`);

const ACTIVATE_PERSON_MUTATION = gql(`
  mutation ActivatePerson(
    $token: String!
  ) {
    activatePerson(
      input: {
        token: $token
      }
    ) {
      email
      errors {
        field
        messages
      }
    }
  }
`);

const TOKEN_AUTH_MUTATION = gql(`
  mutation TokenAuth (
    $email: String!
    $password: String!
  ) {
    tokenAuth(
      input: {
        email: $email
        password: $password
      }
    ) {
      id
      token
      refreshExpiresIn
      adminLevel
    }
  }
`);

const UPDATE_PERSON_PROFILE_MUTATION = gql(`
  mutation UpdatePersonProfile (
    $firstName: String
    $lastName: String
    $occupation: String
    $street: String
    $number: String
    $postalCode: String
    $city: String
    $privatePhone: String
    $mobilePhone: String
    $onlyJobRelatedTopics: String
  ) {
    updatePersonProfile (
      input: {
        firstName: $firstName
        lastName: $lastName
        occupation: $occupation
        street: $street
        number: $number
        postalCode: $postalCode
        city: $city
        privatePhone: $privatePhone
        mobilePhone: $mobilePhone
        onlyJobRelatedTopics: $onlyJobRelatedTopics
      }
    ) {
      person {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_PERSON_PROFILE_PROPERTIES_MUTATION = gql(`
  mutation UpdatePersonProfileProperties (
    $properties: [ID]
  ) {
    updatePersonProfile (
      input: {
        properties: $properties
      }
    ) {
      person {
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
  GET_PERSON_PROFILE_QUERY,
  GET_PERSON_PROFILE_PROPERTIES_QUERY,
  LIST_PERSONS_QUERY,
  REGISTER_PERSON_MUTATION,
  ACTIVATE_PERSON_MUTATION,
  TOKEN_AUTH_MUTATION,
  UPDATE_PERSON_PROFILE_MUTATION,
  UPDATE_PERSON_PROFILE_PROPERTIES_MUTATION,
}
