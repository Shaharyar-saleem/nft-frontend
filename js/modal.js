// show account modal

const confirmMetamaskModal = document.getElementById("confirmationModal");
const claimProcessingModal = document.getElementById("processingModal");
const claimedSuccessfulModal = document.getElementById("successfullModal");
const modal = document.getElementsByClassName("modal");

function closeConfirmationModal() {
  $(".modal-backdrop").remove();
  confirmMetamaskModal.style.display = "none";
}

function closeProcessingModal() {
  $(".modal-backdrop").remove();
  claimProcessingModal.style.display = "none";
}

function closeClaimedModal() {
  $(".modal-backdrop").remove();
  claimedSuccessfulModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === confirmMetamaskModal) {
    confirmMetamaskModal.style.display = "none";
    $(".modal-backdrop").remove();
  }
  if (event.target === claimProcessingModal) {
    claimProcessingModal.style.display = "none";
    $(".modal-backdrop").remove();
  }
  if (event.target === claimedSuccessfulModal) {
    claimedSuccessfulModal.style.display = "none";
    $(".modal-backdrop").remove();
  }
};

window.closeConfirmationModal = closeConfirmationModal;
window.closeProcessingModal = closeProcessingModal;
window.closeClaimedModal = closeClaimedModal;

module.exports = {
  closeConfirmationModal,
  closeProcessingModal,
  closeClaimedModal,
};
