const {ZNZModule} = require("../lib/index.js")

const config = {
      "host": "127.0.0.1",
      "port": 26211,
      "user": "USERHERE",
      "pass": "PASSHERE"
}

const znzModule = new ZNZModule(config);

// Example function call to check if a transaction exists
async function CreateAddress() {
    
    const address = await znzModule.createWalletAddress();
    console.log(address);
}


CreateAddress();
