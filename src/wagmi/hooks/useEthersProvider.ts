import { JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { usePublicClient } from 'wagmi';

function publicClientToProvider(publicClient: any) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };

  if (transport.type === 'fallback') {
    return new JsonRpcProvider(transport.transports[0].value.url, network);
  }

  return new JsonRpcProvider(transport.url, network);
}

type UseEthersProviderProps = { chainId?: number };

const useEthersProvider = ({ chainId }: UseEthersProviderProps = {}) => {
  const publicClient = usePublicClient({ chainId });

  return useMemo(() => publicClientToProvider(publicClient), [publicClient]);
};

export { useEthersProvider, publicClientToProvider };
export type { UseEthersProviderProps };
