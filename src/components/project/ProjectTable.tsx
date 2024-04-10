/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';

import ProjectForm from '@/components/project/ProjectForm';
import DataTable from '@/components/shared/DataTable';
import { useDialog } from '@/provider/Dialog';
import { useFilter } from '@/provider/Filter';
import { useSnackbar } from "@/provider/Snackbar";
import { projectState } from '@/app/states';

import {  // TODO
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
  GeorgaProjectStateChoices,
  ProjectType,
  ListProjectsQueryVariables,
} from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_PROJECTS_QUERY = gql(`
  query ListProjects (
    $organization: ID
    $state_In: [GeorgaProjectStateChoices]
  ) {
    listProjects (
      organization: $organization
      state_In: $state_In
    ) {
      edges {
        node {
          id
          state
          name
          description
        }
      }
    }
  }
`);

const DELETE_PROJECT_MUTATION = gql(`
  mutation DeleteProject (
    $id: ID!
  ) {
    deleteProject (
      input: {
        id: $id
      }
    ) {
      project {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

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

// filter
const filterVariables = (filter: any) => {
  let filterVariables: ListProjectsQueryVariables = {}
  switch ( filter?.object?.__typename ) {
    case "OrganizationType":
      filterVariables.organization = filter.object.id; break;
    case "ProjectType":
      filterVariables.organization = filter.object.organization.id; break
    case "OperationType":
      filterVariables.organization = filter.object.project.organization.id; break
    case "TaskType":
      filterVariables.organization = filter.object.operation.project.organization.id; break
    case "ShiftType":
      filterVariables.organization = filter.object.task.operation.project.organization.id; break
  }
  return filterVariables;
}

function ProjectTable() {
  // provider
  const dialog = useDialog();
  const filter = useFilter();
  const router = useRouter();
  const snackbar = useSnackbar();

  // states
  const [archive, setArchive] = useState(false);

  // get
  const { data, loading } = useQuery(
    LIST_PROJECTS_QUERY, {
      variables: {
        state_In: archive
          ? [GeorgaProjectStateChoices.Archived]
          : [GeorgaProjectStateChoices.Draft, GeorgaProjectStateChoices.Published],
        ... filterVariables(filter)
      }
    }
  );
  let rows: ProjectType[] = [];
  if (!loading && data?.listProjects?.edges)
    rows = data.listProjects.edges
      .map((edge) => edge?.node)
      .filter((node): node is ProjectType => node !== undefined);

  // delete
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
          deleteProjectReset();
          // setErrors({});
          // setChanged({});
          snackbar.showSnackbar("Project deleted", 'success');
          // onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          // setErrors(fieldErrors);
          deleteProjectReset();
          // onError(data);
        }
      },
      // onError: error => {
      //   setErrors({form: error.message});
      // },
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
      action: (selected, setSelected, event) => {},
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
      action: (selected, setSelected, event) => {},
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
        deleteProject({
          variables: { id: selected[0].id }
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
export { LIST_PROJECTS_QUERY, filterVariables };
