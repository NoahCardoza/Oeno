import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { getAllBatches } from '@/database';
import { getAllBatchesUpdated, getAllBatchesUpdated2 } from '@/database/updatedData';

const BatchList = ({ batches, navigation }) => batches.map(({ id, title }) => (
  <ListItem
    key={id}
    bottomDivider
    onPress={() => navigation.push('Days', { batchId: id })}
  >
    <ListItem.Content>
      <ListItem.Title>{title}</ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
));

function BatchesScreen({ navigation }) {
  const batches = getAllBatchesUpdated2();
  const newBatches = getAllBatchesUpdated2();
  return (
    <View>
      <BatchList batches={batches} navigation={navigation}></BatchList>
    </View>
  );
}

export default BatchesScreen;