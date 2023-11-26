/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable

function TwoColumns({
  left = <></>,
  right = <></>,
  bg = 'bright',
}: {
  left?: React.ReactNode,
  right?: React.ReactNode,
  bg?: string,
}) {
  return (
    <Box sx={{
      flexGrow: 1,
      paddingY: 2,
      backgroundColor: 'background.' + bg,
    }}>
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Grid container sx={{
          height: '100%',
          flexGrow: 1,
        }}>

          {/* Left */}
          <Grid xs={12} md={2} sx={{
            textAlign: 'right',
            display: { xs: 'none', md: 'block' }
          }}>
            {left}
          </Grid>

          {/* Right */}
          <Grid xs={12} md={10} sx={{
            // paddingX: { xs: 'none', md: 1 }
          }}>
            {right}
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}

export default TwoColumns;
