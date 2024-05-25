const db = window.sqlitePlugin.openDatabase({
  name: 'aplicacion_gestion_tareas_con_geolocalizacion.db',
  location: 'default',
});

const BASE_URL = "http://localhost:3050";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

const getTasks = async () => {
  try {
    if(!navigator.onLine) {
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
  }else {
    
  }
  } catch (error) {
    console.error("Ocurrio un error al obtener las tareas: ", error);
  }
};

const createTask = async (task) => {
  try {
    if(!navigator.onLine) {
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
    try {
      db.transaction(async function (tx) {
        const query = `
        INSERT INTO tasks (title, description, priority, remainder, user_id)
        VALUES (?, ?, ?, ?)
      `;
        tx.executeSql(query, [task.title, task.description, task.priority, task.remainder, task.user_id]);
        console.log('Tarea creada localmente en la base de datos SQLite.');
      });
    } catch (error) {
      console.log('Error al crear la tarea localmente en la base de datos SQLite: ', error.message);
      
    }
    

    // db.transaction(function (tx) {
    //   tx.executeSql(`INSERT INTO sync_database (query) VALUES ('${JSON.stringify(task)}')`, [], function (tx, res) {
    //     console.log('Tarea guardada en la base de datos local');
    //   }, function (error) {
    //     console.error('Error al guardar la tarea en la base de datos local: ', error.message);
    //   });
    // });
  }
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
