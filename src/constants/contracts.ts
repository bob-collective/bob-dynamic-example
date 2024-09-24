import { ChainId } from '../chains/index.ts';

import { FusionLockAbi } from '../abis/FusionLock.abi';

enum ContractType {
  FUSION_LOCK = 'FUSION_LOCK',
}

const sepoliaContracts = {
  [ContractType.FUSION_LOCK]: {
    address: '0x1affA33b83Ab402faf6f14dAC9c1F89320a25F49',
    abi: FusionLockAbi,
  },
} as const;

const ethereumContracts = {
  [ContractType.FUSION_LOCK]: {
    address: '0x61dc14b28d4dbcd6cf887e9b72018b9da1ce6ff7',
    abi: FusionLockAbi,
  },
} as const;

const contracts = {
  [ChainId.SEPOLIA]: sepoliaContracts,
  [ChainId.ETHEREUM]: ethereumContracts,
} as const;

const getContract = (chainId: ChainId, contract: ContractType) =>
  (contracts as any)[chainId][contract];

export { contracts, getContract, ContractType };
