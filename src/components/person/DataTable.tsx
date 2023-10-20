import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@/__generated__/gql';

import DataTable from '@/components/shared/DataTable'

import { DataTableColumn } from '@/types/DataTable'
import { PersonType } from '@/__generated__/graphql'

const ALL_PERSONS_QUERY = gql(`
  query ListPersons (
    $email_Icontains: String
  ) {
    listPersons(
      email_Icontains: $email_Icontains
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
let columns: DataTableColumn<PersonType>[] = [
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'firstName',
    label: 'First Name',
  },
  {
    id: 'lastName',
    label: 'Last Name',
  },
  {
    id: 'dateJoined',
    label: 'Date Joined',
  },
];

function PersonDataTable() {
  const [emailFilter, setEmailFilter] = useState("");
  columns[0].filter = setEmailFilter;

  const { data, loading } = useQuery(
    ALL_PERSONS_QUERY, {
      variables: {
        email_Icontains: emailFilter,
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
