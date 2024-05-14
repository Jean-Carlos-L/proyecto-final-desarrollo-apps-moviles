let modalMode;
let idTaskUpdate;

document.addEventListener("DOMContentLoaded", function () {
  showTasks();
});

const TASKS_STATES = {
  PENDING: 1,
  COMPLETED: 2,
};

async function showTasks(type) {
  const { data: tasks } = await getTasks();
  createElementsTasks(tasks, type ?? TASKS_STATES.PENDING);
}

function createElementsTasks(tasks, type) {
  var list = document.getElementById("list_tasks");

  if (!Boolean(tasks) || tasks.length === 0) {
    var noTasksElement = document.createElement("ons-list-item");
    noTasksElement.textContent = "No tienes tareas";
    list.appendChild(noTasksElement);
    return;
  }

  tasks
    .filter((task) => task.state === type)
    .forEach(function (task) {
      var newElement = document.createElement("ons-list-item");

      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "left");
      newDiv.textContent = task.title + " - " + task.description;
      newElement.appendChild(newDiv);

      var newDiv2 = document.createElement("div");
      newDiv2.setAttribute("class", "right");

      // Crear un contenedor para los iconos
      var iconContainer = document.createElement("div");
      iconContainer.style.display = "flex"; // Para que los iconos estén en línea
      iconContainer.style.width = "25%"; // Para que los iconos estén en línea
      iconContainer.style.justifyContent = "space-between"; // Para alinear los iconos a la derecha
      iconContainer.style.alignItems = "center"; // Para centrar verticalmente los iconos

      //crear el boton para completar la tarea
      if (task.state === TASKS_STATES.PENDING) {
        var stateButton = document.createElement("ons-icon");
        stateButton.setAttribute("icon", "fa-check");
        stateButton.style.color = "green";
        stateButton.style.marginRight = "10px"; // Para separar los botones
        stateButton.onclick = function () {
          handleCompletTask(task.id);
        };
        iconContainer.appendChild(stateButton);
      }

      // Crear el botón de modificar
      var updateButton = document.createElement("ons-icon");
      updateButton.setAttribute("icon", "fa-cog");
      updateButton.style.color = "blue";
      updateButton.onclick = function () {
        document.getElementById("task-title").value = task.title;
        document.getElementById("task-description").value = task.description;
        document.getElementById("task-date").value = task.date;

        document.getElementById("button-add-task").textContent = "Modificar";
        showEditModal(task.id);
      };

      // Crear el botón de eliminar
      var delbutton = document.createElement("ons-icon");
      delbutton.setAttribute("icon", "fa-trash");
      delbutton.style.color = "red";
      delbutton.style.marginLeft = "10px";
      delbutton.onclick = function () {
        handleDeleteTask(task.id);
      };

      iconContainer.appendChild(updateButton);
      iconContainer.appendChild(delbutton);

      newDiv2.appendChild(iconContainer);
      newElement.appendChild(newDiv2);
      list.appendChild(newElement);
    });
}

function showCreateModal() {
  var modal = document.querySelector("ons-modal");
  modalMode = "create";
  modal.show();
}

function showEditModal(idTask) {
  var modal = document.querySelector("ons-modal");
  modalMode = "edit";
  idTaskUpdate = idTask;
  modal.show();
}

function handleTaskAction() {
  if (modalMode === "create") {
    handleCreateTask();
  } else if (modalMode === "edit") {
    handleEditTask(idTaskUpdate);
  }
}

const getFields = () => {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const date = document.getElementById("task-date").value;

  return { title, description, date };
};

const validations = () => {
  const { title, description, date } = getFields();

  if (!Boolean(title) || title.trim() === "") {
    return alert("El nombre de la tarea es requerido");
  }

  if (!Boolean(description) || description.trim() === "") {
    return alert("La descripción de la tarea es requerida");
  }

  if (!Boolean(date) || date.trim() === "") {
    return alert("La fecha de la tarea es requerida");
  }

  return true;
};

async function handleCreateTask() {
  const { title, description, date } = getFields();

  if (!validations()) return;
  document.getElementById("spinner").style.display = "block";
  document.getElementById("textSpinner").style.display = "block";

  getLocation(async function (error, ubicacion) {
    if (error) {
      console.log("error", error);
      throw new Error("Error al obtener la ubicación:", error);
    }

    await createTask({
      title,
      description,
      // date,
      ...ubicacion,
    });

    alert("Tarea creada exitosamente");
    window.location.reload();
  });
}

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function ({ coords, timestamp }) {
        console.log("position", coords.latitude);
        const ubicacion = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          altitude_accuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
          timestamp,
        };

        callback(null, ubicacion);
      },
      function (error) {
        callback(error, null);
      }
    );
  } else {
    console.error("El navegador no admite la geolocalización.");
    callback("Geolocalización no compatible.", null);
  }
}

async function handleEditTask(id) {
  const { title, description, date } = getFields();

  if (!validations()) return;
  document.getElementById("spinner").style.display = "block";
  document.getElementById("textSpinner").style.display = "block";

  getLocation(async function (error, ubicacion) {
    if (error) {
      console.log("error", error);
      throw new Error("Error al obtener la ubicación:", error);
    }

    console.log("ubicacion", ubicacion);
    await updateTask(id, {
      id,
      title,
      description,
      // date,
      ...ubicacion,
    });

    alert("Tarea modificada exitosamente");
    window.location.reload();
  });
}
async function handleDeleteTask(id) {
  if (confirm("¿Estás seguro de eliminar la tarea?")) {
    await deleteTask(id);
    alert("Tarea eliminada exitosamente");
    window.location.reload();
  }
}

async function handleCompletTask(id) {
  if (confirm("¿La tarea está completada?")) {
    await completeTask(id);
    alert("Tarea completada exitosamente");
    window.location.reload();
  }
}

function clearTaskList() {
  var list = document.getElementById("list_tasks");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

const handleChangeTypeTask = (type) => {
  clearTaskList();
  showTasks(type);
};

document
  .getElementById("tasks-completed")
  .addEventListener("click", () =>
    handleChangeTypeTask(TASKS_STATES.COMPLETED)
  );

document
  .getElementById("tasks-no-completed")
  .addEventListener("click", () => handleChangeTypeTask(TASKS_STATES.PENDING));

document
  .getElementById("button-task-new")
  .addEventListener("click", showCreateModal);

document
  .getElementById("button-add-task")
  .addEventListener("click", handleTaskAction);
