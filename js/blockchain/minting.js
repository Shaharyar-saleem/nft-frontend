// function for get maximum number of Fuzion Punks
function maxMintPunks() {
  document.getElementsByClassName("minting-input")[0].value = 20;
}

window.maxMintPunks = maxMintPunks;

module.exports = {
  maxMintPunks,
};
