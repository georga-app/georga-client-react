import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client';

import Autocomplete from '@mui/material/Autocomplete';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Gavel from "@mui/icons-material/Gavel";
import VerifiedUserTwoTone from "@mui/icons-material/VerifiedUserTwoTone";

import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";


const GET_PERSON_OPTIONS_QUERY = gql`
  query GetPersonOptions {
    allPersonTitleOptions: __type(name: "PersonTitle") {
      enumValues {
        name
        description
      }
    }
    allQualificationCategories {
      edges {
        node {
          id
          code
          name
          selectionType
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

const REGISTER_PERSON_MUTATION = gql`
  mutation RegisterPerson (
    $email: String!
    $password: String!
    $title: String!
    $firstName: String
    $lastName: String
    $mobilePhone: String
    $qualifications: [ID]
  ) {
    registerPerson(
      input: {
        email: $email
        password: $password
        title: $title
        firstName: $firstName
        lastName: $lastName
        mobilePhone: $mobilePhone
        qualifications: $qualifications
      }
    ) {
      id
      errors {
        field
        messages
      }
    }
  }
`;

function PersonRegisterForm(props) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [allPersonTitleOptions, setAllPersonTitleOptions] = useState([]);
  const [allQualificationCategories, setAllQualificationCategories] = useState([]);
  const [allQualifications, setAllQualifications] = useState([]);
  const [allRestrictions, setAllRestrictions] = useState([]);
  const fields = {
    email: useState(""),
    password: useState(""),
    title: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    mobilePhone: useState(""),
    qualifications: useState({}),
    restrictions: useState([]),
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // qualifications, restrictions
  useQuery(
    GET_PERSON_OPTIONS_QUERY, {
      onCompleted: data => {
        setAllPersonTitleOptions(
          data.allPersonTitleOptions.enumValues
        );
        setAllQualificationCategories(
          data.allQualificationCategories.edges.map(
            edge => { return edge.node; }
          )
        );
        setAllQualifications(
          data.allQualifications.edges.map(
            edge => { return edge.node; }
          )
        );
        setAllRestrictions(
          data.allRestrictions.edges.map(
            edge => { return edge.node; }
          )
        );
      },
    },
  );

  // registerPerson
  const [registerPerson, {
    loading: registerLoading, reset: registerReset
  }] = useMutation(
    REGISTER_PERSON_MUTATION, {
      onCompleted: data => {
        if(data.registerPerson.errors.length === 0) {
          setOpen(true);
        } else {
          var fieldErrors = {};
          data.registerPerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages;
          });
          setErrors(fieldErrors);
          registerReset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      },
    }
  );

  // change
  function handleChange(event) {
    const target = event.target.id || event.target.name;
    fields[target][1](event.target.value);
  }

  // submit
  function handleSubmit(event) {
    event.preventDefault();
    let variables = {}
    for (const [key, state] of Object.entries(fields)) {
      switch (key) {
        case 'qualifications':
          variables[key] = [];
          for (const category in state[0]) {
            variables[key] = variables[key].concat(state[0][category]);
          }
          break;
        default:
          variables[key] = state[0];
      }
    }
    registerPerson({variables: variables});
  }

  // return
  return (
    <>
      {/* Header */}
      <Avatar sx={{
        margin: 1,
        backgroundColor: Object.keys(errors).length > 0 ? "error.main" : "secondary.main",
        color: "white",
      }}>
        <Gavel />
      </Avatar>
      <Typography variant="headline">Register</Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Errors */}
        <FormError error={errors.form}/>

        {/* Fields */}
        <FormControl
          margin="normal"
          variant="standard"
          error={Boolean(errors.email)}
          fullWidth
          required
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={fields.email[0]}
            onChange={handleChange}
          />
          <FormFieldError error={errors.email}/>
        </FormControl>

        <FormControl
          margin="normal"
          variant="standard"
          error={Boolean(errors.password)}
          fullWidth
          required
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={fields.password[0]}
            onChange={handleChange}
          />
          <FormFieldError error={errors.password}/>
        </FormControl>

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
            {allPersonTitleOptions.map(option =>
              <MenuItem key={option.name} value={option.name}>{option.description}</MenuItem>
            )}
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
              multiple={category.selectionType === "MULTISELECT" ? true : false}
              fullWidth
              size="small"
              id={"qualifications-" + category.code}
              options={allQualifications.filter((obj) =>
                obj.qualificationCategory.code === category.code)}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label={category.name} />
              )}
              onChange={(event, options) => {
                fields.qualifications[1](currentQualifications => ({
                  ...currentQualifications,
                  [category.code]: category.selectionType === "MULTISELECT"
                    ? options.map(option => option.id)
                    : options?.id
                }))
              }}
            />
          </FormControl>
        )}

        <FormControl
          margin="normal"
          variant="standard"
          error={Boolean(errors.restrictions)}
          fullWidth
        >
          <Autocomplete
            multiple
            fullWidth
            size="small"
            id="restrictions"
            options={allRestrictions}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Restrictions" />
            )}
            onChange={(event, options) => {
              fields.restrictions[1](options.map(option => option.id))
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
            registerLoading ||
            !fields.email[0].trim() ||
            !fields.title[0].trim()
          }
        >
          {registerLoading ? "Registering..." : "Register"}
        </Button>

        {/* Feedback */}
        <Dialog open={open} disablebackdropclick="true">
          <DialogTitle>
            <VerifiedUserTwoTone sx={{
              paddingY: "2px",
              marginRight: "5px",
              verticalAlign: "middle",
              color: "green"
            }} />
            New Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText>User successfully created!</DialogContentText>
            <DialogContentText>Check your email to verify the account.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>

      </form>
    </>
  )
}

export default PersonRegisterForm;
