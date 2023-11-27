/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useContext, useState } from 'react';
import Link from "next/link";

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { MenuMobileIcon } from '@/theme/Icons';

import UserContext from '@/provider/User';
import menus from '@/app/menus';

function MobileMenu() {
  const user = useContext(UserContext)
  const menu = user.isLoggedIn ? menus['backend'] : menus['frontend']
  const [anchorElMobile, setAnchorElMobile] = useState<null | HTMLElement>(null);
  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMobile(event.currentTarget);
  };
  const handleCloseMobileMenu = () => { setAnchorElMobile(null); };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMobileMenu}
        color="inherit"
      >
        <MenuMobileIcon />
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
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {menu.main.map((page) => page.type !== 'link' ? '' : (
          <MenuItem
            key={page.path}
            component={Link}
            href={page.path}
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
