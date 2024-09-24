import { ChainId } from '../chains/index.ts';

import {
  bobSepoliaTokens,
  bobTokens,
  oldBobSepoliaTokens,
} from './constants/bob.ts';
import { ethereumTokens } from './constants/eth.ts';
import { sepoliaTokens } from './constants/sepolia.ts';

export const tokens = {
  [ChainId.ETHEREUM]: ethereumTokens,
  [ChainId.SEPOLIA]: sepoliaTokens,
  [ChainId.BOB]: bobTokens,
  [ChainId.BOB_SEPOLIA]: bobSepoliaTokens,
  [ChainId.OLD_BOB_SEPOLIA]: oldBobSepoliaTokens,
  [ChainId.ARBITRUM_ONE]: [],
  [ChainId.BASE]: [],
  [ChainId.OP]: [],
  [ChainId.BSC]: [],
  [ChainId.OPBNB]: [],
  [ChainId.POLYGON]: [],
  [ChainId.POLYGON_ZKEVM]: [],
  [ChainId.MOONBEAM]: [],
  [ChainId.BITLAYER]: [],
  [ChainId.MERLIN]: [],
};
