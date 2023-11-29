/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import { createContext, useContext, useState } from 'react';

import Dialog from '@/components/shared/Dialog';

type DialogContextType = {
  showDialog: (content: React.ReactElement, title: string) => void;
};

const DialogContext = createContext({} as DialogContextType);

const DialogProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactElement>(<></>);
  const [title, setTitle] = useState('');

  const showDialog = (content: React.ReactElement, title: string) => {
    setContent(content);
    setTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setContent(<></>);
    setTitle('');
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog open={open} setOpen={setOpen} title={title} id='dialog' >
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};

const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within an DialogProvider');
  }

  return context;
};

export { DialogProvider, useDialog };
