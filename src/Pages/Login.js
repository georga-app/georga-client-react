import Paper from "@mui/material/Paper";

import Theme from '../Components/Shared/Theme';
import PersonLoginForm from '../Components/Models/PersonLoginForm';

function Login(props) {
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
        <PersonLoginForm />
      </Paper>
    </Theme>
  );
}

export default Login;
