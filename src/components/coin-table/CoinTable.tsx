import { useAuthContext } from '@/contexts';
import { useCoins } from '@/hooks';
import { FetchErrorObject } from '@/lib/fetcher';
import { clamp, isBrowser } from '@/util';
import Star from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { Breakpoint, Theme } from '@mui/material/styles';
import { PaginationTableState } from '@tanstack/react-table';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { AppImage } from '../app-image/AppImage';
import { ErrorSnackbar } from '../error-snackbar/ErrorSnackbar';
import { tableConfig } from './tableConfig';
import { defaultMuiTableHeadCellSxProps, tableStylingProps } from './tableStylingProps';
import { Coin, coinMintmarks, coinQualities, exonumiaTypes } from './types';

type ColumnSize = Breakpoint;

const columnSize = (size: ColumnSize): number => {
  const baseUnit = 8;
  const sizes: Record<Breakpoint, number> = {
    xs: 16 * baseUnit,
    sm: 18 * baseUnit,
    md: 22 * baseUnit,
    lg: 24 * baseUnit,
    xl: 32 * baseUnit,
  };

  return sizes[size];
};

// enforce a max width for a column
const columnSizeProps = (size: ColumnSize) => {
  const columnSizePx = columnSize(size);

  return {
    minSize: columnSizePx,
    maxSize: columnSizePx,
    size: columnSizePx,
    muiTableHeadCellProps: {
      sx: {
        ...defaultMuiTableHeadCellSxProps,
        maxWidth: columnSizePx,
      },
    },
  };
};

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const getCountriesFromCoins = (coins: Coin[]): string[] => {
  return coins
    .map((coin) => countryNames.of(coin.countryCode)) // get country codes & convert them to country name
    .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates
    .sort(
      (countryA, countryB) => (countryA ?? '').localeCompare(countryB ?? '') // order alphabetically
    ) as unknown as string[];
};

export const CoinTable = (): JSX.Element => {
  const [showError, setShowError] = useState<boolean>(false);
  const { prevAuthRequired, authRequired } = useAuthContext();

  const initialPaginationTableState: PaginationTableState = {
    pagination: {
      pageIndex: 0,
      pageSize: 64,
    }
  };

  const [paginationTableState, setPaginationTableState] = useState<PaginationTableState>(initialPaginationTableState);

  const {
    data: coins,
    isLoading,
    isValidating,
    error,
    mutate: revalidateCoins,
  } = useCoins({
    shouldFetch: !authRequired,
    onError: (err: FetchErrorObject) => {
      if (!err?.data) {
        console.error(err);
        setShowError(true);
        return;
      }
    },
  });

  // make sure the amount of initial rows fill the whole viewport
  useEffect(() => {
    if (!isBrowser) return;

    const pageSize = Math.ceil(window.innerHeight / tableConfig.rowHeight);

    if (pageSize > initialPaginationTableState.pagination.pageSize) {
      setPaginationTableState({
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    if (prevAuthRequired && authRequired === false) {
      revalidateCoins();
      console.warn('Authorized successfully. Revalidating coin data.');
    }

  }, [authRequired, prevAuthRequired, revalidateCoins]);

  const showLoading: boolean = isLoading || isValidating || !!error || !!authRequired;
  const showTableBody: boolean = showLoading || !!coins?.length || !!error;

  const columns = useMemo<MRT_ColumnDef<Coin>[]>(() => {
    const numberFormatter = new Intl.NumberFormat('nl-NL');

    const mintages = (coins ?? []).map(c => c.mintage ?? 0);
    const minMintage = Math.min(...mintages);
    const maxMintage = Math.max(...mintages);

    const currencySuffix: Record<
      Exclude<Coin['currency'], 'Exonumia'>,
      [string, string]
    > = {
      EUR: ['cent', 'euro'],
      GBP: ['pence', 'pound'],
      NLG: ['cent', 'gulden'],
      UAH: ['kopiyok', 'hryvnia'],
    };

    return [
      {
        accessorKey: 'image',
        enableColumnFilter: false,
        enableColumnActions: false,
        header: 'Image',
        ...columnSizeProps('xs'),
        Cell: ({ cell, row }) => {
          const src = (cell as any).getValue();
          const alt = `${row.original.countryCode} ${row.original.year} ${row.original?.mintmark ?? ''
            } ${row.original.denomination}`;

          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AppImage
                src={src}
                alt={alt}
                width={48}
                height={48}
                borderRadius="100%"
              />
            </Box>
          );
        },
      },
      {
        id: 'countryCode',
        header: 'Country',
        filterVariant: 'multi-select',
        filterSelectOptions: getCountriesFromCoins(coins ?? []),
        filterFn: 'arrIncludesSome',
        _filterFn: 'arrIncludesSome',
        ...columnSizeProps('md'),
        accessorFn: (row: Coin) => row?.countryCode === null ? null : `${countryNames.of(row?.countryCode ?? '')}`,
        Cell: ({ cell, row }) => {
          const countryName = (cell as any).getValue();

          return (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <AppImage
                src={`${tableConfig.flagIconCssBaseURL}/${row.original.countryCode?.toLowerCase()}.svg`}
                width={24}
                height={18}
                aria-hidden="true"
                alt={countryName}
                borderRadius={1}
              />
              {countryName}
            </Box>
          );
        },
      },
      {
        id: 'currency',
        header: 'Currency',
        filterVariant: 'multi-select',
        filterSelectOptions: ['EUR (€)', 'GBP (£)', 'NLG (ƒ)', 'UAH (₴)', 'Exonumia'],
        filterFn: 'arrIncludesSome',
        _filterFn: 'arrIncludesSome',
        ...columnSizeProps('sm'),
        accessorFn: (row: Coin) => {
          if (!row?.currency) return null;

          if (row.currency == 'Exonumia') return row.currency;
          if (row.currency == 'NLG') return `${row.currency} (ƒ)`;
          if (row.currency == 'UAH') return `${row.currency} (₴)`;

          const sign = new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: row.currency,
          }).format(0)
            .substring(0, 1);

          return `${row.currency} (${sign})`;
        },
      },
      {
        accessorKey: 'year',
        header: 'Year',
        filterFn: 'fuzzy',
        _filterFn: 'fuzzy',
        ...columnSizeProps('xs'),
      },
      {
        accessorKey: 'mintmark',
        header: 'Mintmark',
        filterVariant: 'multi-select',
        filterSelectOptions: [...coinMintmarks],
        filterFn: 'arrIncludesSome',
        _filterFn: 'arrIncludesSome',
        ...columnSizeProps('sm'),
      },
      {
        id: 'denomination',
        header: 'Denomination',
        _filterFn: 'fuzzy',
        ...columnSizeProps('md'),
        accessorFn: (row: Coin) => {
          if (!row?.currency) return null;

          if (row.currency === 'Exonumia') return '';

          const amount = row.denomination < 1 ? row.denomination * 100 : row.denomination;

          return `${amount} ${currencySuffix[row.currency][clamp(Math.floor(row.denomination), 0, 1)]}`;
        },
      },
      {
        id: 'mintage',
        header: 'Mintage',
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
        _filterFn: 'betweenInclusive',
        muiTableHeadCellFilterSliderProps: {
          marks: true,
          min: minMintage,
          max: maxMintage,
          step: 1000000,
          valueLabelFormat: (value: number) => numberFormatter.format(value)
        },
        ...columnSizeProps('md'),
        accessorFn: (row: Coin) => row?.mintage === null ? null : row?.mintage || 0,
        Cell: ({ cell }) => {
          const mintage = (cell as any).getValue();
          const showStar = mintage > 0 && mintage <= tableConfig.rareMintageThreshold;

          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {numberFormatter.format(mintage)}
              {showStar && (
                <Star
                  sx={(theme: Theme) => ({
                    color: theme.palette.text.secondary,
                    width: '1.8rem',
                    height: '1.8rem',
                  })}
                />
              )}
            </Box>
          );
        },
      },
      {
        accessorKey: 'cc',
        header: 'Commemorative',
        filterVariant: 'select',
        filterSelectOptions: ['Yes', 'No'],
        _filterFn: 'equals',
        ...columnSizeProps('lg'),
        accessorFn: (row: Coin) => row?.cc === null ? null : `${row.cc ? 'Yes' : 'No'}`,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        filterFn: 'fuzzy',
        _filterFn: 'fuzzy',
        ...columnSizeProps('xl'),
      },
      {
        accessorKey: 'quality',
        header: 'Quality',
        filterVariant: 'multi-select',
        filterSelectOptions: [...coinQualities],
        filterFn: 'arrIncludesSome',
        _filterFn: 'arrIncludesSome',
        ...columnSizeProps('xs'),
      },
      {
        id: 'nifc',
        header: 'NIFC',
        filterVariant: 'select',
        filterSelectOptions: ['Yes', 'No'],
        _filterFn: 'equals',
        ...columnSizeProps('xs'),
        accessorFn: (row: Coin) => row?.nifc === null ? null : `${row.nifc ? 'Yes' : 'No'}`,
      },
      {
        id: 'swap',
        header: 'Swappable',
        filterVariant: 'select',
        filterSelectOptions: ['Yes', 'No'],
        _filterFn: 'equals',
        ...columnSizeProps('md'),
        accessorFn: (row: Coin) => row?.swap === null ? null : `${row.swap ? 'Yes' : 'No'}`,
      },
      {
        accessorKey: 'exonumiaType',
        header: 'Exonumia Type',
        filterVariant: 'multi-select',
        filterSelectOptions: [...exonumiaTypes],
        filterFn: 'arrIncludesSome',
        _filterFn: 'arrIncludesSome',
        ...columnSizeProps('lg'),
      },
    ];

  }, [coins]);

  return (
    <>
      <Head>
        <link
          key="flag-icon-css"
          rel="preconnect"
          href={tableConfig.flagIconCssBaseURL}
          crossOrigin="anonymous"
        />
        <link
          key="numista"
          rel="preconnect"
          href="https://en.numista.com/catalogue/photos"
          crossOrigin="anonymous"
        />
      </Head>

      <MaterialReactTable
        // breaks certain features: https://www.material-react-table.com/docs/guides/memoize-components#memoizing-table-rows
        memoMode='rows'
        enableDensityToggle={false} // feature does not work with memoMode="rows"
        enableHiding={false} // feature does not work with memoMode="rows"
        enablePagination={false}
        enableBottomToolbar={false}
        enableFilterMatchHighlighting={false}
        positionGlobalFilter="left"
        columns={columns}
        data={coins ?? []}
        initialState={{
          showGlobalFilter: true,
          sorting: [
            { id: 'countryCode', desc: false },
            { id: 'denomination', desc: false },
            { id: 'year', desc: false },
          ],
          ...initialPaginationTableState
        }}
        state={{
          isLoading: showLoading,
          ...paginationTableState,
        }}
        enableStickyHeader
        enableStickyFooter
        {...tableStylingProps({ showTableBody })}
      />

      <ErrorSnackbar show={showError} message='Could not fetch coin data' />
    </>
  );
};
