const BASE_URL = "http://localhost:3050";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const getTasks = async () => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await fetch(`${BASE_URL}/api/v1/tasks`, options);
      const data = await response.json();
      return data;
    } else {
      const data = await getTasksOffline();
      return { data };
    }
  } catch (error) {
    console.error("Ocurrio un error al obtener las tareas: ", error);
  }
};

const createTask = async (task) => {
  try {
    const isConnection = checkConnection();
    console.log("isConnection", isConnection);
    if (isConnection === true) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(task),
      };
      const response = await fetch(`${BASE_URL}/api/v1/tasks`, options);
      const data = await response.json();
      return data;
    } else {
      console.log("Sin conexión");
      createTaskOffline(task);
      return { message: "Tarea creada sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al crear la tarea: ", error);
  }
};

const updateTask = async (id, task) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(task),
      };
      const response = await fetch(`${BASE_URL}/api/v1/tasks/${id}`, options);
      const data = await response.json();
      return data;
    } else {
      updateTaskOffline(id, task);
    }
  } catch (error) {
    console.error("Ocurrio un error al actualizar la tarea: ", error);
  }
};

const deleteTask = async (id) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await fetch(`${BASE_URL}/api/v1/tasks/${id}`, options);
      const data = await response.json();
      return data;
    } else {
      deleteTaskOffline(id);
      return { message: "Tarea eliminada sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al eliminar la tarea: ", error);
  }
};

const completeTask = async (id) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await fetch(
        `${BASE_URL}/api/v1/tasks/complete/${id}`,
        options
      );
      const data = await response.json();
      return data;
    } else {
      completeTaskOffline(id);
      return { message: "Tarea completada sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al completar la tarea: ", error);
  }
};
