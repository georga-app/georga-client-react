/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter, filterVariables } from '@/provider/Filter';

import {
  GET_TASK_FIELD_QUERY,
  LIST_TASK_FIELDS_QUERY,
  CREATE_TASK_FIELD_MUTATION,
  UPDATE_TASK_FIELD_MUTATION,
} from "@/gql/taskField";

import {
  CreateTaskFieldMutation,
  CreateTaskFieldMutationVariables,
  UpdateTaskFieldMutation,
  UpdateTaskFieldMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";


type Data = CreateTaskFieldMutation
            | UpdateTaskFieldMutation;
type Errors = FormErrors<
  CreateTaskFieldMutationVariables
  | UpdateTaskFieldMutationVariables
>;

function TaskFieldForm({
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  // create
  const [ createTaskField, {
    loading: createTaskFieldLoading,
    reset: createTaskFieldReset
  }] = useMutation(
    CREATE_TASK_FIELD_MUTATION, {
      onCompleted: data => {
        const response = data.createTaskField;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createTaskFieldReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Field created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          createTaskFieldReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        {
          query: LIST_TASK_FIELDS_QUERY,
          variables: filterVariables.project(filter.object)
        }
      ]
    }
  );

  // get
  const {
    called: getTaskFieldCalled,
    loading: getTaskFieldLoading,
    data: getTaskFieldData,
    error: getTaskFieldError
  } = useQuery(
    GET_TASK_FIELD_QUERY, {
      skip: create,
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listTaskFields) return;
        const taskField = data.listTaskFields.edges[0]?.node;
        if (!taskField)
          return;
        setName(taskField.name);
        setDescription(taskField.description || '');
        setCreatedAt(taskField.createdAt);
        setModifiedAt(taskField.modifiedAt);
      },
    },
  );

  // update
  const [ updateTaskField, {
    loading: updateTaskFieldLoading,
    reset: updateTaskFieldReset
  }] = useMutation(
    UPDATE_TASK_FIELD_MUTATION, {
      onCompleted: data => {
        const response = data.updateTaskField;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateTaskFieldReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Field updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateTaskFieldReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetTaskField"
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
      createTaskField({
        variables: {
          organization: filter.organization,
          name: name,
          description: description,
        }
      });
    if (edit)
      updateTaskField({
        variables: {
          id: id,
          name: name,
          description: description,
        }
      });
  }

  // return
  if (edit) {
    if (getTaskFieldError)
      return <div>Error</div>;
    if (!getTaskFieldCalled || getTaskFieldLoading)
      return <div>Loading...</div>;
  }
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
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
          || (edit && updateTaskFieldLoading)
          || (create && createTaskFieldLoading)
        }
      >
        {edit && (updateTaskFieldLoading ? "Saving..." : "Save")}
        {create && (createTaskFieldLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default TaskFieldForm;
