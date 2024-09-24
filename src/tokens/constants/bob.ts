import { ChainId } from '../../chains/index.ts';

import { TBTC, USDC, USDT, WBTC } from './common.ts';
import { WETH9 } from './weth.ts';

export const bobTokens = {
  weth: WETH9[ChainId.BOB],
  wbtc: WBTC[ChainId.BOB],
  tbtc: TBTC[ChainId.BOB],
  usdc: USDC[ChainId.BOB],
  usdt: USDT[ChainId.BOB],
};

export const bobSepoliaTokens = {
  weth: WETH9[ChainId.BOB_SEPOLIA],
  // wbtc: WBTC[ChainId.BOB_SEPOLIA],
  // tbtc: TBTC[ChainId.BOB_SEPOLIA],
  usdc: USDC[ChainId.BOB_SEPOLIA],
  // usdt: USDT[ChainId.BOB_SEPOLIA]
};

export const oldBobSepoliaTokens = {
  weth: WETH9[ChainId.OLD_BOB_SEPOLIA],
  wbtc: WBTC[ChainId.OLD_BOB_SEPOLIA],
  tbtc: TBTC[ChainId.OLD_BOB_SEPOLIA],
  usdc: USDC[ChainId.OLD_BOB_SEPOLIA],
  usdt: USDT[ChainId.OLD_BOB_SEPOLIA],
};
