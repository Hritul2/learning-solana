import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const main = async () => {
  // get the recivers public key from the command line
  const suppliedToPubkey = process.argv[2] || null;

  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  // get the sender's keypair from the environment
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
  const toPubkey = new PublicKey(suppliedToPubkey);

  const devnetConnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  // create a transaction

  const transaction = new Transaction();

  const lamportsToSend = 500;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: lamportsToSend,
  });

  transaction.add(sendSolInstruction);

  // signature is the transaction signature
  const signature = await sendAndConfirmTransaction(
    devnetConnection,
    transaction,
    [senderKeypair]
  );

  console.log(
    `💸 Finished! Sent ${lamportsToSend} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);
};

main();
