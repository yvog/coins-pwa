import { SxProps, Theme } from '@mui/material/styles';

/* Merge sx props with other sx props */
export const mergeSx = (
  sx: SxProps<Theme>,
  mergeSx?: SxProps<Theme>
): SxProps<Theme> => {
  if (!mergeSx) return sx;
  return [sx, ...(Array.isArray(mergeSx) ? mergeSx : [mergeSx])];
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const isBrowser = typeof window != 'undefined';
