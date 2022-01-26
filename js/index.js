const { connectWallet } = require("./blockchain");
require("./scroll");
require("./copyAddress");
require("./referralLink");
require("./drawSvg");
require("./modal");
require("./sideBar");

// Entry point
$(function () {
  connectWallet.init();
});
