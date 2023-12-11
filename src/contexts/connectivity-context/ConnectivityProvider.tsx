import { isBrowser } from '@/util';
import { useEffect, useState } from 'react';
import { ConnectivityContext, ConnectivityContextValues } from './ConnectivityContext';

function isReachable(url: string) {
  return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then((res) => res && (res.ok || res.type === 'opaque'))
    .catch((err) => {
      console.warn('Could not reach server', err);
    });
}

type ConnectivityProviderProps = {
  children: React.ReactNode
}

export const ConnectivityProvider = (props: ConnectivityProviderProps): JSX.Element => {
  const { children } = props;
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [allowPing, setAllowPing] = useState<boolean>(true);

  const context: ConnectivityContextValues = {
    isOnline,
  };

  useEffect(() => {
    if (!isBrowser) return;

    const handleConnection = () => {
      // do we have wifi signal?
      if (navigator.onLine) {
        if (!allowPing) return;

        setAllowPing(false);

        // do we have wifi access?
        isReachable('https://yvogeldhof.nl').then((online) => {
          setAllowPing(true);

          if (online !== isOnline) {
            if (online) {
              // fully online
              setIsOnline(true);
            } else {
              // limited access
              setIsOnline(false);
            }
          }
        });
      } else {
        if (isOnline) setIsOnline(false);
      }
    };

    window.addEventListener('online', handleConnection);
    window.addEventListener('offline', handleConnection);
    window.addEventListener('focus', handleConnection);

    handleConnection();

    return () => {
      window.removeEventListener('online', handleConnection);
      window.removeEventListener('offline', handleConnection);
      window.removeEventListener('focus', handleConnection);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConnectivityContext.Provider value={{ ...context }}>
      {children}
    </ConnectivityContext.Provider>
  );
};
