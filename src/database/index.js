import data from './data'
import SQLite from 'react-native-sqlite-storage';
import { useAsync } from "react-async"
import { add } from 'react-native-reanimated';
SQLite.enablePromise(true);

// Get entries from DB
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

// Add entries to DB
export const createBatch = async({batchName, batchDesc=''}) => {
  if(!batchName) {
    throw 'batchName is null';
  }
  else {
    const db = await connection;
    const [results] = await db.executeSql('INSERT INTO Batch(BatchStartDate, BatchName, BatchDescription) VALUES(DATE(\'NOW\'),?,?)', [batchName, batchDesc]);

    if(results.rowsAffected > 0) {
      const [newBatches] = await db.executeSql('SELECT * FROM Batch');
      let rows = newBatches.rows.raw();
      let batchId = rows[rows.length - 1].BatchId;
      await createDayFromBatchId({batchId: batchId}).catch((err) => console.log(err));
      return rows;
    }
    else {
      throw 'New batch not created';
    }
  }
}

export const createDayFromBatchId = async({batchId}) => {
  if(!batchId) {
    throw 'batchId is null';
  }
  else {
    const db = await connection;
    const [currentDate] = await db.executeSql('SELECT * FROM DayRecord WHERE DayRecordDate=Date(\'now\') AND BatchId=?', [batchId]);

    if(currentDate && currentDate.rows.raw().length <= 0) {
      const [addDay] = await db.executeSql('INSERT INTO DayRecord(BatchId, DayRecordDate) VALUES(?,Date(\'now\'))', [batchId]);

      if(addDay.rowsAffected > 0) {
        const [result] = await db.executeSql('SELECT * FROM DayRecord WHERE BatchId=?', [batchId]);
        return result.rows.raw();
      }
    }

    throw 'New day not created';

  }
}

export const createRecordFromDayRecordId = async({dayRecordId, note}) => {
  if(!dayRecordId) {
    throw 'batchId is null';
  }
  if(!note) {
    note='';
  }

  const db = await connection;
  const [recordEntry] = await db.executeSql('INSERT INTO Notes(DayRecordId, NotesDate, NotesNotes) VALUES(?,DATETIME(\'NOW\'),?)); ', [dayRecordId, note]);

  if(recordEntry.rowsAffected > 0) {
    const [result] = await db.executeSql('SELECT * FROM Notes WHERE dayRecordId=?', [dayRecordId]);
    return result.rows.raw();
  }

  throw 'New record not created';
}


