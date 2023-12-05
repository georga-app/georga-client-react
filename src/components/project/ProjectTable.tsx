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
  NavigationForwardIcon,
} from '@/theme/Icons';

import { gql } from '@/types/__generated__/gql';
import { ProjectType, ListProjectsQueryVariables } from '@/types/__generated__/graphql'
import { DataTableColumn, DataTableActions } from '@/types/DataTable'

const LIST_PROJECTS_QUERY = gql(`
  query ListProjects (
    $organization: ID
  ) {
    listProjects (
      organization: $organization
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

  // filter
  // let filterVariables: ListProjectsQueryVariables = {}
  // switch ( filter?.object?.__typename ) {
  //   case "OrganizationType":
  //     filterVariables.organization = filter.object.id; break;
  //   case "ProjectType":
  //     filterVariables.organization = filter.object.organization.id; break
  //   case "OperationType":
  //     filterVariables.organization = filter.object.project.organization.id; break
  //   case "TaskType":
  //     filterVariables.organization = filter.object.operation.project.organization.id; break
  //   case "ShiftType":
  //     filterVariables.organization = filter.object.task.operation.project.organization.id; break
  // }

  // get
  const { data, loading } = useQuery(
    LIST_PROJECTS_QUERY, {
      variables: filterVariables(filter)
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
        router.push("/admin/projects/add");
      },
      available: (selected) => (selected.length == 0),
    },
    {
      name: 'Edit',
      icon: <ActionEditIcon />,
      priority: 20,
      action: (selected, setSelected, event) => {
        router.push("/admin/projects/edit/" + selected[0].id);
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
        deleteProject({
          variables: { id: selected[0].id }
        })
        setSelected([]);
      },
      available: (selected) => (selected.length > 0),
    },
    {
      name: 'Publish',
      icon: <ActionPublishIcon />,
      priority: 100,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && projectState.sources.PUBLISHED.includes(selected[0].state)
      ),
      state: {
        transitions: projectState,
        target: 'PUBLISHED'
      }
    },
    {
      name: 'Archive',
      icon: <ActionArchiveIcon />,
      priority: 110,
      action: (selected, setSelected, event) => {},
      available: (selected) => (
        selected.length > 0
        && projectState.sources.ARCHIVED.includes(selected[0].state)
      ),
      state: {
        transitions: projectState,
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
