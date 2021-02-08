import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import PlusButton from '@/components/PlusButton';

import { connect } from 'react-redux';

const isIOS = require('react-native').Platform.OS === 'ios';


const mapStateToProps = ({ records }, { route }) => {
  const startDate = route.params.date;
  const endDate = startDate + (24 * 60 * 60 * 1000);
  return {
    records: records.filter(({ BatchId, RecordTimestamp }) =>
      BatchId === route.params.BatchId && RecordTimestamp >= startDate && RecordTimestamp < endDate)
  }
}

const ReduxConnector = connect(mapStateToProps);

export const RecordsScreenOptions = ({ route, navigation}) => ({
  headerRight: () => (
    <PlusButton onPress={
      () => navigation.push('New Record', {
        BatchId: route.params.BatchId
      })
    }/>
  )
})


function RecordsScreenComponent({ records, navigation, route }) {
  if(isIOS) {
    return (
      <View>
        {records.map((record) => (
          <ListItem
            key={record.RecordId}
            bottomDivider
            onPress={() => navigation.push('Record', { record })}
          >
            <ListItem.Content>
              <ListItem.Title>{new Date(record.RecordTimestamp).toLocaleString().split(', ')[1]}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    );
  }
  else {
    return (
      <View>
        {records.map((record) => (
          <ListItem
            key={record.RecordId}
            bottomDivider
            onPress={() => navigation.push('Record', { record })}
          >
            <ListItem.Content>
              <ListItem.Title>{new Date(record.RecordTimestamp).toLocaleString().split(', ')[1]}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
        <View style={{marginTop: 20}}>
          <PlusButton 
            onPress={
              () => navigation.push('New Record', {
              BatchId: route.params.BatchId
            })
          }/>
        </View>
      </View>
    );
  }
}

export const RecordsScreen = ReduxConnector(RecordsScreenComponent);