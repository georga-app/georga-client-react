/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";

import { ActionEmploymentAddIcon, ActionViewIcon } from '@/theme/Icons';

import { LIST_SUBSCRIBER_PERSONS_QUERY, EMPLOY_PERSON_MUTATION } from '@/gql/person';

import { PersonType } from '@/types/__generated__/graphql'
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
]


function PersonSubscribedTable() {
  // provider
  const router = useRouter();
  const filter = useFilter();
  const snackbar = useSnackbar();

  // list subscriber persons
  const { data, loading } = useQuery(
    LIST_SUBSCRIBER_PERSONS_QUERY, {
      variables: {
        organizationsSubscribed: filter.organization,
        organizationsEmployed_Not: filter.organization,
      }
    }
  );
  let rows: PersonType[] = [];
  if (!loading && data?.listPersons?.edges)
    rows = data.listPersons.edges.map((edge) => edge?.node as PersonType)

  // employ person
  const [ employPerson, {
    loading: employPersonLoading,
    reset: employPersonReset
  }] = useMutation(
    EMPLOY_PERSON_MUTATION, {
      onCompleted: data => {
        const response = data.employPerson;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Person added to Staff", 'success');
          employPersonReset();
        } else {
          snackbar.showSnackbar("Person not added to Staff", 'error');
          employPersonReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListSubscriberPersons"
      ]
    }
  );

  // actions
  const actions: DataTableActions<PersonType> = [
    {
      name: 'Details',
      icon: <ActionViewIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/subscribers/" + selected[0].id);
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true
      },
    },
    {
      name: 'Add to Staff',
      icon: <ActionEmploymentAddIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          employPerson({
            variables: {
              id: entry.id,
              organization: filter.organization,
              employed: true,
            }
          })
        })
        setSelected([]);
      },
      available: (selected) => !!selected.length,
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

export default PersonSubscribedTable;
