document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
  // window.location.href = "/pages/login.html";
}
document.addEventListener('DOMContentLoaded', function () {
    // Busca el botón por su ID y agrega un manejador de eventos para el evento 'click'
    document.getElementById('deviceready').addEventListener('click', function () {
        // Redirige al usuario a la ruta /pages/tasks
        window.location.href = '/pages/tasks.html';
    });
});