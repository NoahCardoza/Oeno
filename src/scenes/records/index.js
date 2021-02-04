import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { getRecordsFromDayId } from '@/database';

import PlusButton from '@/components/PlusButton';


const RecordList = ({records, navigation}) => records.map((record) => (
  <ListItem
    key={record.id}
    bottomDivider
    onPress={() => navigation.push('Record', { record })}
  >
        <ListItem.Content>
          <ListItem.Title>{record.timestamp}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
))
    
export const RecordsScreenOptions = ({ route, navigation}) => ({
  headerRight: () => (
    <PlusButton onPress={
      () => navigation.push('New Record', {
        dayId: route.params.dayId
      })
    }/>
  )
})


export function RecordsScreen({ route, navigation }) {
  const records = getRecordsFromDayId(route.params.dayId)
  return (
    <View>
      <RecordList records={records} navigation={navigation}></RecordList>
    </View>
  );
}