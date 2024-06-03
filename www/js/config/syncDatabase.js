function synchronizationLocalDb() {
  // Hacer la solicitud al endpoint para obtener los queries
  fetch(`${BASE_URL}/api/v1/sync/sync_local`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      data?.forEach((query) => {
        if (query.sync === 0) {
          db.transaction(function (tx) {
            tx.executeSql(
              query.query,
              [],
              function (tx, res) {
                console.log("Query executed successfully:", query);
              },
              function (tx, error) {
                console.error("Error while executing query:", error.message);
              }
            );
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error while fetching or executing queries:", error);
    });
}

function synchronizationCloudDb() {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM sync_database WHERE sync = 0",
      [],
      function (tx, res) {
        const rows = res.rows;
        const dataToSend = [];

        // Recorrer los resultados y agregarlos a un array
        for (let i = 0; i < rows.length; i++) {
          const row = rows.item(i);
          dataToSend.push(row); // Suponiendo que "query" es el nombre de la columna que contiene los datos a enviar
        }

        if (dataToSend.length > 0) {
          console.log("dataToSend", dataToSend);
          // Realizar la petición POST con los datos
          fetch(`${BASE_URL}/api/v1/sync/sync_remote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          })
            .then((response) => {
              if (response.ok) {
                // Si la petición es exitosa, actualizar los datos en la base de datos local
                db.transaction(function (tx) {
                  tx.executeSql(
                    "UPDATE sync_database SET sync = 1 WHERE sync = 0",
                    [],
                    function (tx, res) {
                      console.log("Sync completed successfully");
                    },
                    function (tx, error) {
                      console.error(
                        "Error while updating sync status:",
                        error.message
                      );
                    }
                  );
                });
                console.log("Biennnnnnnnnn");
              } else {
                console.error(
                  "Failed to sync data. Server returned status:",
                  response.status
                );
              }
            })
            .catch((error) => {
              console.error("Error while syncing data:", error);
            });
        }
      },
      function (tx, error) {
        console.error("Error while querying sync_database:", error.message);
      }
    );
  });
}

function synchronization() {
  if (checkConnection() === true) {
    console.log("Synchronization started");
    synchronizationLocalDb();
    synchronizationCloudDb();
  }
}
