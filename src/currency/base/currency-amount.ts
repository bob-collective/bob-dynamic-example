import invariant from 'tiny-invariant';
import _Big from 'big.js';
// @ts-ignore
import toFormat from 'toformat';

import { Token } from '../evm';
import { BtcCurrency } from '../bitcoin/index.ts';
import { Currency } from '../currency.ts';
import { BigintIsh, Rounding, MaxUint256 } from '../constants.ts';

import { Fraction } from './fraction.ts';

const Big = toFormat(_Big);

export class CurrencyAmount<T extends Currency> extends Fraction {
  public readonly currency: T;

  public readonly decimalScale: bigint;

  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  public static fromRawAmount<T extends Currency>(
    currency: T,
    rawAmount: BigintIsh,
  ): CurrencyAmount<T> {
    return new CurrencyAmount(currency, rawAmount);
  }

  /**
   * Returns a new currency amount instance from the base amount of token, i.e. the base amount like 1 BTC (8 decimals) turns into 100000000
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  // TODO: or from readable amount https://github.com/Uniswap/examples/blob/0071bb5883fba6f4cc39a5f1644ac941e4f24822/v3-sdk/routing/src/libs/conversion.ts#L3
  public static fromBaseAmount<T extends Currency>(
    currency: T,
    baseAmount: string | number,
  ): CurrencyAmount<T> {
    const decimalScale = 10 ** currency.decimals;
    const atomicAmount = new _Big(baseAmount)
      .mul(decimalScale)
      .round(0, _Big.roundDown);

    return this.fromRawAmount(currency, atomicAmount.toFixed());
  }

  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  public static fromFractionalAmount<T extends Currency>(
    currency: T,
    numerator: BigintIsh,
    denominator: BigintIsh,
  ): CurrencyAmount<T> {
    return new CurrencyAmount(currency, numerator, denominator);
  }

  protected constructor(
    currency: T,
    numerator: BigintIsh,
    denominator?: BigintIsh,
  ) {
    super(numerator, denominator);
    invariant(this.quotient <= MaxUint256, 'AMOUNT');
    this.currency = currency;
    this.decimalScale = 10n ** BigInt(currency.decimals);
  }

  public add(other: CurrencyAmount<T>): CurrencyAmount<T> {
    invariant(this.currency.equals(other.currency), 'CURRENCY');
    const added = super.add(other);

    return CurrencyAmount.fromFractionalAmount(
      this.currency,
      added.numerator,
      added.denominator,
    );
  }

  public subtract(other: CurrencyAmount<T>): CurrencyAmount<T> {
    invariant(this.currency.equals(other.currency), 'CURRENCY');
    const subtracted = super.subtract(other);

    return CurrencyAmount.fromFractionalAmount(
      this.currency,
      subtracted.numerator,
      subtracted.denominator,
    );
  }

  public multiply(other: Fraction | BigintIsh): CurrencyAmount<T> {
    const multiplied = super.multiply(other);

    return CurrencyAmount.fromFractionalAmount(
      this.currency,
      multiplied.numerator,
      multiplied.denominator,
    );
  }

  public divide(other: Fraction | BigintIsh): CurrencyAmount<T> {
    const divided = super.divide(other);

    return CurrencyAmount.fromFractionalAmount(
      this.currency,
      divided.numerator,
      divided.denominator,
    );
  }

  public toSignificant(
    significantDigits = 6,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN,
  ): string {
    return super
      .divide(this.decimalScale)
      .toSignificant(significantDigits, format, rounding);
  }

  public toFixed(
    decimalPlaces: number = this.currency.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN,
  ): string {
    invariant(decimalPlaces <= this.currency.decimals, 'DECIMALS');

    return super
      .divide(this.decimalScale)
      .toFixed(decimalPlaces, format, rounding);
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.currency.decimals;

    return new Big(this.quotient.toString())
      .div(this.decimalScale.toString())
      .toFormat(format);
  }

  public get wrapped(): CurrencyAmount<Token> {
    if (this.currency instanceof BtcCurrency) {
      throw new Error('Something Wrong');
    }

    if (this.currency.isToken) return this as CurrencyAmount<Token>;

    return CurrencyAmount.fromFractionalAmount(
      this.currency.wrapped,
      this.numerator,
      this.denominator,
    );
  }
}
