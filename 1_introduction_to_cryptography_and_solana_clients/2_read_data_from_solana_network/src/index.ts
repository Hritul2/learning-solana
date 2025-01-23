import {
  LAMPORTS_PER_SOL,
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { resolve } from "@bonfida/spl-name-service";

const main = async () => {
  // picked from the website itself
  const suppliedPublicKey = process.argv[2];
  if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta")); // confirmed is used to get the latest confirmed block

  let publicKey;
  if (suppliedPublicKey.endsWith(".sol")) {
    try {
      publicKey = await resolve(connection, suppliedPublicKey);
    } catch (error) {
      throw new Error(
        `Could not resolve the name ${suppliedPublicKey} to a public key!`
      );
    }
  } else {
    try {
      publicKey = new PublicKey(suppliedPublicKey);
    } catch (error) {
      throw new Error(
        `The provided public key ${suppliedPublicKey} is invalid!`
      );
    }
  }

  const balanceInLamports = await connection.getBalance(publicKey);

  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
  );
};

main();
