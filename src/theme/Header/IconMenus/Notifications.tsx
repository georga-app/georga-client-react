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
