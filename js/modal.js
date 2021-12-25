// show account modal
const span = document.getElementsByClassName("close")[0];
const closeTransactionModal = document.getElementById("closeTransactionModal");
const transactionModal = document.getElementById("transactionModal");

btn1.onclick = function () {
    modal.style.display = "block";
};
btn2.onclick = function () {
    modal.style.display = "block";
};
span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == processingModal) {
        processingModal.style.display = "none";
    }
    if (event.target == confirmationModal) {
        confirmationModal.style.display = "none";
    }
    if (event.target == transactionModal) {
        transactionModal.style.display = "none";
    }
};
closeTransactionModal.onclick = function () {
    transactionModal.style.display = "none";
};
