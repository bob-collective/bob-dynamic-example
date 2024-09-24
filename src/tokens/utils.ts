import { ChainId } from '../chains/index.ts';
import { Token } from '../currency/index.ts';

import { tokens } from './tokens.ts';

export function getTokensByChain(chainId?: ChainId): Token[] {
  if (!chainId) {
    return [];
  }

  const tokenMap = tokens[chainId];

  return Object.values(tokenMap);
}
