/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_PROJECT_QUERY = gql(`
  query GetProject (
    $id: ID!
  ) {
    listProjects (
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
          organization {
            id
            name
          }
        }
      }
    }
  }
`);

const LIST_PROJECTS_QUERY = gql(`
  query ListProjects (
    $organization: ID
    $state_In: [GeorgaProjectStateChoices]
  ) {
    listProjects (
      organization: $organization
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          name
          description
        }
      }
    }
  }
`);

const CREATE_PROJECT_MUTATION = gql(`
  mutation CreateProject (
    $publish: Boolean
    $organization: ID!
    $name: String!
    $description: String
  ) {
    createProject (
      input: {
        publish: $publish
        organization: $organization
        name: $name
        description: $description
      }
    ) {
      project {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_PROJECT_MUTATION = gql(`
  mutation UpdateProject (
    $id: ID!
    $name: String
    $description: String
  ) {
    updateProject (
      input: {
        id: $id
        name: $name
        description: $description
      }
    ) {
      project {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const PUBLISH_PROJECT_MUTATION = gql(`
  mutation PublishProject (
    $id: ID!
  ) {
    publishProject (
      input: {
        id: $id
      }
    ) {
      project {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const ARCHIVE_PROJECT_MUTATION = gql(`
  mutation ArchiveProject (
    $id: ID!
  ) {
    archiveProject (
      input: {
        id: $id
      }
    ) {
      project {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_PROJECT_MUTATION = gql(`
  mutation DeleteProject (
    $id: ID!
  ) {
    deleteProject (
      input: {
        id: $id
      }
    ) {
      project {
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
  GET_PROJECT_QUERY,
  LIST_PROJECTS_QUERY,
  CREATE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
  PUBLISH_PROJECT_MUTATION,
  ARCHIVE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
}
