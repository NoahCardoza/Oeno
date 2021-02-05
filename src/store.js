import { combineReducers } from 'redux';

const INITIAL_STATE = {
  batches: [{
    BatchId: 1,
    BatchStartDate: Date.now() - (3 * 24 * 60 * 60 * 1000),
    BatchName: 'Testing',
  }],
  records: [
    {
      RecordId: 1,
      BatchId: 1,
      RecordTimestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
    }
  ]
};

const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'ADD_BATCH':
      const { batches, records } = state;
      return {
        batches: [{
          BatchId: 10,
          BatchName: payload
        }, ...batches],
        records,
      }
    default:
      console.warn('No case for:', { type, payload })
      return state
  }
};

export const addBatch = BatchName => (
  {
    type: 'ADD_BATCH',
    payload: BatchName,
  }
);


export default combineReducers({
  app: appReducer
});
