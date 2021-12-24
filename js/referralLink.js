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


/**
* Is the string a valid address
* @param address
* @returns boolean
*/
function isValidAddress(address) {
    return ethers.utils.isAddress(address)
}

/**
 * Get the normal address value
 * @param address
 * @returns string
 */
function convertFromIcap(address) {
    return isValidAddress(address) ? ethers.utils.getAddress(address) : null
}

/**
 * Convert normal address to icap address
 * @param address
 * @returns string
 */
function convertToIcap(address) {
    return isValidAddress(address) ? ethers.utils.getIcapAddress(address) : null
}

async function userReferralLink(){
    const userAddress = await signer.getAddress();
    const icapAddress = convertToIcap(userAddress);
    const referralLink = `https://nft.fuzion.team/?ref=${icapAddress}`;
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
