/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";

import {
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
} from '@/theme/Icons';

import {
  LIST_PERSON_PROPERTY_GROUPS_QUERY,
  DELETE_PERSON_PROPERTY_GROUP_MUTATION,
} from '@/gql/personPropertyGroup';

import {
  PersonPropertyGroupType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'
import { onlyType } from "@/types/Util";

// columns
const rowKey = 'id';
let columns: DataTableColumn<PersonPropertyGroupType>[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'selectionType',
    label: 'Type',
    display: 'sm',
    sortable: true,
    filterable: true,
    content: (data, row) => {
      switch(data) {
        case "MULTISELECT": return "Multiple Choice";
        case "SINGLESELECT": return "Single Select";
      }
    },
  },
  {
    id: 'personpropertySet',
    label: 'Options',
    display: 'sm',
    sortable: false,
    filterable: true,
    content: (data: PersonPropertyGroupType['personpropertySet'], row) => (
      <List sx={{ fontSize: 10, padding: 0 }}>
        {data.edges.map((edge) => edge?.node).filter(onlyType).map(property =>
          <ListItem key={property.id} sx={{ padding: 0 }}>
            {property.name}
          </ListItem>
        )}
      </List>
    )
  },
]

function QualificationTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // list person property groups
  const { data, loading } = useQuery(
    LIST_PERSON_PROPERTY_GROUPS_QUERY, {
      variables: {
        organization: filter.organization
      }
    }
  );
  let rows: PersonPropertyGroupType[] = [];
  if (!loading && data?.listPersonPropertyGroups?.edges)
    rows = data.listPersonPropertyGroups.edges
      .map((edge) => edge?.node)
      .filter((node): node is PersonPropertyGroupType => node !== undefined);

  // delete person property group
  const [ deletePersonPropertyGroup, {
    loading: deletePersonPropertyGroupLoading,
    reset: deletePersonPropertyGroupReset
  }] = useMutation(
    DELETE_PERSON_PROPERTY_GROUP_MUTATION, {
      onCompleted: data => {
        const response = data.deletePersonPropertyGroup;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Qualification deleted", 'success');
          deletePersonPropertyGroupReset();
        } else {
          snackbar.showSnackbar("Qualification not deleted", 'error');
          deletePersonPropertyGroupReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListPersonPropertyGroups"
      ]
    }
  );

  // actions
  const actions: DataTableActions<PersonPropertyGroupType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/qualifications/create");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        router.push("/admin/qualifications/" + selected[0].id + "/edit");
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deletePersonPropertyGroup({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
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

export default QualificationTable;
