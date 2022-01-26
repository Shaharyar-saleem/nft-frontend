function openNav() {
    console.log("openNav is clicked");
    document.getElementById("sidebar").style.width = "175px";
    document.getElementById("main").style.marginLeft = "175px";
}

function closeNav() {
    console.log("closeNav is clicked");
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

window.openNav = openNav;
window.closeNav = closeNav;

module.exports = {
    openNav,
    closeNav,
}