/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from "@mui/material/InputLabel";
import MuiInput from "@mui/material/Input";
import MuiSwitch from '@mui/material/Switch';

import FormFieldError from "@/components/shared/FormFieldError";

import { FormFieldError as FormFieldErrorType } from '@/types/FormErrors';

function Input({
  key,
  value,
  setValue,
  errors,
  label,
  type,
  required,
  handleChanged,
}: {
  key: string,
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  errors: FormFieldErrorType | undefined,
  label?: string,
  type?: string,
  required?: boolean,
  handleChanged?: (key: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  if (key == 'form')
    return
  return (
    <FormControl
      margin="normal"
      variant="standard"
      fullWidth
      error={Boolean(errors)}
      required={required}
    >
      {label &&
        <InputLabel htmlFor={key}>{label}</InputLabel>
      }
      <MuiInput
        id={key}
        value={value}
        type={type}
        onChange={(event) => {
          if( handleChanged )
            handleChanged(key, value, event.target.value);
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
  key,
  value,
  setValue,
  errors,
  label,
  type,
  required,
  handleChanged,
}: {
  key: string,
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  errors: FormFieldErrorType | undefined,
  label: string,
  type?: string,
  required?: boolean,
  handleChanged?: (key: string, oldValue: typeof value, newValue: typeof value) => void,
}) {
  if (key == 'form')
    return
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
                handleChanged(key, value, event.target.checked);
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

export {
  Input,
  Switch,
};
