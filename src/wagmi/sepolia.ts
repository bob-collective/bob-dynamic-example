import { defineChain } from 'viem';
import { sepolia as wagmiSepolia } from 'viem/chains';

export const sepolia = defineChain({
  ...wagmiSepolia,
  contracts: {
    ...wagmiSepolia.contracts,
    l2OutputOracle: {
      [wagmiSepolia.id]: {
        address: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
        blockCreated: 4462615
      }
    },
    portal: {
      [wagmiSepolia.id]: {
        address: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
        blockCreated: 4462615
      }
    }
  }
});
