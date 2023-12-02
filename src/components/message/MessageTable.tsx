/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import PersonForm from '@/components/person/PersonForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import {
  messageState,
  messageEmailDelivery,
  messagePushDelivery,
  messageSmsDelivery,
} from '@/app/states';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { MessageType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_MESSAGES_QUERY = gql(`
  query ListMessages {
    listMessages {
      edges {
        node {
          title
          priority
          category
          state
          delivery
          scope {
            __typename
            ... on OrganizationType {
              ... OrganizationParts
            }
            ... on ProjectType {
              ... ProjectParts
            }
            ... on OperationType {
              ... OperationParts
            }
            ... on TaskType {
              ... TaskParts
            }
            ... on ShiftType {
              ... ShiftParts
            }
          }
        }
      }
    }
  }
`);

// columns
const rowKey = 'id';
let columns: DataTableColumn<MessageType>[] = [
  {
    id: 'category',
    label: 'Category',
    sortable: true,
    filterable: true,
  },
  {
    id: 'title',
    label: 'Title',
    sortable: true,
    filterable: true,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  {
    id: 'state',
    label: 'State',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  {
    id: 'priority',
    label: 'Priority',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  // TODO
]


function MessageTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_MESSAGES_QUERY, {
      variables: {}
    }
  );
  let rows: MessageType[] = [];
  if (!loading && data?.listMessages?.edges)
    rows = data.listMessages.edges
      .map((edge) => edge?.node)
      .filter((node): node is MessageType => node !== undefined);

  // actions
  const actions: DataTableActions<MessageType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, event) => {
        dialog.showDialog(
          // <MessageForm />,
          <></>,
          "Create Message"
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
          // <MessageForm messageId={selected[0].id} />,
          <></>,
          "Edit Message"
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
        && messageState.sources.PUBLISHED.includes(selected[0].state)
      ),
      state: {
        transitions: messageState,
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
        && messageState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: messageState,
        target: 'ARCHIVED'
      }
    },
    // TODO
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

export default MessageTable;
