/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input, Autocomplete } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter } from '@/provider/Filter';

import { LIST_ORGANIZATIONS_QUERY } from "@/components/organization/OrganizationTable"
import { LIST_PROJECTS_QUERY, filterVariables } from "@/components/project/ProjectTable"

import { gql } from '@/types/__generated__/gql';
import {
  CreateProjectMutation,
  CreateProjectMutationVariables,
  OrganizationType,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

const CREATE_PROJECT_MUTATION = gql(`
  mutation CreateProject (
    $organization: ID!
    $name: String!
    $description: String
  ) {
    createProject (
      input: {
        organization: $organization
        name: $name
        description: $description
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

const GET_PROJECT_QUERY = gql(`
  query GetProject (
    $id: ID!
  ) {
    listProjects (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          state
          name
          description
          organization {
            id
            name
          }
        }
      }
    }
  }
`);

const UPDATE_PROJECT_MUTATION = gql(`
  mutation UpdateProject (
    $id: ID!
    $name: String
    $description: String
  ) {
    updateProject (
      input: {
        id: $id
        name: $name
        description: $description
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

type Data = CreateProjectMutation
            | UpdateProjectMutation;
type Errors = FormErrors<
  CreateProjectMutationVariables
  | UpdateProjectMutationVariables
>;

function ProjectForm({
  id = '',
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  id?: string,
  onSuccess?: (data: Data) => void,
  onError?: (data: Data) => void,
}) {
  id = decodeURIComponent(id);

  // mode
  const create = !(id);
  const edit = (id);

  // context
  const snackbar = useSnackbar();
  const filter = useFilter();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});

  // fields
  const [organizationOptions, setOrganizationOptions] = useState<OrganizationType[]>([]);
  const [organization, setOrganization] = useState<OrganizationType | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  useEffect(() => {
    if (organization || !filter.hasFilter)
      return
    switch ( filter?.object?.__typename ) {
      case "OrganizationType":
        setOrganization(filter.object); break;
      case "ProjectType":
        setOrganization(filter.object.organization); break;
      case "OperationType":
        setOrganization(filter.object.project.organization); break
      case "TaskType":
        setOrganization(filter.object.operation.project.organization); break;
      case "ShiftType":
        setOrganization(filter.object.task.operation.project.organization); break;
    }
  }, [organization, filter.hasFilter, filter.object]);

  // create
  const [ createProject, {
    loading: createProjectLoading,
    reset: createProjectReset
  }] = useMutation(
    CREATE_PROJECT_MUTATION, {
      onCompleted: data => {
        const response = data.createProject;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createProjectReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Project created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateProjectReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        { query: LIST_PROJECTS_QUERY, variables: filterVariables(filter) }
      ]
    }
  );

  // get
  const {
    called: getProjectCalled,
    loading: getProjectLoading,
    data: getProjectData,
    error: getProjectError
  } = useQuery(
    GET_PROJECT_QUERY, {
      skip: create,
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listProjects) return;
        const project = data.listProjects.edges[0]?.node;
        if (!project)
          return;
        setOrganization(project.organization as OrganizationType);
        setName(project.name);
        setDescription(project.description || '');
        setState(project.state || '');
        setCreatedAt(project.createdAt);
        setModifiedAt(project.modifiedAt);
      },
    },
  );

  const { data, loading } = useQuery(
    LIST_ORGANIZATIONS_QUERY, {
      onCompleted: data => {
        if (!data.listOrganizations) return;
        const organizations = data.listOrganizations.edges
          .map((edge) => edge?.node)
          .filter((node): node is OrganizationType => node !== undefined);
        setOrganizationOptions(organizations);
      }
    }
  );

  // update
  const [ updateProject, {
    loading: updateProjectLoading,
    reset: updateProjectReset
  }] = useMutation(
    UPDATE_PROJECT_MUTATION, {
      onCompleted: data => {
        const response = data.updateProject;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateProjectReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Project updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateProjectReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetProject"
      ]
    }
  );

  // change
  const handleChanged = (key: string, oldValue: any, newValue: any) => {
    if (!(key in changed))
      return setChanged({[key]: oldValue, ...changed});
    if (changed[key] == newValue)
      setChanged(({[key]: _, ...updated}) => updated);
  };

  // submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (create)
      createProject({
        variables: {
          organization: organization?.id || "",
          name: name,
          description: description,
        }
      });
    if (edit)
      updateProject({
        variables: {
          id: id,
          name: name,
          description: description,
        }
      });
  }

  // return
  if (edit) {
    if (getProjectError)
      return <div>Error</div>;
    if (!getProjectCalled || getProjectLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      {create &&
        <Autocomplete
          id="organization"
          value={organization}
          setValue={setOrganization}
          options={organizationOptions}
          label="Organization"
          handleChanged={handleChanged}
          // @ts-ignore
          errors={errors.organization}
          required
        />
      }
      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        handleChanged={handleChanged}
        errors={errors.name}
        required
      />
      <Input
        id="description"
        value={description}
        setValue={setDescription}
        label="Description"
        multiline={true}
        handleChanged={handleChanged}
        errors={errors.description}
      />
      {edit && <>
        <Input
          id="organization"
          value={organization?.name}
          label="Organization At"
          disabled
        />
        <Input
          id="createdAt"
          value={new Date(createdAt).toLocaleString()}
          label="Created At"
          disabled
        />
        <Input
          id="modifiedAt"
          value={new Date(modifiedAt).toLocaleString()}
          label="Modified At"
          disabled
        />
        <Input
          id="state"
          value={state}
          label="State"
          disabled
        />
      </>}

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          Object.keys(changed).length === 0
          || (edit && updateProjectLoading)
          || (create && createProjectLoading)
        }
      >
        {edit && (updateProjectLoading ? "Saving..." : "Save")}
        {create && (createProjectLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default ProjectForm;
