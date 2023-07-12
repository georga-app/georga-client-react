import { useContext } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import UserContext from '@/provider/User';
import menus from '@/menus';

function Menu() {
  const user = useContext(UserContext);
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend'];
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {menu.footer.map((page) => page.type !== 'link' ? '' : (
        <Button
          key={page.path}
          component={Link}
          href={page.path}
          sx={{ textTransform: 'none' }}
        >
          {page.name}
        </Button>
      ))}
    </Stack>
  );
}

export default Menu;
