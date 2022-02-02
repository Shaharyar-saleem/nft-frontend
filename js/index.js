const { connectWallet } = require("./blockchain");
require("./scroll");
require("./copyAddress");
require("./referralLink");
require("./drawSvg");
require("./modal");
require("./sideBar");
require("./nft/nftData");
require("./playVideo");

// Entry point
$(function () {
  connectWallet.init();
});
