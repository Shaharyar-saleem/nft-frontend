const ethers = require("ethers");
const { CHAIN_ID, PUNK_ADDRESS } = require("../constants");
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
  presaleSupply;

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
  console.log("element status:", mintStatusElement[0]);
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
      punksSupplyElement[0].innerText = presaleSupply.toString();
      punksSupplyElement[1].innerText = presaleSupply.toString();
      punksSupplyElement[2].innerText = presaleSupply.toString();
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
      punksSupplyElement[0].innerText = totalSupply.toString();
      punksSupplyElement[1].innerText = totalSupply.toString();
      punksSupplyElement[2].innerText = totalSupply.toString();
    }
  }
}

// call on wallet connect
async function getUserPunkData(userAddress) {
  // isWhitelisted
  // const signer = await providerHelper.getSigner();
  console.log("userAddress:", userAddress);
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
};
