import { useContext, useState } from 'react';
import Link from "next/link";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import AccountCircle from '@mui/icons-material/AccountCircle';

import UserContext from '@/provider/User';
import menus from '@/menus';

function UserMenu() {
  const user = useContext(UserContext);
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend'];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };
  return <>
    <IconButton
      aria-label="user menue"
      aria-controls="menu-user"
      aria-haspopup="true"
      onClick={handleOpenUserMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-user"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {menu.user.map((page) => page.type !== 'link' ? '' : (
        <MenuItem
          key={page.path}
          component={Link}
          href={page.path}
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </>;
}

export default UserMenu;
