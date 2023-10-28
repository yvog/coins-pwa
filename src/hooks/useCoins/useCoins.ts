import { Coin } from '@/components';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';
import { useSWROptions } from '../types';

const coinsKey: string = `${process.env.NEXT_PUBLIC_API_URL}/api/coins`;

export function useCoins({ shouldFetch = true, ...restOptions }: useSWROptions) {
  return useSWR<Coin[]>(
    shouldFetch ? coinsKey : null,
    (url) =>
      fetcher(url, {
        credentials: 'include',
      }),
    {
      refreshWhenOffline: false,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      revalidateOnReconnect: true,
      ...restOptions,
    }
  );
}
