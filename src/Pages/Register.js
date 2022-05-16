import Paper from "@mui/material/Paper";

import Theme from '../Components/Shared/Theme';
import PersonRegisterForm from "../Components/Models/PersonRegisterForm";

function Register(props) {
  return (
    <Theme menus={props.menus} bgcolor="none">
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
    </Theme>
  );
}

export default Register;
