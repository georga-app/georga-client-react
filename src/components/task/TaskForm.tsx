/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs, { Dayjs } from "dayjs";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input, Autocomplete, DateTimePicker, Switch } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter, filterVariables } from '@/provider/Filter';

import RoleTable from '@/components/role/RoleTable';

import { LIST_OPERATIONS_QUERY } from '@/gql/operation';
import { LIST_TASK_FIELDS_QUERY } from '@/gql/taskField';
import {
  CREATE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
} from '@/gql/role';
import {
  GET_TASK_QUERY,
  LIST_TASKS_QUERY,
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
} from '@/gql/task';

import {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  OperationType,
  RoleType,
  TaskFieldType,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

type Data = CreateTaskMutation
            | UpdateTaskMutation;
type Errors = FormErrors<
  CreateTaskMutationVariables
  | UpdateTaskMutationVariables
>;

function TaskForm({
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
  const client = useApolloClient();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});
  const [rolesOriginal, setRolesOriginal] = useState<RoleType[]>([]);

  // options
  const [fieldOptions, setFieldOptions] = useState<TaskFieldType[]>([]);
  const [operationOptions, setOperationOptions] = useState<OperationType[]>([]);

  // fields
  const [publish, setPublish] = useState(false);
  const [operation, setOperation] = useState<OperationType | ''>('');
  const [field, setField] = useState<TaskFieldType | ''>('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<string | Dayjs>("");
  const [endTime, setEndTime] = useState<string | Dayjs>("");
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  // presets
  useEffect(() => {
    if (operation || !filter.hasFilter)
      return
    switch ( filter?.object?.__typename ) {
      case "OperationType":
        setOperation(filter.object); break
      case "TaskType":
        setOperation(filter.object.operation); break;
      case "ShiftType":
        setOperation(filter.object.task.operation); break;
    }
  }, [operation, filter.hasFilter, filter.object]);

  // create task
  const [ createTask, {
    loading: createTaskLoading,
    reset: createTaskReset
  }] = useMutation(
    CREATE_TASK_MUTATION, {
      onCompleted: data => {
        const response = data.createTask;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createTaskReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Task created", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          createTaskReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        {
          query: LIST_TASKS_QUERY,
          variables: filterVariables.task(filter.object)
        }
      ]
    }
  );

  // get task
  const {
    called: getTaskCalled,
    loading: getTaskLoading,
    data: getTaskData,
    error: getTaskError
  } = useQuery(
    GET_TASK_QUERY, {
      skip: create,
      fetchPolicy: 'network-only',
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listTasks) return;
        const task = data.listTasks.edges[0]?.node;
        if (!task)
          return;
        const roles = task.roleSet.edges
          .map((edge) => edge?.node)
          .filter((node): node is RoleType => node !== undefined);
        setOperation(task.operation as OperationType);
        setField(task.field as TaskFieldType);
        setName(task.name);
        setDescription(task.description || '');
        setStartTime(dayjs(task.startTime));
        if (task.endTime)
          setEndTime(dayjs(task.endTime));
        setRolesOriginal(roles);
        setRoles(roles);
        setCreatedAt(task.createdAt);
        setModifiedAt(task.modifiedAt);
      },
    },
  );

  // list operations
  const { data: listOperationsData, loading: listOperationsLoading } = useQuery(
    LIST_OPERATIONS_QUERY, {
      onCompleted: data => {
        if (!data.listOperations) return;
        const tasks = data.listOperations.edges
          .map((edge) => edge?.node)
          .filter((node): node is OperationType => node !== undefined);
        setOperationOptions(tasks);
      }
    }
  );

  // list task fields
  const { data: listTaskFieldsData, loading: listTaskFieldsLoading } = useQuery(
    LIST_TASK_FIELDS_QUERY, {
      variables: {
        organization: operation ? operation.project.organization.id : "",
      },
      onCompleted: data => {
        if (!data.listTaskFields) return;
        const fields = data.listTaskFields.edges
          .map((edge) => edge?.node)
          .filter((node): node is TaskFieldType => node !== undefined);
        setFieldOptions(fields);
      }
    }
  );

  // create role
  const [ createRole, {
    loading: createRoleLoading,
    reset: createRoleReset
  }] = useMutation(
    CREATE_ROLE_MUTATION, {
      onCompleted: data => {
        const response = data.createRole;
        if (!response)
          return;
        createRoleReset();
      },
      // refetchQueries: [
      //   GET_TASK_QUERY
      // ]
    }
  );

  // update role
  const [ updateRole, {
    loading: updateRoleLoading,
    reset: updateRoleReset
  }] = useMutation(
    UPDATE_ROLE_MUTATION, {
      onCompleted: data => {
        const response = data.updateRole;
        if (!response)
          return;
        updateRoleReset();
      },
      // refetchQueries: [
      //   GET_TASK_QUERY
      // ]
    }
  );

  // delete role
  const [ deleteRole, {
    loading: deleteRoleLoading,
    reset: deleteRoleReset
  }] = useMutation(
    DELETE_ROLE_MUTATION, {
      onCompleted: data => {
        const response = data.deleteRole;
        if (!response)
          return;
        deleteRoleReset();
      },
      // refetchQueries: [
      //   GET_TASK_QUERY
      // ]
    }
  );

  // update task
  const [ updateTask, {
    loading: updateTaskLoading,
    reset: updateTaskReset
  }] = useMutation(
    UPDATE_TASK_MUTATION, {
      onCompleted: data => {
        const response = data.updateTask;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateTaskReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Task updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateTaskReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetTask"
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let taskId = id;
    // task create
    if (create) {
      const taskResult = await createTask({
        variables: {
          publish: publish,
          operation: operation ? operation.id : "",
          field: field ? field.id : "",
          name: name,
          description: description || "",
          startTime: startTime || null,
          endTime: endTime || null,
        }
      });
      taskId = taskResult.data?.createTask?.task?.id || '';
    }
    // task update
    if (edit) {
      await updateTask({
        variables: {
          id: id,
          field: field ? field.id : "",
          name: name,
          description: description,
          startTime: startTime || null,
          endTime: endTime || null,
        }
      });
    }
    // roles create
    await roles.forEach(role => {
      if (!role.id || !role.id.startsWith("CREATE!"))
        return;
      createRole({
        variables: {
          task: taskId,
          name: role.name,
          description: role.description,
          quantity: role.quantity,
          needsAdminAcceptance: role.needsAdminAcceptance,
          mandatory: role.mandatory?.map(property => property?.id || '')
            .filter(Boolean) || [],
          recommended: role.recommended?.map(property => property?.id || '')
            .filter(Boolean) || [],
          unrecommended: role.unrecommended?.map(property => property?.id || '')
            .filter(Boolean) || [],
          impossible: role.impossible?.map(property => property?.id || '')
            .filter(Boolean) || [],
        }
      });
    });
    // roles delete
    const rolesToDelete = rolesOriginal.reduce((result: RoleType[], entry: RoleType) => {
      if (roles.findIndex(role => role?.id === entry.id) == -1)
        result.push(entry)
      return result
    }, []);
    await rolesToDelete.forEach(role => {
      deleteRole({
        variables: {
          id: role.id,
        }
      })
    });
    // roles update
    await roles.forEach(role => {
      if (!role.id || role.id.startsWith("CREATE!"))
        return;
      updateRole({
        variables: {
          id: role.id,
          name: role.name,
          description: role.description,
          quantity: role.quantity,
          needsAdminAcceptance: role.needsAdminAcceptance,
          mandatory: role.mandatory?.map(property => property?.id || '')
            .filter(Boolean) || [],
          recommended: role.recommended?.map(property => property?.id || '')
            .filter(Boolean) || [],
          unrecommended: role.unrecommended?.map(property => property?.id || '')
            .filter(Boolean) || [],
          impossible: role.impossible?.map(property => property?.id || '')
            .filter(Boolean) || [],
        }
      })
    });
    // refetch
    // await client.refetchQueries({
    //   include: [GET_TASK_QUERY],
    // });
  }

  // return
  if (edit) {
    if (getTaskError)
      return <div>Error</div>;
    if (!getTaskCalled || getTaskLoading)
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
          id="operation"
          value={operation}
          setValue={setOperation}
          options={operationOptions}
          label="Operation"
          handleChanged={handleChanged}
          // @ts-ignore
          errors={errors.operation}
          required
        />
      </>}
      {edit && <>
        <Input
          id="operation"
          value={operation ? operation.name : ""}
          label="Operation"
          disabled
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
      {!listTaskFieldsLoading &&
        <Autocomplete
          id="field"
          value={field}
          setValue={setField}
          options={fieldOptions}
          label="Field"
          handleChanged={handleChanged}
          // @ts-ignore
          errors={errors.field}
          required
        />
      }
      <DateTimePicker
        id="starttime"
        value={startTime}
        setValue={setStartTime}
        label="Start Time"
        handleChanged={handleChanged}
        errors={errors.startTime}
        required
      />
      <DateTimePicker
        id="endtime"
        value={endTime}
        setValue={setEndTime}
        label="End Time"
        handleChanged={handleChanged}
        errors={errors.endTime}
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

      <RoleTable
        organizationId={operation ? operation.project.organization.id : ""}
        roles={roles}
        setRoles={setRoles}
        handleChanged={handleChanged}
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
          || (edit && updateTaskLoading)
          || (create && createTaskLoading)
        }
      >
        {edit && (updateTaskLoading ? "Saving..." : "Save")}
        {create && (createTaskLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default TaskForm;
