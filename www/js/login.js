async function handleLogin() {
  const { email, password } = getFieldsLogin();
  const { message, user, token } = await login({ email, password });
  console.log("email", email);
  console.log("password", password);
  const users = await getUsersOffline();
  console.log("users", users);
  console.log("user", user);
  clearFields();
  if (Boolean(token)) {
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
    return true;
  }

  alert(message);
}

const clearFields = () => {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
};

const getFieldsLogin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  return { email, password };
};

const handleSignOut = () => {
  localStorage.removeItem("user");
};
