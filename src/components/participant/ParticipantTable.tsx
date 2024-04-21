/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// import ParticipantForm from '@/components/project/ParticipantForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { participantAcceptance, participantAdminAcceptance } from '@/app/states';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_PARTICIPANTS_QUERY } from '@/gql/participant';

import { ParticipantType, ListParticipantsQueryVariables } from '@/types/__generated__/graphql';
import { DataTableColumn, DataTableActions } from '@/types/DataTable';

// columns
const rowKey = 'id';
let columns: DataTableColumn<ParticipantType>[] = [
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
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let color = "warning";
      switch (data) {
        case "ACCEPTED": color = "success"; break;
        case "DECLINED": color = "error"; break;
      }
      return (
        <Chip
          label={data}
          color={color as "success" | "error" | "warning"}
        />
      )
    }
  },
  {
    id: 'adminAcceptance',
    label: 'Admin Acceptance',
    // display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      let color = "warning";
      switch (data) {
        case "ACCEPTED": color = "success"; break;
        case "DECLINED": color = "error"; break;
      }
      return (
        <Chip
          label={data}
          color={color as "success" | "error" | "warning"}
        />
      )
    }
  },
  // TODO
]


function ParticipantTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();

  // filter
  let filterVariables: ListParticipantsQueryVariables = {}
  switch ( filter?.object?.__typename ) {
    case "OrganizationType":
      filterVariables.organization = filter.object.id; break;
    case "ProjectType":
      filterVariables.project = filter.object.id; break
    case "OperationType":
      filterVariables.operation = filter.object.id; break
    case "TaskType":
      filterVariables.task = filter.object.id; break
    case "ShiftType":
      filterVariables.shift = filter.object.id; break
  }

  // get
  const { data, loading } = useQuery(
    LIST_PARTICIPANTS_QUERY, {
      variables: filterVariables
    }
  );
  let rows: ParticipantType[] = [];
  if (!loading && data?.listParticipants?.edges)
    rows = data.listParticipants.edges
      .map((edge) => edge?.node)
      .filter((node): node is ParticipantType => node !== undefined);

  // actions
  const actions: DataTableActions<ParticipantType> = [
    // TODO
    // {
    //   name: 'Create',
    //   icon: <ActionCreateIcon />,
    //   priority: 10,
    //   action: (selected, setSelected, event) => {
    //     dialog.showDialog(
    //       // <ParticipantForm />,
    //       <></>,
    //       "Create Shift"
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
    //       // <ParticipantForm shiftId={selected[0].id} />,
    //       <></>,
    //       "Edit Shift"
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
    //     && participantAcceptance.sources.PUBLISHED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: participantAcceptance,
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
    //     && participantAcceptance.sources.ARCHIVED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: participantAcceptance,
    //     target: 'ARCHIVED'
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

export default ParticipantTable;
