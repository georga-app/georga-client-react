/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import ShiftForm from '@/components/shift/ShiftForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { shiftState } from '@/app/states';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionNotifyIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { ShiftType, ListShiftsQueryVariables } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_SHIFTS_QUERY = gql(`
  query ListShifts (
    $task: ID
    $operation: ID
    $project: ID
    $organization: ID
  ) {
    listShifts (
      task: $task
      task_Operation: $operation
      task_Operation_Project: $project
      task_Operation_Project_Organization: $organization
    ) {
      edges {
        node {
          id
          state
          startTime
          endTime
          enrollmentDeadline
        }
      }
    }
  }
`);

// columns
const rowKey = 'id';
let columns: DataTableColumn<ShiftType>[] = [
  {
    id: 'startTime',
    label: 'Start Time',
    sortable: true,
    filterable: true,
  },
  {
    id: 'endTime',
    label: 'End Time',
    // display: 'sm',
    sortable: true,
    filterable: true,
  },
  // TODO
]


function ShiftTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // filter
  let filterVariables: ListShiftsQueryVariables = {}
  switch ( filter?.object?.__typename ) {
    case "OrganizationType":
      filterVariables.organization = filter.object.id; break;
    case "ProjectType":
      filterVariables.project = filter.object.id; break
    case "OperationType":
      filterVariables.operation = filter.object.id; break
    case "TaskType":
      filterVariables.task = filter.object.id; break
    case "ShiftType":
      filterVariables.task = filter.object.task.id; break
  }

  // get
  const { data, loading } = useQuery(
    LIST_SHIFTS_QUERY, {
      variables: filterVariables
    }
  );
  let rows: ShiftType[] = [];
  if (!loading && data?.listShifts?.edges)
    rows = data.listShifts.edges
      .map((edge) => edge?.node)
      .filter((node): node is ShiftType => node !== undefined);

  // actions
  const actions: DataTableActions<ShiftType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          // <ShiftForm />,
          <></>,
          "Create Shift"
        )
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        dialog.showDialog(
          // <ShiftForm shiftId={selected[0].id} />,
          <></>,
          "Edit Shift"
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
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && shiftState.sources.PUBLISHED.includes(selected[0].state)
      ),
      state: {
        transitions: shiftState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 110,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && shiftState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: shiftState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Message',
      icon: <ActionNotifyIcon />,
      priority: 200,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Operations',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/participants");
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

export default ShiftTable;
