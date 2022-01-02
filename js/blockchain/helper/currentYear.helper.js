function getCurrentYear() {
  const currentYearElement = document.getElementsByClassName("currentYear");
  for (let init = 0; init < 2; init++) {
    if (currentYearElement[init]) {
      currentYearElement[init].innerText = new Date().getFullYear();
    }
  }
}

module.exports = {
  getCurrentYear,
};
