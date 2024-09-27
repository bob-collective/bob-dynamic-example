# Embedded wallet with dynamic SDK

## Env variables
- REACT_APP_ENV_ID - environment id. Get one from [Dynamic dashboard](https://app.dynamic.xyz/dashboard/developer/api). ⚠️ It's important to turn off **Create on Sign up** toggle in [SDK & API keys section](https://app.dynamic.xyz/dashboard/embedded-wallets/dynamic).
- REACT_APP_IS_PRODUCTION - true | false. Whether to use mainnet or testnet api.

## Scripts
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Staking Flow
Login using email or connect bitcoin wallet (tested with Xverse).

Click `Create embedded wallet` then `Stake` button will appear. Signing transaction with bitcoin wallet will stake 3100 satoshi using selected strategy.