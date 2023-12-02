/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
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
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { ShiftType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_SHIFTS_QUERY = gql(`
  query ListShifts {
    listShifts {
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

  // get
  const { data, loading } = useQuery(
    LIST_SHIFTS_QUERY, {
      variables: {}
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
      action: (selected, event) => {
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
      action: (selected, event) => {
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
      action: (selected, event) => {},
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
      name: 'Operations',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, event) => {
        filter.setFilter(selected[0]);
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