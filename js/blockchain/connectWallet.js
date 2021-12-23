const constants = require("./constants");
const abi = require("./abi/nft");
const { getBnbBalance } = require("./bnbBalance");
// const { providerHelper } = require("./helper");
// const signer = providerHelper.getSigner();
const nftContract = constants.nftContract;

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;

let status;
let web3Modal;
let isConnected;
let connection;
let provider;
let mainContract = undefined;
let bscScan = "https://bscscan.com/address/" + nftContract;
let user = {
  address: "",
};

async function init() {
  // connectWallet.initWeb3Modal();
  initWeb3Modal();
  const connectionStatus = localStorage.getItem("connectStatus");
  if (connectionStatus == "connected") {
    // await connectWallet.userLoginAttempt();
    userLoginAttempt();
  }
}

function initWeb3Modal() {
  if (location.protocol !== "https:") {
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled");
    return;
  }
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      },
    },
  };
  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
}

// triger when connectWallet btn is clicked
async function connectAccount() {
  try {
    provider = await web3Modal.connect();
    const web3 = new Web3(Web3.givenProvider);
    localStorage.setItem("connectStatus", "connected");
    const result = await web3.eth.getAccounts();
    user.address = result[0];
    initContract();
    // function for get bnb Balance
    await getBnbBalance();
  } catch (error) {
    console.log("Could not connect to wallet", error);
    return;
  }
}

// checks if user is already connected
async function userLoginAttempt() {
  isConnected = false;
  await window.addEventListener("load", async function () {
    status = localStorage.getItem("connectStatus");
    try {
      if (status != "connected") {
        provider = await web3Modal;
        localStorage.setItem("connectStatus", "connected");
      } else {
        await getShortAddressCheckNetworkErrorCopyLink();
      }
      const web3 = new Web3(Web3.givenProvider);
      const result = await web3.eth.getAccounts();
      user.address = result[0];
      await initContract();
      // function for get bnb Balance
      await getBnbBalance();
    } catch (error) {
      console.error(error);
    }
  });
}
// initialize contract
async function initContract() {
  try {
    await (mainContract = new web3.eth.Contract(abi, nftContract));
    if (mainContract != undefined) {
      await getShortAddressCheckNetworkErrorCopyLink();
    } else {
      setTimeout(() => {
        initContract();
      }, 2000);
    }
  } catch (e) {
    setTimeout(() => {
      initContract();
    }, 2000);
  }
  setInterval(function () {
    getShortAddressCheckNetworkErrorCopyLink(); // todo figure out async setTimeout implementation
  }, 5000);
}

async function getShortAddressCheckNetworkErrorCopyLink() {
  if (user.address != undefined) {
    let p2 = user.address.slice(42 - 5);
    // document.getElementsByClassName("shortAddress")[0].innerText = `${user.address.slice(0, 4)}...${p2}`;
    // $("#fullAddress")[0].innerText = `${user.address.slice(0,19)}...` ;
    // document.getElementsByClassName("fullAddress")[0].value = `${user.address.slice(0, 19)}...`;
    const web3 = new Web3(Web3.givenProvider);
    const chainId = await web3.eth.getChainId();

    // Display Network Error
    if (chainId != 56 && chainId != 97) {
      document.querySelector("#prepare").style.display = "none";
      document.querySelector("#connected").style.display = "none";
      // document.querySelector("#networkError").style.display = "block";
    } else {
      document.querySelector("#prepare").style.display = "none";
      document.querySelector("#connected").style.display = "block";
    }

    //Bscscan link href
    // const link = document.getElementById("bscscan-link");
    // link.href = `https://bscscan.com/address/${user.address}`;

    // clipboard input value
    // const copyLink = document.getElementById("addressInput");
    // copyLink.value = user.address;
  } else {
    userLoginAttempt();
  }
}

// trigger when disconnect btn pressed
function disconnect() {
  localStorage.clear();
  isConnected = false;
  user.address = undefined;
  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
}

//metamask check
if (
  typeof window.ethereum == "undefined" ||
  typeof window.web3 == "undefined"
) {
  window.connectAccount = redirect;
} else {
  window.connectAccount = connectAccount;
}

function redirect() {
  window.open("https://metamask.io/", "_blank");
}

window.disconnect = disconnect;

module.exports = {
  init,
  connectAccount,
  userLoginAttempt,
  initContract,
  getShortAddressCheckNetworkErrorCopyLink,
  disconnect,
  initWeb3Modal,
};
