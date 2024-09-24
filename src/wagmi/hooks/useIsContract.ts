import { useMemo } from 'react';
import { GetBytecodeReturnType } from 'viem';
import { Config, UseBytecodeParameters, useBytecode } from 'wagmi';

const useIsContract = (props: UseBytecodeParameters<Config, GetBytecodeReturnType>) => {
  const result = useBytecode(props);

  const isContract = useMemo(() => !!result.data && result.data.length > 2, [result.data]);

  return { isContract, ...result };
};

export { useIsContract };
