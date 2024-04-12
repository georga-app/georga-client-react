/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
// import { personState } from '@/app/states';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_PERSONS_QUERY } from '@/gql/person';

import { PersonType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<PersonType>[] = [
  {
    id: 'firstName',
    label: 'First Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'dateJoined',
    label: 'Joined',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  // TODO
]


function PersonTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_PERSONS_QUERY, {
      variables: {}
    }
  );
  let rows: PersonType[] = [];
  if (!loading && data?.listPersons?.edges)
    rows = data.listPersons.edges
      .map((edge) => edge?.node)
      .filter((node): node is PersonType => node !== undefined);

  // actions
  const actions: DataTableActions<PersonType> = [
    // TODO
    // {
    //   name: 'Create',
    //   icon: <ActionCreateIcon />,
    //   priority: 10,
    //   action: (selected, setSelected, event) => {
    //     dialog.showDialog(
    //       // <TaskForm />,
    //       <></>,
    //       "Create Task"
    //     )
    //   },
    //   available: (selected) => (selected.length == 0),
    // },
    // {
    //   name: 'Edit',
    //   icon: <ActionEditIcon />,
    //   priority: 20,
    //   action: (selected, setSelected, event) => {
    //     dialog.showDialog(
    //       // <TaskForm taskId={selected[0].id} />,
    //       <></>,
    //       "Edit Task"
    //     )
    //   },
    //   available: (selected) => (selected.length == 1),
    //   display: {
    //     row: true,
    //   }
    // },
    // {
    //   name: 'Delete',
    //   icon: <ActionDeleteIcon />,
    //   priority: 30,
    //   action: (selected, setSelected, event) => {
    //   available: (selected) => (selected.length > 0),
    // },
    // {
    //   name: 'Publish',
    //   icon: <ActionPublishIcon />,
    //   priority: 100,
    //   action: (selected, setSelected, event) => {
    //   available: (selected) => (
    //     selected.length > 0
    //     && taskState.sources.PUBLISHED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: taskState,
    //     target: 'PUBLISHED'
    //   }
    // },
    // {
    //   name: 'Archive',
    //   icon: <ActionArchiveIcon />,
    //   priority: 110,
    //   action: (selected, setSelected, event) => {
    //   available: (selected) => (
    //     selected.length > 0
    //     && taskState.sources.ARCHIVED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: taskState,
    //     target: 'ARCHIVED'
    //   }
    // },
    // {
    //   name: 'Operations',
    //   icon: <NavigationForwardIcon />,
    //   priority: 1000,
    //   action: (selected, setSelected, event) => {
    //     filter.setFilter(selected[0]);
    //   },
    //   available: (selected) => (selected.length == 1),
    //   display: {
    //     toolbar: false,
    //     row: true,
    //   }
    // },
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

export default PersonTable;
