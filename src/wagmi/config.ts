import { createConfig, http } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { ChainId } from '../chains/index.ts';

import { Config } from './types.ts';
import { bob, bobSepolia } from './bob.ts';
import { mainnet } from './mainnet.ts';
import { sepolia } from './sepolia.ts';

const binanceConnector = getWagmiConnectorV2();

const testnetChains = [bobSepolia, sepolia];

const prodChains = [mainnet, bob];

const allChains = [...testnetChains, ...prodChains];

const getConfig = ({ isProd }: Config) => {
  const connectors = [
    ...(typeof window !== 'undefined' && window.ethereum !== undefined
      ? [
          injected({
            shimDisconnect: true,
          }),
        ]
      : []),
    walletConnect({
      showQrModal: true,
      projectId: 'd9a2f927549acc3da9e4893729772641',
      metadata: {
        name: 'BOB',
        description:
          'BOB is a hybrid L2 that combines the security of Bitcoin with the versatility of Ethereum',
        url: 'https://www.gobob.xyz',
        icons: [
          'https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ecae53ef4b561482f1c49f_bob1.jpg',
        ],
      },
    }),
    coinbaseWallet({
      appName: 'BOB',
      chainId: ChainId.BOB,
      appLogoUrl:
        'https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ecae53ef4b561482f1c49f_bob1.jpg',
    }),
    binanceConnector(),
  ];

  return createConfig({
    chains: (isProd ? prodChains : allChains) as any,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [bob.id]: http(),
      [bobSepolia.id]: http(),
    },
    connectors,
  });
};

export { allChains, prodChains, testnetChains, getConfig };
