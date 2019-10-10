const dropdownBars = document.querySelector(".navbar__dropdown");
const dropdownMenu = document.querySelector(".navbar__dropdown-box");
dropdownBars.addEventListener("click", () => {
  console.log("bars clicked");
  dropdownMenu.classList.toggle("no-display");
});
