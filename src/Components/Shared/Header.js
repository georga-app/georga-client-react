import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AccountCircle from '@mui/icons-material/AccountCircle';
import BuildCircle from '@mui/icons-material/BuildCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CircleNotifications from '@mui/icons-material/CircleNotifications';

import { ReactComponent as LogoGeorga } from '../../Images/logo-georga.svg';

import UserContext from '../../User';

function Header(props) {
  const user = React.useContext(UserContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event) => { setAnchorElUser(event.currentTarget); };
  const handleOpenAdminMenu = (event) => { setAnchorElAdmin(event.currentTarget); };
  const handleOpenNotifications = () => {};
  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };
  const handleCloseAdminMenu = () => { setAnchorElAdmin(null); };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo */}
          <Button
            key="home"
            component={Link}
            to="/"
            sx={{ mr: 2, color: 'white', display: { xs: 'none', md: 'block' } }}
          >
            <Box sx={{ mt: '3px', height: 35 }}>
              <LogoGeorga
                fill="#eceff1"
                stroke="#eceff1"
                alt="GeoRGA"
                style={{ width: 'auto', height: '100%' }}
              />
            </Box>
          </Button>

          {/* appbar menue */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.menus.main.map((page) => (
                <MenuItem
                  key={page.path}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* main menue */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.menus.main.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', textTransform: 'none', minWidth: "50px" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* icon nav */}
          {user.isLoggedIn &&
            <Box sx={{ flexGrow: 0 }}>

              {/* admin menue */}
              {user.hasAdminLevel() && <>
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
                    {props.menus.admin.map((page, index) => {
                      if (!user.hasAdminLevel(page.adminLevel))
                        return <></>
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
                </>
              }

              {/* notifications */}
              <IconButton
                aria-label="notifications"
                onClick={handleOpenNotifications}
                color="inherit"
              >
                <CircleNotifications />
              </IconButton>

              {/* user menue */}
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
                {props.menus.user.map((page) => (
                  <MenuItem
                    key={page.path}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
