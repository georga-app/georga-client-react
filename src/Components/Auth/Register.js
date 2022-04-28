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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Gavel from "@mui/icons-material/Gavel";
import VerifiedUserTwoTone from "@mui/icons-material/VerifiedUserTwoTone";

import PersonForm from "../Models/PersonForm";

const REGISTER_PERSON = gql`
  mutation RegisterPerson (
    $email: String!,
    $password: String!,
    $title: String!,
    $firstName: String,
    $lastName: String,
    $mobilePhone: String
  ) {
    registerPerson(
      input: {
        email: $email,
        password: $password,
        title: $title,
        firstName: $firstName,
        lastName: $lastName,
        mobilePhone: $mobilePhone
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

function Register() {
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});
  const [registerPerson, { loading, reset }] = useMutation(
    REGISTER_PERSON, {
      onCompleted: data => {
        if(data.registerPerson.errors.length === 0) {
          setOpen(true);
        } else {
          var fieldErrors = {};
          data.registerPerson.errors.forEach(error => {
            fieldErrors[error.field] = error.messages
          });
          setErrors(fieldErrors);
          reset();
        }
      },
      onError: error => {
        setErrors({form: error.message});
      }
    }
  );

  return (
    <>
      {/* Form */}
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          marginX: {
            xs: 1,
            md: "auto"
          },
          width: {
            xs: "auto",
            md: 400
          },
        }}
      >
        <Avatar sx={{
          margin: 1,
          backgroundColor: Object.keys(errors).length > 0 ? "error.main" : "secondary.main",
          color: "white",
        }}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">Register</Typography>
        <PersonForm
          mutation={registerPerson}
          loading={loading}
          errors={errors}
          buttonText={loading ? "Registering..." : "Register"}
        />
      </Paper>

      {/* Success */}
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
    </>
  );
};

export default Register;
