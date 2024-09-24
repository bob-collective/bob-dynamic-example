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

const DEFAULT_GATEWAY_QUOTE_PARAMS = {
  fromChain: 'bitcoin',
  toChain: 'bob-sepolia',
  fromToken: 'BTC',
  // TODO: should be dynamic based on exchange rate
  gasRefill: 2000,
};

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);

  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
  const { data: strategies = [], isLoading: isStrategiesLoading } =
    useGetStakingStrategies();

  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      setIsLoading(false);
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  const strategy = strategies[0];

  const currencyAmount = CurrencyAmount.fromBaseAmount(BITCOIN, 0.000035);

  const embeddedWallet = userWallets.find((wallet) => {
    return wallet.chain === 'EVM';
  });

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
