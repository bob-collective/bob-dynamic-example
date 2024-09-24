import { GatewayStrategyContract } from '@gobob/bob-sdk';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { gatewaySDK } from '../bob-sdk/index.ts';

const useGetStrategies = <T>(
  props: Omit<
    UseQueryOptions<
      GatewayStrategyContract[],
      unknown,
      T | undefined,
      string[]
    >,
    'queryKey' | 'queryFn' | 'refetchInterval'
  > = {},
) => {
  return useQuery({
    queryKey: ['staking-strategies'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: 60 * 60 * 1000,
    queryFn: () => gatewaySDK.getStrategies(),
    ...props,
  });
};

export { useGetStrategies };
