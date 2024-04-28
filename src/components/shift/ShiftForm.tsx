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

import { LIST_TASKS_QUERY } from '@/gql/task';
import {
  CREATE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
} from '@/gql/role';
import {
  GET_SHIFT_QUERY,
  LIST_SHIFTS_QUERY,
  CREATE_SHIFT_MUTATION,
  UPDATE_SHIFT_MUTATION,
} from '@/gql/shift';

import {
  CreateShiftMutation,
  CreateShiftMutationVariables,
  RoleType,
  TaskType,
  UpdateShiftMutation,
  UpdateShiftMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

type Data = CreateShiftMutation
            | UpdateShiftMutation;
type Errors = FormErrors<
  CreateShiftMutationVariables
  | UpdateShiftMutationVariables
>;

function ShiftForm({
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
  const [overrideRoles, setOverrideRoles] = useState(false);
  const [shiftRolesOriginal, setShiftRolesOriginal] = useState<RoleType[]>([]);

  // options
  const [taskOptions, setTaskOptions] = useState<TaskType[]>([]);

  // fields
  const [publish, setPublish] = useState(false);
  const [task, setTask] = useState<TaskType | ''>('');
  const [startTime, setStartTime] = useState<string | Dayjs>("");
  const [endTime, setEndTime] = useState<string | Dayjs>("");
  const [enrollmentDeadline, setEnrollmentDeadline] = useState<string | Dayjs>("");
  const [shiftRoles, setShiftRoles] = useState<RoleType[]>([]);
  const [taskRoles, setTaskRoles] = useState<RoleType[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [modifiedAt, setModifiedAt] = useState("");

  // presets
  useEffect(() => {
    if (task || !filter.hasFilter)
      return
    switch ( filter?.object?.__typename ) {
      case "TaskType":
        setTask(filter.object); break;
      case "ShiftType":
        setTask(filter.object.task); break;
    }
  }, [task, filter.hasFilter, filter.object]);

  // create shift
  const [ createShift, {
    loading: createShiftLoading,
    reset: createShiftReset
  }] = useMutation(
    CREATE_SHIFT_MUTATION, {
      onCompleted: data => {
        const response = data.createShift;
        if (!response)
          return;
        if(response.errors.length === 0) {
          createShiftReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Shift created", 'success');
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          createShiftReset();
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

  // get shift
  const {
    called: getShiftCalled,
    loading: getShiftLoading,
    data: getShiftData,
    error: getShiftError
  } = useQuery(
    GET_SHIFT_QUERY, {
      skip: create,
      fetchPolicy: 'network-only',
      variables: {
        id: id
      },
      onCompleted: data => {
        if (!data.listShifts) return;
        const shift = data.listShifts.edges[0]?.node;
        if (!shift)
          return;
        let shiftRoles = shift.roleSet.edges
          .map((edge) => edge?.node)
          .filter((node): node is RoleType => node !== undefined);
        const taskRoles = shift.task.roleSet.edges
          .map((edge) => edge?.node)
          .filter((node): node is RoleType => node !== undefined);
        const override = !!shiftRoles.length;
        if (!override) {
          shiftRoles = structuredClone(taskRoles);
          shiftRoles.forEach(role => role.id = "CREATE!" + role.id);
        }
        setTask(shift.task as TaskType);
        setStartTime(dayjs(shift.startTime));
        setEndTime(dayjs(shift.endTime));
        setEnrollmentDeadline(dayjs(shift.enrollmentDeadline));
        setShiftRolesOriginal(shiftRoles);
        setShiftRoles(shiftRoles);
        setTaskRoles(taskRoles);
        setOverrideRoles(override);
        setCreatedAt(shift.createdAt);
        setModifiedAt(shift.modifiedAt);
      },
    },
  );

  // list tasks
  const { data: listOperationsData, loading: listOperationsLoading } = useQuery(
    LIST_TASKS_QUERY, {
      onCompleted: data => {
        if (!data.listTasks) return;
        const tasks = data.listTasks.edges
          .map((edge) => edge?.node)
          .filter((node): node is TaskType => node !== undefined);
        setTaskOptions(tasks);
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
      //   GET_SHIFT_QUERY
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
      //   GET_SHIFT_QUERY
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
      //   GET_SHIFT_QUERY
      // ]
    }
  );

  // update shift
  const [ updateShift, {
    loading: updateShiftLoading,
    reset: updateShiftReset
  }] = useMutation(
    UPDATE_SHIFT_MUTATION, {
      onCompleted: data => {
        const response = data.updateShift;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updateShiftReset();
          setErrors({});
          setChanged({});
          snackbar.showSnackbar("Shift updated", 'success');
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateShiftReset();
          onError(data);
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetShift"
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
    let shiftId = id;
    // shift create
    if (create) {
      const taskResult = await createShift({
        variables: {
          publish: publish,
          task: task ? task.id : "",
          startTime: startTime || null,
          endTime: endTime || null,
          enrollmentDeadline: enrollmentDeadline || null,
        }
      });
      shiftId = taskResult.data?.createShift?.shift?.id || '';
    }
    // shift update
    if (edit) {
      await updateShift({
        variables: {
          id: id,
          startTime: startTime || null,
          endTime: endTime || null,
          enrollmentDeadline: enrollmentDeadline || null,
        }
      });
    }

    // use shift roles
    if (overrideRoles) {
      // roles create
      await shiftRoles.forEach(role => {
        if (!role.id || !role.id.startsWith("CREATE!"))
          return;
        createRole({
          variables: {
            shift: shiftId,
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
      const rolesToDelete = shiftRolesOriginal.reduce((result: RoleType[], entry: RoleType) => {
        if (shiftRoles.findIndex(role => role?.id === entry.id) == -1)
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
      await shiftRoles.forEach(role => {
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
    // use task roles
    } else {
      await shiftRoles.forEach(role => {
        if (!role.id || role.id.startsWith("CREATE!"))
          return;
        deleteRole({
          variables: {
            id: role.id,
          }
        });
      });
    }
    onSuccess({});
    // refetch
    // await client.refetchQueries({
    //   include: [GET_SHIFT_QUERY],
    // });
  }

  // return
  if (edit) {
    if (getShiftError)
      return <div>Error</div>;
    if (!getShiftCalled || getShiftLoading)
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
          id="task"
          value={task}
          setValue={setTask}
          options={taskOptions}
          label="Task"
          handleChanged={handleChanged}
          // @ts-ignore
          errors={errors.operation}
          required
        />
      </>}
      {edit && <>
        <Input
          id="task"
          value={task ? task.name : ""}
          label="Task"
          disabled
        />
      </>}
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
      <DateTimePicker
        id="enrollmentdeadline"
        value={enrollmentDeadline}
        setValue={setEnrollmentDeadline}
        label="Enrollment Deadline"
        handleChanged={handleChanged}
        errors={errors.enrollmentDeadline}
      />

      <RoleTable
        organizationId={task ? task.operation.project.organization.id : ""}
        roles={overrideRoles ? shiftRoles : taskRoles}
        setRoles={setShiftRoles}
        handleChanged={handleChanged}
        override={overrideRoles}
        setOverride={setOverrideRoles}
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
          || (edit && updateShiftLoading)
          || (create && createShiftLoading)
        }
      >
        {edit && (updateShiftLoading ? "Saving..." : "Save")}
        {create && (createShiftLoading ? "Creating..." : "Create")}
      </Button>
    </Form>
  );
}

export default ShiftForm;
