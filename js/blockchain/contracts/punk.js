const ethers = require("ethers");
const { PUNK_ADDRESS } = require("../constants");

let punk,
  totalSupply,
  punkPrice,
  punkPriceDiscounted,
  maxPunkPurchase,
  maxPresalePurchase,
  reflectionBalance,
  saleIsActive,
  presaleComplete,
  presaleIsActive;

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
];

function getPunkContract(chainId = 80001, signer) {
  const punkAddress = PUNK_ADDRESS[chainId];
  punk = new ethers.Contract(punkAddress, abi, signer);
  return punk;
}

async function test(userAddress) {
  totalSupply = await punk.totalSupply();
  console.log("totalSupply:", totalSupply.toString());

  punkPrice = await punk.punkPrice();
  console.log("punkPrice:", punkPrice.toString());

  punkPriceDiscounted = await punk.punkPriceDiscounted();
  console.log("punkPriceDiscounted:", punkPriceDiscounted.toString());

  maxPunkPurchase = await punk.maxPunkPurchase();
  console.log("maxPunkPurchase:", maxPunkPurchase.toString());

  maxPresalePurchase = await punk.maxPresalePurchase();
  console.log("maxPresalePurchase:", maxPresalePurchase.toString());

  let isWhitelisted = await punk.whitelist(userAddress);
  console.log("is whitelisted:", isWhitelisted);

  reflectionBalance = await punk.getReflectionBalances();
  console.log("reflectionBalance:", reflectionBalance.toString());

  saleIsActive = await punk.saleIsActive();
  console.log("saleIsActive:", saleIsActive.toString());

  presaleComplete = await punk.presaleComplete();
  console.log("presaleComplete:", presaleComplete.toString());

  presaleIsActive = await punk.presaleIsActive();
  console.log("presaleIsActive:", presaleIsActive.toString());
}
