export { watchAccount } from '@wagmi/core';
export { useAccount } from 'wagmi';
export * from './bob.ts';
export * from './config.ts';
export * from './hooks/index.ts';
// @ts-ignore
export { sepolia } from './sepolia.ts';
// @ts-ignore
export { mainnet } from './mainnet.ts';

export type { Address } from 'viem';

export { WagmiProvider } from './provider.tsx';
export type { WagmiProviderProps } from './provider.tsx';
