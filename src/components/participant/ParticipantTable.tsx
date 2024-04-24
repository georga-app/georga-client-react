/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// import ParticipantForm from '@/components/project/ParticipantForm';
import DataTable from '@/components/shared/DataTable';
import { useFilter, filterVariables } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { participantAcceptance, participantAdminAcceptance } from '@/app/states';

import {
  ActionAcceptIcon,
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeclineIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  ActionViewIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import {
  LIST_PARTICIPANTS_QUERY,
  ADMIN_ACCEPT_PARTICIPANT_MUTATION,
  ADMIN_DECLINE_PARTICIPANT_MUTATION,
} from '@/gql/participant';

import { ParticipantType, ListParticipantsQueryVariables } from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';

// columns
const rowKey = 'id';
let columns: DataTableColumn<ParticipantType>[] = [
  {
    id: 'role',
    label: 'Role',
    sortable: true,
    filterable: true,
    content: (data, row) => data.name,
  },
  {
    id: 'person',
    label: 'Person',
    sortable: true,
    filterable: true,
    content: (data, row) => data ? data.firstName + ' ' + data.lastName : ''
  },
  {
    id: 'acceptance',
    label: 'Acceptance',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let color = "warning";
      let label = "";
      switch (data) {
        case "PENDING": label = "pending"; color = "warning"; break;
        case "ACCEPTED": label = "accepted"; color = "success"; break;
        case "DECLINED": label = "declined"; color = "error"; break;
      }
      return (
        <Chip
          size="small"
          label={label}
          color={color as "success" | "error" | "warning"}
        />
      )
    }
  },
  {
    id: 'adminAcceptance',
    label: 'Admin Acceptance',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let color = "warning";
      let label = "";
      switch (data) {
        case "PENDING": label = "pending"; color = "warning"; break;
        case "ACCEPTED": label = "accepted"; color = "success"; break;
        case "DECLINED": label = "declined"; color = "error"; break;
      }
      return (
        <Chip
          size="small"
          label={label}
          color={color as "success" | "error" | "warning"}
        />
      )
    }
  },
]

function ParticipantTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // list participants
  const { data, loading } = useQuery(
    LIST_PARTICIPANTS_QUERY, {
      variables: {
        organization: filter.getOrganization(),
        ... filterVariables.participant(filter.object)
      }
    }
  );
  let rows: ParticipantType[] = [];
  if (!loading && data?.listParticipants?.edges)
    rows = data.listParticipants.edges
      .map((edge) => edge?.node)
      .filter((node): node is ParticipantType => node !== undefined);

  // admin accept participant
  const [ adminAcceptParticipant, {
    loading: adminAcceptParticipantLoading,
    reset: adminAcceptParticipantReset
  }] = useMutation(
    ADMIN_ACCEPT_PARTICIPANT_MUTATION, {
      onCompleted: data => {
        const response = data.adminAcceptParticipant;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Participant accepted", 'success');
          adminAcceptParticipantReset();
        } else {
          snackbar.showSnackbar("Participant not accepted", 'error');
          adminAcceptParticipantReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListParticipants"
      ]
    }
  );

  // admin decline participant
  const [ adminDeclineParticipant, {
    loading: adminDeclineParticipantLoading,
    reset: adminDeclineParticipantReset
  }] = useMutation(
    ADMIN_DECLINE_PARTICIPANT_MUTATION, {
      onCompleted: data => {
        const response = data.adminDeclineParticipant;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Participant declined", 'success');
          adminDeclineParticipantReset();
        } else {
          snackbar.showSnackbar("Participant not declined", 'error');
          adminDeclineParticipantReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListParticipants"
      ]
    }
  );

  // actions
  const actions: DataTableActions<ParticipantType> = [
    {
      name: 'Accept',
      icon: <ActionAcceptIcon sx={{ color: "#2e7d32", fontSize: "2rem" }} />,
      priority: 10,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          adminAcceptParticipant({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry =>
          !!entry.adminAcceptance
          && entry.acceptance === "ACCEPTED"
          && participantAdminAcceptance.sources.ACCEPTED.includes(entry.adminAcceptance)
        )
      ),
      state: {
        transitions: participantAdminAcceptance,
        target: 'ACCEPTED'
      },
      display: {
        row: true,
      }
    },
    {
      name: 'Decline',
      icon: <ActionDeclineIcon sx={{ color: "#d32f2f", fontSize: "2rem" }} />,
      priority: 20,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          adminDeclineParticipant({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry =>
          !!entry.adminAcceptance
          && entry.acceptance === "ACCEPTED"
          && participantAdminAcceptance.sources.DECLINED.includes(entry.adminAcceptance)
        )
      ),
      state: {
        transitions: participantAdminAcceptance,
        target: 'DECLINED'
      },
      display: {
        row: true,
      }
    },
    {
      name: 'Details',
      icon: <ActionViewIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/participants/" + selected[0].id);
      },
      available: (selected) => (selected.length == 1),
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

export default ParticipantTable;
