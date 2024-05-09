/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { useFilter } from '@/provider/Filter';

import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiInput from "@mui/material/Input";
import MuiSelect from '@mui/material/Select';
import MuiSwitch from '@mui/material/Switch';
import MuiTextField from "@mui/material/TextField";
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import FormFieldError from "@/components/shared/FormFieldError";
import { formatDateTime } from "@/app/utils";

import { GET_ORGANIZATION_QUERY } from '@/gql/organization';
import { LIST_PROJECTS_QUERY } from '@/gql/project';
import { LIST_OPERATIONS_QUERY } from '@/gql/operation';
import { LIST_TASKS_QUERY } from '@/gql/task';
import { LIST_SHIFTS_QUERY } from '@/gql/shift';

import {
  AceType,
  OrganizationType,
  ProjectType,
  OperationType,
  TaskType,
  ShiftType,
  GeorgaAcePermissionChoices,
} from '@/types/__generated__/graphql';
import { FormFieldError as FormFieldErrorType } from '@/types/FormErrors';

function Input({
  id,
  value,
  setValue,
  errors,
  label,
  type,
  required,
  disabled,
  multiline,
  handleChanged,
}: {
  id: string,
  value: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  errors?: FormFieldErrorType | undefined,
  label?: string,
  type?: string,
  required?: boolean,
  disabled?: boolean,
  multiline?: boolean,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  return (
    <FormControl
      margin="normal"
      variant="standard"
      fullWidth
      error={Boolean(errors)}
      required={required}
      disabled={disabled}
    >
      {label &&
        <InputLabel htmlFor={id}>{label}</InputLabel>
      }
      <MuiInput
        id={id}
        value={value}
        type={type}
        multiline={multiline}
        rows={multiline ? 5 : 1} // see https://github.com/mui/material-ui/issues/33081
        onChange={(event) => {
          if( handleChanged )
            handleChanged(id, value, event.target.value);
          if ( setValue )
            setValue(event.target.value);
        }}
      />
      {errors &&
        <FormFieldError error={errors}/>
      }
    </FormControl>
  )
}

function Switch({
  id,
  value,
  setValue,
  errors,
  label,
  type,
  required,
  handleChanged,
}: {
  id: string,
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  errors: FormFieldErrorType | undefined,
  label: string,
  type?: string,
  required?: boolean,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  return (
    <FormControl
      margin="normal"
      variant="standard"
      error={Boolean(errors)}
      fullWidth
      required={required}
    >
      <FormControlLabel
        label={label}
        control={
          <MuiSwitch
            checked={value}
            onChange={(event) => {
              if( handleChanged )
                handleChanged(id, value, event.target.checked);
              setValue(event.target.checked);
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
      {errors &&
        <FormFieldError error={errors}/>
      }
    </FormControl>
  )
}

function EnumSelect<T>({
  id,
  label,
  options,
  value,
  setValue,
  errors,
  required,
  disabled = false,
  getOptionLabel = option => option,
  handleChanged,
}: {
  id: string,
  label: string,
  options: T & {},
  value: string,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  errors?: FormFieldErrorType | undefined,
  required?: boolean,
  disabled?: boolean,
  getOptionLabel?: (option: string) => string,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  let optionItems: JSX.Element[] = [];
  Object.entries(options).forEach(
    ([key, value]) => optionItems.push(
        <MenuItem
        key={"item-" + key.toLowerCase()}
        value={value ? value.toString() : ''}
      >
        {getOptionLabel(key)}
      </MenuItem>
    )
  )
  return (
    <FormControl
      margin="normal"
      variant="standard"
      error={Boolean(errors)}
      fullWidth
      required={required}
    >
      <InputLabel id="{id}-label">{label}</InputLabel>
      <MuiSelect
        id={id}
        value={value ? value : ""}
        label={label}
        disabled={disabled}
        onChange={(event) => {
          if( handleChanged )
            handleChanged(id, value, event.target.value);
          setValue(event.target.value);
        }}
      >
        {optionItems}
      </MuiSelect>
      {errors &&
        <FormFieldError error={errors}/>
      }
    </FormControl>
  )
}

function Autocomplete<T extends { id: string, name?: string } | undefined>({
  id,
  label,
  options,
  value,
  setValue,
  errors,
  required,
  getOptionLabel = option => option?.name || "",
  handleChanged,
}: {
  id: string,
  label: string,
  options: T[],
  value: any,
  setValue: React.Dispatch<React.SetStateAction<T | "">>,
  errors: FormFieldErrorType | undefined,
  required?: boolean,
  getOptionLabel?: (option: T) => string,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  return (
    <FormControl
      margin="normal"
      variant="standard"
      error={Boolean(errors)}
      fullWidth
      required={required}
    >
      <MuiAutocomplete
        disablePortal
        id={id}
        value={value ? value : ""}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={params =>
          <MuiTextField {...params}
            variant="standard"
            label={label}
            required={required}
          />
        }
        renderOption={(props, option) => {
          if (!option) return;
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )
        }}
        onChange={(event, newValue) => {
          if( handleChanged )
            handleChanged(id, value, newValue || "");
          setValue(newValue || "");
        }}
      />
      {errors &&
        <FormFieldError error={errors}/>
      }
    </FormControl>
  )
}

function getObjectAutocompleteOptionLabel(option: any) {
  switch (option.__typename) {
    case "OrganizationType":
    case "ProjectType":
    case "OperationType":
    case "TaskType":
      return option.name;
    case "ShiftType":
      return formatDateTime(option.startTime) + " | " + option.task.name
    default:
      return '';
  }
}

function ObjectAutocomplete<T extends {__typename?: string, id: string, name?: string}>({
  id,
  label,
  value,
  setValue,
  errors,
  required = false,
  handleChanged,
  getOptionDisabled = () => false,
  disabled = false,
  organizations = false,
  projects = false,
  operations = false,
  tasks = false,
  shifts = false,
}: {
  id: string,
  label: string,
  value: T | "",
  setValue: React.Dispatch<React.SetStateAction<T | "">>,
  errors: FormFieldErrorType | undefined,
  required?: boolean,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
  getOptionDisabled?: (option: T) => boolean
  disabled?: boolean,
  organizations?: boolean,
  projects?: boolean,
  operations?: boolean,
  tasks?: boolean,
  shifts?: boolean,
}) {
  // provider
  const filter = useFilter();

  // options
  const [organizationOptions, setOrganizationOptions] = useState<OrganizationType[]>([]);
  const [operationOptions, setOperationOptions] = useState<OperationType[]>([]);
  const [projectOptions, setProjectOptions] = useState<ProjectType[]>([]);
  const [taskOptions, setTaskOptions] = useState<TaskType[]>([]);
  const [shiftOptions, setShiftOptions] = useState<ShiftType[]>([]);

  // get organization
  const {
    data: getOrganizationData,
    loading: getOrganizationLoading,
  } = useQuery(
    GET_ORGANIZATION_QUERY, {
      skip: disabled || !organizations,
      variables: {
        id: filter.organization
      },
      onCompleted: data => {
        const organizations = data.listOrganizations?.edges.map((edge) => edge?.node)
          .filter((node): node is OrganizationType => node !== undefined);
        if (!organizations?.length)
          return;
        setOrganizationOptions(organizations);
      }
    }
  );

  // list projects
  const {
    data: listProjectsData,
    loading: listProjectsLoading,
  } = useQuery(
    LIST_PROJECTS_QUERY, {
      skip: disabled || !projects,
      variables: {
        organization: filter.organization
      },
      onCompleted: data => {
        const projects = data.listProjects?.edges.map((edge) => edge?.node)
          .filter((node): node is ProjectType => node !== undefined);
        if (!projects?.length)
          return;
        setProjectOptions(projects);
      }
    }
  );

  // list operations
  const {
    data: listOperationsData,
    loading: listOperationsLoading,
  } = useQuery(
    LIST_OPERATIONS_QUERY, {
      skip: disabled || !operations,
      variables: {
        organization: filter.organization
      },
      onCompleted: data => {
        const operations = data.listOperations?.edges.map((edge) => edge?.node)
          .filter((node): node is OperationType => node !== undefined);
        if (!operations?.length)
          return;
        setOperationOptions(operations);
      }
    }
  );

  // list tasks
  const {
    data: listTasksData,
    loading: listTasksLoading,
  } = useQuery(
    LIST_TASKS_QUERY, {
      skip: disabled || !tasks,
      variables: {
        organization: filter.organization
      },
      onCompleted: data => {
        const tasks = data.listTasks?.edges.map((edge) => edge?.node)
          .filter((node): node is TaskType => node !== undefined);
        if (!tasks?.length)
          return;
        setTaskOptions(tasks);
      }
    }
  );

  // list shifts
  const {
    data: listShiftsData,
    loading: listShiftsLoading,
  } = useQuery(
    LIST_SHIFTS_QUERY, {
      skip: disabled || !shifts,
      variables: {
        organization: filter.organization
      },
      onCompleted: data => {
        const shifts = data.listShifts?.edges.map((edge) => edge?.node)
          .filter((node): node is ShiftType => node !== undefined);
        if (!shifts?.length)
          return;
        setShiftOptions(shifts);
      }
    }
  );

  const options: any = [
    ... organizationOptions,
    ... projectOptions,
    ... operationOptions,
    ... taskOptions,
    ... shiftOptions,
  ];

  return (
    <FormControl
      margin="normal"
      fullWidth
      sx={{ minWidth: { 'sm': '500px' } }}
      required={required}
    >
      <MuiAutocomplete
        id={id}
        size="small"
        disabled={disabled}
        options={options}
        getOptionLabel={option => getObjectAutocompleteOptionLabel(option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionDisabled={getOptionDisabled}
        groupBy={option => {
          switch (option.__typename) {
            case "OrganizationType": return "Organization";
            case "ProjectType": return "Project";
            case "OperationType": return "Operation";
            case "TaskType": return "Task";
            case "ShiftType": return "Shift";
            default: return '';
          }
        }}
        value={value as T || ""}
        onChange={(event: any, newValue: any) => {
          if( handleChanged )
            handleChanged(id, value, newValue || "");
          setValue(newValue);
        }}
        renderInput={params => (
          <MuiTextField
            {...params}
            label={label + (required ? " *" : "")}
            variant="standard"
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {getObjectAutocompleteOptionLabel(option)}
          </li>
        )}
      />
    </FormControl>
  )
}

function DateTimePicker({
  id,
  value,
  setValue,
  errors,
  label,
  required,
  disabled,
  handleChanged,
}: {
  id: string,
  value: any,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  errors?: FormFieldErrorType | undefined,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  handleChanged?: (id: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  return (
    <FormControl
      id={id}
      margin="normal"
      variant="standard"
      fullWidth
      error={Boolean(errors)}
      required={required}
      disabled={disabled}
    >
      <MuiDateTimePicker
        value={value || null}
        label={label + (required ? " *" : "")}
        onChange={(newValue: any) => {
          if( handleChanged )
            handleChanged(id, value, newValue);
          if ( setValue )
            setValue(newValue);
        }}
        slotProps={{ textField: { variant: 'standard' } }}
      />
      {errors &&
        <FormFieldError error={errors}/>
      }
    </FormControl>
  )
}

export {
  EnumSelect,
  Input,
  Switch,
  Autocomplete,
  ObjectAutocomplete,
  DateTimePicker,
};
