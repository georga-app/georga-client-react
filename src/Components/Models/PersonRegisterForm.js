import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Gavel from "@mui/icons-material/Gavel";
import VerifiedUserTwoTone from "@mui/icons-material/VerifiedUserTwoTone";

import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";


const REGISTER_PERSON_MUTATION = gql`
  mutation RegisterPerson (
    $email: String!
    $password: String!
  ) {
    registerPerson(
      input: {
        email: $email
        password: $password
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

  // fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // registerPersonMutation
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

  // submit
  function handleSubmit(event) {
    event.preventDefault();
    registerPerson({
      variables: {
        email: email,
        password: password,
      }
    });
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
            value={email}
            onChange={event => setEmail(event.target.value)}
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
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <FormFieldError error={errors.password}/>
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
            !email.trim() ||
            !password.trim()
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
