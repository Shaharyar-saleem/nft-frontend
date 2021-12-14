/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./js/blockchain/abi/nft.js":
      /*!**********************************!*\
  !*** ./js/blockchain/abi/nft.js ***!
  \**********************************/
      /***/ (module) => {
        eval(
          'module.exports = [\r\n  [\r\n    { inputs: [], stateMutability: "nonpayable", type: "constructor" },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        {\r\n          indexed: true,\r\n          internalType: "address",\r\n          name: "owner",\r\n          type: "address",\r\n        },\r\n        {\r\n          indexed: true,\r\n          internalType: "address",\r\n          name: "spender",\r\n          type: "address",\r\n        },\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "value",\r\n          type: "uint256",\r\n        },\r\n      ],\r\n      name: "Approval",\r\n      type: "event",\r\n    },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "minTokensBeforeSwap",\r\n          type: "uint256",\r\n        },\r\n      ],\r\n      name: "MinTokensBeforeSwapUpdated",\r\n      type: "event",\r\n    },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        {\r\n          indexed: true,\r\n          internalType: "address",\r\n          name: "previousOwner",\r\n          type: "address",\r\n        },\r\n        {\r\n          indexed: true,\r\n          internalType: "address",\r\n          name: "newOwner",\r\n          type: "address",\r\n        },\r\n      ],\r\n      name: "OwnershipTransferred",\r\n      type: "event",\r\n    },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "tokensSwapped",\r\n          type: "uint256",\r\n        },\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "ethReceived",\r\n          type: "uint256",\r\n        },\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "tokensIntoLiqudity",\r\n          type: "uint256",\r\n        },\r\n      ],\r\n      name: "SwapAndLiquify",\r\n      type: "event",\r\n    },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        { indexed: false, internalType: "bool", name: "enabled", type: "bool" },\r\n      ],\r\n      name: "SwapAndLiquifyEnabledUpdated",\r\n      type: "event",\r\n    },\r\n    {\r\n      anonymous: false,\r\n      inputs: [\r\n        {\r\n          indexed: true,\r\n          internalType: "address",\r\n          name: "from",\r\n          type: "address",\r\n        },\r\n        { indexed: true, internalType: "address", name: "to", type: "address" },\r\n        {\r\n          indexed: false,\r\n          internalType: "uint256",\r\n          name: "value",\r\n          type: "uint256",\r\n        },\r\n      ],\r\n      name: "Transfer",\r\n      type: "event",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "_liquidityFee",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "_maxTxAmount",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "_taxFee",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "owner", type: "address" },\r\n        { internalType: "address", name: "spender", type: "address" },\r\n      ],\r\n      name: "allowance",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "spender", type: "address" },\r\n        { internalType: "uint256", name: "amount", type: "uint256" },\r\n      ],\r\n      name: "approve",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "balanceOf",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "decimals",\r\n      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "spender", type: "address" },\r\n        { internalType: "uint256", name: "subtractedValue", type: "uint256" },\r\n      ],\r\n      name: "decreaseAllowance",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "uint256", name: "tAmount", type: "uint256" }],\r\n      name: "deliver",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "excludeFromFee",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "excludeFromReward",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "geUnlockTime",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "includeInFee",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "includeInReward",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "spender", type: "address" },\r\n        { internalType: "uint256", name: "addedValue", type: "uint256" },\r\n      ],\r\n      name: "increaseAllowance",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "isExcludedFromFee",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "account", type: "address" }],\r\n      name: "isExcludedFromReward",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "uint256", name: "time", type: "uint256" }],\r\n      name: "lock",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "name",\r\n      outputs: [{ internalType: "string", name: "", type: "string" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "owner",\r\n      outputs: [{ internalType: "address", name: "", type: "address" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "uint256", name: "tAmount", type: "uint256" },\r\n        { internalType: "bool", name: "deductTransferFee", type: "bool" },\r\n      ],\r\n      name: "reflectionFromToken",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "renounceOwnership",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "uint256", name: "liquidityFee", type: "uint256" },\r\n      ],\r\n      name: "setLiquidityFeePercent",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "uint256", name: "maxTxPercent", type: "uint256" },\r\n      ],\r\n      name: "setMaxTxPercent",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "bool", name: "_enabled", type: "bool" }],\r\n      name: "setSwapAndLiquifyEnabled",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "uint256", name: "taxFee", type: "uint256" }],\r\n      name: "setTaxFeePercent",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "swapAndLiquifyEnabled",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "symbol",\r\n      outputs: [{ internalType: "string", name: "", type: "string" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "uint256", name: "rAmount", type: "uint256" }],\r\n      name: "tokenFromReflection",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "totalFees",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "totalSupply",\r\n      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "recipient", type: "address" },\r\n        { internalType: "uint256", name: "amount", type: "uint256" },\r\n      ],\r\n      name: "transfer",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [\r\n        { internalType: "address", name: "sender", type: "address" },\r\n        { internalType: "address", name: "recipient", type: "address" },\r\n        { internalType: "uint256", name: "amount", type: "uint256" },\r\n      ],\r\n      name: "transferFrom",\r\n      outputs: [{ internalType: "bool", name: "", type: "bool" }],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],\r\n      name: "transferOwnership",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "uniswapV2Pair",\r\n      outputs: [{ internalType: "address", name: "", type: "address" }],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "uniswapV2Router",\r\n      outputs: [\r\n        {\r\n          internalType: "contract IUniswapV2Router02",\r\n          name: "",\r\n          type: "address",\r\n        },\r\n      ],\r\n      stateMutability: "view",\r\n      type: "function",\r\n    },\r\n    {\r\n      inputs: [],\r\n      name: "unlock",\r\n      outputs: [],\r\n      stateMutability: "nonpayable",\r\n      type: "function",\r\n    },\r\n    { stateMutability: "payable", type: "receive" },\r\n  ],\r\n];\r\n\n\n//# sourceURL=webpack:///./js/blockchain/abi/nft.js?'
        );

        /***/
      },

    /***/ "./js/blockchain/connectWallet.js":
      /*!****************************************!*\
  !*** ./js/blockchain/connectWallet.js ***!
  \****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const constants = __webpack_require__(/*! ./constants */ "./js/blockchain/constants.js");\r\nconst abi = __webpack_require__(/*! ./abi/nft */ "./js/blockchain/abi/nft.js");\r\n// const { providerHelper } = require("./helper");\r\n// const signer = providerHelper.getSigner();\r\nconst nftContract = constants.nftContract;\r\n\r\nconst Web3Modal = window.Web3Modal.default;\r\nconst WalletConnectProvider = window.WalletConnectProvider.default;\r\nconst evmChains = window.evmChains;\r\n\r\nlet status;\r\nlet web3Modal;\r\nlet isConnected;\r\nlet connection;\r\nlet provider;\r\nlet mainContract = undefined;\r\nlet bscScan = "https://bscscan.com/address/" + nftContract;\r\nlet user = {\r\n  address: "",\r\n};\r\n\r\nasync function init(){\r\n  // connectWallet.initWeb3Modal();\r\n  initWeb3Modal();\r\n  const connectionStatus = localStorage.getItem("connectStatus");\r\n  if (connectionStatus == "connected") {\r\n     // await connectWallet.userLoginAttempt();\r\n    userLoginAttempt();\r\n  }\r\n}\r\n\r\n\r\nfunction initWeb3Modal() {\r\n  if (location.protocol !== "https:") {\r\n    document.querySelector("#btn-connect").setAttribute("disabled", "disabled");\r\n    return;\r\n  }\r\n  const providerOptions = {\r\n    walletconnect: {\r\n      package: WalletConnectProvider,\r\n      options: {\r\n        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",\r\n      },\r\n    },\r\n  };\r\n  web3Modal = new Web3Modal({\r\n    cacheProvider: false, // optional\r\n    providerOptions, // required\r\n    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.\r\n  });\r\n}\r\n\r\n// triger when connectWallet btn is clicked\r\nasync function connectAccount() {\r\n  try {\r\n    provider = await web3Modal.connect();\r\n    const web3 = new Web3(Web3.givenProvider);\r\n    localStorage.setItem("connectStatus", "connected");\r\n    const result = await web3.eth.getAccounts();\r\n    user.address = result[0];\r\n      initContract();\r\n  } catch (error) {\r\n    console.log("Could not connect to wallet", error);\r\n    return;\r\n  }\r\n}\r\n\r\n// checks if user is already connected\r\nasync function userLoginAttempt() {\r\n  isConnected = false;\r\n  await window.addEventListener("load", async function () {\r\n    status = localStorage.getItem("connectStatus");\r\n    try {\r\n      if (status != "connected") {\r\n        provider = await web3Modal;\r\n        localStorage.setItem("connectStatus", "connected");\r\n      } else {\r\n       await getShortAddressCheckNetworkErrorCopyLink();\r\n      }\r\n      const web3 = new Web3(Web3.givenProvider);\r\n      const result = await web3.eth.getAccounts();\r\n      user.address = result[0];\r\n      await initContract();\r\n    } catch (error) {\r\n      console.error(error);\r\n    }\r\n  });\r\n}\r\n// initialize contract\r\nasync function initContract() {\r\n  try {\r\n    await (mainContract = new web3.eth.Contract(abi, nftContract));\r\n    if (mainContract != undefined) {\r\n      await getShortAddressCheckNetworkErrorCopyLink();\r\n    } else {\r\n      setTimeout(() => {\r\n        initContract();\r\n      }, 2000);\r\n    }\r\n  } catch (e) {\r\n    setTimeout(() => {\r\n      initContract();\r\n    }, 2000);\r\n  }\r\n  setInterval(function () {\r\n    getShortAddressCheckNetworkErrorCopyLink();\r\n  }, 5000);\r\n}\r\n\r\n\r\nasync function getShortAddressCheckNetworkErrorCopyLink() {\r\n  if (user.address != undefined) {\r\n    let p2 = user.address.slice(42 - 5);\r\n    // $("#shortAddress")[0].innerHTML = `${user.address.slice(0, 4)}...${p2}`;\r\n\r\n    const web3 = new Web3(Web3.givenProvider);\r\n    const chainId = await web3.eth.getChainId();\r\n\r\n    // Display Network Error\r\n    if (chainId != 56 && chainId != 97) {\r\n      document.querySelector("#prepare").style.display = "none";\r\n      document.querySelector("#connected").style.display = "none";\r\n      // document.querySelector("#networkError").style.display = "block";\r\n    }\r\n    else{\r\n      document.querySelector("#prepare").style.display = "none";\r\n      document.querySelector("#connected").style.display = "block";\r\n    }\r\n\r\n    //Bscscan link href\r\n    // const link = document.getElementById("bscscan-link");\r\n    // link.href = `https://bscscan.com/address/${user.address}`;\r\n\r\n    // clipboard input value\r\n    // const copyLink = document.getElementById("addressInput");\r\n    // copyLink.value = user.address;\r\n  } else {\r\n    userLoginAttempt();\r\n  }\r\n}\r\n\r\n// trigger when disconnect btn pressed\r\nasync function disconnect() {\r\n  localStorage.clear();\r\n  isConnected = false;\r\n  user.address = undefined;\r\n  // Set the UI back to the initial state\r\n  document.querySelector("#prepare").style.display = "block";\r\n  document.querySelector("#connected").style.display = "none";\r\n}\r\n\r\nwindow.connectAccount = connectAccount;\r\nwindow.disconnect = disconnect;\r\n\r\nmodule.exports = {\r\n  init,\r\n  connectAccount,\r\n  userLoginAttempt,\r\n  initContract,\r\n  getShortAddressCheckNetworkErrorCopyLink,\r\n  disconnect,\r\n  initWeb3Modal,\r\n};\r\n\n\n//# sourceURL=webpack:///./js/blockchain/connectWallet.js?'
        );

        /***/
      },

    /***/ "./js/blockchain/constants.js":
      /*!************************************!*\
  !*** ./js/blockchain/constants.js ***!
  \************************************/
      /***/ (module) => {
        eval(
          'const nftContract = "0x3504de9e61fdff2fc70f5cc8a6d1ee493434c1aa"; //this is the dummy contract\r\nconst RPC_URL = {\r\n  56: "https://bsc-dataseed.binance.org/",\r\n  97: "https://speedy-nodes-nyc.moralis.io/191f728d3f6293802638d203/bsc/testnet",\r\n};\r\n\r\nmodule.exports = {\r\n  RPC_URL,\r\n  nftContract,\r\n};\r\n\n\n//# sourceURL=webpack:///./js/blockchain/constants.js?'
        );

        /***/
      },

    /***/ "./js/blockchain/index.js":
      /*!********************************!*\
  !*** ./js/blockchain/index.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const constants = __webpack_require__(/*! ./constants */ "./js/blockchain/constants.js");\r\nconst connectWallet = __webpack_require__(/*! ./connectWallet */ "./js/blockchain/connectWallet.js");\r\n\r\n\r\nmodule.exports = {\r\n  connectWallet,\r\n  constants,\r\n}\n\n//# sourceURL=webpack:///./js/blockchain/index.js?'
        );

        /***/
      },

    /***/ "./js/index.js":
      /*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const {connectWallet} = __webpack_require__(/*! ./blockchain */ "./js/blockchain/index.js");\r\n__webpack_require__(/*! ./scroll */ "./js/scroll.js");\r\n\r\n\r\n// Entry point of connectWallet\r\n$(function () {\r\n    connectWallet.init();\r\n});\n\n//# sourceURL=webpack:///./js/index.js?'
        );

        /***/
      },

    /***/ "./js/scroll.js":
      /*!**********************!*\
  !*** ./js/scroll.js ***!
  \**********************/
      /***/ () => {
        eval(
          '// Scroll effect on navbar\r\n$(window).scroll(function () {\r\n  if ($(window).scrollTop() >= 180) {\r\n    $("nav").addClass("fixed-header");\r\n    $("nav").css("background", "#0f0f1482");\r\n    $("nav").css("transition", "max-height 0.5s ease 0s");\r\n  } else {\r\n    $("nav").removeClass("fixed-header");\r\n    $("nav").css("background", "none");\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./js/scroll.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./js/index.js");
  /******/
  /******/
})();
