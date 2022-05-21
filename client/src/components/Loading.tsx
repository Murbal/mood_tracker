import { LinearProgress } from '@mui/material';
import { FC } from 'react';

export const Loading: FC = () => {
  return (
    <LinearProgress
      color="info"
      sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '5px' }}
    />
  );
};
