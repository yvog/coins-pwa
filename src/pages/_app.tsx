import { createEmotionCache, theme } from '@/components';
import { AuthProvider, ConnectivityProvider } from '@/contexts';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type CoinsAppProps = AppProps & {
  emotionCache?: EmotionCache
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CoinsAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Coins DEMO</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ConnectivityProvider>
            <Component {...pageProps} />
          </ConnectivityProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
