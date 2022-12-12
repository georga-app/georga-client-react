import IconButton from '@mui/material/IconButton';

import CircleNotifications from '@mui/icons-material/CircleNotifications';

function Notifications() {
  const handleOpenNotifications = () => {};
  return (
    <IconButton
      aria-label="notifications"
      onClick={handleOpenNotifications}
      color="inherit"
    >
      <CircleNotifications />
    </IconButton>
  );
}

export default Notifications;
