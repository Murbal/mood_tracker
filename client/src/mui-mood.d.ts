import { ThemeMood } from './theme';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends Record<ThemeMood, PaletteColor> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends Record<ThemeMood, PaletteColorOptions> {}
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    happy: true;
    sad: true;
    angry: true;
  }
}
declare module '@mui/material/LinearProgress' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface LinearProgressPropsColorOverrides extends Record<ThemeMood, true> {}
}
