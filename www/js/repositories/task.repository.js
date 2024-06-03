function createTaskOffline(task) {
  const {
    title,
    description,
    user_id = getUser().id_user,
    priority = null,
    remainder = null,
    latitude = null,
    longitude = null,
    altitude = null,
    accuracy = null,
    altitude_accuracy = null,
    heading = null,
    speed = null,
    timestamp = null,
    state = 1,
    createdAt = formatDate(new Date()),
    updatedAt = null,
    id_task = generateId(),
  } = task;

  const sqlQueryWithValues = `INSERT INTO tasks (id_task, title, description, priority, remainder, latitude, longitude, altitude, accuracy, altitude_accuracy, heading, speed, timestamp, user_id, state, created_at, updated_at) VALUES ('${id_task}', '${title}', '${description}', ${priority}, ${remainder}, ${latitude}, ${longitude}, ${altitude}, ${accuracy}, ${altitude_accuracy}, ${heading}, ${speed}, ${timestamp}, '${user_id}', ${state}, '${createdAt}', ${updatedAt});`;

  db.transaction(function (tx) {
    tx.executeSql(
      `INSERT INTO tasks (id_task, title, description, priority, remainder, latitude, longitude, altitude, accuracy, altitude_accuracy, heading, speed, timestamp, user_id, state, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_task,
        title,
        description,
        priority,
        remainder,
        latitude,
        longitude,
        altitude,
        accuracy,
        altitude_accuracy,
        heading,
        speed,
        timestamp,
        user_id,
        state,
        createdAt,
        updatedAt,
      ],
      function (tx, res) {
        console.log("res", res);
        console.log("Task created successfully with ID: " + res.insertId);
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while creating task: " + error.message);
      }
    );
  });
}

function getTasksOffline() {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM tasks WHERE user_id = ?",
        [getUser().id_user],
        function (tx, res) {
          const tasks = [];
          for (let i = 0; i < res.rows.length; i++) {
            tasks.push(res.rows.item(i));
          }
          resolve(tasks);
        },
        function (tx, error) {
          reject("Error while fetching tasks: " + error.message);
        }
      );
    });
  });
}

function getTaskByIdOffline(id, callback) {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
      function (tx, res) {
        if (res.rows.length > 0) {
          callback(res.rows.item(0));
        } else {
          console.log("Task not found");
        }
      },
      function (tx, error) {
        console.log("Error while fetching task: " + error.message);
      }
    );
  });
}

function updateTaskOffline(id, task) {
  const {
    title,
    description,
    user_id = getUser().id_user,
    priority = null,
    remainder = null,
    latitude = null,
    longitude = null,
    altitude = null,
    accuracy = null,
    altitude_accuracy = null,
    heading = null,
    speed = null,
    timestamp = null,
    state = 1,
    updatedAt = formatDate(new Date()),
  } = task;

  const sqlQueryWithValues = `UPDATE tasks SET title = '${title}',description = '${description}',priority = ${priority},remainder = ${remainder},latitude = ${latitude},longitude = ${longitude},altitude = ${altitude},accuracy = ${accuracy},altitude_accuracy = ${altitude_accuracy},heading = ${heading},speed = ${speed},timestamp = ${timestamp},user_id = '${user_id}',state = ${state},updated_at = '${updatedAt}' WHERE id_task = ${id};`;

  db.transaction(function (tx) {
    tx.executeSql(
      `UPDATE tasks SET title = ?, description = ?, priority = ?, remainder = ?, latitude = ?, longitude = ?, altitude = ?, accuracy = ?, altitude_accuracy = ?, heading = ?, speed = ?, timestamp = ?, user_id = ?, state = ?, updated_at = ? WHERE id_task = ?`,
      [
        title,
        description,
        priority,
        remainder,
        latitude,
        longitude,
        altitude,
        accuracy,
        altitude_accuracy,
        heading,
        speed,
        timestamp,
        user_id,
        state,
        updatedAt,
        id,
      ],
      function (tx, res) {
        console.log("Task updated successfully");
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while updating task: " + error.message);
      }
    );
  });
}

function deleteTaskOffline(id) {
  const sqlQueryWithValues = `DELETE FROM tasks WHERE id_task = ${id}`;
  db.transaction(function (tx) {
    tx.executeSql(
      "DELETE FROM tasks WHERE id = ?",
      [id],
      function (tx, res) {
        console.log("Task deleted successfully");
        saveQueryToSyncDatabase(sqlQueryWithValues);
      },
      function (tx, error) {
        console.log("Error while deleting task: " + error.message);
      }
    );
  });
}

function completeTaskOffline(taskId) {
  const updatedAt = formatDate(new Date());
  const sqlQueryWithValues = `UPDATE tasks SET state = 2, updated_at = '${updatedAt}' WHERE id_task = '${taskId}'`;
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      const updatedAt = new Date().toISOString();
      tx.executeSql(
        "UPDATE tasks SET state = 2, updated_at = ? WHERE id_task = ?",
        [updatedAt, taskId],
        function (tx, res) {
          if (res.rowsAffected > 0) {
            console.log("Task completed successfully");
            saveQueryToSyncDatabase(sqlQueryWithValues);
            resolve();
          } else {
            reject("Task not found");
          }
        },
        function (tx, error) {
          reject("Error while completing task: " + error.message);
        }
      );
    });
  });
}
