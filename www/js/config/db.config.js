document.addEventListener("deviceready", onDeviceReady, false);

let db = null;

function onDeviceReady() {
  try {
    db = window.sqlitePlugin.openDatabase({
      name: "tasksya.db",
      location: "default",
    });

    db.transaction(function (tx) {
      tx.executeSql("DROP TABLE IF EXISTS sync_database");

      tx.executeSql(
        "CREATE TABLE sync_database (id INTEGER PRIMARY KEY AUTOINCREMENT, query TEXT, sync INTEGER DEFAULT 0)"
      );

      tx.executeSql("DROP TABLE IF EXISTS tasks");

      tx.executeSql(`CREATE TABLE tasks (
        id_task TEXT NOT NULL,
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
        user_id TEXT NOT NULL,
        state INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id_user) ON UPDATE CASCADE
      )`);

      tx.executeSql("DROP TABLE IF EXISTS users");

      tx.executeSql(`CREATE TABLE users (
          id_user TEXT NOT NULL,
          username TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          theme TEXT NOT NULL DEFAULT 'light',
          notification TEXT NOT NULL DEFAULT 'on',
          state INTEGER NOT NULL DEFAULT 1,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT NULL
        )`);
    });

    console.log("Database opened successfully");
  } catch (e) {
    console.log("Error opening database " + e.message);
  }
}
