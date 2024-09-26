const {POLModule} = require("../lib/index.js")

const polModule = new POLModule("polygonscan API HERE"); // https://polygonscan.com/ Polygon APikey Required

// Example function call to check if a transaction exists
async function checkTransaction(address, amount, timestamp) {
    const address = await polModule.existsTransaction(address, amount, timestamp);
    console.log(address);
}

const address = "" // Example Address HERE
const amount = 10.1500; // Example amount to check 10.1500 POL
const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

checkTransaction(address, amount, timestamp);
