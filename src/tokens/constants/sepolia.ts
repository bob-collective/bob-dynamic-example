import { ChainId } from '../../chains/index.ts';

import { USDC, USDT, WBTC } from './common.ts';
import { WETH9 } from './weth.ts';

export const sepoliaTokens = {
  weth: WETH9[ChainId.SEPOLIA],
  wbtc: WBTC[ChainId.SEPOLIA],
  usdc: USDC[ChainId.SEPOLIA],
  usdt: USDT[ChainId.SEPOLIA],
};
