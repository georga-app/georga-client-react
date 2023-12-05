/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import dayjs, { Dayjs } from "dayjs";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Form from "@/components/shared/Form";
import { Input, Autocomplete, DateTimePicker } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";
import { useFilter } from '@/provider/Filter';
import { useDialog } from '@/provider/Dialog';

import {
  PersonPropertyGroupField,
  PersonPropertyGroupDataType,
  LIST_PERSON_PROPERTY_GROUPS_QUERY
} from "@/components/person/PersonPropertiesForm";

import { LIST_TASKS_QUERY, filterVariables } from "@/components/task/TaskTable"
import { LIST_OPERATIONS_QUERY } from "@/components/operation/OperationTable"
import { LIST_TASK_FIELDS_QUERY } from "@/components/taskField/TaskFieldTable"

import { gql } from '@/types/__generated__/gql';
import {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  ProjectType,
  OperationType,
  RoleType,
  TaskType,
  TaskFieldType,
  PersonPropertyGroupType,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";
import { onlyType } from "@/types/Util";

const CREATE_TASK_MUTATION = gql(`
  mutation CreateTask (
    $operation: ID!
    $field: ID!
    $name: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime
  ) {
    createTask (
      input: {
        operation: $operation
        field: $field
        name: $name
        description: $description
        startTime: $startTime
        endTime: $endTime
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const GET_TASK_QUERY = gql(`
  query GetTask (
    $id: ID!
  ) {
    listTasks (
      id: $id
    ) {
      edges {
        node {
          id
          createdAt
          modifiedAt
          state
          field {
            id
            name
          }
          name
          description
          startTime
          endTime
          operation {
            id
            name
          }
          roleSet {
            edges {
              node {
                id
                name
                description
                quantity
                participantsAccepted
                participantsDeclined
                participantsPending
              }
            }
          }
        }
      }
    }
  }
`);

const UPDATE_TASK_MUTATION = gql(`
  mutation UpdateTask (
    $id: ID!
    $field: ID
    $name: String
    $description: String
    $startTime: DateTime
    $endTime: DateTime
  ) {
    updateTask (
      input: {
        id: $id
        field: $field
        name: $name
        description: $description
        startTime: $startTime
        endTime: $endTime
      }
    ) {
      task {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

type Data = CreateTaskMutation
            | UpdateTaskMutation;
type Errors = FormErrors<
  CreateTaskMutationVariables
  | UpdateTaskMutationVariables
>;

function RoleForm({
  organizationId,
  role,
  roles,
  setRoles,
  onSuccess = () => undefined,
}: {
  organizationId: string,
  role?: number
  roles: TempRoleType,
  setRoles: React.Dispatch<React.SetStateAction<TempRoleType>>,
  onSuccess?: () => void,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>();

  const [propertyGroups, setPropertyGroups] = useState<PersonPropertyGroupType[]>();
  const [properties, setProperties] = useState<PersonPropertyGroupDataType>({});

  const [changed, setChanged] = useState<PersonPropertyGroupDataType>({});

  useEffect(() => {
    if (role) {
      setName(roles[role]?.name || "")
      setDescription(roles[role]?.description || "")
      setQuantity(roles[role]?.quantity || 0)
      setProperties(roles[role]?.properties || {})
    }
  }, [role, roles]);

  const {
    called: listPersonPropertyGroupsCalled,
    loading: listPersonPropertyGroupsLoading,
    data: listPersonPropertyGroupsData,
    error: listPersonPropertyGroupsError
  } = useQuery(
    LIST_PERSON_PROPERTY_GROUPS_QUERY, {
      skip: !organizationId,
      variables: {
        organization: organizationId
      },
      onCompleted: data => {
        if (!data.listPersonPropertyGroups) return;
        const groups = data.listPersonPropertyGroups.edges
          .map(edge => edge?.node)
          .filter(onlyType);
        setPropertyGroups(groups as PersonPropertyGroupType[]);
      },
    },
  );

  return (
    <Form handleSubmit={() => {}} error={undefined}>

      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        // handleChanged={handleChanged}
        // errors={errors.name}
        required
      />
      <Input
        id="description"
        value={description}
        setValue={setDescription}
        label="Description"
        // multiline={true}
        // handleChanged={handleChanged}
        // errors={errors.description}
      />
      <Input
        id="quantity"
        value={quantity}
        setValue={setQuantity}
        type="number"
        label="Quantity"
        // handleChanged={handleChanged}
        // errors={errors.description}
      />

      <InputLabel sx={{ marginTop: 2, marginBottom: 1 }}>Role Specification</InputLabel>
      {propertyGroups?.map(group =>
        <PersonPropertyGroupField
          key={group.id}
          group={group}
          properties={properties}
          setProperties={setProperties}
          changed={changed}
          setChanged={setChanged}
        />
      )}

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        onClick={() => {
          const newData = {
            name: name,
            description: description,
            quantity: quantity || 0,
            properties: {...properties},
          }
          if (role) {
            roles[role] = newData;
          } else {
            roles.push(newData);
          }
          setRoles(roles)
          onSuccess()
        }}
        // disabled={
        //   Object.keys(changed).length === 0
        // }
      >
        {"Save"}
      </Button>
    </Form>
  );
}

type TempRoleType = [
  {
    name: string,
    description: string,
    quantity: number,
    properties: PersonPropertyGroupDataType,
  }?
]

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
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const filter = useFilter();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});

  // fields
  const [fieldOptions, setFieldOptions] = useState<TaskFieldType[]>([]);
  const [operationOptions, setOperationOptions] = useState<OperationType[]>([]);
  const [operation, setOperation] = useState<OperationType | undefined>(undefined);
  const [field, setField] = useState<TaskFieldType | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<string | Dayjs>("");
  const [endTime, setEndTime] = useState<string | Dayjs>("");
  // const [roles, setRoles] = useState<RoleType[]>([]);
  const [roles, setRoles] = useState<TempRoleType>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

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

  // create
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
          updateTaskReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        { query: LIST_TASKS_QUERY, variables: filterVariables(filter) }
      ]
    }
  );

  // get
  const {
    called: getTaskCalled,
    loading: getTaskLoading,
    data: getTaskData,
    error: getTaskError
  } = useQuery(
    GET_TASK_QUERY, {
      skip: create,
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listTasks) return;
        const task = data.listTasks.edges[0]?.node;
        if (!task)
          return;
        // const roles = task.roleSet.edges
        //   .map((edge) => edge?.node)
        //   .filter((node): node is RoleType => node !== undefined);
        setOperation(task.operation as OperationType);
        setField(task.field as TaskFieldType);
        setName(task.name);
        setDescription(task.description || '');
        setStartTime(dayjs(task.startTime));
        if (task.endTime)
          setEndTime(dayjs(task.endTime));
        // setRoleSet(roles);
        setCreatedAt(task.createdAt);
        setModifiedAt(task.modifiedAt);
      },
    },
  );

  const { data, loading } = useQuery(
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
  const { data: listTaskFieldsData, loading: listTaskFieldsLoading } = useQuery(
    LIST_TASK_FIELDS_QUERY, {
      onCompleted: data => {
        if (!data.listTaskFields) return;
        const fields = data.listTaskFields.edges
          .map((edge) => edge?.node)
          .filter((node): node is TaskFieldType => node !== undefined);
        setFieldOptions(fields);
      }
    }
  );

  // update
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (create)
      createTask({
        variables: {
          operation: operation?.id || "",
          field: field?.id || "",
          name: name,
          description: description || "",
          startTime: startTime || null,
          endTime: endTime || null,
        }
      });
    if (edit)
      updateTask({
        variables: {
          id: id,
          field: field?.id || "",
          name: name,
          description: description,
          startTime: startTime || null,
          endTime: endTime || null,
        }
      });
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
      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        handleChanged={handleChanged}
        errors={errors.name}
        required
      />
      {create &&
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
      }
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
      {/*
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
        required
      />
      */}
      <Input
        id="description"
        value={description}
        setValue={setDescription}
        label="Description"
        multiline={true}
        handleChanged={handleChanged}
        errors={errors.description}
      />

      <InputLabel sx={{ marginTop: 2, marginBottom: 1 }}>Roles</InputLabel>
      {roles.map((role, index) =>
        <Chip
          key={'rolespec-' + index}
          variant="filled"
          sx={{ margin: 0.5 }}
          label={<Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: "#777", marginRight: '5px' }}>{role?.quantity} x</Typography>
            <Typography>{role?.name}</Typography>
          </Box>}
          onClick={() => dialog.showDialog(
            <RoleForm
              organizationId={operation?.project.organization.id || ""}
              role={index}
              roles={roles}
              setRoles={setRoles}
            />,
            "Edit Role"
          )}
        />
      )}
      <Box sx={{ marginY: 1 }}>
        <Button
          variant="outlined"
          onClick={() => dialog.showDialog(
            <RoleForm
              organizationId={operation?.project.organization.id || ""}
              roles={roles}
              setRoles={setRoles}
            />,
            "Add Role"
          )}
        >
          Add Role
        </Button>
      </Box>

      {edit && <>
        <Input
          id="operation"
          value={operation?.name}
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
