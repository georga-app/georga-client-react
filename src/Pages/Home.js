import Theme from '../Components/Shared/Theme';
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import ExtLink from '@mui/material/Link'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";

function Home(props) {
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
        <Typography variant="h6">Geographic Resource & Group Allocation</Typography>
        <Typography variant="caption" sx={{ m: 0.2, mt: 1, textAlign: "justify" }}>
          Enable easy participation by volunteers and uncomplicated administration for 
          your short-term needs in your humanitarian aid charity, association or project.
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined button group" sx={{ my: 2 }}>
          <Button color="primary" to="/register" component={Link}>
            Register
          </Button>
          <Button color="secondary" to="/login" component={Link}>
            Login
          </Button>
        </ButtonGroup>
      </Paper>
      <Box
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
        <Stack direction="row" spacing={2}>
          <ExtLink href="https://georga.app">
            <Avatar>
              <LinkIcon />
            </Avatar>
          </ExtLink>
          <ExtLink href="https://twitter.com/GeoRGA_app">
            <Avatar>
              <TwitterIcon />
            </Avatar>
          </ExtLink>
          <ExtLink href="https://github.com/georga-app">
            <Avatar>
              <GitHubIcon />
            </Avatar>
          </ExtLink>
        </Stack>
      </Box>
    </Theme>
  );
}

export default Home;
