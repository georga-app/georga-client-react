/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import TaskFieldForm from '@/components/taskField/TaskFieldForm';
import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_TASK_FIELDS_QUERY } from '@/gql/taskField';

import { TaskFieldType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<TaskFieldType>[] = [
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

function TaskFieldTable() {
  // provider
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_TASK_FIELDS_QUERY, {
      variables: {
      }
    }
  );
  let rows: TaskFieldType[] = [];
  if (!loading && data?.listTaskFields?.edges)
    rows = data.listTaskFields.edges
      .map((edge) => edge?.node)
      .filter((node): node is TaskFieldType => node !== undefined);

  // actions
  const actions: DataTableActions<TaskFieldType> = [
    // TODO
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
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

export default TaskFieldTable;
