const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const nftContract = "0x3504de9e61fdff2fc70f5cc8a6d1ee493434c1aa"; //this is the dummy contract
const RPC_URL = {
  56: "https://bsc-dataseed.binance.org/",
  97: "https://speedy-nodes-nyc.moralis.io/191f728d3f6293802638d203/bsc/testnet",
};

const PUNK_ADDRESS = {
  80001: "0x5914B95075535d03F66572103203718279b9B5bB",
};

const REFERRAL_COOKIE_NAME = "FuzionPunkReferral";
const REFERRAL_QUERY_PARAM = "ref";
module.exports = {
  ZERO_ADDRESS,
  RPC_URL,
  nftContract,
  REFERRAL_COOKIE_NAME,
  REFERRAL_QUERY_PARAM,
};
