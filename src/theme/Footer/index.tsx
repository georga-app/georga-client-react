/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
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
