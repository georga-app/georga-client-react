/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_ORGANIZATION_QUERY = gql(`
  query GetOrganization (
    $id: ID!
  ) {
    listOrganizations (
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
          icon
        }
      }
    }
  }
`);

const GET_PERSON_ORGANIZATIONS_QUERY = gql(`
  query GetPersonOrganizationsProfile (
    $name_Icontains: String
  ) {
    getPersonProfile {
      organizationsSubscribed (
        name_Icontains: $name_Icontains
      ) {
        edges {
          node {
            id
            name
            description
            icon
          }
        }
      }
    }
  }
`);

const LIST_ORGANIZATIONS_QUERY = gql(`
  query ListOrganizations (
    $state_In: [GeorgaOrganizationStateChoices]
  ) {
    listOrganizations (
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          name
          icon
          description
        }
      }
    }
  }
`);

const CREATE_ORGANIZATION_MUTATION = gql(`
  mutation CreateOrganization (
    $name: String!
    $description: String
    $icon: String
  ) {
    createOrganization (
      input: {
        name: $name
        description: $description
        icon: $icon
      }
    ) {
      organization {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_ORGANIZATION_MUTATION = gql(`
  mutation UpdateOrganization (
    $id: ID!
    $name: String
    $description: String
    $icon: String
  ) {
    updateOrganization (
      input: {
        id: $id
        name: $name
        description: $description
        icon: $icon
      }
    ) {
      organization {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const PUBLISH_ORGANIZATION_MUTATION = gql(`
  mutation PublishOrganization (
    $id: ID!
  ) {
    publishOrganization (
      input: {
        id: $id
      }
    ) {
      organization {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_ORGANIZATION_MUTATION = gql(`
  mutation ArchiveOrganization (
    $id: ID!
  ) {
    archiveOrganization (
      input: {
        id: $id
      }
    ) {
      organization {
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
  GET_ORGANIZATION_QUERY,
  GET_PERSON_ORGANIZATIONS_QUERY,
  LIST_ORGANIZATIONS_QUERY,
  CREATE_ORGANIZATION_MUTATION,
  UPDATE_ORGANIZATION_MUTATION,
  PUBLISH_ORGANIZATION_MUTATION,
  ARCHIVE_ORGANIZATION_MUTATION,
}
