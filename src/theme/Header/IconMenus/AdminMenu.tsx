/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useContext } from 'react';
import Link from "next/link";

import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { MenuAdminIcon } from '@/theme/Icons';

import UserContext from '@/provider/User';
import menus from '@/app/menus';

function AdminMenu() {
  const user = useContext(UserContext);
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend'];
  const [anchorElAdmin, setAnchorElAdmin] = useState<null | HTMLElement>(null);
  const handleOpenAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };
  const handleCloseAdminMenu = () => { setAnchorElAdmin(null); };
  return !user.hasAdminLevel() ? <></> : <>
    <IconButton
      aria-label="Admin menue"
      aria-controls="menu-admin"
      aria-haspopup="true"
      onClick={handleOpenAdminMenu}
      color="inherit"
    >
      <MenuAdminIcon />
    </IconButton>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-admin"
      anchorEl={anchorElAdmin}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElAdmin)}
      onClose={handleCloseAdminMenu}
    >
      {menu.admin.map((page, index) => {
        if (!user.hasAdminLevel(page.adminLevel))
          return [];
        return page.type === 'divider' ? <Divider key={index} /> : (
          <MenuItem
            key={page.path}
            component={Link}
            href={page.path}
            onClick={handleCloseAdminMenu}
          >
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        )
      })}
    </Menu>
  </>;
}

export default AdminMenu;
