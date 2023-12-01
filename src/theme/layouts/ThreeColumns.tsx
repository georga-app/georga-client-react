/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable

function ThreeColumns({
  left=<></>,
  middle=<></>,
  right=<></>,
  bg = 'bright',
}: {
  left?: React.ReactNode,
  middle?: React.ReactNode,
  right?: React.ReactNode,
  bg?: string
}) {
  return (
    <Box sx={{
      flexGrow: 1,
      paddingBottom: 2,
      backgroundColor: 'background.' + bg,
    }}>
      <Container maxWidth="lg" sx={{ paddingTop: { xs: 1, sm: 2 }, paddingBottom: 4 }}>
        <Grid container sx={{
          height: '100%',
          flexGrow: 1,
        }}>

          {/* Left */}
          <Grid xs={12} md={3} sx={{
            textAlign: 'right',
            display: { xs: 'none', md: 'block' }
          }}>
            {left}
          </Grid>

          {/* Middle */}
          <Grid xs={12} md={6} sx={{
            // paddingX: { xs: 'none', md: 1 }
          }}>
            {middle}
          </Grid>

          {/* Right */}
          <Grid xs={12} md={3} sx={{
            display: { xs: 'none', md: 'block' }
          }}>
            {right}
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}

export default ThreeColumns;
