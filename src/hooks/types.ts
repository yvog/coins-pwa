import { SWRConfiguration } from 'swr';
import { SWRMutationConfiguration } from 'swr/mutation';

export type useSWROptions = {
  shouldFetch?: boolean;
} & Partial<Pick<SWRConfiguration, 'onError' | 'onSuccess'>>;

export type useSWRMutationOptions = Partial<
  Pick<
    SWRMutationConfiguration<unknown, unknown, unknown, string>,
    'onError' | 'onSuccess'
  >
>;
