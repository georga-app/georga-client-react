import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Footer(props) {
  return (
    <Box sx={{ paddingY: 2 }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {props.menus.footer.map((page) => (
          <Button
            key={page.path}
            component={Link}
            to={page.path}
            sx={{ textTransform: 'none' }}
          >
            {page.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

export default Footer;
