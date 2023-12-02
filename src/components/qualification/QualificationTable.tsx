/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

// import QualificationForm from '@/components/qualification/QualificationForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';

import {  // TODO
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionPublishIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import {
  PersonPropertyType,
  PersonPropertyGroupType,
  GeorgaPersonPropertyGroupNecessityChoices,
  GeorgaPersonPropertyGroupSelectionTypeChoices,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_QUALIFICATIONS_QUERY = gql(`
  query ListQualifications {
    listPersonPropertyGroups {
      edges {
        node {
          id
          name
          selectionType
          necessity
          personpropertySet {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`);

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
  },
  {
    id: 'necessity',
    label: 'Necessity',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
  // TODO
]


function QualificationTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();

  // get
  const { data, loading } = useQuery(
    LIST_QUALIFICATIONS_QUERY, {
      variables: {}
    }
  );
  let rows: PersonPropertyGroupType[] = [];
  if (!loading && data?.listPersonPropertyGroups?.edges)
    rows = data.listPersonPropertyGroups.edges
      .map((edge) => edge?.node)
      .filter((node): node is PersonPropertyGroupType => node !== undefined);

  // actions
  const actions: DataTableActions<PersonPropertyGroupType> = [
    // TODO
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, event) => {
        dialog.showDialog(
          // <QualificationForm />,
          <></>,
          "Create Qualification"
        )
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, event) => {
        dialog.showDialog(
          // <QualificationForm personPropertyGroupId={selected[0].id} />,
          <></>,
          "Edit Qualification"
        )
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
      action: (selected, event) => {},
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
