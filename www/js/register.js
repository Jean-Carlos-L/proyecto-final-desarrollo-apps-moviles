const getFiledsRegister = () => {
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;
  const username = document.getElementById("username-register").value;

  return { email, password, username };
};

const handleCreateUser = async () => {
  const { email, password, username } = getFiledsRegister();
  console.log("getFields()", getFiledsRegister());
  if (validationsCreateUser()) {
    return;
  }

  const { message } = await createUser({ email, password, username });
  if (Boolean(message)) {
    const users = await getUsersOffline();
    console.log("users", users);
    return true;
  }

  alert(message);
};

const validationsCreateUser = () => {
  const { email, password, username } = getFiledsRegister();

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
