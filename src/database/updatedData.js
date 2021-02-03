const SQLite = require('react-native-sqlite-storage');
SQLite.enablePromise(true);


const connection = SQLite.openDatabase({name: 'OenoDB.sqlite3', createFromLocation: 1, location:'Library'})

export const getAllBatchesUpdated = async () => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT BatchId,BatchName FROM Batch')
  
  return results.rows.raw();
}