const ethers = require("ethers");
const {
  CHAIN_ID,
  PUNK_ADDRESS,
  MAX_PUNKS,
  MAX_PRESALE_PUNKS,
  BASE_GAS_FEE,
} = require("../constants");
const { providerHelper } = require("../helper");
const {getReferral} = require("../../referralLink");

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
  claimedSuccessfulModal,
  referralCommissions,
  totalReferral;

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
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function referralAmounts(address owner) public view returns (uint256)",
  "function referralNumbers(address owner) public view returns (uint256)",
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
  presaleIsActive = parseInt(presaleIsActive);
  saleIsActive = parseInt(saleIsActive);
  const mintStatusElement = document.getElementsByClassName("minting-status");
  const mintBtnElement = document.getElementsByClassName("start-minting-btn");
  const punksSupplyElement = document.getElementsByClassName("punksSupply");
  if (presaleIsActive) {
    console.log("presale is active here", presaleIsActive);
    if (mintStatusElement[0]) {
      mintStatusElement[0].innerText = "Presale Minting Live";
      mintStatusElement[1].innerText = "Presale Minting Live";
    }
    if (mintBtnElement[0] || punksSupplyElement[0]) {
      mintBtnElement[0].innerText = "Mint Presale";
      punksSupplyElement[0].innerText = `Fuzion CryptoPunks Minted: ${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
      punksSupplyElement[1].innerText = `Fuzion CryptoPunks Minted: ${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
      punksSupplyElement[2].innerText = `Fuzion CryptoPunks Minted: ${presaleSupply.toString()}/${MAX_PRESALE_PUNKS}`;
    }
  }
  else if (saleIsActive) {
    console.log("saleIsActive:", saleIsActive);
    if (mintStatusElement[0] || mintStatusElement[1]) {
      mintStatusElement[0].innerText = "Minting Live";
      mintStatusElement[1].innerText = "Minting Live";
    }
    if (mintBtnElement[0] || punksSupplyElement[0]) {
      mintBtnElement[0].innerText = "Start Minting";
      punksSupplyElement[0].innerText = `Fuzion CryptoPunks Minted: ${totalSupply.toString()}/${MAX_PUNKS}`;
      punksSupplyElement[1].innerText = `Fuzion CryptoPunks Minted: ${totalSupply.toString()}/${MAX_PUNKS}`;
      punksSupplyElement[2].innerText = `Fuzion CryptoPunks Minted: ${totalSupply.toString()}/${MAX_PUNKS}`;
    }
  }


}

// call on wallet connect
async function getUserPunkData(userAddress) {
  // isWhitelisted
  // const signer = await providerHelper.getSigner();
  isWhiteListed = await punk.whitelist(userAddress);
  const presaleStatusElement = document.getElementsByClassName("presale-status");
  if (isWhiteListed && presaleStatusElement[0]) {
    presaleStatusElement[0].style.display = "block";
  }
}

async function getMaxPurchaseAmount() {
  presaleIsActive = parseInt(presaleIsActive);
  return presaleIsActive ? maxPresalePurchase : maxPunkPurchase;
}

function setMaxAndMinPunk(){
  let maxPunkNumber;
  let mintPunkNumber;
  const punkInput = document.getElementById("mintNumber");
  const mintNftBtn = document.getElementsByClassName("start-minting-btn");
  const invalidFeedbackElement = document.getElementsByClassName("invalid-feedback");
  if (presaleIsActive){
     maxPunkNumber = parseInt(maxPresalePurchase.toString());
     mintPunkNumber = parseInt(punkInput.value);
    if (mintPunkNumber > maxPunkNumber || mintPunkNumber < 1 || punkInput.value === ""){
      punkInput.classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].style.display = "block";
      mintNftBtn[0].classList.add("is-disabled");
      invalidFeedbackElement[0].innerText = `value must be between 1-${maxPresalePurchase.toString()}`
    }
    else{
      punkInput.classList.remove("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].style.display = "none";
      mintNftBtn[0].classList.remove("is-disabled");
    }
  }

  else if(saleIsActive){
    const maxPunkNumber = parseInt(maxPunkPurchase.toString());
    const mintPunkNumber = parseInt(punkInput.value);
    if (mintPunkNumber > maxPunkNumber || mintPunkNumber < 1 || punkInput.value === ""){
      punkInput.classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].style.display = "block";
      mintNftBtn[0].classList.add("is-disabled");
      invalidFeedbackElement[0].innerText = `value must be between 1-${maxPunkPurchase.toString()}`
    }
    else{
      punkInput.classList.remove("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].style.display = "none";
      mintNftBtn[0].classList.remove("is-disabled");
    }
  }
}

async function mintFuzionPunk() {
  // await getPunkContract();
  const provider = await providerHelper.getProvider();
  const signer = await providerHelper.getSigner();
  const mintNumberElement = document.getElementById("mintNumber");
  const numberToMint = mintNumberElement.value;
  confirmMetamaskModal = document.getElementById("confirmationModal");
  claimProcessingModal = document.getElementById("processingModal");
  claimedSuccessfulModal = document.getElementById("successfullModal");
  try {
    $("#exampleModalCenter").modal('hide');
    confirmMetamaskModal.style.display = "block";
    let presaleMintReceipt;
    if (presaleIsActive) {
      presaleMintReceipt = await punk.connect(signer).mintPresale(numberToMint, {
        value: punkPriceDiscounted.mul(numberToMint),
        gasLimit: BASE_GAS_FEE,
      });
    }
    else if (saleIsActive) {
      const refAddress = getReferral();
      console.log("This is the Base Gas fee:", BASE_GAS_FEE);
      presaleMintReceipt = await punk.connect(signer).mint(numberToMint, refAddress, {
        value: punkPrice.mul(numberToMint),
        gasLimit: BASE_GAS_FEE,
      });
    }
    const mintPunkSubmitted = await presaleMintReceipt;
    if (mintPunkSubmitted.confirmations === 0) {
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "block";
      document.getElementById("processingTxt").innerText = "Minting In Process";
      const processingLink = document.getElementById("processing-transaction");
      // processingLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      processingLink.href = `https://mumbai.polygonscan.com/tx/${mintPunkSubmitted.hash}`; //mumbai polygon testnet
    }
    const mintPunkSuccessfull = await presaleMintReceipt.wait();
    if (mintPunkSuccessfull) {
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "none";
      claimedSuccessfulModal.style.display = "block";
      document.getElementById("successTxt").innerText = "Minted Successfully";
      const transactionLink = document.getElementById("transaction-link");
      // transactionLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      transactionLink.href = `https://mumbai.polygonscan.com/tx/${mintPunkSubmitted.hash}`; //mumbai polygon testnet
    }
  } catch (error) {
    console.log(error);
    if (error.code === 4001) {
      confirmMetamaskModal.style.display = "none";
    }
  }
}

async function getOwnedTokens(address) {
  const totalPunksElement = document.getElementById("totalFuzionPunks");
  const balance = await punk.balanceOf(address);
  if (totalPunksElement) {
    totalPunksElement.innerText = `${balance.toString()} Total Fuzion Punks`;
  }
  const promises = [];
  for (let i = 0; i < balance; i++) {
    promises.push(punk.tokenOfOwnerByIndex(address, i));
  }
  const tokens = await Promise.all(promises);

  // create a token element starts here
  const container = document.getElementById("tokenData");
  if (container){
    tokens.forEach((token, idx) => {
      let url = `https://fuzionpunks.s3.us-east-2.amazonaws.com/images/${token.toString()}.png`;
      // Construct card content
      const content = `
     <div class="col-lg-4 col-md-6">
      <div class="portfolio-card position-relative">
           <div class="portfolio-card-tag">
               <p class="rank-txt mb-0 pr-3 pl-2">RANK 3</p>
                <p class="mb-0 ranking-status">LEGENDARY</p>
           </div>
           <div class="text-center">
           <img
            src="${url}"
            alt="NFT"
            class="portfolio-nft"
            />
            <p class="mb-0 mt-3">Degen Punk #7480</p>
            <p class="owner-address pt-2">0x0D933E6…</p>
            </div>
            <div class="portfolio-card-footer">
              <div class="row no-gutters">
                  <div class="col-6">
                      <p>Current Price</p>
                  </div>
                  <div class="col-6">
                      <p class="float-right">
                       <img
                         src="./img/profile/portfolio/binance-logo.png"
                         alt="eth icon"
                         width="25px"
                         /><span class="pl-2 color-white">333.30</span>
                        </p>
                            </div>
                          </div>
                        </div>
                      </div>
      </div>
  `;
      container.innerHTML += content;
    });
    // create element ends here
  }

  return tokens;
}

async function getReflectionBalance() {
  const rewardElement = document.getElementsByClassName("reward-amount");
  const signer = await providerHelper.getSigner();
  reflectionBalance = await punk.connect(signer).getReflectionBalances();
  if(rewardElement[0]){rewardElement[0].innerText = `${ethers.utils.formatUnits(reflectionBalance, 18)} BNB`;}
  return reflectionBalance;
}

async function claimReflectionBalance(){
  let rewardClaimReceipt;
// await getPunkContract();
  const signer = await providerHelper.getSigner();
  confirmMetamaskModal = document.getElementById("confirmationModal");
  claimProcessingModal = document.getElementById("processingModal");
  claimedSuccessfulModal = document.getElementById("successfullModal");
  try {
    confirmMetamaskModal.style.display = "block";
    rewardClaimReceipt = await punk.connect(signer).claimRewards();
    const claimRewardSubmitted = await rewardClaimReceipt;
    if (claimRewardSubmitted.confirmations === 0){
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "block";
      document.getElementById("processingTxt").innerText = "Claim Reward In Process";
      const processingLink = document.getElementById("processing-transaction");
      // processingLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      processingLink.href = `https://mumbai.polygonscan.com/tx/${claimRewardSubmitted.hash}`; //mumbai polygon testnet
    }
    const claimedRewardSuccessfull = await rewardClaimReceipt.wait();
    if (claimedRewardSuccessfull){
      confirmMetamaskModal.style.display = "none";
      claimProcessingModal.style.display = "none";
      claimedSuccessfulModal.style.display = "block";
      document.getElementById("successTxt").innerText = "Reward Claimed Successfully";
      const transactionLink = document.getElementById("transaction-link");
      // transactionLink.href = `https://bscscan.com/tx/${mintPunkSubmitted.hash}`; //bsc scan mainnet
      transactionLink.href = `https://mumbai.polygonscan.com/tx/${claimRewardSubmitted.hash}`; //mumbai polygon testnet
    }
  }
  catch (error){
    console.log(error)
    if (error.code === 4001){
      confirmMetamaskModal.style.display = "none";
    }
  }

}

async function userReferralCommissions(address){
  const referralCommissionElement = document.getElementById("referralCommission");
  if (referralCommissionElement){
    const signer = await providerHelper.getSigner();
    referralCommissions = await punk.connect(signer).referralAmounts(address);
    referralCommissionElement.innerText = `${ethers.utils.formatUnits(referralCommissions, 18)} BNB`;
  }
}

async function userTotalReferral(address){
  const totalRefferralElement = document.getElementById("totalReferral");
  if (totalRefferralElement){
    console.log("user address:", address);
    const signer = await providerHelper.getSigner();
    totalReferral = await punk.connect(signer).referralNumbers(address);
    totalRefferralElement.innerText = `${totalReferral.toString()}`;
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
window.setMaxAndMinPunk = setMaxAndMinPunk;
window.claimReflectionBalance = claimReflectionBalance;


module.exports = {
  punk,
  punkPrice,
  punkPriceDiscounted,
  maxPunkPurchase,
  maxPresalePurchase,
  presaleIsActive,
  presaleComplete,
  saleIsActive,
  reflectionBalance,
  getPunkConstants,
  getUserPunkData,
  getPunkContract,
  isWhiteListed,
  getMaxPurchaseAmount,
  punkSaleStatus,
  totalSupply,
  presaleSupply,
  mintFuzionPunk,
  getOwnedTokens,
  getReflectionBalance,
  setMaxAndMinPunk,
  claimReflectionBalance,
  userReferralCommissions,
  userTotalReferral,
};
