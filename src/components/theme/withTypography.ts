import { Theme } from '@mui/material/styles'

export const withTypography = (theme: Theme): Theme => {
  const fontFamily =
    '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

  theme.typography.fontFamily = fontFamily

  theme.typography.h1 = {
    fontFamily,
    fontSize: '3.4rem',
    fontWeight: 800,
    lineHeight: 1.1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '8rem',
    },
  }

  theme.typography.h2 = {
    fontFamily,
    fontSize: '3.2rem',
    fontWeight: 700,
    lineHeight: 1.125,
    [theme.breakpoints.up('md')]: {
      fontSize: '4.8rem',
    },
  }

  theme.typography.h3 = {
    fontFamily,
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1.125,
    [theme.breakpoints.up('md')]: {
      fontSize: '3.2rem',
    },
  }

  theme.typography.h4 = {
    fontFamily,
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: 1.125,
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
      lineHeight: 1.2,
    },
  }

  theme.typography.h5 = {
    fontFamily,
    fontSize: '1.6rem',
    fontWeight: 500,
    lineHeight: 1.25,
    [theme.breakpoints.up('md')]: {
      fontSize: '2.0rem',
      lineHeight: 1.2,
    },
  }

  theme.typography.h6 = {
    fontFamily,
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: 1.25,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.6rem',
      lineHeight: 1.25,
    },
  }

  theme.typography.body1 = {
    fontFamily,
    fontSize: '1.5rem',
    fontWeight: 400,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.6rem',
    },
  }

  theme.typography.body2 = {
    fontFamily,
    fontSize: '1.4rem',
    fontWeight: 400,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  }

  theme.typography.caption = {
    fontFamily,
    fontSize: '1.4rem',
    fontWeight: 400,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem',
    },
  }

  theme.typography.button = {
    fontFamily,
    fontSize: '1.6rem',
    fontWeight: 500,
    textTransform: 'none',
  }

  return theme
}
