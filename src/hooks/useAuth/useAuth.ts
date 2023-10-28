import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';
import { useSWROptions } from '../types';

const authKey: string = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

type useAuthOptions = Omit<useSWROptions, 'shouldFetch'>;

export function useAuth(options?: useAuthOptions) {
  return useSWR(
    authKey,
    (url) =>
      fetcher(url, {
        credentials: 'include',
      }),
    {
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      ...options,
    }
  );
}
