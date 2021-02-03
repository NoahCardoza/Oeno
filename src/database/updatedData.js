var SQLite = require('react-native-sqlite-storage');

const errCallback = (err) => {
  console.log("SQL Error: " + err);
}


const successCallback = () => {
console.log("Database successfully opened");
}

let db = SQLite.openDatabase({name: 'OenoDB.sqlite3', createFromLocation: 1}, successCallback, errCallback);

export const getAllBatchesUpdated = () => {
    let batches = [];
    db.transaction(function (tx) {
        tx.executeSql(
          'SELECT ?,? FROM Batch',
          ['BatchId', 'BatchName'],
          (tx, results) => {
            var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(i));
              }
          },
          (err) => {
            console.log(err);
          }
        );
    });
    return batches;
}

export default db;