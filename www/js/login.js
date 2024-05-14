async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { message, user, token } = await login({ email, password });
  if (Boolean(token)) {
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
    return (window.location.href = "/pages/tasks.html");
  }

  alert(message);
}

function navigateToRegister() {
  window.location.href = "/pages/register.html";
}

document
  .getElementById("button-sign-up")
  .addEventListener("click", navigateToRegister);

document
  .getElementById("button-sign-in")
  .addEventListener("click", handleLogin);
