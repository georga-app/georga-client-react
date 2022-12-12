import { useContext } from 'react';

import Box from '@mui/material/Box';

import AdminMenu from './AdminMenu';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

import UserContext from '../../../Context/User';

function IconMenus(props) {
  const user = useContext(UserContext);
  return user.isLoggedIn && (
    <Box sx={{ flexGrow: 0 }}>
      <AdminMenu />
      <Notifications toggleNotifications={props.toggleNotifications} />
      <UserMenu />
    </Box>
  );
}

export default IconMenus;
