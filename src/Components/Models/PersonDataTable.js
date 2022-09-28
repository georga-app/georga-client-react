import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import DataTable from '../Shared/DataTable'

const ALL_PERSONS_QUERY = gql`
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
`;

const title = 'Persons';
const rowKey = 'email';
let headCells = [
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
  headCells[0].filter = setEmailFilter;

  const { data, loading } = useQuery(
    ALL_PERSONS_QUERY, {
      variables: {
        email: emailFilter,
      }
    }
  );
  let rows = [];
  if (!loading)
    rows = data.listPersons?.edges.map((edge) => (edge.node));

  return (
    <DataTable
      title={title}
      headCells={headCells}
      rows={rows}
      rowKey={rowKey}
    />
  );
}

export default PersonDataTable;
