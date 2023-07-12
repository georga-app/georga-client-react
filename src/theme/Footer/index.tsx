import Box from '@mui/material/Box';

import Menu from './Menu';
import Funding from './Funding';

function Footer() {
  return (
    <Box sx={{ paddingT: 2 }}>
      <Funding />
      <Menu />
    </Box>
  );
}

export default Footer;
