import data from './data'

export const getAllBatches = () => data.batch;
export const getDaysFromBatchId = (batchId) => data.day.filter(r => r.batchId === batchId);
export const getRecordsFromDayId = (dayId) => data.record.filter(r => r.dayId === dayId);
export const getInputsFromRecordId = (recordId) => data.input.filter(r => r.recordId === recordId);
export const getTagById = (id) => data.tag.find(r => r.id === id);
export const getInputsWithTagFromRecordId = (recordId) => getInputsFromRecordId(recordId).map(
  input => ({
    ...input,
    tag: getTagById(input.tagId)
  })
);