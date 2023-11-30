/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */

import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiInput from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import FormFieldError from "@/components/shared/FormFieldError";

import { FormFieldError as FormFieldErrorType } from '@/types/FormErrors';

function Input({
  key,
  errors,
  handleChanged,
  value,
  setValue,
}: {
  key: string,
  errors: FormFieldErrorType | undefined,
  handleChanged: (key: string, oldValue: typeof value, newValue: typeof value) => void,
  value: any,
  setValue: React.Dispatch<React.SetStateAction<any>>,
}) {
  if (key == 'form')
    return
  return (
    <FormControl
      margin="normal"
      variant="standard"
      fullWidth
    >
      <InputLabel htmlFor={key}>Name</InputLabel>
      <MuiInput
        id={key}
        value={value}
        onChange={(event) => {
          handleChanged(key, value, event.target.value);
          setValue(event.target.value);
        }}
      />
      <FormFieldError error={errors}/>
    </FormControl>
  )
}

export {
  Input
};
