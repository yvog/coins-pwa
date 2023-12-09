import { useAuthContext } from '@/contexts';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { useState } from 'react';
import { AuthForm } from '../auth-form/AuthForm';

type AuthDrawerProps = Omit<DrawerProps, 'PaperProps' | 'onClose' | 'open'>

export const AuthDrawer = (props: AuthDrawerProps) => {
  const [opened, setOpened] = useState<boolean>();
  const { authRequired } = useAuthContext();

  return (
    <Drawer
      {...props}
      open={opened == undefined || authRequired != undefined ? authRequired : opened}
      anchor="bottom"
      onClose={(event, reason) => {
        if (reason == 'backdropClick' || reason == 'escapeKeyDown') return;
        setOpened(false);
      }}
      PaperProps={{
        sx: (theme: Theme) => ({
          borderTopLeftRadius: theme.spacing(3),
          borderTopRightRadius: theme.spacing(3),
          boxSizing: 'border-box',
          maxWidth: `calc(100% - (${theme.spacing(4)} * 2))`,
          margin: '0 auto',
          backgroundImage: 'unset',

          [theme.breakpoints.up('md')]: {
            borderBottomLeftRadius: theme.spacing(3),
            borderBottomRightRadius: theme.spacing(3),
            maxWidth: 640,
            marginBottom: theme.spacing(8),
          },
        }),
      }}
    >
      <Box
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4" component="h2" mb={6}>
          Please authorize to continue
        </Typography>

        <AuthForm onSubmitSuccess={() => setOpened(false)} />
      </Box>
    </Drawer>
  );
};
