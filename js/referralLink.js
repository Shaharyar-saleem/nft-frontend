const {
  ZERO_ADDRESS,
  REFERRAL_QUERY_PARAM,
  REFERRAL_COOKIE_NAME,
} = require("./blockchain/constants");
const { providerHelper } = require("./blockchain/helper/index");
const signer = providerHelper.getSigner();

userReferralLink();
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

async function userReferralLink() {
  const userAddress = await signer.getAddress();
  const addressString = userAddress.toString();
  const icapAddress = addressString.toUpperCase();
  const referralLink = `https://nft.fuzion.team/?ref=${icapAddress}`;
  // const defaultReferralLink = `https://nft.fuzion.team/?ref=${ZERO_ADDRESS}`;
  const referralElement = document.getElementById("userReferralLink");
  if (referralElement) {
    referralElement.innerText = referralLink;
    document.getElementById("referralLink").value = referralLink;
  }
  return referralLink;
}

function copyReferralLink() {
  const copyText = document.getElementById("referralLink");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function getReferral() {
  // let ref;
  // grab the referral cookie value
  // return convertToIcap(ref) || ZERO_ADDRESS;
}

window.copyReferralLink = copyReferralLink;
module.exports = {
  userReferralLink,
  copyReferralLink,
  getRef,
};
