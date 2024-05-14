document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  verifySession();
}

document
  .getElementById("button-sign-out")
  .addEventListener("click", handleSignOut);

function handleSignOut() {
  localStorage.removeItem("user");
  window.location.href = "/pages/login.html";
}
