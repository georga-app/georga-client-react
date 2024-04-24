/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_FILTER_OBJECT_FRAGMENTS, GET_FILTER_OBJECT_QUERY } from '@/gql/filter';
import { GET_ORGANIZATION_QUERY } from '@/gql/organization';

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
  organization: '',
  setOrganization: string => {},
  getOrganization: () => "",
  unsetOrganization: () => {},
  hasOrganization: false,
  setFilter: string => {},
  unsetFilter: () => {},
  hasFilter: false,
});

function FilterProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [organizationId, setOrganizationId] = useState("");
  const [filterObjectId, setFilterObjectId] = useState("");
  const [filterObject, setFilterObject] = useState<FilterObjectType>(undefined);

  // get organization
  const {
    called: getOrganizationCalled,
    loading: getOrganizationLoading,
    data: getOrganizationData,
    error: getOrganizationError
  } = useQuery(
    GET_ORGANIZATION_QUERY, {
      skip: !localStorage.getItem("globalOrganization"),
      variables: {
        id: localStorage.getItem("globalOrganization") as string,
      },
      onCompleted: data => {
        if (!data.listOrganizations?.edges) return;
        const organization = data.listOrganizations?.edges.map((edge) => edge?.node)[1];
        setOrganizationId(organization?.id || '');
      },
    },
  );

  // get filter object
  const {
    called: getFilterObjectCalled,
    loading: getFilterObjectLoading,
    data: getFilterObjectData,
    error: getFilterObjectError
  } = useQuery(
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
  const setOrganization = (organizationId: string) => {
    if (organizationId === getOrganization())
      return;
    setOrganizationId(organizationId);
    unsetFilter();
    localStorage.setItem("globalOrganization", organizationId || "")
  }
  const getOrganization = () => {
    return organizationId;
  }
  const unsetOrganization = () => {
    localStorage.removeItem("globalOrganization");
    setOrganization('');
  }
  const hasOrganization = () => {
    return Boolean(organizationId);
  }

  useEffect(() => {
    if (!organizationId)
      setOrganizationId(localStorage.getItem("globalOrganization") || "");
  }, [organizationId, setOrganizationId])

  let filter = {
    object: filterObject,
    organization: organizationId,
    setOrganization: (organizationId: string) => setOrganization(organizationId),
    getOrganization: () => getOrganization(),
    unsetOrganization: () => unsetOrganization(),
    hasOrganization: hasOrganization(),
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
  shift: (object: FilterContextType["object"]) => {
    switch ( object?.__typename ) {
      case "OrganizationType":
        return { organization: object.id }
      case "ProjectType":
        return { project: object.id }
      case "OperationType":
        return { operation: object.id }
      case "TaskType":
        return { task: object.id }
      case "ShiftType":
        return { task: object.task.id }
    }
  },
  participant: (object: FilterContextType["object"]) => {
    switch ( object?.__typename ) {
      case "OrganizationType":
        return { organization: object.id }
      case "ProjectType":
        return { project: object.id }
      case "OperationType":
        return { operation: object.id }
      case "TaskType":
        return { task: object.id }
      case "ShiftType":
        return { shift: object.id }
    }
  },
}

export {
  FilterProvider,
  useFilter,
  GET_FILTER_OBJECT_QUERY,
  filterVariables,
};
