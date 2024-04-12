/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import ShiftForm from '@/components/shift/ShiftForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { shiftState } from '@/app/states';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionNotifyIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_SHIFTS_QUERY } from '@/gql/shift';

import { ShiftType, ListShiftsQueryVariables } from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';

// columns
const rowKey = 'id';
let columns: DataTableColumn<ShiftType>[] = [
  {
    id: 'startTime',
    label: 'Start Time',
    sortable: true,
    filterable: true,
    content: (data, row) => String(dayjs(data)),
  },
  {
    id: 'endTime',
    label: 'End Time',
    // display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => String(dayjs(data)),
  },
  // TODO
]

// filter
const filterVariables = (filter: any) => {
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
  return filterVariables;
}

function ShiftTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // get
  const { data, loading } = useQuery(
    LIST_SHIFTS_QUERY, {
      variables: {... filterVariables}
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
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {},
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
        && selected.every(entry => shiftState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: shiftState,
        target: 'PUBLISHED'
      }
    },
    // {
    //   name: 'Archive',
    //   icon: <ActionArchiveIcon />,
    //   priority: 110,
    //   action: (selected, setSelected, event) => {},
    //   available: (selected) => (
    //     selected.length > 0
    //     && selected.every(entry => shiftState.sources.ARCHIVED.includes(entry.state))
    //   ),
    //   state: {
    //     transitions: shiftState,
    //     target: 'ARCHIVED'
    //   }
    // },
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
      name: 'Participants',
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
