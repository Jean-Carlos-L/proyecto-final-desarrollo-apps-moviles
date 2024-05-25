
function createDb(){
  const db = window.sqlitePlugin.openDatabase({
    name: 'aplicacion_gestion_tareas_con_geolocalizacion.db',
    location: 'default',
  });

  console.log('Base de datos abierta: ', db);

  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT DEFAULT NULL,
      remainder DATETIME DEFAULT NULL,
      latitude TEXT DEFAULT NULL,
      longitude TEXT DEFAULT NULL,
      altitude TEXT DEFAULT NULL,
      accuracy TEXT DEFAULT NULL,
      altitude_accuracy TEXT DEFAULT NULL,
      heading TEXT DEFAULT NULL,
      speed TEXT DEFAULT NULL,
      timestamp TEXT DEFAULT NULL,
      user_id INTEGER NOT NULL,
      state INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
    )`, [], function(tx, res) {
      console.log('Tabla tasks creada correctamente');
    }, function(error) {
      console.error('Error al crear la tabla tasks: ', error.message);
    });

    tx.executeSql(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      theme TEXT NOT NULL DEFAULT 'light',
      notification TEXT NOT NULL DEFAULT 'on',
      state INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT NULL
    )`, [], function(tx, res) {
      console.log('Tabla users creada correctamente');
    }, function(error) {
      console.error('Error al crear la tabla users: ', error.message);
    });

    tx.executeSql(`CREATE TABLE IF NOT EXISTS sync_database (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT,
      sync BOOLEAN DEFAULT FALSE
    )`, [], function(tx, res) {
      console.log('Tabla sync_database creada correctamente');
    }, function(error) {
      console.error('Error al crear la tabla sync_database: ', error.message);
    });

  }, function(error) {
    console.error('Error en la transacción: ', error.message);
  }, function() {
    console.log('Tablas creadas correctamente');
  });
}

createDb();


document.addEventListener("deviceready", async function() {
  onDeviceReady();
}, false);


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


