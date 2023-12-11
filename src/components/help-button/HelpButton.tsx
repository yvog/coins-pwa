import { useAuthContext } from '@/contexts';
import { useCoins } from '@/hooks';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { useState } from 'react';
import { Coin } from '../coin-table/types';
import { containerPadding } from '../theme/withComponentOverrides';

const getTotalValue = (coins: Coin[]): number => {
  const totalValue = coins
    .map((coin) => coin.denomination)
    .reduce((partialSum, num) => partialSum + num, 0);

  return Number(totalValue.toFixed(2));
};

export const HelpButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { authRequired } = useAuthContext();

  const {
    data: coins,
    isLoading,
    isValidating,
    error,
  } = useCoins({
    shouldFetch: authRequired === false
  });

  const showLoading: boolean = isLoading || isValidating || !!error;
  const totalValue = getTotalValue(coins ?? []);

  if (authRequired) return <></>;

  return (
    <>
      <IconButton aria-label="help" onClick={() => setOpen(true)}>
        <QuestionMark />
      </IconButton>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="help-modal-title"
        aria-describedby="help-modal-description"
        disablePortal
        keepMounted
      >
        <Box
          sx={(theme: Theme) => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: `calc(100% - (${theme.spacing(containerPadding.xs)} * 2))`,
              sm: `calc(100% - (${theme.spacing(containerPadding.sm)} * 2))`,
              xl: `calc(100% - (${theme.spacing(containerPadding.xl)} * 2))`,
            },
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          })}
        >
          <Typography id="help-modal-title" variant="h4" component="h2">
            About this app
          </Typography>
          <Box id="help-modal-description">
            <Typography gutterBottom={false}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography gutterBottom={false} fontWeight="bold" component="span">
                  Total value:
                </Typography>

                {showLoading ? (
                  <CircularProgress size={16} />
                ) : (
                  <Typography gutterBottom={false} component="span">
                    {`€ ${totalValue}`}
                  </Typography>
                )}
              </Box>
              <Typography gutterBottom={false} component="span" variant="caption">
                * only euro coins were counted
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="caption">
              © 2023 Coins. Coin images from Numista. Mintages from the
              /r/EuroCoins community Discord server spreadsheet.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
