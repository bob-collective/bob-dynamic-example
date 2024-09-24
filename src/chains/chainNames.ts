import { ChainId } from './chainId.ts';

export const chainNames: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.SEPOLIA]: 'sepolia',
  [ChainId.BOB]: 'BOB',
  [ChainId.OLD_BOB_SEPOLIA]: 'BOB sepolia (OLD)',
  [ChainId.BOB_SEPOLIA]: 'BOB sepolia',
  [ChainId.OP]: 'optimism',
  [ChainId.ARBITRUM_ONE]: 'arbitrum',
  [ChainId.POLYGON]: 'polygon',
  [ChainId.POLYGON_ZKEVM]: 'polygon zkEVM',
  [ChainId.BSC]: 'BNB Smart Chain',
  [ChainId.OPBNB]: 'OPBNB',
  [ChainId.BASE]: 'base',
  [ChainId.MOONBEAM]: 'moonbeam',
  [ChainId.BITLAYER]: 'Bitlayer',
  [ChainId.MERLIN]: 'Merlin',
};

export const chainNameToChainId = Object.entries(chainNames).reduce(
  (acc, [chainId, chainName]) => {
    return {
      [chainName]: Number(chainId) as unknown as ChainId,
      ...acc,
    };
  },
  {} as Record<string, ChainId>,
);

// @see https://github.com/DefiLlama/defillama-server/blob/master/common/chainToCoingeckoId.ts
// @see https://github.com/DefiLlama/chainlist/blob/main/constants/chainIds.json
export const defiLlamaChainNames: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.SEPOLIA]: '',
  [ChainId.BOB]: '',
  [ChainId.OLD_BOB_SEPOLIA]: '',
  [ChainId.BOB_SEPOLIA]: '',
  [ChainId.ARBITRUM_ONE]: 'arbitrum',
  [ChainId.OPBNB]: 'op_bnb',
  [ChainId.BSC]: '',
  [ChainId.BASE]: 'base',
  [ChainId.OP]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.POLYGON]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.BITLAYER]: '',
  [ChainId.MERLIN]: '',
};
