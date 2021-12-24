const {ZERO_ADDRESS} = require("./blockchain/constants");
const {providerHelper} = require("./blockchain/helper/index");
const signer = providerHelper.getSigner();

const params = new URLSearchParams(window.location.search);
if (params.has('ref')){
    setRefCookie("ref", params.get('ref'), 30);
}

function setRefCookie(cname,cvalue,exdays) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + date.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function userReferralLink(){
    const userAddress = await signer.getAddress();
    const addressString = userAddress.toString();
    const icapAddress = addressString.toUpperCase();
    const referralLink = `https://nft.fuzion.team/?ref=${icapAddress}`;
    const defaultReferralLink = `https://nft.fuzion.team/?ref=${ZERO_ADDRESS}`;
    const referralElement = document.getElementById("userReferralLink");
    if (referralElement){
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

$('[data-toggle="tooltip"]').click(function () {
    $(this).tooltip("hide").attr("data-original-title", "Copied").tooltip("show");
});

userReferralLink();
window.copyReferralLink = copyReferralLink;

module.exports = {
    userReferralLink,
    copyReferralLink,
}
