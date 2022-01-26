function openNav() {
    console.log("openNav is clicked");
    document.getElementById("sidebar").style.width = "175px";
}

function closeNav() {
    console.log("closeNav is clicked");
    document.getElementById("sidebar").style.width = "0";
}

window.openNav = openNav;
window.closeNav = closeNav;

module.exports = {
    openNav,
    closeNav,
}