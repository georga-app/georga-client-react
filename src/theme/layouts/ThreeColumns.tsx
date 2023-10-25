/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

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
    <Grid container sx={{
      height: '100%',
      flexGrow: 1,
      backgroundColor: 'background.' + bg,
    }}>

      {/* Left */}
      <Grid md={3} sx={{
        textAlign: 'right',
        display: { xs: 'none', md: 'block' }
      }}>
        {left}
      </Grid>

      {/* Middle */}
      <Grid xs={12} sm={10} md={6} sx={{
        /*backgroundColor: 'background.bright'*/
        padding: { xs: 'none', sm: 1 }
      }}>
        {middle}
      </Grid>

      {/* Right */}
      <Grid sm={2} md={3} sx={{
        display: { xs: 'none', md: 'block' }
      }}>
        {right}
      </Grid>

    </Grid>
  )
}

export default ThreeColumns;
