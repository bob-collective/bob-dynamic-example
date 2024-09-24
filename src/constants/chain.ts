import { ChainId, isTestnetChainId } from '../chains/index.ts';
import {
  bob,
  bobSepolia,
  mainnet,
  oldBobSepolia,
  sepolia,
} from '../wagmi/index.ts';
import { Chain } from 'viem';

const validL1Chains = [ChainId.SEPOLIA, ChainId.ETHEREUM] as const;

const L1_CHAIN = Number(
  process.env.REACT_APP_L1_CHAIN,
) as (typeof validL1Chains)[number];

if (!L1_CHAIN || !validL1Chains.includes(L1_CHAIN)) {
  throw new Error('Missing or invalid L1 chain');
}

const isL1Testnet = isTestnetChainId(L1_CHAIN);

const validL2Chains = [
  ChainId.BOB_SEPOLIA,
  ChainId.OLD_BOB_SEPOLIA,
  ChainId.BOB,
] as const;

const L2_CHAIN = Number(
  process.env.REACT_APP_L2_CHAIN,
) as (typeof validL2Chains)[number];

if (
  !L2_CHAIN ||
  !validL2Chains.includes(L2_CHAIN) ||
  (isL1Testnet && !isTestnetChainId(L2_CHAIN))
) {
  throw new Error('Missing or invalid L2 chain');
}

const isL1Chain = (chain: Chain) => chain?.id === L1_CHAIN;

const isL2Chain = (chain: Chain) => chain?.id === L2_CHAIN;

const isValidChain = (chainId: ChainId) =>
  chainId === L1_CHAIN || chainId === L2_CHAIN;

const isProd = !isL1Testnet;

const chainL1: Chain = isProd ? mainnet : sepolia;
const chainL2: Chain = isProd
  ? bob
  : bobSepolia.id === L2_CHAIN
  ? bobSepolia
  : oldBobSepolia;

export {
  L1_CHAIN,
  L2_CHAIN,
  chainL1,
  chainL2,
  isL1Chain,
  isL2Chain,
  isProd,
  isValidChain,
};
