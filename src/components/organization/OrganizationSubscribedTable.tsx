/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable'
import { GET_PERSON_ORGANIZATIONS_QUERY } from '@/gql/organization'

import {
  ActionSubscribeIcon,
  ActionUnsubscribeIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { OrganizationType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const title = 'Persons';
const rowKey = 'name';
let columns: DataTableColumn<OrganizationType>[] = [
  {
    id: 'icon',
    label: 'Logo',
    sortable: false,
    filterable: false,
    content: (data, row) =>
      <Box sx={{ width: { xs: 40, sm: 90 } }}>
        <Image
          alt="logo"
          src={'data:image/png;base64,' + data as string}
          height={0}
          width={0}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
  },
  {
    id: 'name',
    label: 'Name',
    grow: true,
    sortable: false,
    filterable: true,
  },
]

function OrganizationSubscribedTable() {

  // get
  const { data, loading } = useQuery(
    GET_PERSON_ORGANIZATIONS_QUERY, {
      variables: {}
    }
  );
  let rows: OrganizationType[] = [];
  if (!loading && data?.getPersonProfile?.organizationsSubscribed.edges)
    rows = data.getPersonProfile.organizationsSubscribed.edges
      .map((edge) => edge?.node)
      .filter((node): node is OrganizationType => node !== undefined);

  // actions
  const actions: DataTableActions<OrganizationType> = [
    {
      name: 'Subscribe',
      icon: <ActionSubscribeIcon />,
      priority: 10,
      action: (selected, event) => {},
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Unsubscribe',
      icon: <ActionUnsubscribeIcon />,
      priority: 10,
      action: (selected, event) => {},
      available: (selected) => (selected.length > 0),
      display: {
        row: true,
      }
    },
  ];

  // return
  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      actions={actions}
      header={false}
    />
  );
}

export default OrganizationSubscribedTable;
export { GET_PERSON_ORGANIZATIONS_QUERY };
