const myPending = document.querySelector("#textarea");
const sendButton = document.querySelector("#sendBtn");
const updButton = document.querySelector("#updateBtn");
const listSite = document.querySelector("#myList");
const form = document.querySelector("#form");
let myList = [];
const pendingObj = {
  id: "",
  pending: "",
  done: false,
};
let editionMode = false;
let messageShowing = false;

startEvents();
function startEvents() {
  sendButton.addEventListener("click", addToList);
  updButton.addEventListener("click", updateBtnEvent);
  myPending.addEventListener("input", fillPendingObj);
  document.addEventListener("DOMContentLoaded", () => {
    myList = JSON.parse(localStorage.getItem("pendings")) || [];
    buttonController();
    restartObject();
    createListHTML();
  });
}

function fillPendingObj(e) {
  pendingObj[e.target.name] = e.target.value;
}

function addToList(e) {
  e.preventDefault();
  const { pending } = pendingObj;
  if (pending === "") {
    if (!messageShowing) {
      showMessage("You must write a task before add it", "error");
    }
    return;
  }

  pendingObj.id = Date.now();

  myList = [...myList, { ...pendingObj }];

  createListHTML();
  if (!messageShowing) {
    showMessage("Added successfully", "success");
  }
  restartObject();
  form.reset();
}

function updateBtnEvent(e) {
  e.preventDefault();
  updateTask({ ...pendingObj });
  createListHTML();
  if (!messageShowing) {
    showMessage("Updated successfully", "success");
  }
  editionMode = false;
  restartObject();
  buttonController();
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

      const aCheck = document.createElement("button");
      aCheck.setAttribute("id", "check");
      const spanCheck = document.createElement("span");
      spanCheck.classList.add("material-icons", "md-24", "green");
      spanCheck.innerText = "task_alt";
      aCheck.appendChild(spanCheck);

      const aUpdate = document.createElement("button");
      aUpdate.setAttribute("id", "update");
      const spanUpdate = document.createElement("span");
      spanUpdate.classList.add("material-icons", "md-24", "yellow");
      spanUpdate.innerText = "autorenew";
      aUpdate.appendChild(spanUpdate);

      aUpdate.onclick = (e) => {
        e.preventDefault();
        editTask(listPending);
      };

      aCheck.onclick = (e) => {
        e.preventDefault();
        taskDone(textSpan, aCheck, spanCheck, aUpdate, spanUpdate);
        listPending.done = true;
        isDone(listPending);
      };

      const aDelete = document.createElement("button");
      aDelete.setAttribute("id", "delete");
      const spanDelete = document.createElement("span");
      spanDelete.classList.add("material-icons", "md-24", "red");
      spanDelete.innerHTML = "delete_outline";
      aDelete.appendChild(spanDelete);

      aDelete.onclick = (e) => {
        e.preventDefault();
        deletePending(listPending.id);
      };

      if (listPending.done) {
        taskDone(textSpan, aCheck, spanCheck, aUpdate, spanUpdate);
      }

      iconContainer.appendChild(aCheck);
      iconContainer.appendChild(aUpdate);
      iconContainer.appendChild(aDelete);
      li.appendChild(textSpan);
      li.appendChild(iconContainer);

      listSite.appendChild(li);
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
  editionMode = false;
  createListHTML();
  restartObject();
  buttonController();
  form.reset();
}

function setPendingsOnLS() {
  localStorage.setItem("pendings", JSON.stringify(myList));
}

function editTask(taskObj) {
  const { id, pending } = taskObj;
  myPending.value = pending;

  pendingObj.id = id;
  pendingObj.pending = pending;

  editionMode = true;
  buttonController();
}

function showMessage(message, type) {
  messageShowing = true;
  const divMessage = document.createElement("div");
  divMessage.classList.add("messageInfo");
  if (type === "error") {
    divMessage.textContent = message;
    divMessage.classList.remove("success");
    divMessage.classList.add("error");
  } else {
    divMessage.textContent = message;
    divMessage.classList.remove("error");
    divMessage.classList.add("success");
  }

  document.querySelector(".form-container").insertBefore(divMessage, form);

  setTimeout(() => {
    divMessage.remove();
    messageShowing = false;
  }, 2000);
}

function buttonController() {
  if (editionMode) {
    sendButton.setAttribute("disabled", "");
    updButton.removeAttribute("disabled");

    sendButton.classList.add("btnDisabled");
    sendButton.classList.remove("btnForm");

    updButton.classList.add("btnForm");
    updButton.classList.remove("btnDisabled");
  } else {
    sendButton.removeAttribute("disabled");
    updButton.setAttribute("disabled", "");

    sendButton.classList.add("btnForm");
    sendButton.classList.remove("btnDisabled");

    updButton.classList.add("btnDisabled");
    updButton.classList.remove("btnForm");
  }
}

function restartObject() {
  pendingObj.id = "";
  pendingObj.pending = "";
  pendingObj.done = false;
}

function updateTask(pending) {
  myList = myList.map((task) => (task.id === pending.id ? pending : task));
}

function taskDone(textSpan, aCheck, spanCheck, aUpdate, spanUpdate) {
  // Text
  textSpan.classList.add("task-done");

  // Check button
  aCheck.setAttribute("disabled", "");
  spanCheck.classList.remove("green");
  spanCheck.classList.add("grey");

  // Update button
  // if (typeof updButton !== undefined) {
  aUpdate.setAttribute("disabled", "");
  spanUpdate.classList.remove("yellow");
  spanUpdate.classList.add("grey");
  // }
}

function isDone(taskDone) {
  const { id, pending, done } = taskDone;
  pendingObj.id = id;
  pendingObj.pending = pending;
  pendingObj.done = done;
  updateTask({ ...pendingObj });
  createListHTML();
  restartObject();
}
