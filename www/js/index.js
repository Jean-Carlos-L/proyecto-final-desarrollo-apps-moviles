import verifySession from "./verifySession.js";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  verifySession();
  document.getElementById("deviceready").classList.add("ready");
  // window.location.href = "/pages/login.html";
}
