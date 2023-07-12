'use client';

import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable

function ThreeColumns({
  left,
  middle,
  right,
  bg = 'bright',
}: {
  left: React.ReactNode,
  middle: React.ReactNode,
  right: React.ReactNode,
  bg?: string
}) {
  return (
    <Grid container sx={{
        height: '100%',
        flexGrow: 1,
        backgroundColor: 'background.' + bg,
      }}>

      {/* Left */}
      <Grid xs={12} sm={4} md={3} sx={{ textAlign: 'right' }}>
        {left}
      </Grid>

      {/* Middle */}
      <Grid xs={12} sm={6} md={6} sx={{ backgroundColor: 'background.bright' }}>
        {middle}
      </Grid>

      {/* Right */}
      <Grid xs={12} sm={2} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
        {right}
      </Grid>

    </Grid>
  )
}

export default ThreeColumns;
