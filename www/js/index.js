document.addEventListener("deviceready", onDeviceReady, false);

async function onDeviceReady() {
  synchronization();
}

document.addEventListener("init", function (event) {
  const page = event.target;
  synchronization();

  const isAuth = verifySession();
  if (page.id !== "login" && page.id !== "register" && isAuth === false) {
    return document.querySelector("#navigator").pushPage("login.html");
  } else {
    if (page.id === "login") {
      page.querySelector("#button-sign-up").onclick = function () {
        document.querySelector("#navigator").pushPage("register.html");
      };

      page.querySelector("#button-sign-in").onclick = async function () {
        const response = await handleLogin();
        if (response) {
          document.querySelector("#navigator").pushPage("tasks.html");
        }
      };
    }

    if (page.id === "register") {
      page.querySelector("#button-sign-up").onclick = async function () {
        const response = await handleCreateUser();
        if (response) {
          document.querySelector("#navigator").popPage();
        }
      };

      page.querySelector("#button-sign-in").onclick = function () {
        document.querySelector("#navigator").popPage();
      };
    }

    if (page.id === "tasks") {
      showTasks(TASKS_STATES.PENDING);

      page.querySelector("#button-sign-out").onclick = function () {
        handleSignOut();
        document.querySelector("#navigator").popPage();
      };

      page.querySelector("#button-task-new").onclick = function () {
        showCreateModal();
      };

      page.querySelector("#button-add-task").onclick = async function () {
        handleTaskAction();
      };

      page.querySelector("#tasks-completed").onclick = function () {
        handleChangeTypeTask(TASKS_STATES.COMPLETED);
      };

      page.querySelector("#tasks-no-completed").onclick = function () {
        handleChangeTypeTask(TASKS_STATES.PENDING);
      };
    }
  }
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
  // Obtiene los componentes individuales de la fecha
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Formatea la fecha y la hora en el formato deseado
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
