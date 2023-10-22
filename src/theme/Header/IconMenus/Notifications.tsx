/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import IconButton from '@mui/material/IconButton';

import CircleNotifications from '@mui/icons-material/CircleNotifications';

function Notifications({
  toggleNotifications,
}: {
  toggleNotifications: () => void,
}) {
  return (
    <IconButton
      aria-label="notifications"
      onClick={toggleNotifications}
      color="inherit"
    >
      <CircleNotifications />
    </IconButton>
  );
}

export default Notifications;
