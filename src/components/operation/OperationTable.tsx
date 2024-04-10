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
  ActionNotifyIcon,
  ActionPublishIcon,
  ActionToggleArchiveIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import {
  GeorgaOperationStateChoices,
  OperationType,
  ListOperationsQueryVariables,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_OPERATIONS_QUERY = gql(`
  query ListOperations (
    $project: ID
    $organization: ID
    $state_In: [GeorgaOperationStateChoices]
  ) {
    listOperations (
      project: $project
      project_Organization: $organization
      state_In: $state_In
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

// filter
const filterVariables = (filter: any) => {
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
  return filterVariables;
}

function OperationTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // states
  const [archive, setArchive] = useState(false);

  // get
  const { data, loading } = useQuery(
    LIST_OPERATIONS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaOperationStateChoices.Archived]
          : [GeorgaOperationStateChoices.Draft, GeorgaOperationStateChoices.Published],
        ... filterVariables(filter)
      }
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
      action: (selected, setSelected, event) => {
        router.push("/admin/operations/create");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: archive ? "Close Archive" : "Open Archive",
      icon: archive ? <ActionArchiveIcon /> : <ActionToggleArchiveIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        setArchive(archive ? false : true);
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/operations/" + selected[0].id + "/edit");
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 40,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => operationState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: operationState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => operationState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: operationState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Message',
      icon: <ActionNotifyIcon />,
      priority: 200,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Tasks',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
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
export { LIST_OPERATIONS_QUERY };
