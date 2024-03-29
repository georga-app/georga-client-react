/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import TaskForm from '@/components/task/TaskForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { taskState } from '@/app/states';

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
import { TaskType, ListTasksQueryVariables } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_TASKS_QUERY = gql(`
  query ListTasks (
    $operation: ID
    $project: ID
    $organization: ID
  ) {
    listTasks (
      operation: $operation
      operation_Project: $project
      operation_Project_Organization: $organization
    ) {
      edges {
        node {
          id
          state
          name
          description
          field {
            name
            description
          }
          startTime
          endTime
        }
      }
    }
  }
`);

const DELETE_TASK_MUTATION = gql(`
  mutation DeleteTask (
    $id: ID!
  ) {
    deleteTask (
      input: {
        id: $id
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

// columns
const rowKey = 'id';
let columns: DataTableColumn<TaskType>[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'field',
    label: 'Field',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => data.name,
  },
  {
    id: 'description',
    label: 'Description',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  // TODO
]

const filterVariables = (filter: any) => {
  let filterVariables: ListTasksQueryVariables = {}
  switch ( filter?.object?.__typename ) {
    case "OrganizationType":
      filterVariables.organization = filter.object.id; break;
    case "ProjectType":
      filterVariables.project = filter.object.id; break
    case "OperationType":
      filterVariables.operation = filter.object.id; break
    case "TaskType":
      filterVariables.operation = filter.object.operation.id; break
    case "ShiftType":
      filterVariables.operation = filter.object.task.operation.id; break
  }
  return filterVariables;
}

function TaskTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // filter
  // let filterVariables: ListTasksQueryVariables = {}
  // switch ( filter?.object?.__typename ) {
  //   case "OrganizationType":
  //     filterVariables.organization = filter.object.id; break;
  //   case "ProjectType":
  //     filterVariables.project = filter.object.id; break
  //   case "OperationType":
  //     filterVariables.operation = filter.object.id; break
  //   case "TaskType":
  //     filterVariables.operation = filter.object.operation.id; break
  //   case "ShiftType":
  //     filterVariables.operation = filter.object.task.operation.id; break
  // }

  // get
  const { data, loading } = useQuery(
    LIST_TASKS_QUERY, {
      variables: filterVariables(filter)
    }
  );
  let rows: TaskType[] = [];
  if (!loading && data?.listTasks?.edges)
    rows = data.listTasks.edges
      .map((edge) => edge?.node)
      .filter((node): node is TaskType => node !== undefined);

  // delete
  const [ deleteTask, {
    loading: deleteTaskLoading,
    reset: deleteTaskReset
  }] = useMutation(
    DELETE_TASK_MUTATION, {
      onCompleted: data => {
        const response = data.deleteTask;
        if (!response)
          return;
        if(response.errors.length === 0) {
          deleteTaskReset();
          // setErrors({});
          // setChanged({});
          snackbar.showSnackbar("Task deleted", 'success');
          // onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          // setErrors(fieldErrors);
          deleteTaskReset();
          // onError(data);
        }
      },
      // onError: error => {
      //   setErrors({form: error.message});
      // },
      refetchQueries: [
        "ListTasks"
      ]
    }
  );

  // actions
  const actions: DataTableActions<TaskType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/tasks/add");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        router.push("/admin/tasks/edit/" + selected[0].id);
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
        deleteTask({
          variables: { id: selected[0].id }
        })
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && taskState.sources.PUBLISHED.includes(selected[0].state)
      ),
      state: {
        transitions: taskState,
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
        && taskState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: taskState,
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
      name: 'Shifts',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/shifts");
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

export default TaskTable;
export { LIST_TASKS_QUERY, filterVariables };
