import { useMutation, useQuery } from '@tanstack/react-query';
import { gatewaySDK } from '../gateway/index.ts';
import { signAllInputs } from '../utils/signAllInputs.ts';
import { GatewayQuote, GatewayStrategyContract } from '@gobob/bob-sdk';


const SECONDS_30 = 30 * 1000;
const isProduction = process.env.IS_PRODUCTION === 'true';

const useStakeMutation = ({
  strategy,
  amount,
}: {
  strategy: GatewayStrategyContract;
  amount: number;
}) => {
  const DEFAULT_GATEWAY_QUOTE_PARAMS = {
    fromChain: 'bitcoin',
    toChain: isProduction ? 'bob' : 'bob-sepolia',
    fromToken: 'BTC',
    gasRefill: 2000,
  };

  const { data: quoteData, isLoading: isLoadingQuoteData } = useQuery({
    queryKey: ['quoteData', strategy?.integration.slug, amount],
    refetchInterval: SECONDS_30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const gatewayQuote = await gatewaySDK.getQuote({
        ...DEFAULT_GATEWAY_QUOTE_PARAMS,
        amount,
        gasRefill: DEFAULT_GATEWAY_QUOTE_PARAMS.gasRefill,
        toChain: strategy.chain.chainId,
        toToken: strategy.inputToken.address,
        strategyAddress: strategy.address,
      });

      return {
        gatewayQuote,
      };
    },
  });

  const stakeMutation = useMutation({
    mutationKey: ['stake', isProduction],
    mutationFn: async ({
      evmAddress,
      btcWalletAddress,
      btcWalletPublicKey,
      gatewayQuote,
    }: {
      evmAddress: string;
      btcWalletAddress: string;
      btcWalletPublicKey: string;
      gatewayQuote: GatewayQuote;
    }) => {
      if (!quoteData) {
        throw new Error('Quote Data missing');
      }

      if (!evmAddress) {
        throw new Error('No embedded wallet');
      }

      const { uuid, psbtBase64 } = await gatewaySDK.startOrder(gatewayQuote, {
        ...DEFAULT_GATEWAY_QUOTE_PARAMS,
        toUserAddress: evmAddress,
        fromUserAddress: btcWalletAddress,
        fromUserPublicKey: btcWalletPublicKey,
      });

      const bitcoinTxHex = await signAllInputs(btcWalletAddress, psbtBase64);

      const txid = await gatewaySDK.finalizeOrder(uuid, bitcoinTxHex);

      return txid;
    },
    onSuccess: (data) => {
      console.log('Success!')
      if (data) console.log(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { stakeMutation, quoteData, isLoadingQuoteData };
};

export { useStakeMutation };
