import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import PlusButton from '@/components/PlusButton';
import Prompt from '@/utils/prompt';

import { addBatch } from '@/store';

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';


const mapStateToProps = ({ batches }) => ({ batches });
const mapDispatchToProps = dispatch => bindActionCreators({ addBatch }, dispatch);
const ReduxConnector = connect(mapStateToProps, mapDispatchToProps);

const NewBatchButton = ReduxConnector(({ addBatch }) => (
    <PlusButton onPress={
      () => Prompt({
          prompt: "Enter a new batch name:",
          onSuccess: name => addBatch(name)
      })
    }/>
  ))

export const BatchesScreenOptions = {
  headerRight: () => <NewBatchButton/>
}

export function BatchesScreenComponent({ batches, navigation}) {
  return (
    <View>
      {batches.map(({ BatchId, BatchName }) => (
      <ListItem
        key={BatchId}
        bottomDivider
        onPress={() => navigation.push('Days', { BatchId })}
      >
        
        <ListItem.Content>
          <ListItem.Title>{BatchName}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))}
    </View>
  );
}






export const BatchesScreen = ReduxConnector(BatchesScreenComponent);



// export default BatchesScreen;