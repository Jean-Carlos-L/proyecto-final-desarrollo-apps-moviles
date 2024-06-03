// const BASE_URL = "http://localhost:3050";

const login = async (user) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
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
    } else {
      const data = await loginOffline(user);
      return { user: data, message: "Login bien", token: "token" };
    }
  } catch (error) {
    console.error("Ocurrio un error al iniciar sesión: ", error);
    return { message: "Ocurrio un error al iniciar sesión" };
  }
};

const createUser = async (user) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
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
      createUserOffline(user);
      return { message: "Usuario creado sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al crear el usuario: ", error);
  }
};

const updateUser = async (id, user) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
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
    } else {
      updateUserOffline(id, user);
      return { message: "Usuario actualizado sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al actualizar el usuario: ", error);
  }
};

const deleteUser = async (id) => {
  try {
    const isConnection = checkConnection();
    if (isConnection === true) {
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
    } else {
      deleteUserOffline(id);
      return { message: "Usuario eliminado sin conexión" };
    }
  } catch (error) {
    console.error("Ocurrio un error al eliminar el usuario: ", error);
  }
};
