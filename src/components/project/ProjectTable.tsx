/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import DataTable from '@/components/shared/DataTable';
import { useFilter, filterVariables } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { projectState } from '@/app/states';

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
  LIST_PROJECTS_QUERY,
  PUBLISH_PROJECT_MUTATION,
  ARCHIVE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
} from '@/gql/project'

import {
  GeorgaProjectStateChoices,
  ProjectType,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

// columns
const rowKey = 'id';
let columns: DataTableColumn<ProjectType>[] = [
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

function ProjectTable() {
  // provider
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // list projects
  const { data, loading } = useQuery(
    LIST_PROJECTS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaProjectStateChoices.Archived]
          : [GeorgaProjectStateChoices.Draft, GeorgaProjectStateChoices.Published],
        ... filterVariables.project(filter.object)
      }
    }
  );
  let rows: ProjectType[] = [];
  if (!loading && data?.listProjects?.edges)
    rows = data.listProjects.edges
      .map((edge) => edge?.node)
      .filter((node): node is ProjectType => node !== undefined);

  // publish project
  const [ publishProject, {
    loading: publishProjectLoading,
    reset: publishProjectReset
  }] = useMutation(
    PUBLISH_PROJECT_MUTATION, {
      onCompleted: data => {
        const response = data.publishProject;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Project published", 'success');
          publishProjectReset();
        } else {
          snackbar.showSnackbar("Project not published", 'error');
          publishProjectReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListProjects"
      ]
    }
  );

  // archive project
  const [ archiveProject, {
    loading: archiveProjectLoading,
    reset: archiveProjectReset
  }] = useMutation(
    ARCHIVE_PROJECT_MUTATION, {
      onCompleted: data => {
        const response = data.archiveProject;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Project archived", 'success');
          archiveProjectReset();
        } else {
          snackbar.showSnackbar("Project not archived", 'error');
          archiveProjectReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListProjects"
      ]
    }
  );

  // delete project
  const [ deleteProject, {
    loading: deleteProjectLoading,
    reset: deleteProjectReset
  }] = useMutation(
    DELETE_PROJECT_MUTATION, {
      onCompleted: data => {
        const response = data.deleteProject;
        if (!response)
          return;
        if(response.errors.length === 0) {
          snackbar.showSnackbar("Project deleted", 'success');
          deleteProjectReset();
        } else {
          snackbar.showSnackbar("Project not deleted", 'error');
          deleteProjectReset();
        }
      },
      onError: error => {},
      refetchQueries: [
        "ListProjects"
      ]
    }
  );

  // actions
  const actions: DataTableActions<ProjectType> = [
    {
      name: 'Create',
      icon: <ActionCreateIcon />,
      priority: 10,
      action: (selected, setSelected, event) => {
        router.push("/admin/projects/create");
      },
      available: (selected) => (selected.length == 0),
    },
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
        router.push("/admin/projects/" + selected[0].id + "/edit");
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
          publishProject({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => projectState.sources.PUBLISHED.includes(entry.state))
      ),
      state: {
        transitions: projectState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 50,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          archiveProject({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (
        selected.length > 0
        && selected.every(entry => projectState.sources.ARCHIVED.includes(entry.state))
      ),
      state: {
        transitions: projectState,
        target: 'ARCHIVED'
      }
    },
    {
      name: 'Delete',
      icon: <ActionDeleteIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {
        selected.forEach(entry => {
          deleteProject({
            variables: { id: entry.id }
          })
        })
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Message',
      icon: <ActionNotifyIcon />,
      priority: 200,
      action: (selected, setSelected, event) => {},
      available: (selected) => (selected.length == 1),
    },
    {
      name: 'Operations',
      icon: <NavigationForwardIcon />,
      priority: 1000,
      action: (selected, setSelected, event) => {
        filter.setFilter(selected[0].id);
        router.push("/admin/operations");
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

export default ProjectTable;
