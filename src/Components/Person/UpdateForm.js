import React, { useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";

const LIST_PERSON_PROPERTIES_QUERY = gql`
  query ListPersonProperties (
    $organizationName: String
  ) {
    listPersonPropertyGroups (organization_Name: $organizationName) {
      edges {
        node {
          id
          codename
          name
          selectionType
          necessity
          organization {
            id
            name
          }
        }
      }
    }
    listPersonProperties (group_Organization_Name: $organizationName) {
      edges {
        node {
          id
          name
          group {
            codename
            organization {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const GET_PERSON_PROFILE_QUERY = gql`
  query GetPersonProfile {
    getPersonProfile {
      firstName
      lastName
      mobilePhone
      properties {
        edges {
          node {
            id
            name
            group {
              codename
              organization {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

const UPDATE_PERSON_PROFILE_MUTATION = gql`
  mutation UpdatePersonProfile (
    $firstName: String
    $lastName: String
    $mobilePhone: String
    $properties: [ID]
  ) {
    updatePersonProfile (
      input: {
        firstName: $firstName
        lastName: $lastName
        mobilePhone: $mobilePhone
        properties: $properties
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
  const [allPersonPropertyGroups, setAllPersonPropertyGroups] = useState([]);
  const [allPersonProperties, setAllPersonProperties] = useState([]);
  const fields = {
    firstName: useState(""),
    lastName: useState(""),
    mobilePhone: useState(""),
    properties: useState({}),
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // getPersonProfile
  const {
    called: getPersonProfileCalled,
    loading: getPersonProfileLoading,
    data: getPersonProfileData,
    error: getPersonProfileError
  } = useQuery(
    GET_PERSON_PROFILE_QUERY, {
      onCompleted: data => {
        for (const [key, state] of Object.entries(fields)) {
          // sanity checks
          if (!(key in data))
            continue;
          let value = data[key]
          if (!value)
            continue;
          // use edges for connections
          if (value.__typename?.endsWith("Connection"))
            value = value.edges;
          // set state
          switch (key) {
            case "properties":
              let propertyGroups = {}
              value.forEach(obj => {
                const group = obj.node.group.codename
                if (!(group in propertyGroups))
                  propertyGroups[group] = []
                propertyGroups[group] = propertyGroups[group].concat(obj);
              });
              state[1](propertyGroups);
              console.log(propertyGroups)
              break;
            default:
              state[1](value);
          }
        }
      },
    },
  );

  // listPersonProperties
  const {
    called: listPersonPropertiesCalled,
    loading: listPersonPropertiesLoading
  } = useQuery(
    LIST_PERSON_PROPERTIES_QUERY, {
      variables: {
        organizationName: "French Blue Circle",
      },
      onCompleted: data => {
        const propertyGroups = data.listPersonPropertyGroups.edges.map(
          edge => { return edge.node; }
        )
        setAllPersonPropertyGroups(propertyGroups);
        setAllPersonProperties(data.listPersonProperties.edges);
        let emptyPropertyGroups = {}
        propertyGroups.forEach(obj => {
          if (!(obj.codename in fields.properties[0])) {
            emptyPropertyGroups[obj.codename] = []
          }
        });
        fields.properties[1](obj => ({...obj, ...emptyPropertyGroups}));
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
        if(data.updatePersonProfile.errors.length === 0) {
          updatePersonProfileReset();
          setChanged({});
        } else {
          var fieldErrors = {};
          data.updatePersonProfile.errors.forEach(error => {
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
  function handleChange(event) {
    const target = event.field || event.target.id || event.target.name;
    const propertyGroup = event.propertyGroup?.codename;
    const currentValue = getPersonProfileData[target];
    let updatedValue = event.value || event.target.value;
    let updatedPropertyGroups = null;

    // update fields
    if (propertyGroup) {  // fields -1:n-> form inputs
      updatedPropertyGroups = {...fields[target][0], [propertyGroup]: updatedValue};
      fields[target][1](updatedPropertyGroups);
    } else {  // fields -1:1-> form inputs
      fields[target][1](updatedValue);
    }

    // update diff
    if (propertyGroup) {  // fields -1:n-> form inputs
      updatedValue = []
      Object.keys(updatedPropertyGroups).forEach(function(key) {
        let updatedPropertyGroup = updatedPropertyGroups[key];
        for (const value of updatedPropertyGroup) {
          updatedValue.push(value);
        }
      });
    }
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
    updatePersonProfile({variables: variables});
  }

  // return
  if (getPersonProfileError)
    return <div>Error</div>;
  if (!getPersonProfileCalled || getPersonProfileLoading
      || !listPersonPropertiesCalled || listPersonPropertiesLoading)
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

      {allPersonPropertyGroups.map((propertyGroup) =>
        <FormControl
          key={propertyGroup.codename}
          margin="normal"
          variant="standard"
          error={Boolean(errors.properties)}
          fullWidth
        >
          <Autocomplete
            multiple={propertyGroup.selectionType === "MULTISELECT" ? true : false}
            fullWidth
            size="small"
            id={"properties-" + propertyGroup.codename}
            name={"properties-" + propertyGroup.codename}
            options={allPersonProperties.filter((obj) =>
              obj.node.group.codename === propertyGroup.codename)}
            value={propertyGroup.selectionType === "MULTISELECT"
              ? fields.properties[0][propertyGroup.codename] || []
              : fields.properties[0][propertyGroup.codename]?.length === 1
                ? fields.properties[0][propertyGroup.codename][0]
                : null
            }
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
              <TextField {...params} variant="standard" label={propertyGroup.name} />
            )}
            onChange={(event, selected) => {
              event.field = "properties";
              event.propertyGroup = propertyGroup;
              event.value = selected;
              if (propertyGroup.selectionType === "SINGLESELECT")
                event.value = selected === null ? [] : [selected]
              handleChange(event);
            }}
          />
        </FormControl>
      )}

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

    </form>
  )
}

export default PersonUpdateForm;
