import { ChainId } from '../chains/index.ts';
import { defineChain } from 'viem';

const mainnetSourceId = 1; // ethereum

export const bob = defineChain({
  id: ChainId.BOB,
  network: 'BOB',
  name: 'BOB',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.gobob.xyz'],
      webSocket: ['wss://rpc.gobob.xyz'],
    },
    public: {
      http: ['https://rpc.gobob.xyz'],
      webSocket: ['wss://rpc.gobob.xyz'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'BOB Explorer',
      url: 'https://explorer.gobob.xyz',
    },
    default: {
      name: 'BOB Explorer',
      url: 'https://explorer.gobob.xyz',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 23131,
    },
    l2OutputOracle: {
      [mainnetSourceId]: {
        address: '0xdDa53E23f8a32640b04D7256e651C1db98dB11C1',
        blockCreated: 4462615,
      },
    },
    portal: {
      [mainnetSourceId]: {
        address: '0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E',
        blockCreated: 4462615,
      },
    },
  },
});

const sepoliaSourceId = 11_155_111; // sepolia

export const oldBobSepolia = defineChain({
  id: ChainId.OLD_BOB_SEPOLIA,
  name: 'BOB Sepolia',
  network: 'bob-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'BOB Sepolia',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.gobob.xyz'],
    },
    public: {
      http: ['https://testnet.rpc.gobob.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BOB Sepolia Explorer',
      url: 'https://testnet-explorer.gobob.xyz',
    },
  },
  contracts: {
    multicall3: {
      address: '0x089b191d95417817389c8eD9075b51a38ca46DE8',
      blockCreated: 2469044,
    },
    l2OutputOracle: {
      [sepoliaSourceId]: {
        address: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
        blockCreated: 4462615,
      },
    },
    portal: {
      [sepoliaSourceId]: {
        address: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
        blockCreated: 4462615,
      },
    },
  },
  testnet: true,
});

export const bobSepolia = defineChain({
  id: ChainId.BOB_SEPOLIA,
  name: 'BOB Sepolia',
  network: 'bob-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'BOB Sepolia',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://bob-sepolia.rpc.gobob.xyz'],
      webSocket: ['wss://bob-sepolia.rpc.gobob.xyz'],
    },
    public: {
      http: ['https://bob-sepolia.rpc.gobob.xyz'],
      webSocket: ['wss://bob-sepolia.rpc.gobob.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BOB Sepolia Explorer',
      url: 'https://bob-sepolia.explorer.gobob.xyz',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 35677,
    },
    l2OutputOracle: {
      [sepoliaSourceId]: {
        address: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
        blockCreated: 4462615,
      },
    },
    portal: {
      [sepoliaSourceId]: {
        address: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
        blockCreated: 4462615,
      },
    },
  },
  testnet: true,
});
