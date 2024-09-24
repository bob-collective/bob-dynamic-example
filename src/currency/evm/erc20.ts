import { Address } from 'viem';

import { validateAndParseAddress } from './utils.ts';
import { Token } from './token.ts';

export class ERC20Token extends Token {
  public constructor(
    chainId: number,
    address: Address,
    decimals: number,
    symbol: string,
    name?: string,
    projectLink?: string,
  ) {
    super(
      chainId,
      validateAndParseAddress(address),
      decimals,
      symbol,
      name,
      projectLink,
    );
  }
}
