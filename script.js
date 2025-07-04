const inputBox = document.getElementById("box3days__day_tasks_addtask-input");
const listContainer = document.getElementById("box3days__day_tasks_list");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let iconsDiv = document.createElement("div");
    iconsDiv.className = "box3days__day_tasks_list_icons";

    let doDiv = document.createElement("div");
    doDiv.className = "box3days__day_tasks_list_icons-do";

    let doneDiv = document.createElement("div");
    doneDiv.className = "box3days__day_tasks_list_icons-done";

    let closeImg = document.createElement("img");
    closeImg.src = "./img/icon_close.svg";
    closeImg.alt = "";
    closeImg.onclick = "deleteTask";

    iconsDiv.appendChild(doDiv);
    iconsDiv.appendChild(doneDiv);
    iconsDiv.appendChild(closeImg);

    li.appendChild(iconsDiv);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
  }
}
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.classList.contains("box3days__day_tasks_list_icons-done")) {
      e.target.classList.toggle("box3days__day_tasks_list_icons-done_cheked");
      saveData();
    } else if (
      e.target.classList.contains("box3days__day_tasks_list_icons-do")
    ) {
      e.target.classList.toggle("box3days__day_tasks_list_icons-do_cheked");
      saveData();
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}
const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

document.getElementById("date-yesterday").textContent = formatDate(yesterday);
document.getElementById("date-today").textContent = formatDate(today);
document.getElementById("date-tomorrow").textContent = formatDate(tomorrow);

function getWeekday(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

document.getElementById("weekday-yesterday").textContent = getWeekday(yesterday);
document.getElementById("weekday-today").textContent = getWeekday(today);
document.getElementById("weekday-tomorrow").textContent = getWeekday(tomorrow);
