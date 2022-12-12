import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Lock from "@mui/icons-material/Lock";

import UserContext from "../../Context/User";
import FormFieldError from "../Shared/FormFieldError";
import FormError from "../Shared/FormError";

const TOKEN_AUTH_MUTATION = gql`
  mutation TokenAuth (
    $email: String!
    $password: String!
  ) {
    tokenAuth(
      input: {
        email: $email
        password: $password
      }
    ) {
      id
      token
      refreshExpiresIn
      adminLevel
    }
  }
`;

function PersonLoginForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);

  // fields
  const [email, setEmail] = useState(state?.email ? state.email : "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // tokenAuthMutation
  const [login, { loading, reset }] = useMutation(
    TOKEN_AUTH_MUTATION, {
      onCompleted: data => {
        user.login(data.tokenAuth);
        navigate("/");
      },
      onError: error => {
        setErrors({form: error.message});
        reset()
      }
    }
  );

  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        email: email,
        password: password,
      }
    });
  }

  return (
    <>
        {/* Header */}
        <Avatar sx={{
          margin: 1,
          backgroundColor: Object.keys(errors).length > 0 ? "error.main" : "secondary.main",
          color: "white",
        }}>
          <Lock />
        </Avatar>
        <Typography variant="headline">Login</Typography>

        {/* Form */}
        <form onSubmit={event => handleSubmit(event)}>
          <FormError error={errors?.form}/>
          <FormControl
            margin="normal"
            variant="standard"
            required
            fullWidth
            error={Boolean(errors.email)}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
            <FormFieldError error={errors.email}/>
          </FormControl>
          <FormControl
            margin="normal"
            variant="standard"
            required
            fullWidth
            error={Boolean(errors.password)}
          >
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
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>
    </>
  );
}

export default PersonLoginForm;
