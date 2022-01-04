const ethers = require("ethers");
const { CHAIN_ID, PUNK_ADDRESS, MAX_PUNKS, MAX_PRESALE_PUNKS } = require("../constants");
const { providerHelper } = require("../helper");

let punk,
  totalSupply,
  punkPrice,
  punkPriceDiscounted,
  maxPunkPurchase,
  maxPresalePurchase,
  reflectionBalance,
  saleIsActive,
  presaleComplete,
  presaleIsActive,
  isWhiteListed,
  presaleSupply,
  confirmMetamaskModal,
  claimProcessingModal,
  claimedSuccessfulModal;

const abi = [
  "function totalSupply() public view returns(uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function whitelist(address user) public view returns (bool)",
  "function punkPrice() public view returns(uint256)",
  "function punkPriceDiscounted() public view returns(uint256)",
  "function numberReserved() public view returns(uint256)",
  "function maxPunkPurchase() public view returns(uint256)",
  "function maxPresalePurchase() public view returns(uint256)",
  "function saleIsActive() public view returns(uint256)",
  "function presaleIsActive() public view returns(uint256)",
  "function presaleComplete() public view returns(uint256)",
  "function getReflectionBalances() public view returns(uint256)",
  "function mint(uint numberOfTokens, address ref) external payable",
  "function mintPresale(uint numberOfTokens) external payable",
  "function claimRewards() public",
  "function presaleSupply() public view returns (uint256)",
];

async function getPunkContract(chainId = CHAIN_ID) {
  const provider = await providerHelper.getProvider();
  const signer = await providerHelper.getSigner();
  const punkAddress = PUNK_ADDRESS[chainId];
  punk = new ethers.Contract(punkAddress, abi, signer || provider);
  return punk;
}

async function getPunkConstants() {
  await getPunkContract();
  const promises = [];
  promises.push(punk.punkPrice());
  promises.push(punk.punkPriceDiscounted());
  promises.push(punk.maxPunkPurchase());
  promises.push(punk.maxPresalePurchase());
  promises.push(punk.presaleIsActive());
  promises.push(punk.presaleComplete());
  promises.push(punk.saleIsActive());
  promises.push(punk.totalSupply());
  promises.push(punk.presaleSupply());

  [
    punkPrice,
    punkPriceDiscounted,
    maxPunkPurchase,
    maxPresalePurchase,
    presaleIsActive,
    presaleComplete,
    saleIsActive,
    totalSupply,
    presaleSupply,
  ] = await Promise.all(promises);
  console.log(
    "data from promises:",
    `${punkPrice} ${punkPriceDiscounted} ${maxPunkPurchase} ${maxPresalePurchase} ${presaleIsActive} ${presaleComplete} ${saleIsActive}`
  );
}

async function punkSaleStatus() {
  // Punk sale Status
  const mintStatusElement = document.getElementsByClassName("minting-status");
  const mintBtnElement = document.getElementsByClassName("start-minting-btn");
  const punksSupplyElement = document.getElementsByClassName("punksSupply");
  if (presaleIsActive) {
    if (mintStatusElement[0] || mintStatusElement[1]) {
      mintStatusElement[0].innerText = "Presale Minting Live";
      mintStatusElement[1].innerText = "Presale Minting Live";
    }
    if (
      mintBtnElement[0] ||
      punksSupplyElement[0] ||
      punksSupplyElement[1] ||
      punksSupplyElement[2]
    ) {
      mintBtnElement[0].innerText = "Mint Presale";
      punksSupplyElement[0].innerText = `${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
      punksSupplyElement[1].innerText = `${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
      punksSupplyElement[2].innerText = `${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
    }
  } else if (presaleComplete) {
    if (mintStatusElement[0] || mintStatusElement[1]) {
      mintStatusElement[0].innerText = "Minting Will Be Live Soon";
      mintStatusElement[1].innerText = "Minting Will Be Live Soon";
    }
  } else if (saleIsActive) {
    if (mintStatusElement[0] || mintStatusElement[1]) {
      mintStatusElement[0].innerText = "Minting Live";
      mintStatusElement[1].innerText = "Minting Live";
    }
    if (
      mintBtnElement[0] ||
      punksSupplyElement[0] ||
      punksSupplyElement[1] ||
      punksSupplyElement[2]
    ) {
      mintBtnElement[0].innerText = "Start Minting";
      punksSupplyElement[0].innerText = `${totalSupply.toString()}/${MAX_PUNKS}`;
      punksSupplyElement[1].innerText = `${totalSupply.toString()}/${MAX_PUNKS}`;
      punksSupplyElement[2].innerText = `${totalSupply.toString()}/${MAX_PUNKS}`;
    }
  }
}

// call on wallet connect
async function getUserPunkData(userAddress) {
  // isWhitelisted
  // const signer = await providerHelper.getSigner();
  isWhiteListed = await punk.whitelist(userAddress);
  const presaleStatusElement =
    document.getElementsByClassName("presale-status");
  if (isWhiteListed && presaleStatusElement[0]) {
    presaleStatusElement[0].style.display = "block";
  }
}

async function getMaxPurchaseAmount() {
  return presaleIsActive ? maxPresalePurchase : maxPunkPurchase;
}

async function mintFuzionPunk(){
  await getPunkContract();
  const provider = await providerHelper.getProvider();
  const signer = await providerHelper.getSigner();
  const mintNumberElement = document.getElementById("mintNumber");
  const numberToMint = mintNumberElement.value;
  confirmMetamaskModal = document.getElementById("confirmationModal");
  claimProcessingModal = document.getElementById("processingModal");
  claimedSuccessfulModal = document.getElementById("successfullModal");
  const mintModalElement = document.getElementsByClassName("mint-modal");
  try {
    mintModalElement[0].style.display = "none";
    confirmMetamaskModal.style.display = "block";
    let presaleMintReceipt;
    if (presaleIsActive){
      presaleMintReceipt = await (await punk.connect(signer).mintPresale(numberToMint, {value: punkPriceDiscounted.mul(numberToMint), gasLimit: 1000000}));
    }
    else if (saleIsActive){
      presaleMintReceipt = await (await punk.connect(signer).mint(numberToMint, {value: punkPrice.mul(numberToMint), gasLimit: 1000000}));
    }
    const mintPunkSubmitted = await presaleMintReceipt;
    if (mintPunkSubmitted.confirmations === 0){
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "block";
      document.getElementById("processingTxt").innerText =
          "Minting In Process";
      const processingLink = document.getElementById("processing-transaction");
      // processingLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      processingLink.href = `https://mumbai.polygonscan.com/tx/${mintPunkSubmitted.hash}`; //mumbai polygon testnet
    }
    const mintPunkSuccessfull = await presaleMintReceipt.wait();
    if (mintPunkSuccessfull){
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "none";
      claimedSuccessfulModal.style.display = "block";
      document.getElementById("successTxt").innerText = "Minted Successfully";
      const transactionLink = document.getElementById("transaction-link");
      // transactionLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      transactionLink.href = `https://mumbai.polygonscan.com/tx/${mintPunkSubmitted.hash}`; //mumbai polygon testnet
    }
  }
  catch (error){
    console.log(error);
    if (error.code === 4001) {
      confirmMetamaskModal.style.display = "none";
    }
  }

}


// async function test(userAddress) {
//   totalSupply = await punk.totalSupply();
//   console.log("totalSupply:", totalSupply.toString());
//
//   punkPrice = await punk.punkPrice();
//   console.log("punkPrice:", punkPrice.toString());
//
//   punkPriceDiscounted = await punk.punkPriceDiscounted();
//   console.log("punkPriceDiscounted:", punkPriceDiscounted.toString());
//
//   maxPunkPurchase = await punk.maxPunkPurchase();
//   console.log("maxPunkPurchase:", maxPunkPurchase.toString());
//
//   maxPresalePurchase = await punk.maxPresalePurchase();
//   console.log("maxPresalePurchase:", maxPresalePurchase.toString());
//
//   let isWhitelisted = await punk.whitelist(userAddress);
//   console.log("is whitelisted:", isWhitelisted);
//
//   reflectionBalance = await punk.getReflectionBalances();
//   console.log("reflectionBalance:", reflectionBalance.toString());
//
//   saleIsActive = await punk.saleIsActive();
//   console.log("saleIsActive:", saleIsActive.toString());
//
//   presaleComplete = await punk.presaleComplete();
//   console.log("presaleComplete:", presaleComplete.toString());
//
//   presaleIsActive = await punk.presaleIsActive();
//   console.log("presaleIsActive:", presaleIsActive.toString());
// }

window.mintFuzionPunk = mintFuzionPunk;

module.exports = {
  punk,
  punkPrice,
  punkPriceDiscounted,
  maxPunkPurchase,
  maxPresalePurchase,
  presaleIsActive,
  presaleComplete,
  saleIsActive,
  getPunkConstants,
  getUserPunkData,
  getPunkContract,
  isWhiteListed,
  getMaxPurchaseAmount,
  punkSaleStatus,
  totalSupply,
  presaleSupply,
  mintFuzionPunk,
};
