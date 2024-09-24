import { GatewayStrategyContract } from '@gobob/bob-sdk';
import { useQuery } from '@tanstack/react-query';

import { gatewaySDK } from '../bob-sdk/index.ts';
import { useCallback } from 'react';
import { ERC20Token, Ether, Token } from '../currency/index.ts';
import { ChainId } from '../chains/chainId.ts';

const ONE_HOUR = 60 * 60 * 1000;

type StrategyData = {
  raw: GatewayStrategyContract;
  currency?: Ether | ERC20Token;
};

const useGetStakingStrategies = () => {
  const selectStrategyData = useCallback(
    (strategies: GatewayStrategyContract[]) =>
      strategies.map<StrategyData>((strategy) => ({
        raw: strategy,
        currency: strategy.outputToken
          ? new Token(
              ChainId.BOB,
              strategy.outputToken.address as `0x${string}`,
              strategy.outputToken.decimals,
              strategy.outputToken.symbol,
              strategy.outputToken.symbol,
            )
          : undefined,
      })),
    [],
  );

  return useQuery({
    queryKey: ['staking-strategies'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: ONE_HOUR,
    queryFn: () => gatewaySDK.getStrategies(),
    select: selectStrategyData,
  });
};

export { useGetStakingStrategies };
