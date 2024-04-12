/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter, filterVariables } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { operationState } from '@/app/states';

import {
  LIST_OPERATIONS_QUERY,
  PUBLISH_OPERATION_MUTATION,
  ARCHIVE_OPERATION_MUTATION,
  DELETE_OPERATION_MUTATION,
} from '@/gql/operation'

import {
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
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // get
  const { data, loading } = useQuery(
    LIST_OPERATIONS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaOperationStateChoices.Archived]
          : [GeorgaOperationStateChoices.Draft, GeorgaOperationStateChoices.Published],
        ... filterVariables.operation(filter.object)
      }
    }
  );
  let rows: OperationType[] = [];
  if (!loading && data?.listOperations?.edges)
    rows = data.listOperations.edges
      .map((edge) => edge?.node)
      .filter((node): node is OperationType => node !== undefined);

  // publish
  const [ publishOperation, {
    loading: publishOperationLoading,
    reset: publishOperationReset
  }] = useMutation(
    PUBLISH_OPERATION_MUTATION, {
      onCompleted: data => {
        const response = data.publishOperation;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Operation published", 'success');
          publishOperationReset();
        } else {
          snackbar.showSnackbar("Operation not published", 'error');
          publishOperationReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListOperations"
      ]
    }
  );

  // archive
  const [ archiveOperation, {
    loading: archiveOperationLoading,
    reset: archiveOperationReset
  }] = useMutation(
    ARCHIVE_OPERATION_MUTATION, {
      onCompleted: data => {
        const response = data.archiveOperation;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Operation archived", 'success');
          archiveOperationReset();
        } else {
          snackbar.showSnackbar("Operation not archived", 'error');
          archiveOperationReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListOperations"
      ]
    }
  );

  // delete
  const [ deleteOperation, {
    loading: deleteOperationLoading,
    reset: deleteOperationReset
  }] = useMutation(
    DELETE_OPERATION_MUTATION, {
      onCompleted: data => {
        const response = data.deleteOperation;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Operation deleted", 'success');
          deleteOperationReset();
        } else {
          snackbar.showSnackbar("Operation not deleted", 'error');
          deleteOperationReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListOperations"
      ]
    }
  );

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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          publishOperation({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          archiveOperation({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteOperation({
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
