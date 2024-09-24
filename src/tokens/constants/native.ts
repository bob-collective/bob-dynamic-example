import { ChainId } from '../../chains/index.ts';
import { ERC20Token } from '../../currency/index.ts';

import { WETH9 } from './weth.ts';

export const WNATIVE = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.SEPOLIA]: WETH9[ChainId.SEPOLIA],
  [ChainId.BOB]: '' as any,
  [ChainId.OLD_BOB_SEPOLIA]: '' as any,
  [ChainId.BOB_SEPOLIA]: '' as any,
  [ChainId.ARBITRUM_ONE]: '' as any,
  [ChainId.BASE]: '' as any,
  [ChainId.OP]: '' as any,
  [ChainId.BSC]: '' as any,
  [ChainId.OPBNB]: '' as any,
  [ChainId.POLYGON]: '' as any,
  [ChainId.POLYGON_ZKEVM]: '' as any,
  [ChainId.MOONBEAM]: '' as any,
  [ChainId.BITLAYER]: '' as any,
  [ChainId.MERLIN]: '' as any,
} satisfies Record<ChainId, ERC20Token>;

const ETHER = { name: 'Ether', symbol: 'ETH', decimals: 18 } as const;

export const NATIVE = {
  [ChainId.ETHEREUM]: ETHER,
  [ChainId.SEPOLIA]: {
    name: 'Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.BOB]: {
    name: 'BOB Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.BOB_SEPOLIA]: {
    name: 'BOB Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.OLD_BOB_SEPOLIA]: {
    name: 'BOB Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.ARBITRUM_ONE]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.BASE]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.OP]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.BSC]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.OPBNB]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.POLYGON]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.POLYGON_ZKEVM]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.MOONBEAM]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.MERLIN]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  [ChainId.BITLAYER]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
} satisfies Record<
  ChainId,
  {
    name: string;
    symbol: string;
    decimals: number;
  }
>;
