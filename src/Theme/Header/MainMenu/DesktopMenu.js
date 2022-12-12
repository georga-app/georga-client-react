import { useContext } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import UserContext from '../../../Context/User';
import menus from '../../../App/menus.js';

function MainMenu() {
  const user = useContext(UserContext)
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend']
  return (
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
  );
}

export default MainMenu;
