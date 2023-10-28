import Box from '@mui/material/Box';
import { lighten, Theme } from '@mui/material/styles';
import { HelpButton } from '../help-button/HelpButton';
import { Logo } from '../logo/Logo';
import { LogoutButton } from '../logout-button/LogoutButton';

export const Header = (): JSX.Element => {
  return (
    <Box
      component="header"
      sx={(theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
        // MRT uses the same technique to create its background color.. we'll adapt it here:
        backgroundColor: lighten(theme.palette.background.default, 0.04),
      })}
    >
      <Logo />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <HelpButton />
        <LogoutButton />
      </Box>
    </Box>
  );
};
