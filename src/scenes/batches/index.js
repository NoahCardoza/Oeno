import React from 'react';
import { View, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { useAsync } from "react-async"
import { getAllBatches } from '@/database';

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

const PromptUser = ({ prompt, onSuccess }) => Alert.prompt(
      prompt,
      null,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Save",
          onPress: onSuccess
        }
      ],
      "plain-text"
    )

export const BatchesScreenOptions = {
  headerRight: () => (
      <Icon
        style={{ margin: 10}}
        name="add"
        color="#0A84FF"
        onPress={() => PromptUser({
          prompt: "Enter a new batch name:",
          onSuccess: BatchName => Batches.setData([{ BatchId: 10, BatchName }, ...Batches.data])
        })}  
    />
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