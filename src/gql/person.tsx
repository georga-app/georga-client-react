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

const GET_STAFF_PERSON_QUERY = gql(`
  query GetStaffPerson (
    $id: ID
    $organizationsEmployed: ID
  ) {
    listPersons (
      id: $id
      organizationsEmployed: $organizationsEmployed
    ) {
      edges {
        node {
          id
          email
          firstName
          lastName
          dateJoined
          aceSet (
            organization: $organizationsEmployed
          ) {
            edges {
              node {
                id
                permission
                instance {
                  __typename
                  ... on OrganizationType {
                    id
                    name
                  }
                  ... on ProjectType {
                    id
                    name
                    organization {
                      id
                      name
                    }
                  }
                  ... on OperationType {
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
                createdAt
                modifiedAt
              }
            }
          }
        }
      }
    }
  }
`);

const LIST_STAFF_PERSONS_QUERY = gql(`
  query ListStaffPersons (
    $organizationsEmployed: ID
  ) {
    listPersons (
      organizationsEmployed: $organizationsEmployed
    ) {
      edges {
        node {
          id
          email
          firstName
          lastName
          dateJoined
          organizationsEmployed {
            edges {
              node {
                id
                name
              }
            }
          }
          aceSet (
            organization: $organizationsEmployed
          ) {
            edges {
              node {
                id
                permission
                instance {
                  __typename
                  ... on OrganizationType {
                    id
                    name
                  }
                  ... on ProjectType {
                    id
                    name
                    organization {
                      id
                      name
                    }
                  }
                  ... on OperationType {
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
                createdAt
                modifiedAt
              }
            }
          }
        }
      }
    }
  }
`);

const GET_SUBSCRIBER_PERSON_QUERY = gql(`
  query GetSubscriberPerson (
    $organization: ID
    $id: ID
  ) {
    listPersons (
      id: $id
    ) {
      edges {
        node {
          id
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
          properties (
            group_Organization: $organization
          ) {
            edges {
              node {
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
`);

const LIST_SUBSCRIBER_PERSONS_QUERY = gql(`
  query ListSubscriberPersons (
    $organizationsSubscribed: ID
    $organizationsEmployed_Not: ID
  ) {
    listPersons (
      organizationsSubscribed: $organizationsSubscribed
      organizationsEmployed_Not: $organizationsEmployed_Not
    ) {
      edges {
        node {
          id
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
      defaultOrganization
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

const EMPLOY_PERSON_MUTATION = gql(`
  mutation EmployPerson (
    $id: ID!
    $organization: ID!
    $employed: Boolean
  ) {
    employPerson (
      input: {
        id: $id
        organization: $organization
        employed: $employed
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
  GET_STAFF_PERSON_QUERY,
  LIST_STAFF_PERSONS_QUERY,
  GET_SUBSCRIBER_PERSON_QUERY,
  LIST_SUBSCRIBER_PERSONS_QUERY,
  REGISTER_PERSON_MUTATION,
  ACTIVATE_PERSON_MUTATION,
  TOKEN_AUTH_MUTATION,
  UPDATE_PERSON_PROFILE_MUTATION,
  UPDATE_PERSON_PROFILE_PROPERTIES_MUTATION,
  EMPLOY_PERSON_MUTATION,
}
