import { ChainId, testnetChainIds } from './chainId.ts';
import {
  chainNameToChainId,
  chainNames,
  defiLlamaChainNames,
} from './chainNames.ts';

export function getChainName(chainId: ChainId) {
  return chainNames[chainId];
}

export function getCapitalizedChainName(chainId: ChainId) {
  const name = getChainName(chainId);

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getLlamaChainName(chainId: ChainId) {
  return defiLlamaChainNames[chainId];
}

export function getChainIdByChainName(chainName?: string): ChainId | undefined {
  if (!chainName) return undefined;

  return chainNameToChainId[chainName] ?? undefined;
}

export function isTestnetChainId(chainId: ChainId) {
  return testnetChainIds.includes(chainId);
}
