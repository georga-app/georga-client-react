import { useState, forwardRef } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@/__generated__/gql';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import FormFieldError from "@/components/shared/FormFieldError";
import FormError from "@/components/shared/FormError";

import { PersonProfileFormErrors } from "@/types/FormErrors";
import { PersonType, GetPersonProfileQuery } from '@/__generated__/graphql';

const GET_PERSON_PROFILE_QUERY = gql(`
  query GetPersonProfile {
    getPersonProfile {
      firstName
      lastName
      email
      occupation
      street
      number
      postalCode
      city
      privatePhone
      mobilePhone
      onlyJobRelatedTopics
    }
  }
`);

const UPDATE_PERSON_PROFILE_MUTATION = gql(`
  mutation UpdatePersonProfile (
    $firstName: String
    $lastName: String
    $occupation: String
    $street: String
    $number: String
    $postalCode: String
    $city: String
    $privatePhone: String
    $mobilePhone: String
    $onlyJobRelatedTopics: String
  ) {
    updatePersonProfile (
      input: {
        firstName: $firstName
        lastName: $lastName
        occupation: $occupation
        street: $street
        number: $number
        postalCode: $postalCode
        city: $city
        privatePhone: $privatePhone
        mobilePhone: $mobilePhone
        onlyJobRelatedTopics: $onlyJobRelatedTopics
      }
    ) {
      person {
        id
      }
      errors {
        field
        messages
      }
    }
  }
`);

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PersonProfileForm() {
  const [success, setSuccess] = useState(false);

  // fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [privatePhone, setPrivatePhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [onlyJobRelatedTopics, setOnlyJobRelatedTopics] = useState(false);

  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<PersonProfileFormErrors>({});

  // getPersonProfile
  const {
    called: getPersonProfileCalled,
    loading: getPersonProfileLoading,
    data: getPersonProfileData,
    error: getPersonProfileError
  } = useQuery(
    GET_PERSON_PROFILE_QUERY, {
      onCompleted: data => {
        const profile = data?.getPersonProfile;
        if (!profile)
          return;
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setStreet(profile.street || '');
        setNumber(profile.number || '');
        setPostalCode(profile.postalCode || '');
        setCity(profile.city || '');
        setPrivatePhone(profile.privatePhone || '');
        setMobilePhone(profile.mobilePhone || '');
        setOccupation(profile.occupation || '');
        setOnlyJobRelatedTopics(profile.onlyJobRelatedTopics === 'ABSOLUTE' ? true : false);
      },
    },
  );

  // updatePersonProfile
  const [ updatePersonProfile, {
    loading: updatePersonProfileLoading,
    reset: updatePersonProfileReset
  }] = useMutation(
    UPDATE_PERSON_PROFILE_MUTATION, {
      onCompleted: data => {
        const response = data.updatePersonProfile;
        if (!response)
          return;
        if(response.errors.length === 0) {
          updatePersonProfileReset();
          setErrors({});
          setChanged({});
          setSuccess(true);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updatePersonProfileReset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetPersonProfile"
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
    updatePersonProfile({
      variables: {
        firstName: firstName,
        lastName: lastName,
        street: street,
        number: number,
        postalCode: postalCode,
        city: city,
        privatePhone: privatePhone,
        mobilePhone: mobilePhone,
        occupation: occupation,
        onlyJobRelatedTopics: onlyJobRelatedTopics ? 'ABSOLUTE' : 'NOTONLY',
      }
    });
  }

  const handleSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway')
      return;
    setSuccess(false);
  };

  // return
  if (getPersonProfileError)
    return <div>Error</div>;
  if (!getPersonProfileCalled || getPersonProfileLoading)
    return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>

      {/* Errors */}
      <FormError error={errors.form}/>

      {/* Fields */}
      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.firstName)}
        fullWidth
      >
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          value={firstName}
          onChange={(event) => {
            handleChanged('firstName', firstName, event.target.value);
            setFirstName(event.target.value);
          }}
        />
        <FormFieldError error={errors.firstName}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.lastName)}
        fullWidth
      >
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          id="lastName"
          value={lastName}
          onChange={(event) => {
            handleChanged('lastName', lastName, event.target.value);
            setLastName(event.target.value);
          }}
        />
        <FormFieldError error={errors.lastName}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.street)}
        fullWidth
      >
        <InputLabel htmlFor="street">Street</InputLabel>
        <Input
          id="street"
          value={street}
          onChange={(event) => {
            handleChanged('street', street, event.target.value);
            setStreet(event.target.value);
          }}
        />
        <FormFieldError error={errors.street}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.number)}
        fullWidth
      >
        <InputLabel htmlFor="number">Street Number</InputLabel>
        <Input
          id="number"
          value={number}
          onChange={(event) => {
            handleChanged('number', number, event.target.value);
            setNumber(event.target.value);
          }}
        />
        <FormFieldError error={errors.number}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.postalCode)}
        fullWidth
      >
        <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
        <Input
          id="postalCode"
          value={postalCode}
          onChange={(event) => {
            handleChanged('postalCode', postalCode, event.target.value);
            setPostalCode(event.target.value);
          }}
        />
        <FormFieldError error={errors.postalCode}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.city)}
        fullWidth
      >
        <InputLabel htmlFor="city">City</InputLabel>
        <Input
          id="city"
          value={city}
          onChange={(event) => {
            handleChanged('city', city, event.target.value);
            setCity(event.target.value);
          }}
        />
        <FormFieldError error={errors.city}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.privatePhone)}
        fullWidth
      >
        <InputLabel htmlFor="privatePhone">Private Phone</InputLabel>
        <Input
          id="privatePhone"
          value={privatePhone}
          onChange={(event) => {
            handleChanged('privatePhone', privatePhone, event.target.value);
            setPrivatePhone(event.target.value);
          }}
        />
        <FormFieldError error={errors.privatePhone}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.mobilePhone)}
        fullWidth
      >
        <InputLabel htmlFor="mobilePhone">Mobile Phone</InputLabel>
        <Input
          id="mobilePhone"
          value={mobilePhone}
          onChange={(event) => {
            handleChanged('mobilePhone', mobilePhone, event.target.value);
            setMobilePhone(event.target.value);
          }}
        />
        <FormFieldError error={errors.mobilePhone}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.occupation)}
        fullWidth
      >
        <InputLabel htmlFor="occupation">Occupation</InputLabel>
        <Input
          id="occupation"
          value={occupation}
          onChange={(event) => {
            handleChanged('occupation', occupation, event.target.value);
            setOccupation(event.target.value);
          }}
        />
        <FormFieldError error={errors.occupation}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.occupation)}
        fullWidth
      >
        <FormControlLabel
          label="Only Job Related Topics"
          control={
            <Switch
              checked={onlyJobRelatedTopics}
              onChange={(event) => {
                handleChanged('onlyJobRelatedTopics', onlyJobRelatedTopics, event.target.checked);
                setOnlyJobRelatedTopics(event.target.checked);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
        />
        <FormFieldError error={errors.occupation}/>
      </FormControl>

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          updatePersonProfileLoading ||
          Object.keys(changed).length === 0
        }
      >
        {updatePersonProfileLoading ? "Saving..." : "Save"}
      </Button>

      {/* Feedback */}
      <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess}>
        <Alert onClose={handleSuccess} severity="success" sx={{ width: '100%' }}>
          Profile updated
        </Alert>
      </Snackbar>

    </form>
  )
}

export default PersonProfileForm;
