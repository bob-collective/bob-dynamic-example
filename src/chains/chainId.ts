export enum ChainId {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OLD_BOB_SEPOLIA = 111,
  BOB_SEPOLIA = 808813,
  BOB = 60808,
  BASE = 8453,
  ARBITRUM_ONE = 42161,
  POLYGON = 137,
  POLYGON_ZKEVM = 1101,
  BSC = 56,
  OPBNB = 204,
  OP = 10,
  MOONBEAM = 1284,
  MERLIN = 4200,
  BITLAYER = 200901,
}

export const testnetChainIds = [ChainId.SEPOLIA, ChainId.BOB_SEPOLIA, ChainId.OLD_BOB_SEPOLIA];

export function isTestnetChainId(chainId: ChainId) {
  return testnetChainIds.includes(chainId);
}