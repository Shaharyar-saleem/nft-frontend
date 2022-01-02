const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const nftContract = "0x3504de9e61fdff2fc70f5cc8a6d1ee493434c1aa"; //this is the dummy contract
const RPC_URL = {
  56: "https://bsc-dataseed.binance.org/",
  97: "https://speedy-nodes-nyc.moralis.io/191f728d3f6293802638d203/bsc/testnet",
  80001:
    "https://speedy-nodes-nyc.moralis.io/7cf91fb612ed9b7dc162177f/polygon/mumbai",
};

const PUNK_ADDRESS = {
  80001: "0xd873a1463fcc9327B72AF3CF73906f74a35074D4",
};

// bsc 56
// mumbai 80001
const CHAIN_ID = 80001;

const MAX_PUNKS = 10000;
const MAX_PRESALE_PUNKS = 1000;
const REFERRAL_COOKIE_NAME = "FuzionPunkReferral";
const REFERRAL_QUERY_PARAM = "ref";

module.exports = {
  ZERO_ADDRESS,
  RPC_URL,
  nftContract,
  REFERRAL_COOKIE_NAME,
  REFERRAL_QUERY_PARAM,
  PUNK_ADDRESS,
  MAX_PUNKS,
  MAX_PRESALE_PUNKS,
  CHAIN_ID,
};
