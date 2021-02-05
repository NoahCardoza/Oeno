import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useAsync } from "react-async"
import { getAllBatches } from '@/database';
import PlusButton from '@/components/PlusButton';
import Prompt from '@/utils/prompt';

let Batches;

const BatchList = ({ batches, navigation }) => batches.map(({ BatchId, BatchName }) => (
  <ListItem
    key={BatchId}
    bottomDivider
    onPress={() => navigation.push('Days', { batchId: BatchId })}
  >
    <ListItem.Content>
      <ListItem.Title>{BatchName}</ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
));

export const BatchesScreenOptions = {
  headerRight: () => (
    <PlusButton onPress={
      () => Prompt({
          prompt: "Enter a new batch name:",
          onSuccess: BatchName => Batches.setData([{ BatchId: 10, BatchName }, ...Batches.data])
      })
    }/>
  ),
}

export function BatchesScreen({ navigation }) {
  Batches = useAsync({ promiseFn: getAllBatches })
  if (Batches.error) return console.error(Batches.error)
  return (
    <View>
      <BatchList batches={Batches.data || []} navigation={navigation}></BatchList>
    </View>
  );
}



export default BatchesScreen;