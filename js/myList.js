const myPending = document.querySelector("#textarea");
const sendButton = document.querySelector("#sendBtn");
const updButton = document.querySelector("#updateBtn");
const listSite = document.querySelector("#myList");
const form = document.querySelector("#form");
let myList = [];

startEvents();
function startEvents() {
  sendButton.addEventListener("click", addToList);
  document.addEventListener("DOMContentLoaded", () => {
    myList = JSON.parse(localStorage.getItem("pendings")) || [];

    createListHTML();
  });
}

function addToList() {
  console.log("Agregando a lista");
  if (myPending.value === "") {
    console.log("No puede ir vacío");
    return;
  }
  const pendingObj = {
    id: Date.now(),
    pending: myPending.value,
  };

  myList = [...myList, pendingObj];

  console.log(pendingObj);
  createListHTML();

  form.reset();
}

// Funciones
function createListHTML() {
  deletePrevHTML();
  if (myList.length > 0) {
    myList.forEach((listPending) => {
      const li = document.createElement("li");
      li.classList.add("listItem");

      const textSpan = document.createElement("span");
      textSpan.classList.add("listItem__text");
      textSpan.textContent = listPending.pending;

      const iconContainer = document.createElement("div");
      iconContainer.classList.add("iconsContainer");

      const aCheck = document.createElement("a");
      aCheck.setAttribute("id", "check");
      aCheck.setAttribute("href", "#");
      const spanCheck = document.createElement("span");
      spanCheck.classList.add("material-icons", "md-24", "green");
      spanCheck.innerText = "task_alt";
      aCheck.appendChild(spanCheck);

      const aUpdate = document.createElement("a");
      aUpdate.setAttribute("id", "update");
      aUpdate.setAttribute("href", "#");
      const spanUpdate = document.createElement("span");
      spanUpdate.classList.add("material-icons", "md-24", "yellow");
      spanUpdate.innerText = "autorenew";
      aUpdate.appendChild(spanUpdate);

      const aDelete = document.createElement("a");
      aDelete.setAttribute("id", "delete");
      aDelete.setAttribute("href", "#");
      const spanDelete = document.createElement("span");
      spanDelete.classList.add("material-icons", "md-24", "red");
      spanDelete.innerHTML = "delete_outline";
      aDelete.appendChild(spanDelete);

      aDelete.onclick = (e) => {
        e.preventDefault();
        deletePending(listPending.id);
      };

      iconContainer.appendChild(aCheck);
      iconContainer.appendChild(aUpdate);
      iconContainer.appendChild(aDelete);
      li.appendChild(textSpan);
      li.appendChild(iconContainer);
      console.log(li);

      listSite.appendChild(li);
      console.log(listPending.pending);
    });
  }
  setPendingsOnLS();
}

function deletePrevHTML() {
  while (listSite.firstChild) {
    listSite.removeChild(listSite.firstChild);
  }
}

function deletePending(id) {
  myList = myList.filter((listItem) => listItem.id !== id);
  createListHTML();
}

function setPendingsOnLS() {
  localStorage.setItem("pendings", JSON.stringify(myList));
}
