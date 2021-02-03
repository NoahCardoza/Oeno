import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useAsync } from "react-async"



import { getAllBatches } from '@/database';
import { getAllBatchesUpdated } from '@/database/updatedData';

const BatchList = ({ batches, navigation }) => batches.map(({ BatchId, BatchName }) => (
  <ListItem
    key={id}
    bottomDivider
    onPress={() => navigation.push('Days', { batchId: BatchId })}
  >
    <ListItem.Content>
      <ListItem.Title>{BatchName}</ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
));

function BatchesScreen({ navigation }) {
  const { data, error } = useAsync({ promiseFn: getAllBatchesUpdated })
  if (error) return console.error(error)

  return (
    <View>
      <BatchList batches={data || []} navigation={navigation}></BatchList>
    </View>
  );
}

export default BatchesScreen;