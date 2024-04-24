/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useContext } from 'react';

import Box from '@mui/material/Box';

import AdminMenu from './AdminMenu';
import Notifications from './Notifications';
import OrganizationMenu from './OrganizationMenu';
import UserMenu from './UserMenu';

import UserContext from '@/provider/User';

function IconMenus({
  toggleNotifications,
}: {
  toggleNotifications: () => void,
}) {
  const user = useContext(UserContext);
  return !user.isLoggedIn ? <></> : (
    <Box sx={{ flexGrow: 0, flexWrap: 0 }}>
      <AdminMenu />
      <Notifications toggleNotifications={toggleNotifications} />
      <OrganizationMenu />
      <UserMenu />
    </Box>
  );
}

export default IconMenus;
