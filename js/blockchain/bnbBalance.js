const { providerHelper } = require("./helper");
const { ethers } = require("ethers");
const { getProvider } = providerHelper;

async function getBnbBalance(userAddress) {
  const provider = getProvider();
  let bnbBalance = await provider.getBalance(userAddress);
  let userBnbBalance = ethers.utils.formatUnits(bnbBalance, 18);
  const bnbBalanceElement = document.getElementsByClassName("bnbBalance");
  if (bnbBalanceElement[0]) {
    bnbBalanceElement[0].innerText = parseFloat(userBnbBalance).toFixed(2);
  }
  if (bnbBalanceElement[1]) {
    bnbBalanceElement[1].innerText = parseFloat(userBnbBalance).toFixed(2);
  }
}

module.exports = {
  getBnbBalance,
};
