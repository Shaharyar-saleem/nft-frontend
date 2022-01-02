const { connectWallet } = require("./blockchain");
const {
  userReferralLink,
  userReferralCommissions,
  userTotalReferral,
} = require("./referralLink");
const { punkSaleStatus } = require("./blockchain/contracts/punk");
require("./scroll");
require("./copyAddress");
require("./referralLink");
require("./drawSvg");
require("./modal");

// Entry point of connectWallet
$(function () {
  connectWallet.init();
  // userReferralLink();
  // userReferralCommissions();
  // userTotalReferral();
});
