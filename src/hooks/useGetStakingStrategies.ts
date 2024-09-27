import { useQuery } from '@tanstack/react-query';

import { gatewaySDK } from '../gateway/index.ts';

const useGetStakingStrategies = () => {
  return useQuery({
    queryKey: ['staking-strategies'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () => gatewaySDK.getStrategies(),
  });
};

export { useGetStakingStrategies };
