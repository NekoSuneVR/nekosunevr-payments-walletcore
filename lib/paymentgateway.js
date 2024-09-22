const RPCClient = require("@jskitty/bitcoin-rpc");

class ZNZModule {
  constructor(rpcConfig) {
    // Initialize the RPC client with the provided configuration
    this.rpc = new RPCClient(
      rpcConfig.user,
      rpcConfig.pass,
      rpcConfig.host,
      rpcConfig.port
    );
  }

  // Function to check if a transaction exists for the specified wallet address, amount, and timestamp
  async existsTransaction(walletAddress, amount, timestamp) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions = await this.rpc.call(
          "listtransactions",
          "*",
          100,
          0,
          true
        );
        let matchFound = false;
        let conf = "";

        for (let i = 0; i < transactions.length; i++) {
          const transaction = transactions[i];

          try {
            const transactionInfo = await this.getTransaction(transaction.txid);

            // Check if the transaction block time is greater than the provided timestamp
            if (
              transactionInfo.blocktime !== 0 &&
              transactionInfo.blocktime > timestamp
            ) {
              continue;
            }

            for (const vout of transactionInfo.details) {
              const formattedAmount = vout.amount;

              if (
                formattedAmount === amount &&
                vout.address === walletAddress
              ) {
                await this.checkConfirmations(transaction.txid)
                  .then((result) => {
                    conf = result;
                  })
                  .catch((error) => {
                    conf = "";
                  });

                resolve({
                  exists: true,
                  txid: transaction.txid,
                  conf
                });
                matchFound = true; // Set the flag to true
                break; // Exit the loop
              }
            }

            if (matchFound) {
              break; // Exit the outer loop
            }
          } catch (error) {
            console.error(
              `Error processing transaction ${transaction.txid}:`,
              error
            );
          }
        }
        // If no matching transaction is found
        if (!matchFound) {
          return resolve({
            exists: false,
            txid: "",
            conf
          });
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Check if a transaction has the required confirmations
  async checkConfirmations(txid) {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = await this.rpc.call("gettransaction", txid);
        resolve(transaction.confirmations);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Function to get a specific transaction's details
  async getTransaction(txid) {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = await this.rpc.call("gettransaction", txid);
        resolve(transaction);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Function to get a specific transaction's details
  async createWalletAddress() {
    return new Promise(async (resolve, reject) => {
      try {
        const address = await this.rpc.call("getnewaddress");
        resolve(address);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

exports.ZNZModule = ZNZModule;
