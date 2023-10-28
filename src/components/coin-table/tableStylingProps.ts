import { lighten, SxProps, Theme } from '@mui/material/styles';
import { MaterialReactTableProps } from 'material-react-table';
import { tableConfig } from './tableConfig';
import { Coin } from './types';

type TableStylingPropsState = {
  showTableBody?: boolean;
};

type TableStylingProps = Pick<
  MaterialReactTableProps<Coin>,
  | 'muiTableFooterProps'
  | 'muiTableBodyCellSkeletonProps'
  | 'muiTopToolbarProps'
  | 'muiTableBodyProps'
  | 'muiSearchTextFieldProps'
  | 'muiTableBodyCellProps'
  | 'muiTableHeadCellProps'
  | 'muiTableHeadRowProps'
  | 'muiTableHeadProps'
  | 'muiTableBodyRowProps'
  | 'muiTableContainerProps'
  | 'muiTablePaperProps'
>;

export const defaultMuiTableHeadCellSxProps: SxProps<Theme> = {
  borderBottomColor: 'divider',

  '& > .Mui-TableHeadCell-Content': {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflow: 'visible',

    '& > .Mui-TableHeadCell-Content-Labels': {
      minHeight: '3.2rem',

      '& > .Mui-TableHeadCell-Content-Wrapper': {
        overflow: 'visible',
      },
    },
  },
};

export const tableStylingProps = ({
  showTableBody,
}: TableStylingPropsState): TableStylingProps => ({
  muiTableBodyRowProps: {
    sx: (theme: Theme) => ({
      height: tableConfig.rowHeight,
      '&.MuiTableRow-hover:hover': {
        backgroundColor: lighten(theme.palette.background.default, 0.1),
      },
    }),
  },
  muiTableContainerProps: {
    sx: {
      flexGrow: 1,

      // prevents CLS when there are no results
      overflowY: 'scroll',
    },
  },
  muiTablePaperProps: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',

      '.MuiLinearProgress-root': {
        display: 'none',
      },
    },
  },
  muiTableHeadProps: {
    sx: {
      opacity: 1,

      // fixes 1px gap between toolbar and thead
      top: -1,
    },
  },
  muiTableHeadRowProps: {
    sx: (theme: Theme) => ({
      '.MuiFormControl-root': {
        minWidth: 'unset',
        '.MuiInputBase-root': {
          mt: 1,
          '.MuiSelect-select': {
            '& > .MuiBox-root': {
              ...theme.typography.body1,
              overflow: 'hidden',
              paddingRight: theme.spacing(1),
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
            },
          },
        },
      },
    }),
  },
  muiTableHeadCellProps: {
    sx: defaultMuiTableHeadCellSxProps,
  },
  muiTableBodyCellProps: {
    sx: {
      borderBottomColor: 'divider',
    },
  },
  muiSearchTextFieldProps: {
    sx: (theme: Theme) => ({
      paddingRight: theme.spacing(1),
      maxWidth: 224,

      '& .MuiInputBase-root': {
        p: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      },
    }),
  },
  muiTableBodyProps: {
    sx: (theme: Theme) => ({
      visibility: showTableBody ? 'unset' : 'hidden',

      // "no results found" message
      '& tr td[colspan="13"] > p': {
        position: 'fixed',
        color: theme.palette.text.primary,
        fontStyle: 'normal',
      },
    }),
  },
  muiTopToolbarProps: {
    sx: {
      // overwrite another !important rule using !important...
      px: '3px !important',
    },
  },
  muiTableBodyCellSkeletonProps: ({ column }) => ({
    // prevents CLS when loading data
    width: '80%',

    ...(column.id === 'image' && {
      variant: 'circular',
      width: 48,
      height: 48,
    }),
  }),
  muiTableFooterProps: {
    sx: {
      // hide bottom border when no results are shown
      outline: 'none',
    },
  },
});
