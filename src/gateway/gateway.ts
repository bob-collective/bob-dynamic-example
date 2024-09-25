import { GatewaySDK } from '@gobob/bob-sdk';

const gatewaySDK = new GatewaySDK(process.env.IS_PRODUCTION === 'true' ? 'bob' : 'bob-sepolia');

export { gatewaySDK };
