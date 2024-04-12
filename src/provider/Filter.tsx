/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_FILTER_OBJECT_FRAGMENTS, GET_FILTER_OBJECT_QUERY } from '@/gql/filter';

import { gql } from '@/types/__generated__/gql';
import { FilterObjectType, FilterContextType } from '@/types/Filter';

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

// filter
// prepares the query filter variables for each filter object
const filterVariables = {
  project: (object: FilterContextType["object"]) => {
    switch ( object?.__typename ) {
      case "OrganizationType":
        return { organization: object.id };
      case "ProjectType":
        return { organization: object.organization.id };
      case "OperationType":
        return { organization: object.project.organization.id };
      case "TaskType":
        return { organization: object.operation.project.organization.id };
      case "ShiftType":
        return { organization: object.task.operation.project.organization.id };
    }
    return {};
  },
  operation: (object: FilterContextType["object"]) => {
    switch ( object?.__typename ) {
      case "OrganizationType":
        return { organization: object.id };
      case "ProjectType":
        return { project: object.id };
      case "OperationType":
        return { project: object.project.id };
      case "TaskType":
        return { project: object.operation.project.id };
      case "ShiftType":
        return { project: object.task.operation.project.id };
    }
    return {};
  },
  task: (object: FilterContextType["object"]) => {
    switch ( object?.__typename ) {
      case "OrganizationType":
        return { organization: object.id }
      case "ProjectType":
        return { project: object.id }
      case "OperationType":
        return { operation: object.id }
      case "TaskType":
        return { operation: object.operation.id }
      case "ShiftType":
        return { operation: object.task.operation.id }
    }
  },
}

export {
  FilterProvider,
  useFilter,
  GET_FILTER_OBJECT_QUERY,
  filterVariables,
};
