/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_FILTER_OBJECT_FRAGMENTS, GET_FILTER_OBJECT_QUERY } from '@/gql/filter';

import { gql } from '@/types/__generated__/gql';
import { ListProjectsQueryVariables } from '@/types/__generated__/graphql'
import { FilterObjectType, FilterContextType } from '@/types/Filter';

// filter
const filterVariables = (target: "project" | "operation", filter: any) => {
  switch ( target ) {
    case "project":
      let filterVariables: ListProjectsQueryVariables = {}
      switch ( filter?.object?.__typename ) {
        case "OrganizationType":
          filterVariables.organization = filter.object.id; break;
        case "ProjectType":
          filterVariables.organization = filter.object.organization.id; break
        case "OperationType":
          filterVariables.organization = filter.object.project.organization.id; break
        case "TaskType":
          filterVariables.organization = filter.object.operation.project.organization.id; break
        case "ShiftType":
          filterVariables.organization = filter.object.task.operation.project.organization.id; break
      }
      return filterVariables;
  }
}

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

export {
  FilterProvider,
  useFilter,
  GET_FILTER_OBJECT_QUERY,
  filterVariables,
};
