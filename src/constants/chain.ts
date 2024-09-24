import { ChainId, isTestnetChainId } from '../chains/index.ts';

const validL1Chains = [ChainId.SEPOLIA, ChainId.ETHEREUM] as const;

const L1_CHAIN = Number(process.env.REACT_APP_L1_CHAIN) as (typeof validL1Chains)[number];

if (!L1_CHAIN || !validL1Chains.includes(L1_CHAIN)) {
  throw new Error('Missing or invalid L1 chain');
}

const isL1Testnet = isTestnetChainId(L1_CHAIN);

const isProd = !isL1Testnet;

export { isProd };
