import { GatewaySDK } from '@gobob/bob-sdk';

const gatewaySDK = new GatewaySDK(process.env.REACT_APP_IS_PRODUCTION === 'true' ? 'bob' : 'bob-sepolia');

export { gatewaySDK };
