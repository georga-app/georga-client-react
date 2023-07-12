'use client';

import Paper from "@mui/material/Paper";

import OneColumn from '@/theme/layouts/OneColumn';
import PersonRegisterForm from "@/components/person/RegisterForm";

function Register() {
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
        <PersonRegisterForm />
      </Paper>
    </OneColumn>
  );
}

export default Register;
