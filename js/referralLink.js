const {
  ZERO_ADDRESS,
  REFERRAL_QUERY_PARAM,
  REFERRAL_COOKIE_NAME,
} = require("./blockchain/constants");
const { providerHelper } = require("./blockchain/helper/index");
const { getProvider, getSigner } = providerHelper;
let userAddress;

getRef();

$('[data-toggle="tooltip"]').click(function () {
  $(this).tooltip("hide").attr("data-original-title", "Copied").tooltip("show");
});

function getRef() {
  const params = new URLSearchParams(window.location.search);
  if (params.has(REFERRAL_QUERY_PARAM)) {
    setCookie(REFERRAL_COOKIE_NAME, params.get(REFERRAL_QUERY_PARAM), 30);
  }
}

function setCookie(name, value, expiryInDays) {
  const date = new Date();
  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Is the string a valid address
 * @param address
 * @returns boolean
 */
function isValidAddress(address) {
  return ethers.utils.isAddress(address);
}

/**
 * Get the normal address value
 * @param address
 * @returns string
 */
function convertFromIcap(address) {
  console.log("convertFromIcap:", address);
  return isValidAddress(address) ? ethers.utils.getAddress(address) : null;
}

/**
 * Convert normal address to icap address
 * @param address
 * @returns string
 */
function convertToIcap(address) {
  return isValidAddress(address) ? ethers.utils.getIcapAddress(address) : null;
}

async function userReferralLink() {
  let referralLink;
  const signer = await getSigner();
  userAddress = await signer.getAddress();
  const referralElement = document.getElementById("userReferralLink");
  const copyLinkElement = document.getElementsByClassName("copy-link");
  if (userAddress) {
    const icapAddress = convertToIcap(userAddress);
    referralLink = `https://fuzion.team/?ref=${icapAddress}`;
  } else {
    referralLink = "Connect wallet for referral link";
    if (copyLinkElement[0]) {
      copyLinkElement[0].style.display = "none";
      copyLinkElement[0].style.display = "none";
    }
  }

  if (referralElement) {
    referralElement.innerText = referralLink;
    document.getElementById("referralLink").value = referralLink;
  }
  return referralLink;
}

async function userReferralCommissions() {
  const referralCommissionElement =
    document.getElementById("referralCommission");
  if (userAddress != null && referralCommissionElement) {
    referralCommissionElement.innerText = "0.000 BNB";
  } else {
    if (referralCommissionElement) {
      referralCommissionElement.innerText = "-";
    }
  }
}

async function userTotalReferral() {
  const totalReferralElement = document.getElementById("totalReferral");
  if (userAddress != null && totalReferralElement) {
    totalReferralElement.innerText = `0`;
  } else {
    if (totalReferralElement) {
      totalReferralElement.innerText = "-";
    }
  }
}

function copyReferralLink() {
  const copyText = document.getElementById("referralLink");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function getReferral() {
  let ref = getCookie();
  return convertFromIcap(ref) || ZERO_ADDRESS;
}

function getCookie(name = REFERRAL_COOKIE_NAME) {
  let cookie;
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      cookie = decodeURIComponent(cookiePair[1]);
    }
  }
  return cookie;
}

window.copyReferralLink = copyReferralLink;

module.exports = {
  userReferralLink,
  userTotalReferral,
  userReferralCommissions,
  copyReferralLink,
  getRef,
  getReferral,
};
