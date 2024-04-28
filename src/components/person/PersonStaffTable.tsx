/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { LIST_STAFF_PERSONS_QUERY } from '@/gql/person';

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
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  {
    id: 'aceSet',
    label: 'Permission',
    display: 'sm',
    sortable: false,
    filterable: true,
    content: (data: AceTypeConnection, row, filter) => {
      const aces = data.edges.map(edge => edge?.node).filter(onlyType);
      const acesOrganizations = aces.filter(ace => ace.instance.__typename === 'OrganizationType');
      const acesProjects = aces.filter(ace => ace.instance.__typename === 'ProjectType');
      const acesOperations = aces.filter(ace => ace.instance.__typename === 'OperationType');
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


function PersonStaffTable() {
  // provider
  const router = useRouter();
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_STAFF_PERSONS_QUERY, {
      variables: {
        organizationsEmployed: filter.organization,
      }
    }
  );
  let rows: PersonType[] = [];

  // effect
  if (!loading && data?.listPersons?.edges)
    rows = data.listPersons.edges.map((edge) => edge?.node as PersonType)

  // actions
  const actions: DataTableActions<PersonType> = [
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/staff/" + selected[0].id + "/edit");
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Remove',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          // deleteTask({
          //   variables: { id: entry.id }
          // })
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

export default PersonStaffTable;
