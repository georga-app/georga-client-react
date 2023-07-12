import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@/__generated__/gql';

import DataTable from '@/components/shared/DataTable'

import { DataTableHeadCell } from '@/types/DataTable'
import { PersonType } from '@/__generated__/graphql'

const ALL_PERSONS_QUERY = gql(`
  query ListPersons (
    $email: String
  ) {
    listPersons(
      email: $email
    ) {
      edges {
        node {
          email
          firstName
          lastName
          dateJoined
        }
      }
    }
  }
`);

const title = 'Persons';
const rowKey = 'email';
let columns: DataTableHeadCell<PersonType>[] = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'dateJoined',
    numeric: false,
    disablePadding: false,
    label: 'Date Joined',
  },
];

function PersonDataTable() {
  const [emailFilter, setEmailFilter] = useState("");
  columns[0].filter = setEmailFilter;

  const { data, loading } = useQuery(
    ALL_PERSONS_QUERY, {
      variables: {
        email: emailFilter,
      }
    }
  );
  let rows: PersonType[] = [];
  if (!loading && data?.listPersons?.edges)
    rows = data.listPersons.edges
      .map((edge) => edge?.node)
      .filter((node): node is PersonType => node !== undefined);

  return (
    <DataTable
      title={title}
      columns={columns}
      rows={rows}
      rowKey={rowKey}
    />
  );
}

export default PersonDataTable;
