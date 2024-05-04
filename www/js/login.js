async function login(event) {
  //   event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = findUserByEmail({ email, password });

  if (!user) return alert("User not found");

  window.location.href = "/index.html";
}

document.getElementById("button-sign-in").addEventListener("click", login);

function findUserByEmail({ email, password }) {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) return null;
  const user = users.find((user) => user.email === email);
  return user.password === password ? user : null;
}

function navigateToRegister() {
  window.location.href = "/pages/register.html";
}

document
  .getElementById("button-sign-up")
  .addEventListener("click", navigateToRegister);
