import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { getRecordsFromDayId } from '@/database';

import PlusButton from '@/components/PlusButton';

import { connect } from 'react-redux';

const mapStateToProps = ({ app: { records } }, { route }) => {
  const startDate = route.params.date;
  const endDate = startDate + (24 * 60 * 60 * 1000);
  return {
    records: records.filter(({ BatchId, RecordTimestamp }) =>
      BatchId === route.params.BatchId && RecordTimestamp >= startDate && RecordTimestamp < endDate)
  }
}

export const RecordsScreenOptions = ({ route, navigation}) => ({
  headerRight: () => (
    <PlusButton onPress={
      () => navigation.push('New Record', {
        dayId: route.params.dayId
      })
    }/>
  )
})


function RecordsScreenComponent({ records, navigation }) {
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

export const RecordsScreen = connect(mapStateToProps)(RecordsScreenComponent);