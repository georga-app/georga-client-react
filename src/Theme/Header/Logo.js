import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ReactComponent as LogoGeorga } from '../../Images/logo-georga.svg';

function Logo() {
  return (
    <Button
      key="home"
      component={Link}
      to="/"
      sx={{
        mr: 2,
        color: 'white',
        width: 'fit-content',
        display: { xs: 'none', md: 'inline-block' },
      }}
    >
      <Box sx={{ mt: '3px', height: 35 }}>
        <LogoGeorga
          fill="#eceff1"
          stroke="#eceff1"
          alt="GeoRGA"
          style={{ width: 'auto', height: '100%' }}
        />
      </Box>
    </Button>
  );
}

export default Logo;
