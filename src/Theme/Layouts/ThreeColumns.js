// import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // TODO: switch when stable

function ThreeColumns(props) {
  return (
    <Grid container sx={{
        backgroundColor: 'background.' + (props.bg ? props.bg : 'bright'),
        height: '100%',
        flexGrow: 1,
      }}>

      {/* Left */}
      <Grid xs={12} sm={4} md={3} sx={{ textAlign: 'right' }}>
        {props.left}
      </Grid>

      {/* Middle */}
      <Grid xs={12} sm={6} md={6} sx={{ backgroundColor: 'background.bright' }}>
        {props.middle}
      </Grid>

      {/* Right */}
      <Grid xs={12} sm={2} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
        {props.right}
      </Grid>

    </Grid>
  )
}

export default ThreeColumns;
