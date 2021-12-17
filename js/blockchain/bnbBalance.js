const { providerHelper } = require("./helper");
const { ethers } = require("ethers");
const signer = providerHelper.getSigner();
const provider = providerHelper.getProvider();

async function getBnbBalance() {
  let userAddress = await signer.getAddress();
  let bnbBalance = await provider.getBalance(userAddress);
  let userBnbBalance = ethers.utils.formatUnits(bnbBalance, 18);
  document.getElementsByClassName("bnbBalance")[0].innerText =
    parseFloat(userBnbBalance).toFixed(2);
  document.getElementsByClassName("bnbBalance")[1].innerText =
    parseFloat(userBnbBalance).toFixed(2);
}

module.exports = {
  getBnbBalance,
};
