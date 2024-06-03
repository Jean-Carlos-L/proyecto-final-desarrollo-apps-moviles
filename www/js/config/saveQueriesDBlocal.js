function saveQueryToSyncDatabase(query) {
  console.log("query to  local", query);
  db.transaction(function (tx) {
    tx.executeSql(
      "INSERT INTO sync_database (query) VALUES (?)",
      [query],
      function (tx, res) {
        console.log("Query saved to sync_database successfully");
      },
      function (tx, error) {
        console.log(
          "Error while saving query to sync_database: " + error.message
        );
      }
    );
  });
}
