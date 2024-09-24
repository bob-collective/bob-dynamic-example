import type { NativeCurrency } from './evm/native-currency';
import type { Token } from './evm/token';

import { BRC20Token, Bitcoin } from './bitcoin/currency';

export type EvmCurrencies = NativeCurrency | Token;

export type Currency = EvmCurrencies | Bitcoin | BRC20Token;
