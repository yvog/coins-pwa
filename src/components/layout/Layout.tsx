import Box from '@mui/material/Box';
import { ConnectivityBar } from '../connectivity-bar/ConnectivityBar';

type LayoutProps = {
  header: React.ReactNode
  children: React.ReactNode
}

export const Layout = ({ header, children }: LayoutProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <ConnectivityBar />
      {header}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
