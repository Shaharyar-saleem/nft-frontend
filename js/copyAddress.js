// copy to clipboard
function copyAddress() {
  const copyText = document.getElementById("fullAddress");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
}

$('[data-toggle="tooltip"]').click(function () {
  $(this).tooltip("hide").attr("data-original-title", "Copied").tooltip("show");
});

window.copyAddress = copyAddress;

module.exports = {
  copyAddress,
};
