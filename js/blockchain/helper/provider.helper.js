const { RPC_URL } = require("../constants");
const { ethers } = require("ethers");
let web3Provider, rpcProvider;
let etherProvider;
let signer;

function getReadOnlyProvider(rpcUrl = RPC_URL[56]) {
  if (rpcProvider) {
    return rpcProvider;
  }
  rpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL[56]);
  return rpcProvider;
}
function getWeb3Provider() {
  if (!window.ethereum) {
    return null;
  }
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  return web3Provider;
}
function getSigner() {
  if (signer) {
    return signer;
  }
  etherProvider = getProvider();
  signer = etherProvider.getSigner();
  return signer;
}
function getProvider() {
  return getWeb3Provider() || getReadOnlyProvider();
}
module.exports = {
  getProvider,
  getSigner,
};
