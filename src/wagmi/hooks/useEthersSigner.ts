import { useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWalletClient } from 'wagmi';

function walletClientToSigner(walletClient: any) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);

  return signer;
}

type UseEthersSignerProps = { chainId?: number };

const useEthersSigner = ({ chainId }: UseEthersSignerProps = {}) => {
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
};

export { walletClientToSigner, useEthersSigner };
export type { UseEthersSignerProps };
