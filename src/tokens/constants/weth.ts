import { ChainId } from '../../chains/index.ts';
import { ERC20Token } from '../../currency/index.ts';

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io',
  ),
  [ChainId.SEPOLIA]: new ERC20Token(
    ChainId.SEPOLIA,
    '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io',
  ),
  // TODO: add correct contract
  [ChainId.BOB]: new ERC20Token(
    ChainId.BOB,
    '0x0000000000000000000000000000000000000000',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io',
  ),
  // TODO: add correct contract
  [ChainId.BOB_SEPOLIA]: new ERC20Token(
    ChainId.BOB_SEPOLIA,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io',
  ),
  // TODO: add correct contract
  [ChainId.OLD_BOB_SEPOLIA]: new ERC20Token(
    ChainId.OLD_BOB_SEPOLIA,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io',
  ),
};
