import { useAuth } from '@/hooks';
import { FetchErrorObject } from '@/lib/fetcher';
import { useState } from 'react';
import { AuthContext, AuthContextValues } from './AuthContext';

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const { children } = props;
  const [authRequired, setAuthRequired] = useState<boolean | undefined>(undefined);
  const [prevAuthRequired, setPrevAuthRequired] = useState<boolean | undefined>(undefined);

  const { mutate } = useAuth({
    onError: (err: FetchErrorObject) => {
      setPrevAuthRequired(authRequired);

      if (!err?.data) {
        setAuthRequired(true);

        return;
      }

      if (err.data.status === 401) {
        setAuthRequired(true);

        return;
      }

      setAuthRequired(false);
    },
    onSuccess: () => {
      setPrevAuthRequired(authRequired);
      setAuthRequired(false);
    },
  });

  const context: AuthContextValues = {
    prevAuthRequired,
    authRequired,
    revalidateAuth: mutate,
  };

  return <AuthContext.Provider value={{ ...context }}>{children}</AuthContext.Provider>;
};
