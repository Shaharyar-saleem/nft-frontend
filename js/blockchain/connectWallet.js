const constants = require('./constants');
const abi = require('./abi/nft');
const providerHelper = require('./helper/provider.helper');
const etherProvider = providerHelper.getProvider();
const signer = providerHelper.getSigner();
const nftContract = constants.nftContract;
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

let status;
let web3Modal;
let connection;
let provider;
let mainContract = undefined;
let bscScan = "https://bscscan.com/address/" + nftContract;
let user = {
    address: "",
};

$(function () {
    init();
    const connectionStatus = localStorage.getItem("connectStatus");
    if (connectionStatus == "connected") {
        userLoginAttempt();
    }
});

function init() {
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
        fortmatic: {
            package: Fortmatic,
            options: {
                key: "pk_test_391E26A3B43A3350",
            },
        },
    };
    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
}

async function connectAccount() {
    try {
        provider = await web3Modal.connect();
        const web3 = new Web3(Web3.givenProvider);
        localStorage.setItem("connectStatus", "connected");
        web3.eth.getAccounts().then(function (result) {
            user.address = result[0];
            initContract();
        });
    }
    catch (error) {
        console.log("Could not connect to wallet", error);
        return;
    }

    // Functions from vestingContract

    // const extendedInfo = localStorage.getItem("extendedContest");
    // console.log("user is:", extendedInfo)
    // if (extendedInfo == "true") {
    //   const widthdrawBtn = document.getElementById("withdrawBtn");
    //   widthdrawBtn.classList.add("is-disabled");
    //   }
}

async function userLoginAttempt() {
    let isConnected = false;
    await window.addEventListener("load", async function () {
        status = localStorage.getItem("connectStatus");
        try {
            if (status != "connected") {
                provider = await web3Modal;
                localStorage.setItem("connectStatus", "connected");
            } else {
                startUp();
            }
            const web3 = new Web3(Web3.givenProvider);
            await web3.eth.getAccounts().then(function (result) {
                user.address = result[0];
                initContract();
            });
        } catch (error) {
            console.error(error);
        }
    });
}

async function initContract() {
    try {
        await (mainContract = new web3.eth.Contract(abi, nftContract));
        if (mainContract != undefined) {
            startUp();
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
        startUp();
    }, 5000);
}

async function startUp() {
    if (user.address != undefined) {
        let p2 = user.address.slice(42 - 5);
        // $("#shortAddress")[0].innerHTML = `${user.address.slice(0, 4)}...${p2}`;
        // $("#walletAddress")[0].innerHTML = `${user.address.slice(0, 4)}...${p2}`;
        // $("#shortAccount")[0].innerHTML = `${user.address.slice(0, 4)}...${p2}`;

        const web3 = new Web3(Web3.givenProvider);
        const chainId = await web3.eth.getChainId();
        const vestingInfo = localStorage.getItem("isVesting");
        // Display Network Error
        if (chainId != 56 && chainId != 97) {
            document.querySelector("#prepare").style.display = "none";
            document.querySelector("#connected").style.display = "none";
            // document.querySelector("#networkError").style.display = "block";
        } else if (
            (vestingInfo == "false" && chainId == 97) ||
            (vestingInfo == "false" && chainId == 56)
        ) {
            document.querySelector("#connected").style.display = "none";
            document.querySelector("#prepare").style.display = "none";
            // document.querySelector("#networkError").style.display = "none";
        } else {
            // document.querySelector("#networkError").style.display = "none";
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

async function disconnect() {
    selectedAccount = null;
    localStorage.clear();
    isConnected = false;
    user.address = undefined;
    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
}


window.connectAccount = connectAccount;
window.disconnect = disconnect;

module.exports = {
    connectAccount,
    userLoginAttempt,
    initContract,
    startUp,
    disconnect,
}