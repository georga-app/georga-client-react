/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useContext } from 'react';
import Link from "next/link";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

import UserContext from '@/provider/User';
import menus from '@/app/menus';

function MainMenu({
  notifications,
}: {
  notifications: boolean,
}) {
  const user = useContext(UserContext)
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend']
  return (
    <Fade in={!notifications}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
        {menu.main.map((page) => page.type !== 'link' ? '' : (
          <Button
            key={page.path}
            component={Link}
            href={page.path}
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
