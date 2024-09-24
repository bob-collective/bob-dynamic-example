import { isBitcoinWallet } from '@dynamic-labs/bitcoin';
import {
  useDynamicContext,
  useEmbeddedWallet,
  useIsLoggedIn,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import './Methods.css';
import { gatewaySDK } from './bob-sdk/index.ts';
import { CurrencyAmount } from './currency/index.ts';
import { useGetStakingStrategies } from './hooks/index.ts';
import { signAllInputs } from './sats-wagmi/signAllInputs.ts';
import { BITCOIN } from './tokens/index.ts';
import { isProd } from './constants/chain.ts';

const DEFAULT_GATEWAY_QUOTE_PARAMS = {
  fromChain: 'bitcoin',
  toChain: isProd ? 'bob' : 'bob-sepolia',
  fromToken: 'BTC',
  // TODO: should be dynamic based on exchange rate
  gasRefill: 2000,
};

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [strategySlug, setStrategySlug] = useState()

  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
  const { data: strategies = [], isLoading: isStrategiesLoading } =
    useGetStakingStrategies();

  useEffect(() => {
    if (strategies.length) setStrategySlug(strategies[0].raw.integration.slug);
  }, [strategies])

  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      setIsLoading(false);
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  const currencyAmount = CurrencyAmount.fromBaseAmount(BITCOIN, 0.000035);

  const embeddedWallet = userWallets.find((wallet) => wallet.chain === 'EVM');

  const {
    data: quoteData,
    isLoading: isFetchingQuote,
    isError: isQuoteError,
    error: quoteError,
  } = useQuery({
    queryKey: ['quoteData'],
    refetchInterval: 30 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!currencyAmount) return;

      const strategy = strategies.find(strategy => strategy.raw.integration.slug === strategySlug);

      const atomicAmount = currencyAmount.numerator.toString();
      const gatewayQuote = await gatewaySDK.getQuote({
        ...DEFAULT_GATEWAY_QUOTE_PARAMS,
        amount: atomicAmount,
        gasRefill: DEFAULT_GATEWAY_QUOTE_PARAMS.gasRefill,
        toChain: strategy.raw.chain.chainId,
        toToken: strategy.raw.inputToken.address,
        strategyAddress: strategy.raw.address,
      });

      const feeAmount = CurrencyAmount.fromRawAmount(BITCOIN, gatewayQuote.fee);

      return {
        fee: feeAmount,
        gatewayQuote,
      };
    },
  });

  const stakeMutation = useMutation({
    mutationKey: ['stake'],
    mutationFn: async ({ evmAddress, gatewayQuote }) => {
      if (!primaryWallet) {
        throw new Error('Connector missing');
      }

      if (!quoteData) {
        throw new Error('Quote Data missing');
      }

      if (!evmAddress) {
        throw new Error('No embedded wallet');
      }

      const btcPaymentWallet = primaryWallet.additionalAddresses.find(
        (address) => address.type === 'payment',
      );

      const { uuid, psbtBase64 } = await gatewaySDK.startOrder(gatewayQuote, {
        ...DEFAULT_GATEWAY_QUOTE_PARAMS,
        toUserAddress: evmAddress,
        fromUserAddress: btcPaymentWallet.address,
        fromUserPublicKey: btcPaymentWallet.publicKey,
      });

      const bitcoinTxHex = await signAllInputs(
        btcPaymentWallet.address,
        psbtBase64,
      );

      // NOTE: user does not broadcast the tx, that is done by
      // the relayer after it is validated
      const txid = await gatewaySDK.finalizeOrder(uuid, bitcoinTxHex);

      const data = {
        fee: quoteData.fee,
      };

      return { ...data, txid };
    },
    onSuccess: (data) => {
      console.info('Success!');
      if (data) console.log(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onStakeClick = async () => {
    if (!userHasEmbeddedWallet()) {
      try {
        await createEmbeddedWallet();
      } catch (e) {
        console.error(e);
      }
    }

    if (!quoteData) return console.error('Missing quote data');

    return stakeMutation.mutate({
      evmAddress: embeddedWallet.address,
      gatewayQuote: quoteData.gatewayQuote,
    });
  };

  return (
    <>
      {!isLoading && (
        <div
          className="dynamic-methods"
          data-theme={isDarkMode ? 'dark' : 'light'}
        >
          <div className="methods-container">
            <select value={strategySlug} onChange={(e) => setStrategySlug(e.target.value)}>
              {strategies.map(strategy => (
                <option key={strategy.raw.integration.slug} value={strategy.raw.integration.slug}>
                  {strategy.raw.integration.name}
                </option>
              ))}
            </select>
          </div>
          <div className="methods-container">
            {isBitcoinWallet(primaryWallet) && (
              <button
                className="btn btn-primary btn-wide"
                onClick={onStakeClick}
                disabled={isStrategiesLoading || !userHasEmbeddedWallet()}
              >
                Stake
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
