import { Currency } from '../currency.ts';
import { BaseCurrency } from '../base/currency.ts';

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export abstract class BtcCurrency extends BaseCurrency {
  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public abstract readonly isNative: boolean;

  /**
   * Returns whether the currency is a token that is usable in PancakeSwap without wrapping
   */
  public abstract readonly isToken: boolean;

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol: string, name?: string) {
    super(decimals, symbol, name);
  }
}

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export class Bitcoin extends BtcCurrency {
  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public readonly isNative: true = true as const;

  /**
   * Returns whether the currency is a token that is usable in PancakeSwap without wrapping
   */
  public readonly isToken: false = false as const;

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  public constructor(decimals: number, symbol: string, name?: string) {
    super(decimals, symbol, name);
  }

  public equals(other: Currency): boolean {
    return other instanceof BtcCurrency && other.isNative;
  }
}

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
export class BRC20Token extends BtcCurrency {
  /**
   * Returns whether the currency is native to the chain and must be wrapped (e.g. Ether)
   */
  public readonly isNative: false = false as const;

  /**
   * Returns whether the currency is a token that is usable in PancakeSwap without wrapping
   */
  public readonly isToken: true = true as const;

  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  public constructor(decimals: number, symbol: string, name?: string) {
    super(decimals, symbol, name);
  }

  public equals(other: Currency): boolean {
    return (
      other instanceof BtcCurrency &&
      other.isToken &&
      this.symbol === other.symbol
    );
  }
}
