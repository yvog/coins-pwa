import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Logo = () => {
  return (
    <Link href="/" underline="none">
      <Typography
        variant="h1"
        component="h1"
        sx={{
          background: `linear-gradient(145deg, #F7F3BA 5%, #F7EF8A 50%,  #D5AA3B 100%)`,
          backgroundClip: 'text',
          textFillColor: 'transparent',
          fontSize: {
            xs: '2rem',
            lg: '3.6rem',
          },
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
        gutterBottom={false}
      >
        Coins
      </Typography>
    </Link>
  );
};
