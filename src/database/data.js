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
      observation: 'Everything looks good. Taught my mouse to cartwheel.'
    }
  ],
  input: [
    {
      id: 1,
      recordId: 1,
      tagId: 1,
      value: '7.38',
    },
    {
      id: 2,
      recordId: 1,
      tagId: 2,
      value: '63',
    },
    {
      id: 3,
      recordId: 1,
      tagId: 3,
      value: 'subtile',
    }
  ],
  tag: [
    {
      id: 1,
      type: 'float',
      name: 'pH',
      color: '#abc'
    },
    {
      id: 2,
      type: 'float',
      name: 'F',
      color: '#cba'
    },
    {
      id: 3,
      type: 'text',
      name: 'smell',
      color: '#bca'
    },

  ]
};

export default database;