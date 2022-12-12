import { useState } from 'react';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import ScrollToTop from './ScrollToTop';
import Header from './Header';
import Footer from './Footer';

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
      bright: "#ffffff",
      default: "#eceff1",
      admin: "#eceff1",
      dark: "#dcdfe1",
    },
  },
});

function Theme(props) {
  const [notifications, setNotifications] = useState(false);
  function toggleNotifications() {
    setNotifications(!notifications);
  }
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header notifications={notifications} toggleNotifications={toggleNotifications} />
          {props.children}
      </Box>
      <Footer />
    </MuiThemeProvider>
  );
}

export default Theme;