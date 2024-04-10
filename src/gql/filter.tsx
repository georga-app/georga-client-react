/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import { gql } from '@/types/__generated__/gql';

const GET_FILTER_OBJECT_FRAGMENTS = gql(`
  fragment OrganizationParts on OrganizationType {
    id
    name
    description
    organizationState: state
    icon
  }
  fragment ProjectParts on ProjectType {
    id
    name
    description
    projectState: state
    organization {
      ... OrganizationParts
    }
  }
  fragment OperationParts on OperationType {
    id
    name
    description
    operationState: state
    project {
      ... ProjectParts
    }
  }
  fragment TaskParts on TaskType {
    id
    name
    description
    taskState: state
    startTime
    taskEndTime: endTime
    operation {
      ... OperationParts
    }
  }
  fragment ShiftParts on ShiftType {
    id
    state
    startTime
    shiftEndTime: endTime
    task {
      ... TaskParts
    }
  }
`);

const GET_FILTER_OBJECT_QUERY = gql(`
  query GetFilterObject (
    $id: ID!
  ) {
    node (
      id: $id
    ) {
      __typename
      ... on OrganizationType {
        ... OrganizationParts
      }
      ... on ProjectType {
        ... ProjectParts
      }
      ... on OperationType {
        ... OperationParts
      }
      ... on TaskType {
        ... TaskParts
      }
      ... on ShiftType {
        ... ShiftParts
      }
    }
  }
`);

export {
  GET_FILTER_OBJECT_FRAGMENTS,
  GET_FILTER_OBJECT_QUERY,
}
