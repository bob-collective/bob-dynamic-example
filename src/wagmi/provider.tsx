import React from 'react';
import {
  WagmiProvider as LibWagmiProvider,
  WagmiProviderProps as LibWagmiProviderProps,
} from 'wagmi';
import { ReactNode, useMemo } from 'react';

import { getConfig } from './config.ts';
import { Config } from './types.ts';

type WagmiProviderProps = Omit<LibWagmiProviderProps, 'config'> & {
  children: ReactNode;
} & Config;

// TODO: might need different config for test env
const WagmiProvider: React.FC<WagmiProviderProps> = ({ isProd, ...props }) => {
  const config = useMemo(() => getConfig({ isProd }), [isProd]);

  return <LibWagmiProvider {...props} config={config} />;
};

export { WagmiProvider };
export type { WagmiProviderProps };
