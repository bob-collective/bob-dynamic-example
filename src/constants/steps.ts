const bridgeDepositSteps = ['deposit', 'l2-confirmation'] as const;

const bridgeWithdrawSteps = [
  'withdraw',
  'state-root-published',
  'prove',
  'challenge-period',
  'relay',
  'l1-confirmation'
] as const;

type BridgeDepositSteps = (typeof bridgeDepositSteps)[number];

type BridgeWithdrawSteps = (typeof bridgeWithdrawSteps)[number];

type BridgeSteps = BridgeDepositSteps | BridgeWithdrawSteps;

// l2-processing - relayer did not yet execute the swap
// l2-incomplete - relayer executed the swap but user did not get staking token
// l2-confirmation - relayer executed the swap
const gatewayDepositSteps = ['btc-confirmation', 'l2-processing', 'l2-incomplete', 'l2-confirmation'] as const;

type GatewayDepositSteps = (typeof gatewayDepositSteps)[number];

type GatewaySteps = (typeof gatewayDepositSteps)[number];

type BridgeStepStatus = 'idle' | 'ongoing' | 'complete' | 'failed';

export type { BridgeStepStatus, BridgeSteps, GatewaySteps, GatewayDepositSteps };
