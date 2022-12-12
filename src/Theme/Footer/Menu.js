import { useContext } from 'react';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import UserContext from '../../Context/User';
import menus from '../../App/menus.js';

function Menu() {
  const user = useContext(UserContext);
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend'];
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {menu.footer.map((page) => (
        <Button
          key={page.path}
          component={Link}
          to={page.path}
          sx={{ textTransform: 'none' }}
        >
          {page.name}
        </Button>
      ))}
    </Stack>
  );
}

export default Menu;
