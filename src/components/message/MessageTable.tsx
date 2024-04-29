/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// import PersonForm from '@/components/person/PersonForm';
import DataTable from '@/components/shared/DataTable';
import { DateTime } from '@/components/shared/DateTime';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import {
  messageState,
  messageEmailDelivery,
  messagePushDelivery,
  messageSmsDelivery,
} from '@/app/states';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  MessageActivityIcon,
  MessageAlertIcon,
  MessageNewsIcon,
} from '@/theme/Icons';

import { LIST_MESSAGES_QUERY } from '@/gql/message';

import { MessageType } from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';

// columns
const rowKey = 'id';
let columns: DataTableColumn<MessageType>[] = [
  {
    id: 'category',
    label: '',
    sortable: true,
    filterable: true,
    shrink: true,
    content: (data, row) => {
      let Icon = MessageActivityIcon;
      switch (data) {
        case "ACTIVITY":  Icon = MessageActivityIcon; break;
        case "NEWS":      Icon = MessageNewsIcon; break;
        case "ALERT":     Icon = MessageAlertIcon; break;
      }
      let color = "#777";
      switch (row.priority) {
        case "LOW":       color = "#bbb"; break;
        case "NORMAL":    color = "primary.light"; break;
        case "IMPORTANT": color = "warning.main"; break;
        case "URGENT":    color = "error.main"; break;
      }
      return (
        <Tooltip
          title=<>
            <Box>Category: {data.toLowerCase()}</Box>
            <Box>Priority: {row.priority.toLowerCase()}</Box>
          </>
        >
          <Icon sx={{ color: color, fontSize: 40 }} />
        </Tooltip>
      )
    }
  },
  {
    id: 'title',
    label: 'Title',
    sortable: true,
    filterable: true,
  },
  {
    id: 'scope',
    label: 'Scope',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      switch (data.__typename) {
        case "OrganizationType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Organization</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.name}</Typography>
          </>
        case "ProjectType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Project</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.name}</Typography>
          </>
        case "OperationType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Operation</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.name}</Typography>
          </>
        case "TaskType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Task</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.operation.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.name}</Typography>
          </>
        case "ShiftType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Shift</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.task.operation.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.task.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>
              <DateTime datetime={data.startTime} />
            </Typography>
          </>
      }
      return "";
    },
  },
  {
    id: 'delivery',
    label: 'Delivery',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let color = "warning";
      let label = "";
      switch (data) {
        case "NONE":      color = "default"; break;
        case "SCHEDULED": color = "warning"; break;
        case "SENT":      color = "warning"; break;
        case "SUCCEEDED": color = "success"; break;
        case "FAILED":    color = "error"; break;
      }
      return (
        <Tooltip
          title=<>
            <Box>Email: {row.emailDelivery.toLowerCase()}</Box>
            <Box>Push: {row.pushDelivery.toLowerCase()}</Box>
            <Box>SMS: {row.smsDelivery.toLowerCase()}</Box>
          </>
        >
          <Chip
            size="small"
            // variant="outlined"
            label={data.toLowerCase()}
            color={color as "default" | "success" | "error" | "warning"}
          />
        </Tooltip>
      )
    }
  },
]


function MessageTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // get
  const { data, loading } = useQuery(
    LIST_MESSAGES_QUERY, {
      variables: {}
    }
  );
  let rows: MessageType[] = [];
  if (!loading && data?.listMessages?.edges)
    rows = data.listMessages.edges.map((edge) => edge?.node as MessageType)

  // actions
  const actions: DataTableActions<MessageType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/messages/create");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        router.push("/admin/messages/" + selected[0].id + "/edit");
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
      action: (selected, setSelected, event) => {},
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
