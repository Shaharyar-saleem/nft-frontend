const path = require('path');

module.exports = {
  mode: 'development',
  resolve:{
    modules: ['node_modules'],
    fallback: [],
  },
  entry: [
    './js/scroll.js',
    './js/blockchain/connectWallet.js',
  ],
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'nft.bundle.js',
  },
};