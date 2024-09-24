import { ChainId } from '../../chains/index.ts';

import { USDC, USDT, WBTC_ETH } from './common.ts';
import { WETH9 } from './weth.ts';

export const ethereumTokens = {
  weth: WETH9[ChainId.ETHEREUM],
  usdt: USDT[ChainId.ETHEREUM],
  usdc: USDC[ChainId.ETHEREUM],
  wbtc: WBTC_ETH,
};
