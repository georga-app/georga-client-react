/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import DataTable from '@/components/shared/DataTable'

import { gql } from '@/types/__generated__/gql';
import { PersonType } from '@/types/__generated__/graphql'
import { DataTableColumn } from '@/types/DataTable'

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

function PersonTable() {
  const { data, loading } = useQuery(
    ALL_PERSONS_QUERY, {
      variables: {}
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

export default PersonTable;
