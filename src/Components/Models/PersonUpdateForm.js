import React, { useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
        qualificationsLanguage {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const ALL_QUALIFICATIONS_LANGUAGE_QUERY = gql`
  query AllQualificationsLanguage {
    allQualificationsLanguage {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePerson (
    $id: ID!
    $title: String
    $firstName: String
    $lastName: String
    $mobilePhone: String
    $qualificationsLanguage: [ID]
  ) {
    updatePerson(
      input: {
        id: $id
        title: $title
        firstName: $firstName
        lastName: $lastName
        mobilePhone: $mobilePhone
        qualificationsLanguage: $qualificationsLanguage
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
  const [allQualificationsLanguage, setAllQualificationsLanguage] = useState([]);
  const fields = {
    title: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    mobilePhone: useState(""),
    qualificationsLanguage: useState([]),
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
          // sanity checks
          if (!(key in data.node))
            continue;
          let value = data.node[key]
          if (!value)
            continue;
          // use edges for connections
          if (value.__typename?.endsWith("Connection"))
            value = value.edges;
          // set state
          state[1](value);
        }
      },
    },
  );

  // allQualificationsLanguage
  useQuery(
    ALL_QUALIFICATIONS_LANGUAGE_QUERY, {
      onCompleted: data => {
        setAllQualificationsLanguage(data.allQualificationsLanguage.edges);
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
    const target = event.field || event.target.id || event.target.name;
    const currentValue = getData.node[target];
    let updatedValue = event.value || event.target.value;
    // update field
    fields[target][1](updatedValue);
    // update diff
    let isEqual = updatedValue === currentValue || (currentValue === null && !updatedValue);
    if (currentValue?.__typename?.endsWith("Connection")) {
      const updatedIDs = updatedValue.map(edge => edge.node.id);
      isEqual = currentValue.edges.length === updatedValue.length &&
                currentValue.edges.every(edge => updatedIDs.includes(edge.node.id))
      updatedValue = updatedIDs;
    }
    if (!isEqual) {  // add field
      setChanged(currentChanged => ({...currentChanged, [target]: updatedValue }))
    } else {  // remove field
      const updatedChanged = Object.assign({}, changed)
      delete updatedChanged[target]
      setChanged(updatedChanged)
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
    <form onSubmit={handleSubmit}>

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
        <InputLabel htmlFor="title">Title</InputLabel>
        <Select
          id="title"
          name="title"
          label="Title"
          value={fields.title[0]}
          onChange={handleChange}
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
        variant="standard"
        error={Boolean(errors.firstName)}
        fullWidth
      >
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          value={fields.firstName[0]}
          onChange={handleChange}
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
          value={fields.lastName[0]}
          onChange={handleChange}
        />
        <FormFieldError error={errors.lastName}/>
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
          value={fields.mobilePhone[0]}
          onChange={handleChange}
        />
        <FormFieldError error={errors.mobilePhone}/>
      </FormControl>

      <FormControl
        margin="normal"
        variant="standard"
        error={Boolean(errors.qualificationsLanguage)}
        fullWidth
      >
        <Autocomplete
          multiple
          fullWidth
          size="small"
          id="qualificationsLanguage"
          name="qualificationsLanguage"
          options={allQualificationsLanguage}
          value={fields.qualificationsLanguage[0]}
          isOptionEqualToValue={(option, value) => option.node.id === value.node.id}
          getOptionLabel={option => option.node.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.node.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Languages" />
          )}
          onChange={(event, selected) => {
            event.field = "qualificationsLanguage";
            event.value = selected;
            handleChange(event);
          }}
        />
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
