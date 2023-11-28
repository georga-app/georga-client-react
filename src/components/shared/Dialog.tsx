/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";
import { cloneElement } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ResponsiveDialog({
  id,
  title,
  description,
  open,
  setOpen,
  children,
}: {
  id: string,
  title?: string,
  description?: string,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactElement,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby={id + "-title"}
    >
      {title &&
        <DialogTitle id={id + "-title"}>
          {title}
        </DialogTitle>
      }
      <DialogContent>
        {description &&
          <DialogContentText>
            {description}
          </DialogContentText>
        }
        {cloneElement(children, {
          // additionalButtons: []
          onSuccess: () => {setOpen(false)}
        })}
      </DialogContent>
    </Dialog>
  );
}

export default ResponsiveDialog;
