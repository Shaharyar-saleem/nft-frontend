const { connectWallet } = require("./blockchain");
require("./scroll");

// Entry point of connectWallet
$(function () {
  connectWallet.init();
});
