import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { resolve } from '@bonfida/spl-name-service'; // Assuming you have installed the Bonfida SPL name service package

const main = async () => {
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  // List of ENS-like addresses
  const addresses = ["toly.sol", "shaq.sol", "mccann.sol"];

  for (const address of addresses) {
    try {
      // Resolve the ENS-like address to a public key
      const resolvedPublicKey = await resolveAddress(connection, address);
      if (resolvedPublicKey) {
        const balanceInLamports = await connection.getBalance(resolvedPublicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        console.log(
          `💰 Finished! The balance for the wallet at address ${address} (${resolvedPublicKey.toBase58()}) is ${balanceInSOL} SOL!`
        );
      } else {
        console.log(`⚠️ The address ${address} could not be resolved to a public key.`);
      }
    } catch (error) {
      console.error(`❌ Error fetching balance for ${address}:`, error.message);
    }
  }
};

const resolveAddress = async (connection, address) => {
  try {
    const publicKey = await resolve(connection, address);
    return publicKey;
  } catch (error) {
    console.error(`Error resolving address ${address}:`, error.message);
    return null;
  }
};

main();
