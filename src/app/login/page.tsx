'use client';

import Paper from "@mui/material/Paper";

import OneColumn from '@/theme/layouts/OneColumn';
import PersonLoginForm from '@/components/person/LoginForm';

function Login() {
  return (
    <OneColumn bg='admin'>
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
        <PersonLoginForm />
      </Paper>
    </OneColumn>
  );
}

export default Login;
