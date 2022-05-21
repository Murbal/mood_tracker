import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material';

export enum ThemeMood {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
}

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends Record<ThemeMood, PaletteColor> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends Record<ThemeMood, PaletteColorOptions> {}
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
