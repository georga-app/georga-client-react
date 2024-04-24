/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable
import Toolbar from '@mui/material/Toolbar';

import ClientOnly from '@/components/shared/ClientOnly';
import DesktopMenu from './DesktopMenu';
import IconMenus from './IconMenus';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Notifications from './Notifications';

function Header({
  notifications,
  toggleNotifications,
}
: {
  notifications: boolean,
  toggleNotifications: () => void,
}) {
  return (
    <Grid container>
      <AppBar position="static" sx={{ zIndex: 1100 }}>
        <Toolbar disableGutters>

          {/* Left */}
          <Grid xs={4} sm={3} md={3} sx={{ textAlign: 'right' }}>
            <Logo />
            <ClientOnly>
              <MobileMenu />
            </ClientOnly>
          </Grid>

          {/* Middle */}
          <Grid xs={2} sm={6} md={6}>
            <ClientOnly>
              <DesktopMenu notifications={notifications} />
            </ClientOnly>
          </Grid>

          {/* Right */}
          <Grid xs={6} sm={3} md={3}>
            <ClientOnly>
              <IconMenus toggleNotifications={toggleNotifications} />
            </ClientOnly>
          </Grid>

        </Toolbar>
        <Notifications notifications={notifications} />
      </AppBar>
    </Grid>
  );
};
export default Header;
