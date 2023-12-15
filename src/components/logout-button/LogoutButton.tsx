import { useAuthContext, useConnectivityContext } from '@/contexts';
import { useLogout } from '@/hooks';
import { isBrowser } from '@/util';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { ErrorSnackbar } from '../error-snackbar/ErrorSnackbar';

export const LogoutButton = () => {
  const { trigger, error } = useLogout({
    onSuccess: () => {
      // delete cache of (possibly) protected API routes
      caches.delete('cross-origin').finally(() => {
        if (isBrowser) window.location.reload();
      });
    },
  });
  const { isOnline } = useConnectivityContext();
  const { authRequired } = useAuthContext();

  const disabled = authRequired !== false || !isOnline;

  return (
    <>
      <IconButton aria-label="logout" disabled={disabled} onClick={() => trigger(undefined)}>
        <Logout />
      </IconButton>

      <ErrorSnackbar show={!!error} message='Could not log out' />
    </>
  );
};
