import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type SectionProps = {
  children: React.ReactNode
  spacing?: 'none' | 'top' | 'bottom' | 'top-bottom'
}

export const Section = ({
  children,
  spacing = 'top-bottom',
}: SectionProps): JSX.Element => {
  return (
    <Box
      component="section"
      {...(spacing !== 'none' && {
        sx: {
          ...((spacing === 'top' || spacing === 'top-bottom') && {
            pt: {
              xs: 3,
              md: 6,
            },
          }),
          ...((spacing === 'bottom' || spacing === 'top-bottom') && {
            pb: {
              xs: 3,
              md: 6,
            },
          }),
        },
      })}
    >
      <Container>{children}</Container>
    </Box>
  );
};
