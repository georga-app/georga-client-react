/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useState, useContext, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@apollo/client';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { LoginIcon } from "@/theme/Icons"

import UserContext from "@/provider/User";
import Form from "@/components/shared/Form";
import { Input } from "@/components/shared/FormFields";

import { TOKEN_AUTH_MUTATION } from '@/gql/person';

import { TokenAuthMutationVariables } from '@/types/__generated__/graphql';
import { FormErrors } from "@/types/FormErrors";

type Errors = FormErrors<TokenAuthMutationVariables>;

function PersonLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useContext(UserContext);

  // fields
  const emailPreset = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailPreset);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // tokenAuthMutation
  const [login, { loading, reset }] = useMutation(
    TOKEN_AUTH_MUTATION, {
      onCompleted: data => {
        user.login(data.tokenAuth);
        router.push("/");
      },
      onError: error => {
        setErrors({form: error.message});
        reset()
      }
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
          <LoginIcon />
        </Avatar>
        <Typography variant="button">Login</Typography>

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
            disabled={
              loading ||
              !email.trim() ||
              !password.trim()
            }
            sx={{ marginTop: 1 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </Form>
    </>
  );
}

function PersonLoginFormSuspense() {
  return (
    <Suspense>
      <PersonLoginForm />
    </Suspense>
  )
}

export default PersonLoginFormSuspense;
