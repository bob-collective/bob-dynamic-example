import { Transaction } from '@scure/btc-signer';
import { base64 } from '@scure/base';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isBitcoinWallet } from '@dynamic-labs/bitcoin';

async function SignAllInputs(paymentAddress: string, psbtBase64: string) {
  const { primaryWallet } = useDynamicContext();
  if (!isBitcoinWallet(primaryWallet!)) return null;

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
  const signedPsbt = await primaryWallet.signPsbt(params);
  if (!signedPsbt) {
    throw new Error("Not signed")
  }

  const signedTx = Transaction.fromPSBT(base64.decode(signedPsbt.signedPsbt));
  signedTx.finalize();

  return signedTx.hex;
}

export { SignAllInputs };
