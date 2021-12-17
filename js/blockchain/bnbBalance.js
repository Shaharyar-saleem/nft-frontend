const { providerHelper } = require("./helper");
const signer = providerHelper.getSigner();
const provider = providerHelper.getProvider();

async function getBnbBalance(){
    console.log("get bnb balance function is working here:");
    let userAddress = await signer.getAddress();
    let bnbBalance = await provider.getBalance(userAddress);
    console.log("bnb balance:", bnbBalance)
}

module.exports = {
    getBnbBalance,
}