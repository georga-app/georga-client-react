/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';

import OrganizationForm from '@/components/organization/OrganizationForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { organizationState } from '@/app/states';

import {
  ActionArchiveIcon,
  ActionCreateIcon,
  ActionDeleteIcon,
  ActionEditIcon,
  ActionNotifyIcon,
  ActionPublishIcon,
  ActionToggleArchiveIcon,
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import {
  GeorgaOrganizationStateChoices,
  OrganizationType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_ORGANIZATIONS_QUERY = gql(`
  query ListOrganizations (
    $state_In: [GeorgaOrganizationStateChoices]
  ) {
    listOrganizations (
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          name
          icon
          description
        }
      }
    }
  }
`);

// columns
const rowKey = 'id';
let columns: DataTableColumn<OrganizationType>[] = [
  {
    id: 'icon',
    label: 'Logo',
    shrink: true,
    sortable: false,
    filterable: false,
    content: (data, row) =>
      <Box sx={{ width: { xs: 40, sm: 90 } }}>
        <Image
          alt="logo"
          src={'data:image/png;base64,' + data as string}
          height={0}
          width={0}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
  },
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    id: 'description',
    label: 'Description',
    display: 'sm',
    sortable: true,
    filterable: true,
  },
]


function OrganizationTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();

  // states
  const [archive, setArchive] = useState(false);

  // get
  const { data, loading } = useQuery(
    LIST_ORGANIZATIONS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaOrganizationStateChoices.Archived]
          : [GeorgaOrganizationStateChoices.Draft, GeorgaOrganizationStateChoices.Published],
      }
    }
  );
  let rows: OrganizationType[] = [];
  if (!loading && data?.listOrganizations?.edges)
    rows = data.listOrganizations.edges
      .map((edge) => edge?.node)
      .filter((node): node is OrganizationType => node !== undefined);

  // actions
  const actions: DataTableActions<OrganizationType> = [
    // {
    //   name: 'Create',
    //   icon: <ActionCreateIcon />,
    //   priority: 10,
    //   action: (selected, setSelected, event) => {
    //     router.push("/admin/organizations/create");
    //   },
    //   available: (selected) => (selected.length == 0),
    // },
    {
      name: archive ? "Close Archive" : "Open Archive",
      icon: archive ? <ActionArchiveIcon /> : <ActionToggleArchiveIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        setArchive(archive ? false : true);
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 30,
      action: (selected, setSelected, event) => {
        router.push("/admin/organizations/" + selected[0].id + "/edit");
      },
      available: (selected) => (selected.length == 1),
      display: {
        row: true,
      }
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 40,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => organizationState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: organizationState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => organizationState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: organizationState,
        target: 'ARCHIVED'
      }
    },
    // {
    //   name: 'Delete',
    //   icon: <ActionDeleteIcon />,
    //   priority: 100,
    //   action: (selected, setSelected, event) => {},
    //   available: (selected) => (selected.length > 0),
    // },
    {
      name: 'Message',
      icon: <ActionNotifyIcon />,
      priority: 200,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Projects',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/projects");
      },
      available: (selected) => (selected.length == 1),
      display: {
        toolbar: false,
        row: true,
      }
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

export default OrganizationTable;
export { LIST_ORGANIZATIONS_QUERY };
