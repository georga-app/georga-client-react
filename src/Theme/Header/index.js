import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable
import Toolbar from '@mui/material/Toolbar';

import DesktopMenu from './DesktopMenu';
import IconMenus from './IconMenus';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Notifications from './Notifications';

function Header(props) {
  const { notifications, toggleNotifications } = props;
  return <>
    <Grid container>
      <AppBar position="static" sx={{ zIndex: 1100 }}>
        <Toolbar disableGutters>

          {/* Left */}
          <Grid xs={4} sm={4} md={3} sx={{ textAlign: 'right' }}>
            <Logo />
            <MobileMenu />
          </Grid>

          {/* Middle */}
          <Grid xs={4} sm={6} md={6}>
            <DesktopMenu notifications={notifications} />
          </Grid>

          {/* Right */}
          <Grid xs={4} sm={2} md={3}>
            <IconMenus toggleNotifications={toggleNotifications} />
          </Grid>

        </Toolbar>
        <Notifications notifications={notifications} />
      </AppBar>
    </Grid>
  </>;
};
export default Header;
