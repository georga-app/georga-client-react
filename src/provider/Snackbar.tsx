/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useState } from 'react';

import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type SnackBarContextType = {
  showSnackbar: (text: string, typeColor: AlertColor) => void;
};

const SnackbarContext = createContext({} as SnackBarContextType);

const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<AlertColor>('info');

  const showSnackbar = (text: string, color?: AlertColor) => {
    setMessage(text);
    setColor(color || 'info');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          variant="filled"
          elevation={6}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): SnackBarContextType => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context;
};

export { SnackbarProvider, useSnackbar };
