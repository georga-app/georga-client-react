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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Gavel from "@mui/icons-material/Gavel";
import VerifiedUserTwoTone from "@mui/icons-material/VerifiedUserTwoTone";

import FormError from "../Shared/FormError";
import FormFieldError from "../Shared/FormFieldError";

const REGISTER_PERSON = gql`
  mutation RegisterPerson (
    $email: String!,
    $password: String!,
    $firstName: String,
    $lastName: String,
    $mobilePhone: String
  ) {
    registerPerson(
      input: {
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        mobilePhone: $mobilePhone
      }
    ) {
      person {
        email
      }
      errors {
        field
        messages
      }
    }
  }
`;

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = event => {
    event.preventDefault();
    registerPerson({
      variables: {
        firstName: firstName,
        lastName: lastName,
        MobilePhone: mobilePhone,
        email: email,
        password: password,
      }
    });
  }

  return (
    <>
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

        {/* Form */}
        <form onSubmit={event => handleSubmit(event)}>
          <FormError error={errors?.form}/>
          <FormControl margin="normal" required fullWidth error={Boolean(errors.firstName)}>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              onChange={event => setFirstName(event.target.value)}
            />
            <FormFieldError error={errors.firstName}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth error={Boolean(errors.lastName)}>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              onChange={event => setLastName(event.target.value)}
            />
            <FormFieldError error={errors.lastName}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth error={Boolean(errors.mobilePhone)}>
            <InputLabel htmlFor="mobilePhone">Mobile Phone</InputLabel>
            <Input
              id="mobilePhone"
              onChange={event => setMobilePhone(event.target.value)}
            />
            <FormFieldError error={errors.mobilePhone}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth error={Boolean(errors.email)}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              onChange={event => setEmail(event.target.value)}
            />
            <FormFieldError error={errors.email}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth error={Boolean(errors.password)}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormFieldError error={errors.password}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={
              loading ||
              !email.trim() ||
              !password.trim()
            }
            sx={{ marginTop: 1 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>
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
