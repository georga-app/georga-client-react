import { useState, useContext } from 'react';
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import BuildCircle from '@mui/icons-material/BuildCircle';

import UserContext from '../../../Context/User';
import menus from '../../../App/menus.js';

function AdminMenu() {
  const user = useContext(UserContext);
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend'];
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const handleOpenAdminMenu = (event) => { setAnchorElAdmin(event.currentTarget); };
  const handleCloseAdminMenu = () => { setAnchorElAdmin(null); };
  return !user.hasAdminLevel() ? <></> : <>
    <IconButton
      aria-label="admin menue"
      aria-controls="menu-admin"
      aria-haspopup="true"
      onClick={handleOpenAdminMenu}
      color="inherit"
    >
      <BuildCircle />
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
        return page.divider ? <Divider key={index} /> : (
          <MenuItem
            key={page.path}
            component={Link}
            to={page.path}
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
