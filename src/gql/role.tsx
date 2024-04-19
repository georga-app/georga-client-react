/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const CREATE_ROLE_MUTATION = gql(`
  mutation CreateRole (
    $name: String!
    $description: String
    $needsAdminAcceptance: Boolean
    $quantity: Int!
    $shift: ID
    $task: ID
    $mandatory: [ID]
    $recommended: [ID]
    $unrecommended: [ID]
    $impossible: [ID]
  ) {
    createRole (
      input: {
        name: $name
        description: $description
        needsAdminAcceptance: $needsAdminAcceptance
        quantity: $quantity
        shift: $shift
        task: $task
        mandatory: $mandatory
        recommended: $recommended
        unrecommended: $unrecommended
        impossible: $impossible
      }
    ) {
      role {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const UPDATE_ROLE_MUTATION = gql(`
  mutation UpdateRole (
    $id: ID!
    $name: String
    $description: String
    $needsAdminAcceptance: Boolean
    $quantity: Int
    $mandatory: [ID]
    $recommended: [ID]
    $unrecommended: [ID]
    $impossible: [ID]
  ) {
    updateRole (
      input: {
        id: $id
        name: $name
        description: $description
        needsAdminAcceptance: $needsAdminAcceptance
        quantity: $quantity
        mandatory: $mandatory
        recommended: $recommended
        unrecommended: $unrecommended
        impossible: $impossible
      }
    ) {
      role {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_ROLE_MUTATION = gql(`
  mutation DeleteRole (
    $id: ID!
  ) {
    deleteRole (
      input: {
        id: $id
      }
    ) {
      role {
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
  CREATE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
}
