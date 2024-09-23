import { useState, useEffect } from 'react';
import {
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { isSolanaWallet } from '@dynamic-labs/solana';
import { isBitcoinWallet } from '@dynamic-labs/bitcoin';
import { useEmbeddedWallet } from '@dynamic-labs/sdk-react-core';

import './Methods.css';

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');

  // component declaration and all other logic you might need

  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();

  const onCreateWalletHandler = async () => {
    if (!userHasEmbeddedWallet) {
      try {
        await createEmbeddedWallet();
      } catch (e) {
        console.error(e);
      }
    }
  };

  console.log('!userHasEmbeddedWallet()', !userHasEmbeddedWallet());

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
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) return;

    const connection = await primaryWallet.getConnection();
    setResult(safeStringify(connection));
  }

  async function fetchSigner() {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) return;

    const signer = await primaryWallet.getSigner();
    setResult(safeStringify(signer));
  }

  async function signMessage() {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) return;

    const signature = await primaryWallet.signMessage('Hello World');
    setResult(signature);
  }

  return (
    <>
      {!isLoading && (
        <div
          className="dynamic-methods"
          data-theme={isDarkMode ? 'dark' : 'light'}
        >
          <div className="methods-container">
            <button className="btn btn-primary" onClick={showUser}>
              Fetch User
            </button>
            <button className="btn btn-primary" onClick={showUserWallets}>
              Fetch User Wallets
            </button>

            {isEthereumWallet(primaryWallet) && (
              <>
                <button className="btn btn-primary" onClick={fetchPublicClient}>
                  Fetch Public Client
                </button>
                <button className="btn btn-primary" onClick={fetchWalletClient}>
                  Fetch Wallet Client
                </button>
                <button className="btn btn-primary" onClick={signMessage}>
                  Sign 'Hello World' on Ethereum
                </button>
              </>
            )}

            {isSolanaWallet(primaryWallet) && (
              <>
                <button className="btn btn-primary" onClick={fetchConnection}>
                  Fetch Connection
                </button>
                <button className="btn btn-primary" onClick={fetchSigner}>
                  Fetch Signer
                </button>
                <button className="btn btn-primary" onClick={signMessage}>
                  Sign 'Hello World' on Solana
                </button>
              </>
            )}
          </div>
          {result && (
            <div className="results-container">
              <pre className="results-text">
                {result &&
                  (typeof result === 'string' && result.startsWith('{')
                    ? JSON.stringify(JSON.parse(result), null, 2)
                    : result)}
              </pre>
            </div>
          )}
          {result && (
            <div className="clear-container">
              <button className="btn btn-primary" onClick={clearResult}>
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
