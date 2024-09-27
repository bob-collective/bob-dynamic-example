import { useState, useEffect } from 'react';
import {
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { isBitcoinWallet } from '@dynamic-labs/bitcoin';
import { useEmbeddedWallet } from '@dynamic-labs/sdk-react-core';

import './Methods.css';
import { useStakeMutation, useGetStakingStrategies } from './hooks/index.ts';

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');

    const safeStringify = (obj) => {
      const seen = new WeakSet();
      return JSON.stringify(
        obj,
        (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return '[Circular]';
            }
            seen.add(value);
          }
          return value;
        },
        2,
      );
    };

  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      setIsLoading(false);
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  function clearResult() {
    setResult('');
  }

  function showUser() {
    setResult(safeStringify(user));
  }

  function showUserWallets() {
    setResult(safeStringify(userWallets));
  }

  async function fetchPublicClient() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;

    const publicClient = await primaryWallet.getPublicClient();
    setResult(safeStringify(publicClient));
  }

  async function fetchWalletClient() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;

    const walletClient = await primaryWallet.getWalletClient();
    setResult(safeStringify(walletClient));
  }

  async function signMessage() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;

    const signature = await primaryWallet.signMessage('Hello World');
    setResult(signature);
  }

  async function fetchConnection() {
    const connection = await primaryWallet.getConnection();
    setResult(safeStringify(connection));
  }

  async function fetchSigner() {
    if (!primaryWallet) return;

    const signer = await primaryWallet.getSigner();
    setResult(safeStringify(signer));
  }

  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();

  const createEmbeddedWalletHandler = async () => {
    if (!userHasEmbeddedWallet()) {
      try {
        await createEmbeddedWallet();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [strategySlug, setStrategySlug] = useState();
  const { data: strategies = [], isLoading: isStrategiesLoading } =
    useGetStakingStrategies();

  useEffect(() => {
    if (strategies.length) setStrategySlug(strategies[0].integration.slug);
  }, [strategies]);

  const strategy = strategies.find(strategy => strategy.integration.slug === strategySlug);
  const { stakeMutation } = useStakeMutation({
    strategy,
    amount: 3100
  });

  
  const evmWallet = userWallets.find((wallet) => wallet.chain === 'EVM');
  const btcWallet = userWallets.find((wallet) => wallet.chain === 'BTC');

  const onStakeClick = async () => {
    if (!evmWallet || !btcWallet) return null;

    return stakeMutation.mutate({
      evmAddress: evmWallet?.address,
      btcWallet
    });
  };

  return (
    <>
      {!isLoading && (
        <div className="dynamic-methods" data-theme={isDarkMode ? 'dark' : 'light'}>
          <div className="methods-container">
            <button className="btn btn-primary" onClick={showUser}>Fetch User</button>
            <button className="btn btn-primary" onClick={showUserWallets}>Fetch User Wallets</button>

            
    {primaryWallet && isEthereumWallet(primaryWallet) &&
      <>
        <button className="btn btn-primary" onClick={fetchPublicClient}>Fetch Public Client</button>
        <button className="btn btn-primary" onClick={fetchWalletClient}>Fetch Wallet Client</button>
        <button className="btn btn-primary" onClick={signMessage}>Sign 'Hello World' on Ethereum</button>    
      </>
    }
  

        {primaryWallet && (
          <div>
            {evmWallet && btcWallet ?
              <><select value={strategySlug} onChange={(e) => setStrategySlug(e.target.value)}>
                {strategies.map((strategy) => (
                  <option key={strategy.integration.slug} value={strategy.integration.slug}>{strategy.integration.name}</option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={onStakeClick} disabled={isStrategiesLoading}>Stake</button></> :
              <p>Please connect btc and evm wallets</p>}
            {/* {!userHasEmbeddedWallet() && <button className="btn btn-primary" onClick={createEmbeddedWalletHandler} disabled={isStrategiesLoading}>Create embedded wallet</button>} */}
          </div>
        )}

        </div>
          {result && (
            <div className="results-container">
              <pre className="results-text">
                {result && (
                  typeof result === "string" && result.startsWith("{")
                  ? JSON.stringify(JSON.parse(result), null, 2)
                  : result
                )}
              </pre>
            </div>
          )}
          {result && (
            <div className="clear-container">
              <button className="btn btn-primary" onClick={clearResult}>Clear</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
