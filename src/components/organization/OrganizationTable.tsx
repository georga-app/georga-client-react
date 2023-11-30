/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import OrganizationForm from '@/components/organization/OrganizationForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';

import { ActionCreateIcon } from '@/theme/Icons';
import { ActionDeleteIcon } from '@/theme/Icons';
import { ActionEditIcon } from '@/theme/Icons';
import { ActionPublishIcon } from '@/theme/Icons';

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

const rowKey = 'id';
let columns: DataTableColumn<OrganizationType>[] = [
  {
    id: 'icon',
    label: 'Logo',
    sortable: false,
    filterable: false,
    content: content =>
      <Image
        alt="logo"
        src={'data:image/png;base64,' + content as string}
        height={90}
        width={90}
      />
  },
  {
    id: 'name',
    label: 'Name',
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
  let actions: DataTableActions<OrganizationType> = [
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, event) => {
        dialog.showDialog(
          <OrganizationForm organizationId={selected[0].id} />,
          "Edit Organization"
        )
      },
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 40,
      action: (selected, event) => {},
      available: (selected) => false,
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
