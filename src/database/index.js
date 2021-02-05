import data from './data'
import SQLite from 'react-native-sqlite-storage';
import { useAsync } from "react-async"
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

export const getTagById = async({TagId}) => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT * FROM Tag WHERE TagId=?',[TagId]);
  return results.rows.raw();
}

export const getEntryFromNotesId = async({notesId}) => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT Connector.NotesId, Entry.EntryId, Entry.TagId, Entry.Value '+
    'FROM Entry,Connector WHERE Entry.EntryId=Connector.EntryId AND Connector.NotesId=?',[notesId]);
  return results.rows.raw();
}

export const getInputsWithTagFromNotesId = async({notesId}) => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT Connector.NotesId,Entry.EntryId,Entry.TagId,Entry.Value,Tag.TagName,Tag.Type,Tag.Color ' +
                                        'FROM Entry,Connector,Tag' +
                                        ' WHERE Entry.EntryId=Connector.EntryId AND Entry.TagId=Tag.TagId AND Connector.NotesId=?',[notesId]);
  return results.rows.raw();
}

export const getAllTags = async() => {
  const db = await connection;
  const [results] = await db.executeSql('SELECT * FROM Tag');
  return results.rows.raw();
}
