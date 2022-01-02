const { nftContract } = require("./constants");
const abi = require("./abi/nft");
const { getBnbBalance } = require("./bnbBalance");
const {
  userReferralLink,
  userReferralCommissions,
  userTotalReferral,
} = require("../referralLink");
const {
  getPunkConstants,
  getUserPunkData,
  punkSaleStatus,
} = require("../blockchain/contracts/punk");
const { providerHelper } = require("./helper");
const { getProvider, getSigner, getWeb3Provider } = providerHelper;
const ethers = require("ethers");

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;

let status;
let web3Modal;
let isConnected;
let mainContract = undefined;
let bscScan = "https://bscscan.com/address/" + nftContract;
let user = {
  address: undefined,
};

metamaskCheck();

async function init() {
  // connectWallet.initWeb3Modal();
  initWeb3Modal();
  const connectionStatus = localStorage.getItem("connectStatus");
  if (connectionStatus == "connected") {
    await userLoginAttempt();
  }
  // functions from punk.js file
  await getPunkConstants();
  await punkSaleStatus();

  // function from helper for get current year
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

async function connect() {
  let connection;
  try {
    connection = await web3Modal.connect();
  } catch (error) {
    console.error("Could not connect to wallet:", error);
  }
  return connection;
}

// triger when connectWallet btn is clicked
async function connectAccount() {
  const connection = await connect();
  const provider = await providerHelper.getWeb3Provider(connection);
  const signer = await provider.getSigner();
  localStorage.setItem("connectStatus", "connected");
  user.address = await signer.getAddress();
  if (user.address) {
    // function for get bnb Balance
    await getBnbBalance(user.address);
    // function from punk contract
    await getUserPunkData(user.address);
  }

  // functions from punk.js file
  // todo: i commented this out because it makes no sense to call these again
  // todo: you need to figure out what is a real constant and only call it during init
  // todo: and what you actually want to call after you have the user
  // await getPunkConstants();
  // await punkSaleStatus();

  // functions from referralLink.js file
  await userReferralLink();
  await userReferralCommissions();
  await userTotalReferral();

  await getShortAddressCheckNetworkErrorCopyLink();
}

// checks if user is already connected
async function userLoginAttempt() {
  isConnected = false;
  await window.addEventListener("load", async function () {
    status = localStorage.getItem("connectStatus");
    try {
      if (status !== "connected") {
        await connectAccount();
      }
    } catch (error) {
      console.error("userLoginAttempt error:", error);
    }
  });
}

async function getShortAddressCheckNetworkErrorCopyLink() {
  if (user.address) {
    let p2 = user.address.slice(42 - 5);
    const shortAddressElement =
      document.getElementsByClassName("shortAddress")[0];
    const mediumAddress = document.getElementById("mediumAddress");
    const fullAddress = document.getElementById("fullAddress");
    if (shortAddressElement) {
      shortAddressElement.innerText = `${user.address.slice(0, 4)}...${p2}`;
    }
    if (mediumAddress) {
      mediumAddress.value = `${user.address.slice(0, 19)}...`;
    }
    if (fullAddress) {
      fullAddress.value = user.address;
    }
    document.querySelector("#prepare").style.display = "none";
    document.querySelector("#connected").style.display = "block";
  } else {
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
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

function metamaskCheck() {
  //metamask check
  if (
    typeof window.ethereum == "undefined" ||
    typeof window.web3 == "undefined"
  ) {
    window.connectAccount = redirect;
  } else {
    window.connectAccount = connectAccount;
  }
}

function redirect() {
  window.open("https://metamask.io/", "_blank");
}

window.disconnect = disconnect;

module.exports = {
  init,
  connectAccount,
  // userLoginAttempt,
  getShortAddressCheckNetworkErrorCopyLink,
  disconnect,
  initWeb3Modal,
};
