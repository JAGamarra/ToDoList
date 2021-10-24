const btnMenu = document.querySelector("#menu");
const navBar = document.querySelector("#navbar");

document.addEventListener("DOMContentLoaded", () => {
  navBar.classList.remove("visible");
  navBar.classList.add("hidden");
});

btnMenu.addEventListener("click", () => {
  if (navBar.classList.contains("hidden")) {
    navBar.classList.remove("hidden");
    navBar.classList.add("visible");
  } else {
    navBar.classList.remove("visible");
    navBar.classList.add("hidden");
  }
});
