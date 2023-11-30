/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import Link from "next/link";
import { useMutation } from '@apollo/client';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { RegisterIcon } from "@/theme/Icons"
import { RegisterSuccessIcon } from "@/theme/Icons"

import Form from "@/components/shared/Form";
import { Input } from "@/components/shared/FormFields";

import { gql } from '@/types/__generated__/gql';
import { RegisterPersonMutationVariables } from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";


const REGISTER_PERSON_MUTATION = gql(`
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
`);

type Errors = FormErrors<RegisterPersonMutationVariables>;

function PersonRegisterForm() {
  const [open, setOpen] = useState(false);

  // fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  // registerPersonMutation
  const [registerPerson, {
    loading: registerLoading, reset: registerReset
  }] = useMutation(
    REGISTER_PERSON_MUTATION, {
      onCompleted: data => {
        const response = data.registerPerson;
        if (!response)
          return;
        if(response.errors.length === 0) {
          setOpen(true);
        } else {
          var fieldErrors: {[fieldId: string]: string[]} = {};
          response.errors.forEach(error => {
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
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        <RegisterIcon />
      </Avatar>
      <Typography variant="button">Register</Typography>

      {/* Form */}
      <Form handleSubmit={handleSubmit} error={errors.form}>

        {/* Fields */}
        <Input
          id="email"
          value={email}
          setValue={setEmail}
          label="Email"
          type="email"
          required
          errors={errors.email}
        />
        <Input
          id="password"
          value={password}
          setValue={setPassword}
          label="Password"
          type="password"
          required
          errors={errors.password}
        />

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
        <Dialog open={open}>
          <DialogTitle>
            <RegisterSuccessIcon sx={{
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
              href="/login"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>

      </Form>
    </>
  )
}

export default PersonRegisterForm;
