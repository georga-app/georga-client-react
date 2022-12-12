import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import IconMenus from './IconMenus';
import Logo from './Logo';
import MainMenu from './MainMenu';
import Notifications from './Notifications';

function Header(props) {
  const { notifications, toggleNotifications } = props;
  return <>
    <AppBar position="static" sx={{ zIndex: 1100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MainMenu notifications={notifications} />
          <IconMenus toggleNotifications={toggleNotifications} />
        </Toolbar>
      </Container>
      <Notifications notifications={notifications} />
    </AppBar>
  </>;
};

export default Header;
