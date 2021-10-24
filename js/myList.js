const myPending = document.querySelector("#textarea");
const sendButton = document.querySelector("#sendBtn");
const listSite = document.querySelector("#myList");
let myList = [];

startEvents();
function startEvents() {
  sendButton.addEventListener("click", addToList);
}

function addToList() {}
