/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input, Switch } from "@/components/shared/FormFields";
import { useSnackbar } from "@/provider/Snackbar";

import {
  GET_PERSON_PROFILE_QUERY,
  UPDATE_PERSON_PROFILE_MUTATION,
} from '@/gql/person';

import {
  GetPersonProfileQuery,
  UpdatePersonProfileMutation,
  UpdatePersonProfileMutationVariables,
} from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

type Errors = FormErrors<UpdatePersonProfileMutationVariables>;

function PersonProfileForm({
  onSuccess = () => undefined,
  onError = () => undefined,
}: {
  onSuccess?: (data: UpdatePersonProfileMutation) => void,
  onError?: (data: UpdatePersonProfileMutation) => void,
}) {
  // context
  const snackbar = useSnackbar();

  // states
  const [changed, setChanged] = useState<{[id: string]: any}>({});
  const [errors, setErrors] = useState<Errors>({});

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

  // get
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

  // update
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
          snackbar.showSnackbar("Profile updated", 'success');
          onSuccess(data);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updatePersonProfileReset();
          onError(data);
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

  // return
  if (getPersonProfileError)
    return <div>Error</div>;
  if (!getPersonProfileCalled || getPersonProfileLoading)
    return <div>Loading...</div>;
  return (
    <Form handleSubmit={handleSubmit} error={errors.form}>

      {/* Fields */}
      <Input
        id="firstName"
        value={firstName}
        setValue={setFirstName}
        label="First Name"
        handleChanged={handleChanged}
        errors={errors.firstName}
      />
      <Input
        id="lastName"
        value={lastName}
        setValue={setLastName}
        label="Last Name"
        handleChanged={handleChanged}
        errors={errors.lastName}
      />
      <Input
        id="street"
        value={street}
        setValue={setStreet}
        label="Street"
        handleChanged={handleChanged}
        errors={errors.street}
      />
      <Input
        id="number"
        value={number}
        setValue={setNumber}
        label="Number"
        handleChanged={handleChanged}
        errors={errors.number}
      />
      <Input
        id="postalCode"
        value={postalCode}
        setValue={setPostalCode}
        label="Postal Code"
        handleChanged={handleChanged}
        errors={errors.postalCode}
      />
      <Input
        id="city"
        value={city}
        setValue={setCity}
        label="City"
        handleChanged={handleChanged}
        errors={errors.city}
      />
      <Input
        id="privatePhone"
        value={privatePhone}
        setValue={setPrivatePhone}
        label="Private Phone"
        handleChanged={handleChanged}
        errors={errors.privatePhone}
      />
      <Input
        id="mobilePhone"
        value={mobilePhone}
        setValue={setMobilePhone}
        label="Mobile Phone"
        handleChanged={handleChanged}
        errors={errors.mobilePhone}
      />
      <Input
        id="occupation"
        value={occupation}
        setValue={setOccupation}
        label="Occupation"
        handleChanged={handleChanged}
        errors={errors.occupation}
      />
      <Switch
        id="onlyJobRelatedTopics"
        value={onlyJobRelatedTopics}
        setValue={setOnlyJobRelatedTopics}
        label="Only Job Related Topics"
        handleChanged={handleChanged}
        errors={errors.onlyJobRelatedTopics}
      />

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          updatePersonProfileLoading
          || Object.keys(changed).length === 0
        }
      >
        {updatePersonProfileLoading ? "Saving..." : "Save"}
      </Button>

    </Form>
  )
}

export default PersonProfileForm;
