/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import { gql } from '@/types/__generated__/gql';
import { FilterObjectType, FilterContextType } from '@/types/Filter';

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

// see https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
let localStorage: Storage = (typeof window !== "undefined") ? window.localStorage : {
  length: 0,
  key: () => null,
  clear: () => undefined,
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};

const FilterContext = createContext<FilterContextType>({
  object: undefined,
  setFilter: string => {},
  unsetFilter: () => {},
  hasFilter: false,
});

function FilterProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [filterObjectId, setFilterObjectId] = useState("");
  const [filterObject, setFilterObject] = useState<FilterObjectType>(undefined);

  // getFilterObject
  const { called, loading, data, error } = useQuery(
    GET_FILTER_OBJECT_QUERY, {
      skip: !localStorage.getItem("globalFilter"),
      variables: {
        id: localStorage.getItem("globalFilter") as string,
      },
      onCompleted: data => {
        if (!data.node) return;
        setFilterObject(data.node as FilterObjectType);
      },
    },
  );

  const setFilter = (objectId: string) => {
    localStorage.setItem("globalFilter", objectId || "")
    setFilterObjectId(objectId);
  }
  const unsetFilter = () => {
    localStorage.removeItem("globalFilter");
    setFilterObject(undefined);
  }
  const hasFilter = () => {
    return Boolean(filterObject);
  }

  let filter = {
    object: filterObject,
    setFilter: (objectId: string) => setFilter(objectId),
    unsetFilter: () => unsetFilter(),
    hasFilter: hasFilter(),
  }

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useDialog must be used within an DialogProvider');
  }

  return context;
};

export { FilterProvider, useFilter };
