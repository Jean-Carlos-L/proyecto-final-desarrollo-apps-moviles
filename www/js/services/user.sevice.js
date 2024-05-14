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
