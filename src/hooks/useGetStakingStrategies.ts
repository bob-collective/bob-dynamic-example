import { useQuery } from '@tanstack/react-query';

import { gatewaySDK } from '../gateway/index.ts';

const ONE_HOUR = 60 * 60 * 1000;

const useGetStakingStrategies = () => {
  return useQuery({
    queryKey: ['staking-strategies'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: ONE_HOUR,
    queryFn: () => gatewaySDK.getStrategies(),
  });
};

export { useGetStakingStrategies };
