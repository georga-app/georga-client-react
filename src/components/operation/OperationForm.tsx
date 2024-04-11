/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input, Autocomplete, Switch } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter, filterVariables } from '@/provider/Filter';

import { LIST_PROJECTS_QUERY } from "@/gql/project"
import {
  GET_OPERATION_QUERY,
  LIST_OPERATIONS_QUERY,
  CREATE_OPERATION_MUTATION,
  UPDATE_OPERATION_MUTATION,
} from "@/gql/operation"

import {
  CreateOperationMutation,
  CreateOperationMutationVariables,
  ProjectType,
  UpdateOperationMutation,
  UpdateOperationMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";


type Data = CreateOperationMutation
            | UpdateOperationMutation;
type Errors = FormErrors<
  CreateOperationMutationVariables
  | UpdateOperationMutationVariables
>;

function OperationForm({
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
  const [projectOptions, setProjectOptions] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [publish, setPublish] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  useEffect(() => {
    if (project || !filter.hasFilter)
      return
    switch ( filter?.object?.__typename ) {
      case "ProjectType":
        setProject(filter.object); break;
      case "OperationType":
        setProject(filter.object.project); break
      case "TaskType":
        setProject(filter.object.operation.project); break;
      case "ShiftType":
        setProject(filter.object.task.operation.project); break;
    }
  }, [project, filter.hasFilter, filter.object]);

  // create
  const [ createOperation, {
    loading: createOperationLoading,
    reset: createOperationReset
  }] = useMutation(
    CREATE_OPERATION_MUTATION, {
      onCompleted: data => {
        const response = data.createOperation;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createOperationReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Operation created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateOperationReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      // refetchQueries: [
      //   { query: LIST_PROJECTS_QUERY, variables: filterVariables('project', filter) }
      // ]
      refetchQueries: [
        "ListOperations"
      ]
    }
  );

  // get
  const {
    called: getOperationCalled,
    loading: getOperationLoading,
    data: getOperationData,
    error: getOperationError
  } = useQuery(
    GET_OPERATION_QUERY, {
      skip: create,
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listOperations) return;
        const operation = data.listOperations.edges[0]?.node;
        if (!operation)
          return;
        setProject(operation.project as ProjectType);
        setName(operation.name);
        setDescription(operation.description || '');
        setState(operation.state || '');
        setCreatedAt(operation.createdAt);
        setModifiedAt(operation.modifiedAt);
      },
    },
  );

  const { data, loading } = useQuery(
    LIST_PROJECTS_QUERY, {
      onCompleted: data => {
        if (!data.listProjects) return;
        const projects = data.listProjects.edges
          .map((edge) => edge?.node)
          .filter((node): node is ProjectType => node !== undefined);
        setProjectOptions(projects);
      }
    }
  );

  // update
  const [ updateOperation, {
    loading: updateOperationLoading,
    reset: updateOperationReset
  }] = useMutation(
    UPDATE_OPERATION_MUTATION, {
      onCompleted: data => {
        const response = data.updateOperation;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateOperationReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Operation updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateOperationReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetOperation"
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
      createOperation({
        variables: {
          publish: publish,
          project: project?.id || "",
          name: name,
          description: description,
        }
      });
    if (edit)
      updateOperation({
        variables: {
          id: id,
          name: name,
          description: description,
        }
      });
  }

  // return
  if (edit) {
    if (getOperationError)
      return <div>Error</div>;
    if (!getOperationCalled || getOperationLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      {create && <>
        <Switch
          id="publish"
          value={publish}
          setValue={setPublish}
          errors={[]}
          label="Publish"
        />
        <Autocomplete
          id="project"
          value={project}
          setValue={setProject}
          options={projectOptions}
          label="Project"
          handleChanged={handleChanged}
          // @ts-ignore
          errors={errors.project}
          required
        />
      </>}
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
          id="project"
          value={project?.name}
          label="Project"
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
          || (edit && updateOperationLoading)
          || (create && createOperationLoading)
        }
      >
        {edit && (updateOperationLoading ? "Saving..." : "Save")}
        {create && (createOperationLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default OperationForm;
