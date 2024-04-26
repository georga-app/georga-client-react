/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
// import { personState } from '@/app/states';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_PERSONS_QUERY } from '@/gql/person';

import {
  AceType,
  AceTypeConnection,
  PersonType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'
import { onlyType } from "@/types/Util";

// columns
const rowKey = 'id';
let columns: DataTableColumn<PersonType>[] = [
  {
    id: 'firstName',
    label: 'Name',
    sortable: true,
    filterable: true,
    content: (data, row) => row.firstName + " " + row.lastName
  },
  {
    id: 'email',
    label: 'Email',
    sortable: true,
    filterable: true,
  },
  {
    id: 'aceSet',
    label: 'Permission',
    sortable: false,
    filterable: true,
    content: (data: AceTypeConnection, row, filter) => {
      const aces = data.edges.map(edge => edge?.node).filter(onlyType);
      const acesOrganizations = aces.filter(ace =>
        ace.instance.__typename === 'OrganizationType'
        && ace.instance.id == filter.organization
      );
      const acesProjects = aces.filter(ace =>
        ace.instance.__typename === 'ProjectType'
        && ace.instance.organization.id == filter.organization
      );
      const acesOperations = aces.filter(ace =>
        ace.instance.__typename === 'OperationType'
        && ace.instance.project.organization.id == filter.organization
      );
      return <>
        {!!acesOrganizations?.length && <>
          <Typography sx={{ fontSize: 12, color: '#666', display: 'block' }}>
            Organizations
          </Typography>
          <List sx={{ padding: 0, margin: 0 }}>
            {acesOrganizations.map(ace =>
              <ListItem key={"ace-" + ace.id} sx={{ padding: '2px' }}>
                <Chip
                  size="small"
                  label={ace.permission.toLowerCase()}
                  color="success"
                  sx={{ fontSize: 12, marginRight: 1 }}
                />
                <Typography sx={{ fontSize: 12 }}>
                  {ace.instance.name}
                </Typography>
              </ListItem>
            )}
          </List>
        </>}
        {!!acesProjects?.length && <>
          <Typography sx={{ fontSize: 12, color: '#666', display: 'block' }}>
            Projects
          </Typography>
          <List sx={{ padding: 0, margin: 0 }}>
            {acesProjects.map(ace =>
              <ListItem key={"ace-" + ace.id} sx={{ padding: '2px' }}>
                <Chip
                  size="small"
                  label={ace.permission.toLowerCase()}
                  color="success"
                  sx={{ fontSize: 12, marginRight: 1 }}
                />
                <Typography sx={{ fontSize: 12 }}>
                  {ace.instance.name}
                </Typography>
              </ListItem>
            )}
          </List>
        </>}
        {!!acesOperations?.length && <>
          <Typography sx={{ fontSize: 12, color: '#666', display: 'block' }}>
            Operations
          </Typography>
          <List sx={{ padding: 0, margin: 0 }}>
            {acesOperations.map(ace =>
              <ListItem key={"ace-" + ace.id} sx={{ padding: '2px' }}>
                <Chip
                  size="small"
                  label={ace.permission.toLowerCase()}
                  color="success"
                  sx={{ fontSize: 12, marginRight: 1 }}
                />
                <Typography sx={{ fontSize: 12 }}>
                  {ace.instance.name}
                </Typography>
              </ListItem>
            )}
          </List>
        </>}
      </>
    }
  },
]


function PersonTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_PERSONS_QUERY, {
      variables: {
        organizationsEmployed: filter.organization,
      }
    }
  );
  let rows: PersonType[] = [];
  if (!loading && data?.listPersons?.edges)
    rows = data.listPersons.edges.map((edge) => edge?.node as PersonType)

  // actions
  const actions: DataTableActions<PersonType> = [
    // TODO
    // {
    //   name: 'Create',
    //   icon: <ActionCreateIcon />,
    //   priority: 10,
    //   action: (selected, setSelected, event) => {
    //     dialog.showDialog(
    //       // <TaskForm />,
    //       <></>,
    //       "Create Task"
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
    //       // <TaskForm taskId={selected[0].id} />,
    //       <></>,
    //       "Edit Task"
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
    //     && taskState.sources.PUBLISHED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: taskState,
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
    //     && taskState.sources.ARCHIVED.includes(selected[0].state)
    //   ),
    //   state: {
    //     transitions: taskState,
    //     target: 'ARCHIVED'
    //   }
    // },
    // {
    //   name: 'Operations',
    //   icon: <NavigationForwardIcon />,
    //   priority: 1000,
    //   action: (selected, setSelected, event) => {
    //     filter.setFilter(selected[0]);
    //   },
    //   available: (selected) => (selected.length == 1),
    //   display: {
    //     toolbar: false,
    //     row: true,
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

export default PersonTable;
