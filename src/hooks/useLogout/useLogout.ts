import { fetcher } from '@/lib/fetcher'
import useSWRMutation from 'swr/mutation'
import { useSWRMutationOptions } from '../types'

const logoutKey: string = `${process.env.NEXT_PUBLIC_API_URL}/api/deauth`

export function useLogout(options: useSWRMutationOptions) {
  return useSWRMutation(
    logoutKey,
    (url) =>
      fetcher(url, {
        credentials: 'include',
        method: 'POST',
      }),
    options
  )
}
