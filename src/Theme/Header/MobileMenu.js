import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import UserContext from '../../Context/User';
import menus from '../../App/menus.js';

function MobileMenu() {
  const user = useContext(UserContext)
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend']
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const handleOpenMobileMenu = (event) => { setAnchorElMobile(event.currentTarget); };
  const handleCloseMobileMenu = () => { setAnchorElMobile(null); };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMobileMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElMobile}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElMobile)}
        onClose={handleCloseMobileMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {menu.main.map((page) => (
          <MenuItem
            key={page.path}
            component={Link}
            to={page.path}
            onClick={handleCloseMobileMenu}
          >
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MobileMenu;
