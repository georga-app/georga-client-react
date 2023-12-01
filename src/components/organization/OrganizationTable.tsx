/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

import OrganizationForm from '@/components/organization/OrganizationForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';

import {
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { OrganizationType } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_ORGANIZATIONS_QUERY = gql(`
  query ListOrganizations {
    listOrganizations {
      edges {
        node {
          id
          name
          icon
          description
        }
      }
    }
  }
`);

// columns
const rowKey = 'id';
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
          // sizes='100vw'
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
    sortable: true,
    filterable: true,
  },
]


function OrganizationTable() {
  const dialog = useDialog();

  // getPersonOrganizations
  const { data, loading } = useQuery(
    LIST_ORGANIZATIONS_QUERY, {
      variables: {}
    }
  );
  let rows: OrganizationType[] = [];
  if (!loading && data?.listOrganizations?.edges)
    rows = data.listOrganizations.edges
      .map((edge) => edge?.node)
      .filter((node): node is OrganizationType => node !== undefined);

  // actions
  const actions: DataTableActions<OrganizationType> = [
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 10,
      action: (selected, event) => {
        dialog.showDialog(
          <OrganizationForm organizationId={selected[0].id} />,
          "Edit Organization"
        )
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 100,
      action: (selected, event) => {},
      available: (selected) => false,
    },
    {
      name: 'Enter',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, event) => {},
      display: {
        toolbar: false,
        row: true,
      }
    },
  ];

  return (
    <DataTable
      title="Organizations"
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      actions={actions}
    />
  );
}

export default OrganizationTable;
