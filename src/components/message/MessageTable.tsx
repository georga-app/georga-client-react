/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs from "dayjs";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// import PersonForm from '@/components/person/PersonForm';
import DataTable from '@/components/shared/DataTable';
import { DateTime } from '@/components/shared/DateTime';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
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
  ActionSendIcon,
  ActionToggleArchiveIcon,
  MessageActivityIcon,
  MessageAlertIcon,
  MessageNewsIcon,
} from '@/theme/Icons';

import {
  LIST_MESSAGES_QUERY,
  PUBLISH_MESSAGE_MUTATION,
  ARCHIVE_MESSAGE_MUTATION,
  DELETE_MESSAGE_MUTATION,
  SEND_MESSAGE_MUTATION,
} from '@/gql/message';

import {
    GeorgaMessageEmailDeliveryChoices,
  GeorgaMessagePushDeliveryChoices,
  GeorgaMessageSmsDeliveryChoices,
  GeorgaMessageStateChoices,
  MessageType
} from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';


function DeliveryLabelText({
  state
}: {
  state: GeorgaMessageEmailDeliveryChoices
         | GeorgaMessagePushDeliveryChoices
         | GeorgaMessageSmsDeliveryChoices
}) {
  let label = state.toLowerCase();
  switch (state) {
    case "NONE": break;
    case "SCHEDULED": break;
    case "SENT": label = "ongoing"; break;
    case "SUCCEEDED": break;
    case "FAILED": break;
  }
  return label;
}

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
            <Typography sx={{ fontSize: 12 }}>{data.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.operation.name}</Typography>
          </>
        case "ShiftType":
          return <>
            <Typography sx={{ color: "#888", fontSize: 12 }}>Shift</Typography>
            <DateTime datetime={data.startTime} sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: 12 }}>{data.task.name}</Typography>
            <Typography sx={{ fontSize: 12 }}>{data.task.operation.name}</Typography>
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
      switch (data) {
        case "NONE":      color = "default"; break;
        case "SCHEDULED": color = "primary"; break;
        case "SENT":      color = "warning"; break;
        case "SUCCEEDED": color = "success"; break;
        case "FAILED":    color = "error";   break;
      }
      return (
        <Tooltip
          title=<>
            <Box>Email: <DeliveryLabelText state={row.emailDelivery} /></Box>
            <Box>Push:  <DeliveryLabelText state={row.pushDelivery} /> </Box>
            <Box>SMS:   <DeliveryLabelText state={row.smsDelivery} />  </Box>
          </>
        >
          <Chip
            size="small"
            // variant="outlined"
            label=<DeliveryLabelText state={data} />
            color={color as "default" | "success" | "error" | "warning"}
          />
        </Tooltip>
      )
    }
  },
]


function MessageTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // list messages
  const { data, loading } = useQuery(
    LIST_MESSAGES_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaMessageStateChoices.Archived]
          : [GeorgaMessageStateChoices.Draft, GeorgaMessageStateChoices.Published],
        organization: filter.getOrganization(),
      }
    }
  );
  let rows: MessageType[] = [];
  if (!loading && data?.listMessages?.edges)
    rows = data.listMessages.edges.map((edge) => edge?.node as MessageType)

  // publish message
  const [ publishMessage, {
    loading: publishMessageLoading,
    reset: publishMessageReset
  }] = useMutation(
    PUBLISH_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.publishMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          publishMessageReset();
          snackbar.showSnackbar("Message publishd", 'success');
        } else {
          publishMessageReset();
          snackbar.showSnackbar("Message not publishd", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListMessages"
      ]
    }
  );

  // archive message
  const [ archiveMessage, {
    loading: archiveMessageLoading,
    reset: archiveMessageReset
  }] = useMutation(
    ARCHIVE_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.archiveMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          archiveMessageReset();
          snackbar.showSnackbar("Message archived", 'success');
        } else {
          archiveMessageReset();
          snackbar.showSnackbar("Message not archived", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListMessages"
      ]
    }
  );

  // delete message
  const [ deleteMessage, {
    loading: deleteMessageLoading,
    reset: deleteMessageReset
  }] = useMutation(
    DELETE_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.deleteMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          deleteMessageReset();
          snackbar.showSnackbar("Message deleted", 'success');
        } else {
          deleteMessageReset();
          snackbar.showSnackbar("Message not deleted", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListMessages"
      ]
    }
  );

  // send message
  const [ sendMessage, {
    loading: sendMessageLoading,
    reset: sendMessageReset
  }] = useMutation(
    SEND_MESSAGE_MUTATION, {
      onCompleted: data => {
        const response = data.sendMessage;
        if (!response)
          return;
        if(response.errors.length === 0) {
          sendMessageReset();
          snackbar.showSnackbar("Message sent", 'success');
        } else {
          sendMessageReset();
          snackbar.showSnackbar("Message not sent", 'error');
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListMessages"
      ]
    }
  );

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
        router.push("/admin/messages/" + selected[0].id + "/edit");
      },
      available: (selected) => (
        selected.length == 1
        && selected[0].state == "DRAFT"
      ),
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
          publishMessage({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
      name: 'Send',
      icon: <ActionSendIcon />,
      priority: 45,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          sendMessage({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry =>
          entry.state === "PUBLISHED"
          && entry.delivery === "SCHEDULED"
        )
      ),
      display: {
        row: true,
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          archiveMessage({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && messageState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: messageState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteMessage({
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

export default MessageTable;
