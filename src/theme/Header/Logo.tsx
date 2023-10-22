/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Link from 'next/link'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Logo() {
  return (
    <Button
      key="home"
      component={Link}
      href="/"
      sx={{
        mr: 2,
        color: 'white',
        width: 'fit-content',
        display: { xs: 'none', md: 'inline-block' },
      }}
    >
      <Box sx={{ mt: '3px', height: 35 }}>
        <Image
          src="/logo-georga.svg"
          width={100}
          height={100}
          alt="GeoRGA"
          style={{ width: 'auto', height: '100%' }}
        />
      </Box>
    </Button>
  );
}

export default Logo;
