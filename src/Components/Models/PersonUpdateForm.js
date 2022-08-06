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

const GET_PERSON_OPTIONS_QUERY = gql`
  query GetPersonOptions {
    allQualificationCategories {
      edges {
        node {
          id
          code
          name
        }
      }
    }
    allQualifications {
      edges {
        node {
          id
          name
          qualificationCategory {
            code
          }
        }
      }
    }
    allRestrictions {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const GET_PERSON_QUERY = gql`
  query GetPerson ($id: ID!) {
    node(id: $id) {
      ... on PersonType {
        title
        firstName
        lastName
        mobilePhone
        qualifications {
          edges {
            node {
              id
              name
              qualificationCategory {
                code
              }
            }
          }
        }
        restrictions {
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

const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePerson (
    $id: ID!
    $title: String
    $firstName: String
    $lastName: String
    $mobilePhone: String
    $qualifications: [ID]
    $restrictions: [ID]
  ) {
    updatePerson(
      input: {
        id: $id
        title: $title
        firstName: $firstName
        lastName: $lastName
        mobilePhone: $mobilePhone
        qualifications: $qualifications
        restrictions: $restrictions
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
  const [allQualificationCategories, setAllQualificationCategories] = useState([]);
  const [allQualifications, setAllQualifications] = useState([]);
  const [allRestrictions, setAllRestrictions] = useState([]);
  const fields = {
    title: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    mobilePhone: useState(""),
    qualifications: useState({}),
    restrictions: useState([]),
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // getPerson
  const {
    called: getPersonCalled,
    loading: getPersonLoading,
    data: getPersonData,
    error: getPersonError
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
          switch (key) {
            case "qualifications":
              let categories = {}
              value.forEach(obj => {
                const category = obj.node.qualificationCategory.code
                if (!(category in categories))
                  categories[category] = []
                categories[category] = categories[category].concat(obj);
              });
              state[1](categories);
              break;
            default:
              state[1](value);
          }
        }
      },
    },
  );

  // qualifications, restrictions
  const {
    called: getPersonOptionsCalled,
    loading: getPersonOptionsLoading
  } = useQuery(
    GET_PERSON_OPTIONS_QUERY, {
      onCompleted: data => {
        const categories = data.allQualificationCategories.edges.map(
          edge => { return edge.node; }
        )
        setAllQualificationCategories(categories);
        setAllQualifications(data.allQualifications.edges);
        setAllRestrictions(data.allRestrictions.edges);
        let emptyCategories = {}
        categories.forEach(obj => {
          const category = obj.code
          if (!(category in fields.qualifications[0]))
            emptyCategories[category] = []
        });
        fields.qualifications[1](obj => ({...obj, ...emptyCategories}));
      },
    },
  );

  // updatePerson
  const [ updatePerson, {
    loading: updatePersonLoading,
    reset: updatePersonReset
  }] = useMutation(
    UPDATE_PERSON_MUTATION, {
      onCompleted: data => {
        if(data.updatePerson.errors.length === 0) {
          updatePersonReset();
          setChanged({});
        } else {
          var fieldErrors = {};
          data.updatePerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          updatePersonReset();
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
    const category = event.fieldCategory
    const currentValue = getPersonData.node[target];
    let updatedValue = event.value || event.target.value;
    let updatedCategories = null;

    // update fields
    if (category) {  // fields -1:n-> form inputs
      updatedCategories = {...fields[target][0], [category]: updatedValue};
      fields[target][1](updatedCategories);
    } else {  // fields -1:1-> form inputs
      fields[target][1](updatedValue);
    }

    // update diff
    if (category) {  // fields -1:n-> form inputs
      updatedValue = []
      for (const [key, values] of Object.entries(updatedCategories)) {
        values.forEach(obj => updatedValue.push(obj));
      }
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
    updatePerson({variables: variables});
  }

  // return
  if (getPersonError)
    return <div>Error</div>;
  if (!getPersonCalled || getPersonLoading || !getPersonOptionsCalled || getPersonOptionsLoading)
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
          <MenuItem value={"MR"}>Male</MenuItem>
          <MenuItem value={"MS"}>Female</MenuItem>
          <MenuItem value={"MX"}>Diverse</MenuItem>
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

      {allQualificationCategories.map((category) =>
        <FormControl
          key={category.code}
          margin="normal"
          variant="standard"
          error={Boolean(errors.qualifications)}
          fullWidth
        >
          <Autocomplete
            multiple
            fullWidth
            size="small"
            id={"qualifications-" + category.code}
            name={"qualifications-" + category.code}
            options={allQualifications.filter((obj) =>
              obj.node.qualificationCategory.code === category.code)}
            value={fields.qualifications[0][category.code] || []}
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
              <TextField {...params} variant="standard" label={category.name} />
            )}
            onChange={(event, selected) => {
              event.field = "qualifications";
              event.fieldCategory = category.code;
              event.value = selected;
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
          updatePersonLoading ||
          Object.keys(changed).length === 0
        }
      >
        {updatePersonLoading ? "Saving..." : "Save"}
      </Button>

      {/* Feedback */}

    </form>
  )
}

export default PersonUpdateForm;
