import {
  alpha,
  createTheme,
  darken,
  lighten,
  Theme,
  ThemeOptions,
} from '@mui/material/styles'

export const typographyStyleOverrides =
  (theme: Theme, spacing: number, overrides?: any) =>
  ({ ownerState }: any) => ({
    ...(ownerState.gutterBottom && {
      marginBottom: theme.spacing(spacing),
    }),
    ...(overrides ?? {}),
  })

export const maxContainerWidth = 1920

export const containerPadding = {
  xs: 3,
  sm: 9,
  xl: 16,
}

export const withComponentOverrides = (theme: Theme): Theme => {
  const alphaBgColor = alpha(theme.palette.text.primary, 0.1)

  return createTheme({
    ...theme,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: '62.5%',
            height: '100%',
            margin: 0,
            padding: 0,
          },
          body: {
            height: '100%',
            margin: 0,
            padding: 0,

            '#__next': {
              display: 'contents',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '1.25rem',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            display: 'flex',
            alignItems: 'center',

            '&:focus': {
              background: 'none !important',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            ...theme.typography.body1,
            padding: 0,
          },
          root: {
            borderRadius: '4px !important',
            background: alpha('#E0E8F5', 0.08),
            transition: 'background .15s ease',
            overflow: 'hidden',

            '&:before': {
              borderBottom: `2px solid transparent !important`,
            },

            '&:after': {
              borderBottom: `2px solid ${theme.palette.text.primary} !important`,
            },

            '& > svg': {
              width: '3.2rem',
              height: '3.2rem',
              padding: theme.spacing(0.5),
            },

            'svg[data-testid="ArrowDropDownIcon"]': {
              display: 'none',
            },

            '&:hover, &:has(.MuiSelect-select[aria-expanded="true"]), &:focus, &:focus-within':
              {
                background: alpha('#E0E8F5', 0.1),
              },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardError: {
            alignItems: 'center',
            background: theme.palette.error.main,
            ...theme.typography.body1,
            color: theme.palette.error.contrastText,
            fontWeight: 500,

            svg: {
              fill: theme.palette.error.contrastText,
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '50px !important',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            ...theme.typography.body1,
            fontWeight: 700,
          },
          root: {
            '& .MuiCollapse-root': {
              // text fields + multi-selects
              '& .MuiInputBase-root': {
                height: 40,

                '& .MuiInputAdornment-root': {
                  paddingRight: theme.spacing(1),
                },

                // text fields
                '&:not(:has(.MuiSelect-select))': {
                  padding: theme.spacing(1),

                  '& .MuiInputAdornment-root': {
                    paddingRight: 0,
                  },
                },
              },

              '& .MuiSelect-select': {
                padding: theme.spacing(1),

                '&.MuiInput-input': {
                  paddingRight: 0,
                },

                '& .MuiChip-root': {
                  height: 'auto',
                  padding: 4,
                  pointerEvents: 'none',

                  '& .MuiChip-label': {
                    fontSize: '1.25rem',
                  },
                },
              },
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '&:has(button.Mui-disabled)': {
              visibility: 'hidden',
              pointerEvents: 'none',
              position: 'absolute',
              right: 0,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: '3.2rem',
            minHeight: '3.2rem',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '2.4rem',
            width: '2.4rem',
            height: '2.4rem',
            color: theme.palette.text.primary,
          },
        },
        defaultProps: {
          fontSize: 'large',
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            transition: 'background .15s ease',

            '&.Mui-selected': {
              backgroundColor: alphaBgColor,

              '&:hover': {
                backgroundColor: alpha(alphaBgColor, 0.15),
              },
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: 'background .15s ease',

            '&:hover': {
              backgroundColor: alphaBgColor,
            },

            '& .MuiTouchRipple-child': {
              backgroundColor: theme.palette.text.primary,
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          gutterBottom: true,
        },
        styleOverrides: {
          overline: typographyStyleOverrides(theme, 1, {
            color: theme.palette.text.primary,
          }),
          h1: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          h2: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          h3: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          h4: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          h5: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          h6: typographyStyleOverrides(theme, 3, {
            color: theme.palette.text.primary,
          }),
          body1: typographyStyleOverrides(theme, 4, {
            color: theme.palette.text.primary,
          }),
          body2: typographyStyleOverrides(theme, 4, {
            color: theme.palette.text.primary,
          }),
          caption: {
            color: alpha(theme.palette.text.primary, 0.3),
          },
        },
      },
    },
  } as ThemeOptions)
}
