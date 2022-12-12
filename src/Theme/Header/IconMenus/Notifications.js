import IconButton from '@mui/material/IconButton';

import CircleNotifications from '@mui/icons-material/CircleNotifications';

function Notifications(props) {
  return (
    <IconButton
      aria-label="notifications"
      onClick={props.toggleNotifications}
      color="inherit"
    >
      <CircleNotifications />
    </IconButton>
  );
}

export default Notifications;
