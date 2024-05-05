function handleCreateUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  console.log("first", email);
  createUser({ email, password, username });
  alert("User created successfully");
  window.location.href = "/pages/login.html";
}

document
  .getElementById("button-sign-up")
  .addEventListener("click", handleCreateUser);

function createUser({ email, password, username }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email, password, username });
  localStorage.setItem("users", JSON.stringify(users));
}
