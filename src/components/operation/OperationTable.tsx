/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import OperationForm from '@/components/operation/OperationForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { operationState } from '@/app/states';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { OperationType, ListOperationsQueryVariables } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_OPERATIONS_QUERY = gql(`
  query ListOperations (
    $project: ID
    $organization: ID
  ) {
    listOperations (
      project: $project
      project_Organization: $organization
    ){
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

// columns
const rowKey = 'id';
let columns: DataTableColumn<OperationType>[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'description',
    label: 'Description',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
]


function OperationTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // filter
  let filterVariables: ListOperationsQueryVariables = {}
  switch ( filter?.object?.__typename ) {
    case "OrganizationType":
      filterVariables.organization = filter.object.id; break;
    case "ProjectType":
      filterVariables.project = filter.object.id; break
    case "OperationType":
      filterVariables.project = filter.object.project.id; break
    case "TaskType":
      filterVariables.project = filter.object.operation.project.id; break
    case "ShiftType":
      filterVariables.project = filter.object.task.operation.project.id; break
  }

  // get
  const { data, loading } = useQuery(
    LIST_OPERATIONS_QUERY, {
      variables: filterVariables
    }
  );
  let rows: OperationType[] = [];
  if (!loading && data?.listOperations?.edges)
    rows = data.listOperations.edges
      .map((edge) => edge?.node)
      .filter((node): node is OperationType => node !== undefined);

  // actions
  const actions: DataTableActions<OperationType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, event) => {
        dialog.showDialog(
          // <OperationForm />,
          <></>,
          "Create Operation"
        )
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, event) => {
        dialog.showDialog(
          // <OperationForm operationId={selected[0].id} />,
          <></>,
          "Edit Operation"
        )
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 30,
      action: (selected, event) => {},
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 100,
      action: (selected, event) => {},
      available: (selected) => (
        selected.length > 0
        && operationState.sources.PUBLISHED.includes(selected[0].state)
      ),
      state: {
        transitions: operationState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 110,
      action: (selected, event) => {},
      available: (selected) => (
        selected.length > 0
        && operationState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: operationState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Operations',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/tasks");
      },
      available: (selected) => (selected.length == 1),
      display: {
        toolbar: false,
        row: true,
      }
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      actions={actions}
    />
  );
}

export default OperationTable;
