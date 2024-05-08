/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";

import {
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
} from '@/theme/Icons';

import {
  LIST_TASK_FIELDS_QUERY,
  DELETE_TASK_FIELD_MUTATION,
} from '@/gql/taskField';

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
  const router = useRouter();
  const snackbar = useSnackbar();

  // get
  const { data, loading } = useQuery(
    LIST_TASK_FIELDS_QUERY, {
      variables: {
        organization: filter.organization,
      }
    }
  );
  let rows: TaskFieldType[] = [];
  if (!loading && data?.listTaskFields?.edges)
    rows = data.listTaskFields.edges
      .map((edge) => edge?.node)
      .filter((node): node is TaskFieldType => node !== undefined);

  // delete task field
  const [ deleteTaskField, {
    loading: deleteTaskFieldLoading,
    reset: deleteTaskFieldReset
  }] = useMutation(
    DELETE_TASK_FIELD_MUTATION, {
      onCompleted: data => {
        const response = data.deleteTaskField;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Field deleted", 'success');
          deleteTaskFieldReset();
        } else {
          snackbar.showSnackbar("Field not deleted", 'error');
          deleteTaskFieldReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListTaskFields"
      ]
    }
  );

  // actions
  const actions: DataTableActions<TaskFieldType> = [
    // TODO
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/fields/create");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        router.push("/admin/fields/" + selected[0].id + "/edit");
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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteTaskField({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
