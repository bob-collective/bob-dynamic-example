import { GatewaySDK } from '@gobob/bob-sdk';

import { isProd } from '../constants/index.ts';

const gatewaySDK = new GatewaySDK(isProd ? 'bob' : 'bob-sepolia');

export { gatewaySDK };
