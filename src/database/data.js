const database = {
  batch: [
    {
      id: 1,
      title: 'Cabernet Sauvignon',
    },
    {
      id: 2,
      title: 'Carignan'
    }
  ],
  day: [
    {
      id: 1,
      batchId: 1,
      date: '01/15/21'
    },
    {
      id: 2,
      batchId: 1,
      date: '01/16/21',
    },
    {
      id: 3,
      batchId: 2,
      date: '01/17/21'
    },
    {
      id: 4,
      batchId: 2,
      date: '01/21/21',
    }
  ],
  record: [
    {
      id: 1,
      dayId: 1,
      timestamp: '12:31 PM',
      observation: 'This was all I could think of.'
    }
  ],
  input: [
    {
      id: 1,
      recordId: 1,
      tagId: 1,
      value: '7.38',
    }
  ],
  tag: [
    {
      id: 1,
      type: 'float',
      name: 'pH',
    }
  ]
};

export default database;