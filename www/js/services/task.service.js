const BASE_URL = "http://localhost:3050";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

const getTasks = async () => {
  try {
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
  } catch (error) {
    console.error("Ocurrio un error al obtener las tareas: ", error);
  }
};

const createTask = async (task) => {
  try {
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
  } catch (error) {
    console.error("Ocurrio un error al crear la tarea: ", error);
  }
};

const updateTask = async (id, task) => {
  try {
    console.log("id, task", id, task);
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
  } catch (error) {
    console.error("Ocurrio un error al actualizar la tarea: ", error);
  }
};

const deleteTask = async (id) => {
  try {
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
  } catch (error) {
    console.error("Ocurrio un error al eliminar la tarea: ", error);
  }
};

const completeTask = async (id) => {
  try {
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
  } catch (error) {
    console.error("Ocurrio un error al completar la tarea: ", error);
  }
};
