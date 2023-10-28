import { createTheme, ThemeOptions } from '@mui/material/styles';
import { withComponentOverrides } from './withComponentOverrides';
import { withTypography } from './withTypography';

export const theme = withComponentOverrides(
  withTypography(
    createTheme({
      palette: {
        mode: 'dark',
        primary: {
          light: '#E6BA49',
          main: '#D5AA3B',
          dark: '#B89435',
          contrastText: '#664D0C',
        },
        secondary: {
          main: '#E0E8F5',
          light: '#E9EEF7',
          dark: '#B5C8E8',
          contrastText: '#13294B',
        },
        background: {
          default: '#13294B',
          paper: '#192D4D',
          contrastText: '#E0E8F5',
        },
        text: {
          primary: '#E0E8F5',
          secondary: '#D5AA3B',
          disabled: 'rgba(0, 0, 0, 0.20)',
        },
        divider: `rgba(0, 0, 0, 0.20)`,
        error: {
          main: '#A79230',
          contrastText: '#F7F3BA',
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 639,
          md: 1023,
          lg: 1195,
          xl: 1679,
          xxl: 1920,
        },
      },
      spacing: 8,
    } as ThemeOptions)
  )
);
