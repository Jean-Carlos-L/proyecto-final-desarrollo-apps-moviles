const db = window.sqlitePlugin.openDatabase({
  name: 'aplicacion_gestion_tareas_con_geolocalizacion.db',
  location: 'default',
});

const BASE_URL = "http://localhost:3050";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

const login = async (user) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${BASE_URL}/api/v1/users/login`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ocurrio un error al iniciar sesión: ", error);
  }
};

const createUser = async (user) => {
  try {
    if (navigator.onLine) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${BASE_URL}/api/v1/users`, options);
      const data = await response.json();
      return data;
    } else {

      db.transaction(async function (tx) {
        const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
      `;
        tx.executeSql(query, [user.username, user.email, user.password]);
        console.log('Usuario creado localmente en la base de datos SQLite.');
      });

      db.transaction(function (tx) {
        tx.executeSql(`INSERT INTO users (query) VALUES ('${JSON.stringify(user)}')`, [], function (tx, res) {
          console.log('Usuario guardado en la base de datos local');
        }, function (error) {
          console.error('Error al guardar el usuario en la base de datos local: ', error.message);
        });
      });
    }
  } catch (error) {
    console.error("Ocurrio un error al crear el usuario: ", error);
  }
};

const updateUser = async (id, user) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${BASE_URL}/api/v1/users/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ocurrio un error al actualizar el usuario: ", error);
  }
};

const deleteUser = async (id) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${BASE_URL}/api/v1/users/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ocurrio un error al eliminar el usuario: ", error);
  }
};
