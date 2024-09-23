import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import Main from './Main';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const App = () => (
  <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: '2762a57b-faa4-41ce-9f16-abff9300e2c9',
      walletConnectors: [
        EthereumWalletConnectors,
        SolanaWalletConnectors,
        BitcoinWalletConnectors,
      ],
    }}
  >
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DynamicWagmiConnector>
          <Main />
        </DynamicWagmiConnector>
      </QueryClientProvider>
    </WagmiProvider>
  </DynamicContextProvider>
);

export default App;
