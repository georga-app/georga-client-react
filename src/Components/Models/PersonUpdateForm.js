import React, { useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";

const GET_PERSON_QUERY = gql`
  query GetPerson ($id: ID!) {
    node(id: $id) {
      ... on PersonType {
        title
        firstName
        lastName
        mobilePhone
      }
    }
  }
`;

const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePerson (
    $id: ID!,
    $title: String,
    $firstName: String,
    $lastName: String,
    $mobilePhone: String
  ) {
    updatePerson(
      input: {
        id: $id
        title: $title
        firstName: $firstName
        lastName: $lastName
        mobilePhone: $mobilePhone
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
`;

function PersonUpdateForm(props) {
  const [errors, setErrors] = useState({});
  const [changed, setChanged] = useState({});
  const fields = {
    'title': useState(""),
    'firstName': useState(""),
    'lastName': useState(""),
    'mobilePhone': useState(""),
  }

  // getPerson
  const {
    called: getCalled, loading: getLoading, data: getData, error: getError
  } = useQuery(
    GET_PERSON_QUERY, {
      variables: {
        id: localStorage.getItem("authId"),
      },
      onCompleted: data => {
        for (const [key, state] of Object.entries(fields)) {
          if (key in data.node && data.node[key])
            state[1](data.node[key]);
        }
      },
    },
  );

  // updatePerson
  const [ updatePerson, {
    loading: updateLoading, reset: updateReset
  }] = useMutation(
    UPDATE_PERSON_MUTATION, {
      onCompleted: data => {
        if(data.updatePerson.errors.length === 0) {
          updateReset();
          setChanged({});
        } else {
          var fieldErrors = {};
          data.updatePerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updateReset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
      refetchQueries: [
        "GetPerson"
      ]
    }
  );

  // change
  function handleChange(event) {
    const target = event.target.id || event.target.name;
    const currentValue = getData.node[target];
    const updatedValue = event.target.value;
    // update field
    fields[target][1](updatedValue);
    // update diff
    if (updatedValue === currentValue || (currentValue === null && !updatedValue)) {
      const updatedChanged = Object.assign({}, changed)
      delete updatedChanged[target]
      setChanged(updatedChanged)
    } else {
      setChanged(currentChanged => ({...currentChanged, [target]: updatedValue }))
    }
  }

  // submit
  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(changed).length === 0)
      return;
    const variables = { id: localStorage.getItem("authId"), ...changed };
    updatePerson({variables: variables});
  }

  // return
  if (getError)
    return <div>Error</div>;
  if (!getCalled || getLoading)
    return <div>Loading...</div>;
  return (
    <form onSubmit={event => handleSubmit(event)}>

      {/* Errors */}
      <FormError error={errors.form}/>

      {/* Fields */}
      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.title)}
        fullWidth
        required
      >
        <InputLabel htmlFor="title" sx={{ ml: 1.5 }}>Title</InputLabel>
        <Select
          id="title"
          name="title"
          label="Title"
          value={fields['title'][0]}
          onChange={event => handleChange(event)}
        >
          <MenuItem value={"NONE"}>None</MenuItem>
          <MenuItem value={"HERR"}>Male</MenuItem>
          <MenuItem value={"FRAU"}>Female</MenuItem>
          <MenuItem value={"DIVERS"}>Diverse</MenuItem>
        </Select>
        <FormFieldError error={errors.title}/>
      </FormControl>

      <FormControl
        margin="normal"
        error={Boolean(errors.firstName)}
        fullWidth
      >
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          value={fields['firstName'][0]}
          onChange={event => handleChange(event)}
        />
        <FormFieldError error={errors.firstName}/>
      </FormControl>

      <FormControl
        margin="normal"
        error={Boolean(errors.lastName)}
        fullWidth
      >
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          id="lastName"
          value={fields['lastName'][0]}
          onChange={event => handleChange(event)}
        />
        <FormFieldError error={errors.lastName}/>
      </FormControl>

      <FormControl
        margin="normal"
        error={Boolean(errors.mobilePhone)}
        fullWidth
      >
        <InputLabel htmlFor="mobilePhone">Mobile Phone</InputLabel>
        <Input
          id="mobilePhone"
          value={fields['mobilePhone'][0]}
          onChange={event => handleChange(event)}
        />
        <FormFieldError error={errors.mobilePhone}/>
      </FormControl>

      {/* Controls */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={
          updateLoading ||
          Object.keys(changed).length === 0
        }
      >
        {updateLoading ? "Saving..." : "Save"}
      </Button>

      {/* Feedback */}

    </form>
  )
}

export default PersonUpdateForm;
