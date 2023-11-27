/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation } from '@apollo/client';

import FilterListIcon from '@mui/icons-material/FilterList';

import DataTable from '@/components/shared/DataTable'

import { gql } from '@/__generated__/gql';
import { OrganizationType } from '@/__generated__/graphql'
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
  const [success, setSuccess] = useState(false);

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

  let actions: DataTableActions<OrganizationType> = [
    {
      icon: <FilterListIcon />,
      name: 'Action 1',
      priority: 10,
      action: (rows, event) => {console.log("action 1", rows)},
      available: () => true,
    },
    {
      icon: <FilterListIcon />,
      name: 'Action 2',
      priority: 30,
      action: () => undefined,
      available: () => true,
    },
    {
      icon: <FilterListIcon />,
      name: 'Action 3',
      priority: 20,
      action: () => undefined,
      available: (rows, num) => !!num,
    },
    {
      icon: <FilterListIcon />,
      name: 'Action 4',
      priority: 1,
      action: () => undefined,
      available: () => false,
    },
    {
      icon: <FilterListIcon />,
      name: 'Action 5',
      priority: 100,
      action: () => undefined,
      available: () => true,
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
