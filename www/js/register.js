const getFileds = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  return { email, password, username };
};

async function handleCreateUser() {
  const { email, password, username } = getFileds();

  if (validations()) {
    return;
  }

  const { message } = await createUser({ email, password, username });
  if (Boolean(message)) {
    alert(message);
    return window.location.replace("/pages/login.html");
  }

  alert(message);
}

const validations = () => {
  const { email, password, username } = getFileds();

  if (username === "") {
    return alert("El nombre de usuario es requerido");
  }

  if (email === "") {
    return alert("El email es requerido");
  }

  if (password === "") {
    return alert("La contrasena es requerida");
  }
};

document
  .getElementById("button-sign-up")
  .addEventListener("click", handleCreateUser);
