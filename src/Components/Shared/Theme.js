import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './Header'
import Footer from './Footer'

// theme
const theme = createTheme({
  palette: {
    primary: {
      light: "#607d8b",
      main: "#455a64",
      dark: "#263238",
    },
    secondary: {
      light: "#4d7d7a",
      main: "#21514e",
      dark: "#11413e",
    },
    background: {
      default: "#eceff1",
    },
  },
});

function Theme(props) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: props.bgcolor || "white" }}>
          <Header menus={props.menus} />
          <Box sx={{ paddingY: 2 }}>
            <Container maxWidth="lg" sx={{ paddingY: 4 }}>
              {props.children}
            </Container>
          </Box>
        </Box>
        <Footer menus={props.menus} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default Theme;
