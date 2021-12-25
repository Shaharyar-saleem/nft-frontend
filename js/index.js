const { connectWallet } = require("./blockchain");
require("./scroll");
require("./copyAddress");
require("./referralLink");
require("./drawSvg");
require("./modal");
// Entry point of connectWallet
$(function () {
  connectWallet.init();
});
