async function createUserOffline(user) {
  const {
    username,
    email,
    password,
    theme = "light",
    notification = "on",
    state = 1,
    createdAt = formatDate(new Date()),
    updatedAt = null,
    id_user = generateId(),
  } = user;
  const newPassword = await encryptPassword(password);

  const sqlQueryWithValues = `INSERT INTO users (id_user, username, email, password, theme, notification, state, created_at, updated_at) VALUES ('${id_user}', '${username}', '${email}', '${newPassword}', '${theme}', '${notification}', ${state}, '${createdAt}', ${updatedAt});`;

  db.transaction(function (tx) {
    tx.executeSql(
      "INSERT INTO users (id_user, username, email, password, theme, notification, state, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_user,
        username,
        email,
        newPassword,
        theme,
        notification,
        state,
        createdAt,
        updatedAt,
      ],
      function (tx, res) {
        console.log("res", res);
        console.log("User created successfully with ID: " + res.insertId);
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while creating user: " + error.message);
      }
    );
  });
}

function getUsersOffline() {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        function (tx, res) {
          const users = [];
          for (let i = 0; i < res.rows.length; i++) {
            users.push(res.rows.item(i));
          }
          console.log("users query", users);
          resolve(users);
        },
        function (tx, error) {
          reject("Error while fetching users: " + error.message);
        }
      );
    });
  });
}

function getUserByIdOffline(id, callback) {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM users WHERE id_user = ?",
      [id],
      function (tx, res) {
        if (res.rows.length > 0) {
          callback(res.rows.item(0));
        } else {
          console.log("User not found");
        }
      },
      function (tx, error) {
        console.log("Error while fetching user: " + error.message);
      }
    );
  });
}

async function updateUserOffline(id, user) {
  const {
    username,
    email,
    password,
    theme = "light",
    notification = "on",
    state = 1,
    updatedAt = formatDate(new Date()),
  } = user;

  const newPassword = await encryptPassword(password);

  const sqlQueryWithValues = `UPDATE users SET username = '${username}',email = '${email}',password = '${newPassword}',theme = '${theme}',notification = '${notification}',state = ${state},updated_at = '${updatedAt}' WHERE id_user = ${id};`;

  db.transaction(function (tx) {
    tx.executeSql(
      "UPDATE users SET username = ?, email = ?, password = ?, theme = ?, notification = ?, state = ?, updated_at = ? WHERE id_user = ?",
      [username, email, newPassword, theme, notification, state, updatedAt, id],
      function (tx, res) {
        console.log("User updated successfully");
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while updating user: " + error.message);
      }
    );
  });
}

function deleteUserOffline(id) {
  const sqlQueryWithValues = `DELETE FROM users WHERE id_user = ${id}`;
  db.transaction(function (tx) {
    tx.executeSql(
      "DELETE FROM users WHERE id_user = ?",
      [id],
      function (tx, res) {
        console.log("User deleted successfully");
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while deleting user: " + error.message);
      }
    );
  });
}

async function loginOffline(credentials) {
  const { email, password } = credentials;
  const encryptedPassword = await encryptPassword(password);
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, encryptedPassword],
        function (tx, res) {
          if (res.rows.length > 0) {
            const user = res.rows.item(0);
            console.log("Login successful");
            resolve(user);
          } else {
            console.log("Invalid email or password");
            reject("Invalid email or password");
          }
        },
        function (tx, error) {
          console.log("Error while logging in: " + error.message);
          reject(error.message);
        }
      );
    });
  });
}
