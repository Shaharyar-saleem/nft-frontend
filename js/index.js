const { connectWallet } = require("./blockchain");
require("./scroll");
require("./copyAddress");
require("./referralLink");

// Entry point of connectWallet
$(function () {
  connectWallet.init();
});
