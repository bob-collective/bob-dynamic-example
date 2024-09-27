import { Transaction } from '@scure/btc-signer';
import { base64 } from '@scure/base';
import { BitcoinWallet } from '@dynamic-labs/bitcoin';

async function signAllInputs(btcWallet: BitcoinWallet, paymentAddress: string, psbtBase64: string) {
  // Sign all inputs with the payment address
  const unsignedTx = Transaction.fromPSBT(base64.decode(psbtBase64));
  const inputLength = unsignedTx.inputsLength;
  const inputsToSign = Array.from({ length: inputLength }, (_, i) => i);
  const psbt = unsignedTx.toPSBT(0);
    
  // Define the parameters for signing the PSBT
  const params = {
    allowedSighash: [1],
    unsignedPsbtBase64: base64.encode(psbt),
    signature: [{
      address: paymentAddress,
      signingIndexes: inputsToSign
    }]
  };

  // Request the wallet to sign the PSBT
  const signedPsbt = await btcWallet.signPsbt(params);
  if (!signedPsbt) {
    throw new Error("Not signed")
  }

  const signedTx = Transaction.fromPSBT(base64.decode(signedPsbt.signedPsbt));
  signedTx.finalize();

  return signedTx.hex;
}

export { signAllInputs };
