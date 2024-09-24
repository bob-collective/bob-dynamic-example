import { ChainId } from '../chains/index.ts';
import { TBTC, USDC, USDT, WBTC } from '../tokens/index.ts';
import { Address } from 'viem';

export type RawToken = {
  chainId: ChainId;
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  logoUrl: string;
  apiId: string;
  bridgeDisabled?: boolean;
};

export const ETH: Record<
  | ChainId.BOB
  | ChainId.ETHEREUM
  | ChainId.SEPOLIA
  | ChainId.BOB_SEPOLIA
  | ChainId.OLD_BOB_SEPOLIA,
  RawToken
> = {
  [ChainId.ETHEREUM]: {
    chainId: ChainId.ETHEREUM,
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
    apiId: 'ethereum',
  },
  [ChainId.BOB]: {
    chainId: ChainId.BOB,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
    apiId: 'ethereum',
  },
  [ChainId.SEPOLIA]: {
    chainId: ChainId.SEPOLIA,
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
    apiId: 'ethereum',
  },
  [ChainId.BOB_SEPOLIA]: {
    chainId: ChainId.BOB_SEPOLIA,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
    apiId: 'ethereum',
  },
  [ChainId.OLD_BOB_SEPOLIA]: {
    chainId: ChainId.OLD_BOB_SEPOLIA,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
    apiId: 'ethereum',
  },
};

export const wstETH: Record<
  ChainId.BOB | ChainId.ETHEREUM | ChainId.SEPOLIA | ChainId.OLD_BOB_SEPOLIA,
  RawToken
> = {
  [ChainId.ETHEREUM]: {
    chainId: ChainId.ETHEREUM,
    address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/wstETH/logo.svg',
    apiId: 'wrapped-steth',
  },
  [ChainId.BOB]: {
    chainId: ChainId.BOB,
    address: '0x85008aE6198BC91aC0735CB5497CF125ddAAc528',
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/wstETH/logo.svg',
    apiId: 'wrapped-steth',
  },
  [ChainId.SEPOLIA]: {
    chainId: ChainId.SEPOLIA,
    address: '0xDbcdAF513dc5Cc9F1289EC1Dd9D6Fe44AcfC289A',
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/wstETH/logo.svg',
    apiId: 'wrapped-steth',
  },
  // [ChainId.BOB_SEPOLIA]: {
  //   chainId: ChainId.BOB_SEPOLIA,
  //   address: '0x1f512b534F541424912AD78075d5A0a01C43C0CB',
  //   name: 'Wrapped liquid staked Ether 2.0',
  //   symbol: 'wstETH',
  //   decimals: 18,
  //   logoUrl: 'https://ethereum-optimism.github.io/data/wstETH/logo.svg',
  //   apiId: 'wrapped-steth'
  // },
  [ChainId.OLD_BOB_SEPOLIA]: {
    chainId: ChainId.OLD_BOB_SEPOLIA,
    address: '0x7363C130e10031344b813FAcd99f91e42864df3c',
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/wstETH/logo.svg',
    apiId: 'wrapped-steth',
  },
};

const usdc: Record<
  | ChainId.BOB
  | ChainId.ETHEREUM
  | ChainId.SEPOLIA
  | ChainId.BOB_SEPOLIA
  | ChainId.OLD_BOB_SEPOLIA,
  RawToken
> = {
  [ChainId.ETHEREUM]: {
    chainId: ChainId.ETHEREUM,
    address: USDC[ChainId.ETHEREUM].address,
    name: USDC[ChainId.ETHEREUM].name!,
    symbol: USDC[ChainId.ETHEREUM].symbol,
    decimals: USDC[ChainId.ETHEREUM].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    apiId: 'usd-coin',
  },
  [ChainId.BOB]: {
    chainId: ChainId.BOB,
    address: USDC[ChainId.BOB].address,
    name: USDC[ChainId.BOB].name!,
    symbol: USDC[ChainId.BOB].symbol!,
    decimals: USDC[ChainId.BOB].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    apiId: 'usd-coin',
  },
  [ChainId.SEPOLIA]: {
    chainId: ChainId.SEPOLIA,
    address: USDC[ChainId.SEPOLIA].address,
    name: USDC[ChainId.SEPOLIA].name!,
    symbol: USDC[ChainId.SEPOLIA].symbol!,
    decimals: USDC[ChainId.SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    apiId: 'usd-coin',
  },
  [ChainId.BOB_SEPOLIA]: {
    chainId: ChainId.BOB_SEPOLIA,
    address: USDC[ChainId.BOB_SEPOLIA].address,
    name: USDC[ChainId.BOB_SEPOLIA].name!,
    symbol: USDC[ChainId.BOB_SEPOLIA].symbol!,
    decimals: USDC[ChainId.BOB_SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    apiId: 'usd-coin',
  },
  [ChainId.OLD_BOB_SEPOLIA]: {
    chainId: ChainId.OLD_BOB_SEPOLIA,
    address: USDC[ChainId.OLD_BOB_SEPOLIA].address,
    name: USDC[ChainId.OLD_BOB_SEPOLIA].name!,
    symbol: USDC[ChainId.OLD_BOB_SEPOLIA].symbol!,
    decimals: USDC[ChainId.OLD_BOB_SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
    apiId: 'usd-coin',
  },
};

const ethereumAssets: RawToken[] = [
  ETH[ChainId.ETHEREUM],
  {
    chainId: ChainId.ETHEREUM,
    address: '0xe7c3755482d0dA522678Af05945062d4427e0923',
    name: 'ALEX',
    symbol: 'ALEX',
    decimals: 18,
    logoUrl:
      'https://images.ctfassets.net/frwmwlognk87/66AVnxb2drR9ofypuV3y2r/1f223e16a7236dfa0ea4b8e0259c35c8/alex.svg',
    apiId: 'alexgo',
    bridgeDisabled: true,
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/DAI/logo.svg',
    apiId: 'dai',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: USDT[ChainId.ETHEREUM].address,
    name: USDT[ChainId.ETHEREUM].name!,
    symbol: USDT[ChainId.ETHEREUM].symbol,
    decimals: USDT[ChainId.ETHEREUM].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDT/logo.png',
    apiId: 'tether',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: WBTC[ChainId.ETHEREUM].address,
    name: WBTC[ChainId.ETHEREUM].name!,
    symbol: WBTC[ChainId.ETHEREUM].symbol,
    decimals: WBTC[ChainId.ETHEREUM].decimals,
    logoUrl:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    apiId: 'wrapped-btc',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
    name: 'Rocket Pool ETH',
    symbol: 'rETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/rETH/logo.svg',
    apiId: 'rocket-pool-eth',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: TBTC[ChainId.ETHEREUM].address,
    name: TBTC[ChainId.ETHEREUM].name!,
    symbol: TBTC[ChainId.ETHEREUM].symbol,
    decimals: TBTC[ChainId.ETHEREUM].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/tBTC/logo.svg',
    apiId: 'tbtc',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xbdab72602e9AD40FC6a6852CAf43258113B8F7a5',
    name: 'eSOV',
    symbol: 'eSOV',
    decimals: 18,
    logoUrl: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/1407.png',
    apiId: 'sovryn',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0x7122985656e38BDC0302Db86685bb972b145bD3C',
    name: 'StakeStone Ether',
    symbol: 'STONE',
    decimals: 18,
    logoUrl:
      'https://storage.googleapis.com/ks-setting-1d682dca/dee351e5-ff61-4a8f-994d-82f3078119661696785945490.png',
    apiId: 'stakestone-ether',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xbdbb63f938c8961af31ead3deba5c96e6a323dd1',
    name: 'Sovryn Dollar',
    symbol: 'DLLR',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/30947/standard/sovryn_dllr.jpg',
    apiId: 'sovryn-dollar',
  },
  usdc[ChainId.ETHEREUM],
  wstETH[ChainId.ETHEREUM],
  {
    chainId: ChainId.ETHEREUM,
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png',
    apiId: 'frax',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32',
    name: 'Staked FRAX',
    symbol: 'sFRAX',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/35383/standard/sfrax.png',
    apiId: 'staked-frax',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
    name: 'Frax Share',
    symbol: 'FXS',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/13423/standard/Frax_Shares_icon.png',
    apiId: 'frax-share',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xac3E018457B222d93114458476f3E3416Abbe38F',
    name: 'Staked Frax Ether',
    symbol: 'sfrxETH',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/28285/standard/sfrxETH_icon.png',
    apiId: 'staked-frax-ether',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0',
    name: 'Tellor Tributes',
    symbol: 'TRB',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/9644/standard/Blk_icon_current.png',
    apiId: 'tellor-tributes',
  },
  {
    chainId: ChainId.ETHEREUM,
    address: '0xCdF7028ceAB81fA0C6971208e83fa7872994beE5',
    name: 'Threshold Network Token',
    symbol: 'T',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/22228/standard/nFPNiSbL_400x400.jpg',
    apiId: 'threshold-network-token',
  },
];

const sepoliaAssets: RawToken[] = [
  ETH[ChainId.SEPOLIA],
  {
    chainId: ChainId.SEPOLIA,
    address: USDT[ChainId.SEPOLIA].address,
    name: USDT[ChainId.SEPOLIA].name!,
    symbol: USDT[ChainId.SEPOLIA].symbol!,
    decimals: USDT[ChainId.SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDT/logo.png',
    apiId: 'tether',
  },
  {
    chainId: ChainId.SEPOLIA,
    address: TBTC[ChainId.SEPOLIA].address,
    name: TBTC[ChainId.SEPOLIA].name!,
    symbol: TBTC[ChainId.SEPOLIA].symbol!,
    decimals: TBTC[ChainId.SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/tBTC/logo.svg',
    apiId: 'tbtc',
  },
  usdc[ChainId.SEPOLIA],
  wstETH[ChainId.SEPOLIA],
];

const bobAssets: RawToken[] = [
  ETH[ChainId.BOB],
  {
    chainId: ChainId.BOB,
    address: '0xa669e059fdcbdfc532a2edd658eb2922799eedb8',
    name: 'ALEX',
    symbol: 'ALEX',
    decimals: 18,
    logoUrl:
      'https://images.ctfassets.net/frwmwlognk87/66AVnxb2drR9ofypuV3y2r/1f223e16a7236dfa0ea4b8e0259c35c8/alex.svg',
    apiId: 'alexgo',
    bridgeDisabled: true,
  },
  {
    chainId: ChainId.BOB,
    address: '0x6c851f501a3f24e29a8e39a29591cddf09369080',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/DAI/logo.svg',
    apiId: 'dai',
  },
  {
    chainId: ChainId.BOB,
    address: USDT[ChainId.BOB].address,
    name: USDT[ChainId.BOB].name!,
    symbol: USDT[ChainId.BOB].symbol,
    decimals: USDT[ChainId.BOB].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDT/logo.png',
    apiId: 'tether',
  },
  {
    chainId: ChainId.BOB,
    address: WBTC[ChainId.BOB].address,
    name: WBTC[ChainId.BOB].name!,
    symbol: WBTC[ChainId.BOB].symbol,
    decimals: WBTC[ChainId.BOB].decimals,
    logoUrl:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
    apiId: 'wrapped-btc',
  },
  {
    chainId: ChainId.BOB,
    address: '0xb5686c4f60904ec2bda6277d6fe1f7caa8d1b41a',
    name: 'Rocket Pool ETH',
    symbol: 'rETH',
    decimals: 18,
    logoUrl: 'https://ethereum-optimism.github.io/data/rETH/logo.svg',
    apiId: 'rocket-pool-eth',
  },
  {
    chainId: ChainId.BOB,
    address: TBTC[ChainId.BOB].address,
    name: TBTC[ChainId.BOB].name!,
    symbol: TBTC[ChainId.BOB].symbol,
    decimals: TBTC[ChainId.BOB].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/tBTC/logo.svg',
    apiId: 'tbtc',
  },
  {
    chainId: ChainId.BOB,
    address: '0xba20a5e63eeEFfFA6fD365E7e540628F8fC61474',
    name: 'eSOV',
    symbol: 'eSOV',
    decimals: 18,
    logoUrl: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/1407.png',
    apiId: 'sovryn',
  },
  {
    chainId: ChainId.BOB,
    address: '0x96147a9ae9a42d7da551fd2322ca15b71032f342',
    name: 'StakeStone Ether',
    symbol: 'STONE',
    decimals: 18,
    logoUrl:
      'https://storage.googleapis.com/ks-setting-1d682dca/dee351e5-ff61-4a8f-994d-82f3078119661696785945490.png',
    apiId: 'stakestone-ether',
  },
  {
    chainId: ChainId.BOB,
    address: '0xf3107eEC1e6F067552C035FD87199e1A5169CB20',
    name: 'Sovryn Dollar',
    symbol: 'DLLR',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/30947/standard/sovryn_dllr.jpg?1696529786',
    apiId: 'sovryn-dollar',
  },
  wstETH[ChainId.BOB],
  usdc[ChainId.BOB],
  {
    chainId: ChainId.BOB,
    address: '0xc4a20a608616f18aa631316eeda9fb62d089361e',
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png',
    apiId: 'frax',
  },
  {
    chainId: ChainId.BOB,
    address: '0xb7eae04b995b3b365040dee99795112add43afa0',
    name: 'Staked FRAX',
    symbol: 'sFRAX',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/35383/standard/sfrax.png',
    apiId: 'staked-frax',
  },
  {
    chainId: ChainId.BOB,
    address: '0x15e35b19ad29c512103eaabb55154ef0ee6ca661',
    name: 'Frax Share',
    symbol: 'FXS',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/13423/standard/Frax_Shares_icon.png',
    apiId: 'frax-share',
  },
  {
    chainId: ChainId.BOB,
    address: '0x249d2952d1c678843e7cd7bf654efcec52f2f9e8',
    name: 'Staked Frax Ether',
    symbol: 'sfrxETH',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/28285/standard/sfrxETH_icon.png',
    apiId: 'staked-frax-ether',
  },
  {
    chainId: ChainId.BOB,
    address: '0x665060707c3ea3c31b3eabad7f409072446e1d50',
    name: 'Tellor Tributes',
    symbol: 'TRB',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/9644/standard/Blk_icon_current.png',
    apiId: 'tellor-tributes',
  },
  {
    chainId: ChainId.BOB,
    address: '0xF14e82E192a36Df7d09Fe726F6ECF70310f73438',
    name: 'Threshold Network Token',
    symbol: 'T',
    decimals: 18,
    logoUrl:
      'https://assets.coingecko.com/coins/images/22228/standard/nFPNiSbL_400x400.jpg',
    apiId: 'threshold-network-token',
  },
];

const bobSepoliaAssets: RawToken[] = [
  ETH[ChainId.BOB_SEPOLIA],
  usdc[ChainId.BOB_SEPOLIA],
  {
    chainId: ChainId.BOB_SEPOLIA,
    address: TBTC[ChainId.BOB_SEPOLIA].address,
    name: TBTC[ChainId.BOB_SEPOLIA].name!,
    symbol: TBTC[ChainId.BOB_SEPOLIA].symbol!,
    decimals: TBTC[ChainId.BOB_SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/tBTC/logo.svg',
    apiId: 'tbtc',
  },
  // wstETH[ChainId.BOB_SEPOLIA]
];

const oldBobSepoliaAssets: RawToken[] = [
  ETH[ChainId.OLD_BOB_SEPOLIA],
  {
    chainId: ChainId.OLD_BOB_SEPOLIA,
    address: USDT[ChainId.OLD_BOB_SEPOLIA].address,
    name: USDT[ChainId.OLD_BOB_SEPOLIA].name!,
    symbol: USDT[ChainId.OLD_BOB_SEPOLIA].symbol!,
    decimals: USDT[ChainId.OLD_BOB_SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/USDT/logo.png',
    apiId: 'tether',
  },
  {
    chainId: ChainId.OLD_BOB_SEPOLIA,
    address: TBTC[ChainId.OLD_BOB_SEPOLIA].address,
    name: TBTC[ChainId.OLD_BOB_SEPOLIA].name!,
    symbol: TBTC[ChainId.OLD_BOB_SEPOLIA].symbol!,
    decimals: TBTC[ChainId.OLD_BOB_SEPOLIA].decimals,
    logoUrl: 'https://ethereum-optimism.github.io/data/tBTC/logo.svg',
    apiId: 'tbtc',
  },
  usdc[ChainId.OLD_BOB_SEPOLIA],
  wstETH[ChainId.OLD_BOB_SEPOLIA],
];

export const tokens: RawToken[] = [
  ...ethereumAssets,
  ...sepoliaAssets,
  ...bobAssets,
  ...bobSepoliaAssets,
  ...oldBobSepoliaAssets,
];
