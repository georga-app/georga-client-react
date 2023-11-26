/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation } from '@apollo/client';

import DataTable from '@/components/shared/DataTable'

import { gql } from '@/__generated__/gql';
import { OrganizationType } from '@/__generated__/graphql'
import { DataTableColumn } from '@/types/DataTable'

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

const rowKey = 'name';
let columns: DataTableColumn<OrganizationType>[] = [
  {
    id: 'icon',
    label: 'Logo',
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
  },
]


function PersonOrganizationTable() {
  const [success, setSuccess] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  columns[1].filter = setNameFilter;

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

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      header={true}
    />
  );
}

export default PersonOrganizationTable;
