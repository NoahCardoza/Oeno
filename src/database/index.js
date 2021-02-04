import data from './data'
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const connection = SQLite.openDatabase({name: 'OenoDB.sqlite3', createFromLocation: 1, location:'Library'});
export const getAllBatches = async () => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT BatchId,BatchName FROM Batch');
  return results.rows.raw();
}

export const getDaysFromBatchId = async ({batchId}) => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT DayRecord.DayRecordId, DayRecord.DayRecordDate '+
                                        'FROM Batch,DayRecord WHERE Batch.BatchId=DayRecord.BatchId AND DayRecord.BatchId=?',[batchId]);
  return results.rows.raw();
}

export const getRecordsFromDayId = async ({dayRecordId}) => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT * FROM Notes WHERE DayRecordId=?',[dayRecordId]);
  return results.rows.raw();
}

export const getInputsFromRecordId = (recordId) => data.input.filter(r => r.recordId === recordId);

export const getTagById = (id) => data.tag.find(r => r.id === id);
export const getInputsWithTagFromRecordId = (recordId) => getInputsFromRecordId(recordId).map(
  input => ({
    ...input,
    tag: getTagById(input.tagId)
  })
);