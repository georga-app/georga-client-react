/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useFilter, filterVariables } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { taskState } from '@/app/states';

import {
  LIST_TASKS_QUERY,
  PUBLISH_TASK_MUTATION,
  ARCHIVE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
} from '@/gql/task';

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

import {
  GeorgaTaskStateChoices,
  TaskType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

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

function TaskTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // get
  const { data, loading } = useQuery(
    LIST_TASKS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaTaskStateChoices.Archived]
          : [GeorgaTaskStateChoices.Draft, GeorgaTaskStateChoices.Published],
        ... filterVariables.task(filter.object)
      }
    }
  );
  let rows: TaskType[] = [];
  if (!loading && data?.listTasks?.edges)
    rows = data.listTasks.edges
      .map((edge) => edge?.node)
      .filter((node): node is TaskType => node !== undefined);

  // publish
  const [ publishTask, {
    loading: publishTaskLoading,
    reset: publishTaskReset
  }] = useMutation(
    PUBLISH_TASK_MUTATION, {
      onCompleted: data => {
        const response = data.publishTask;
        if (!response)
          return;
        if(response.errors.length === 0) {
          publishTaskReset();
          snackbar.showSnackbar("Task publishd", 'success');
        } else {
          publishTaskReset();
          snackbar.showSnackbar("Task not publishd", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListTasks"
      ]
    }
  );

  // archive
  const [ archiveTask, {
    loading: archiveTaskLoading,
    reset: archiveTaskReset
  }] = useMutation(
    ARCHIVE_TASK_MUTATION, {
      onCompleted: data => {
        const response = data.archiveTask;
        if (!response)
          return;
        if(response.errors.length === 0) {
          archiveTaskReset();
          snackbar.showSnackbar("Task archived", 'success');
        } else {
          archiveTaskReset();
          snackbar.showSnackbar("Task not archived", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListTasks"
      ]
    }
  );

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
          snackbar.showSnackbar("Task deleted", 'success');
        } else {
          deleteTaskReset();
          snackbar.showSnackbar("Task not deleted", 'error');
        }
      },
      onError: error => {},
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
        router.push("/admin/tasks/create");
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
        router.push("/admin/tasks/" + selected[0].id + "/edit");
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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          publishTask({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => taskState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: taskState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          archiveTask({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => taskState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: taskState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteTask({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
