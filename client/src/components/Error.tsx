import { Snackbar } from '@mui/material';
import { FC, useCallback, useState } from 'react';

interface Props {
  message?: string;
}

export const Error: FC<Props> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(!!message);

  const handleClose = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    ></Snackbar>
  );
};
