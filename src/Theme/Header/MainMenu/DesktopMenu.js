import { useContext } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

import UserContext from '../../../Context/User';
import menus from '../../../App/menus.js';

function MainMenu(props) {
  const user = useContext(UserContext)
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend']
  const { notifications } = props;
  return (
    <Fade in={!notifications}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menu.main.map((page) => (
          <Button
            key={page.path}
            component={Link}
            to={page.path}
            sx={{ my: 2, color: 'white', textTransform: 'none', minWidth: "50px" }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </Fade>
  );
}

export default MainMenu;
