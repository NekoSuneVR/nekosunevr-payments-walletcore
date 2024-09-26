const RPCClient = require("@jskitty/bitcoin-rpc");
const { ethers } = require("ethers");
const axios = require("axios");

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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class DOGECModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class PIVXModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class FLSModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class FREEDModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class BLOCKModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class XPModule {
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
                  conf,
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
            conf,
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

  // Function to Send Crypto to Wallet Address
  async SendToAddress(externalAddress, sendAmount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendreq = await this.rpc.call(
          "sendtoaddress",
          externalAddress,
          sendAmount
        );
        resolve(sendreq);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

class POLModule {
  constructor(etherscanApiKey) {
    // Initialize the RPC client with the provided configuration
    this.provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/"); // Polygon mainnet RPC
    this.etherscanApiKey = etherscanApiKey; // Store Etherscan API key
  }

  // Function to create a new wallet address
  async createWalletAddress() {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  // Function to check the balance of a wallet address
  async checkBalance(walletAddress) {
    const balance = await this.provider.getBalance(walletAddress);
    return ethers.formatEther(balance); // Convert from wei to ether
  }

  // Function to send MATIC to an external wallet address
  async sendToAddress(externalAddress, sendAmount, privateKey) {
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const tx = {
          to: externalAddress,
          value: ethers.utils.parseEther(sendAmount.toString()), // Convert to wei
        };

        const txResponse = await wallet.sendTransaction(tx);
        await txResponse.wait(); // Wait for the transaction to be mined

        resolve({ success: true, transactionHash: txResponse.hash });
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Function to check if a transaction exists for the specified wallet address, amount, and timestamp
  async existsTransaction(walletAddress, amount, timestamp) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions = await this.getTransactionHistory(walletAddress);
        let matchFound = false;
        let conf = "";

        for (let i = 0; i < transactions.length; i++) {
          const transaction = transactions[i];

          try {
            const transactionInfo = await this.getTransaction(transaction.hash);

            // Check if the transaction block time is greater than the provided timestamp
            if (
              transactionInfo.blocktime !== 0 &&
              transactionInfo.blocktime > timestamp
            ) {
              continue;
            }

            // Format the amount to 4 decimal places
            const formattedValue = ethers.formatEther(transaction.value); // Convert value from Wei to Ether
            const formattedAmount = parseFloat(formattedValue).toFixed(4);

            if (
              formattedAmount === parseFloat(amount).toFixed(4) &&
              transactionInfo.to === walletAddress
            ) {
              conf = await this.checkConfirmations(transaction.hash).catch(
                () => ""
              );
              resolve({
                exists: true,
                txid: transaction.hash,
                conf,
              });
              matchFound = true; // Set the flag to true
              break; // Exit the loop
            }

            if (matchFound) {
              break; // Exit the outer loop
            }
          } catch (error) {
            console.error(
              `Error processing transaction ${transaction.hash}:`,
              error
            );
          }
        }

        // If no matching transaction is found
        if (!matchFound) {
          return resolve({
            exists: false,
            txid: "",
            conf,
          });
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Fetch transaction history from Etherscan API
  async getTransactionHistory(walletAddress) {
    const url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${this.etherscanApiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === "1") {
        return response.data.result; // Return the transaction list
      } else {
        throw new Error(
          "Failed to fetch transaction history from Etherscan: " +
            response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      throw error;
    }
  }

  // Check if a transaction has the required confirmations
  async checkConfirmations(txid) {
    try {
      const receipt = await this.provider.getTransactionReceipt(txid);

      if (receipt && receipt.blockNumber) {
        const latestBlockNumber = await this.provider.getBlockNumber();
        const confirmations = latestBlockNumber - receipt.blockNumber;
        return confirmations; // Return the calculated confirmations
      } else {
        return 0; // No confirmations if the receipt doesn't exist
      }
    } catch (error) {
      console.error(`Error checking confirmations for txid ${txid}:`, error);
      throw error; // Rethrow error to handle it upstream if needed
    }
  }

  // Function to get a specific transaction's details
  // Function to get a specific transaction's details including blocktime
  async getTransaction(txid) {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = await this.provider.getTransaction(txid);
        const receipt = await this.provider.getTransactionReceipt(txid);

        if (receipt && receipt.blockNumber) {
          // Get block details using the block number
          const block = await this.provider.getBlock(receipt.blockNumber);
          const blocktime = block.timestamp; // Get the block timestamp

          // Construct the transaction object with blocktime
          resolve({
            ...transaction,
            blocktime: blocktime, // Include blocktime
          });
        } else {
          resolve(transaction); // If receipt is not found, return the transaction as is
        }
      } catch (error) {
        console.error(`Error retrieving transaction ${txid}:`, error);
        return reject(error);
      }
    });
  }
}

exports.ZNZModule = ZNZModule;
exports.DOGECModule = DOGECModule;
exports.PIVXModule = PIVXModule;
exports.FLSModule = FLSModule;
exports.FREEDModule = FREEDModule;
exports.BLOCKModule = BLOCKModule;
exports.XPModule = XPModule;
exports.POLModule = POLModule;
