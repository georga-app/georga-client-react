import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function OneColumn(props) {
  return (
    <Box sx={{
      flexGrow: 1,
      paddingY: 2,
      backgroundColor: 'background.' + (props.bg ? props.bg : 'bright')
    }}>
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {props.children}
      </Container>
    </Box>
  )
}

export default OneColumn;
