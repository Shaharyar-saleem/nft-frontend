const { checkWhiteListing, getMaxPurchaseAmount } = require("./contracts/punk");
// function for get maximum number of Fuzion Punks
async function maxMintPunks() {
  document.getElementsByClassName("minting-input")[0].value =
    await getMaxPurchaseAmount();
}

window.maxMintPunks = maxMintPunks;

module.exports = {
  maxMintPunks,
};
