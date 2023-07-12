'use client';

import { useContext } from 'react';

import Box from '@mui/material/Box';

import AdminMenu from './AdminMenu';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

import UserContext from '@/provider/User';

function IconMenus({
  toggleNotifications,
}: {
  toggleNotifications: () => void,
}) {
  const user = useContext(UserContext);
  return !user.isLoggedIn ? <></> : (
    <Box sx={{ flexGrow: 0 }}>
      <AdminMenu />
      <Notifications toggleNotifications={toggleNotifications} />
      <UserMenu />
    </Box>
  );
}

export default IconMenus;
