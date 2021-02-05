import React from 'react';
import { View, Text } from 'react-native';

import { Card } from 'react-native-elements'
import RecordInputList from '@/components/RecordInputList'


function RecordScreen({ route, navigation }) {
  const { record } = route.params;
  return (
    <View>
      <Card containerStyle={{marginBottom: 20}}>
        <Text>{record.RecordObservation}</Text>
      </Card>
      {RecordInputList(record.RecordInputs)}
    </View>
  );
}

const mapStateToProps = ({batches}) => ({ batches })



export default RecordScreen //connect()(RecordScreen);