const btnMenu = document.querySelector("#menu");
const navBar = document.querySelector("#navbar");

btnMenu.addEventListener("click", () => {
  if (navBar.classList.contains("hidden")) {
    navBar.classList.remove("hidden");
    navBar.classList.add("visible");
  } else {
    navBar.classList.remove("visible");
    navBar.classList.add("hidden");
  }
});
