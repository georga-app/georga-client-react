/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
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

import {
  LIST_ADMIN_ORGANIZATIONS_QUERY,
  PUBLISH_ORGANIZATION_MUTATION,
  ARCHIVE_ORGANIZATION_MUTATION,
} from '@/gql/organization'

import {
  GeorgaOrganizationStateChoices,
  OrganizationType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

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
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // list organizations
  const { data, loading } = useQuery(
    LIST_ADMIN_ORGANIZATIONS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaOrganizationStateChoices.Archived]
          : [GeorgaOrganizationStateChoices.Draft, GeorgaOrganizationStateChoices.Published],
      }
    }
  );
  let rows: OrganizationType[] = [];
  if (!loading && data?.getPersonProfile?.organizationsEmployed.edges)
    rows = data.getPersonProfile.organizationsEmployed.edges
      .map((edge) => edge?.node)
      .filter((node): node is OrganizationType => node !== undefined);

  // publish organization
  const [ publishOrganization, {
    loading: publishOrganizationLoading,
    reset: publishOrganizationReset
  }] = useMutation(
    PUBLISH_ORGANIZATION_MUTATION, {
      onCompleted: data => {
        const response = data.publishOrganization;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Organization published", 'success');
          publishOrganizationReset();
        } else {
          snackbar.showSnackbar("Organization not published", 'error');
          publishOrganizationReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListOrganizations"
      ]
    }
  );

  // archive organization
  const [ archiveOrganization, {
    loading: archiveOrganizationLoading,
    reset: archiveOrganizationReset
  }] = useMutation(
    ARCHIVE_ORGANIZATION_MUTATION, {
      onCompleted: data => {
        const response = data.archiveOrganization;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Organization archiveed", 'success');
          archiveOrganizationReset();
        } else {
          snackbar.showSnackbar("Organization not archiveed", 'error');
          archiveOrganizationReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListOrganizations"
      ]
    }
  );

  // actions
  const actions: DataTableActions<OrganizationType> = [
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
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          publishOrganization({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
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
      action: (selected, setSelected, event) => {
        archiveOrganization({
          variables: { id: selected[0].id }
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => organizationState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: organizationState,
        target: 'ARCHIVED'
      }
    },
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
      action: async (selected, setSelected, event) => {
        await filter.setOrganization(selected[0].id);
        await filter.setFilter(selected[0].id);
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
