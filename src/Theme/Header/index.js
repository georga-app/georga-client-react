import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import IconMenus from './IconMenus';
import Logo from './Logo';
import MainMenu from './MainMenu';

function Header() {
  return (
    <AppBar position="static" sx={{ zIndex: 1100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MainMenu />
          <IconMenus />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
