/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import "@fontsource/roboto";

import { NextAppDirEmotionCacheProvider } from '@/theme/EmotionCache';
import Header from '@/theme/Header';
import Footer from '@/theme/Footer';

declare module '@mui/material/styles' {
  interface TypeBackground {
    bright?: string;
    brighter?: string;
    active?: string;
    admin?: string;
    dark?: string;
  }
}

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
      brighter: "#fafafa",
      active: "#cfd8dc",
      default: "#eceff1",
      admin: "#eceff1",
      dark: "#dcdfe1",
    },
  },
});

function Theme({
  children
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState(false);
  function toggleNotifications(): void {
    setNotifications(!notifications);
  }
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header notifications={notifications} toggleNotifications={toggleNotifications} />
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

export default Theme;
