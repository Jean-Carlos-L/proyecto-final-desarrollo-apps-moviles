const setFields = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("email").value = user.email;
  document.getElementById("username").value = user.username;
  document.getElementById("theme").value = user.theme;
  document.getElementById("notification").value = user.notification;
};

const getFields = () => {
  return {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    theme: document.getElementById("theme").value,
    notification: document.getElementById("notification").value,
  };
};

const handleSave = () => {
  const user = getFields();
  editProfileUserService(user);
};

const editProfileUserService = async (user) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const URL = `http://localhost:3050/api/v1/users/${userId}`;
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const { message } = await response.json();

    if (response.status === 200) {
      alert(message);
      return;
    }
  } catch (error) {
    console.error(error);
    alert("Error updating user");
  }
};

document.addEventListener("DOMContentLoaded", setFields);

document.getElementById("button-save").addEventListener("click", handleSave);
