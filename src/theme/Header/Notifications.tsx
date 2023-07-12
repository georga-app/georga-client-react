import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';

function Notifications({
  notifications
}: {
  notifications: boolean
}) {
  return (
    <Collapse in={notifications}>
      <Container sx={{ pb: 10 }}>
        Notifications
      </Container>
    </Collapse>
  );
}

export default Notifications;
