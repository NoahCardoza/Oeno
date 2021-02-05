import { createStore } from 'redux';
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'



const INITIAL_STATE = {
  batchesLastId: 1,
  batches: [{
    BatchId: 1,
    BatchStartDate: Date.now() - (3 * 24 * 60 * 60 * 1000),
    BatchName: 'Testing',
  }],
  recordsLastId: 1,
  records: [
    {
      RecordId: 1,
      BatchId: 1,
      RecordTimestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
      RecordObservation: 'Today I got wine drunk and taught my pig to fly.',
      RecordInputs: [
        {
          InputValue: 7.45,
          InputTag: 'pH'
        }
      ]
    }
  ],
  tags: [
    'pH',
    '°F',
    '°C',
  ]
};

const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'ADD_BATCH':
      const { batchesLastId, batches } = state;
      
      return {
        ...state,
        batchesLastId: batchesLastId + 1,
        batches: [{
          BatchId: batchesLastId + 1,
          BatchStartDate: Date.now(),
          BatchName: payload
        }, ...batches],
      }
    case 'ADD_RECORD':
      const { recordsLastId, records } = state;
      const { BatchId, RecordObservation, RecordInputs } = payload;
      return {
        ...state,
        recordsLastId: recordsLastId + 1,
        records: [{
          RecordId: recordsLastId + 1,
          BatchId,
          RecordTimestamp: Date.now(),
          RecordObservation,
          RecordInputs
      }, ...records]
      }
    case 'ADD_TAG':
      const { tags } = state;
      return {
        ...state,
        tags: [...tags, payload]
      }
    default:
      // if (!type.startsWith('@@')) {
      //   console.warn('No case for:', { type, payload })
      // }
      return state
  }
};

export const addBatch = BatchName => (
  {
    type: 'ADD_BATCH',
    payload: BatchName,
  }
);

export const addTag = TagName => (
  {
    type: 'ADD_TAG',
    payload: TagName,
  }
);

export const addRecord = ({BatchId, RecordObservation, RecordInputs}) => (
  {
    type: 'ADD_RECORD',
    payload: {BatchId, RecordObservation, RecordInputs},
  }
);


const persistedReducer = persistReducer({
    key: 'persistedRootStore',
    storage: AsyncStorage
}, appReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)



// export default combineReducers({
//   app: appReducer
// });
