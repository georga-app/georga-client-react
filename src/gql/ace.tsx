/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const CREATE_ACE_MUTATION = gql(`
  mutation CreateAce (
    $person: ID!
    $instance: ID!
    $permission: String!
  ) {
    createAce (
      input: {
        person: $person
        instance: $instance
        permission: $permission
      }
    ) {
      aCE {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const DELETE_ACE_MUTATION = gql(`
  mutation DeleteAce (
    $id: ID!
  ) {
    deleteAce (
      input: {
        id: $id
      }
    ) {
      aCE {
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
  CREATE_ACE_MUTATION,
  DELETE_ACE_MUTATION,
}
