const {ZNZModule} = require("../lib/index.js")

const config = {
      "host": "127.0.0.1",
      "port": 26211,
      "user": "USERHERE",
      "pass": "PASSHERE"
}

const znzModule = new ZNZModule(config);

// Example function call to check if a transaction exists
async function checkTransaction(address, amount, timestamp) {
    const result = await znzModule.existsTransaction(
        address,
        amount, // Amount to check
        timestamp // Timestamp to match
    );

    console.log(result);
}

const amount = 10.15; // Example amount to check 10.15 ZNZ
const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

checkTransaction(amount, timestamp);
