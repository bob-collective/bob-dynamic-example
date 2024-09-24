import type { Token } from './token.ts';

import invariant from 'tiny-invariant';

import { BaseCurrency } from '../base/currency.ts';

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export abstract class EvmCurrency extends BaseCurrency {
  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public abstract readonly isNative: boolean;

  /**
   * Returns whether the currency is a token that is usable in PancakeSwap without wrapping
   */
  public abstract readonly isToken: boolean;

  /**
   * The chain ID on which this currency resides
   */
  public readonly chainId: number;

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(
    chainId: number,
    decimals: number,
    symbol: string,
    name?: string,
  ) {
    super(decimals, symbol, name);
    invariant(Number.isSafeInteger(chainId), 'CHAIN_ID');

    this.chainId = chainId;
  }

  /**
   * Return the wrapped version of this currency that can be used with the PancakeSwap contracts. Currencies must
   * implement this to be used in PancakeSwap
   */
  public abstract get wrapped(): Token;
}
