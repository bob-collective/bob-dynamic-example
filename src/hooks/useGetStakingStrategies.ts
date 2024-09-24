import { useCallback } from 'react';
import { GatewayStrategyContract } from '@gobob/bob-sdk';

import { ChainId } from '../chains/index.ts';
import { ERC20Token, Ether, Token } from '../currency/index.ts';

import { useGetStrategies } from './useGetStrategies.ts';

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

  return useGetStrategies({
    select: selectStrategyData,
  });
};

export { useGetStakingStrategies };
export type { StrategyData };
