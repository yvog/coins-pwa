import { mergeSx } from '@/util';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type AppImageProps = Omit<ImageProps, 'onLoadingComplete'> & {
  sx?: SxProps<Theme>
  borderRadius?: string | number
}

export const AppImage = ({
  src,
  alt,
  width,
  height,
  sx,
  borderRadius,
  ...restImageProps
}: AppImageProps): JSX.Element => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <Box
      sx={mergeSx(
        {
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          borderRadius,
          width,
          height,
          transition: 'opacity 0.5s ease',
          userSelect: 'none',
          WebkitTouchCallout: 'none',

          '& > img': {
            position: 'absolute',
            objectFit: 'cover',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s ease',
            borderRadius,
            width,
            height,
          },
        },
        sx
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        draggable={false}
        {...restImageProps}
        onLoadingComplete={() => setIsReady(true)}
      />
    </Box>
  );
};
