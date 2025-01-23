import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair1 = Keypair.generate();

console.log(`The public key is: `, keypair1.publicKey.toBase58());
console.log(`The secret key is: `, keypair1.secretKey);
console.log(`✅ Finished!`);

const keypair2 = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
console.log(`The public key is: `, keypair2.publicKey.toBase58());
console.log(`The secret key is: `, keypair2.secretKey);
