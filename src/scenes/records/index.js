import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { getRecordsFromDayId } from '@/database';


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


function DaysScreen({ route,  navigation }) {
  const records = getRecordsFromDayId(route.params.dayId)
  return (
    <View>
      <RecordList records={records} navigation={navigation}></RecordList>
    </View>
  );
}

export default DaysScreen;