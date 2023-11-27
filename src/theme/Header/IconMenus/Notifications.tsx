/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import IconButton from '@mui/material/IconButton';

import { MenuNotificationsIcon } from '@/theme/Icons';

function Notifications({
  toggleNotifications,
}: {
  toggleNotifications: () => void,
}) {
  return (
    <IconButton
      aria-label="Notifications"
      onClick={toggleNotifications}
      color="inherit"
    >
      <MenuNotificationsIcon />
    </IconButton>
  );
}

export default Notifications;
