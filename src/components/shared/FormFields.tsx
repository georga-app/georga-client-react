/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import dayjs from "dayjs";

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
  DateTimePicker,
};


