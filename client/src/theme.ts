import { createTheme } from '@mui/material';

export enum ThemeMood {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
}

export const appTheme = createTheme({
  palette: {
    happy: {
      main: '#009600',
      contrastText: 'white',
    },
    sad: {
      main: '#0078cf',
      contrastText: 'white',
    },
    angry: {
      main: '#a80202',
      contrastText: 'white',
    },
  },
});
