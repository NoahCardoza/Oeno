import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useAsync } from "react-async"
import { getRecordsFromDayId } from '@/database';


const RecordList = ({records, navigation}) => records.map((record) => (
  <ListItem
    key={record.NotesId}
    bottomDivider
    onPress={() => navigation.push('Record', { record })}
  >
        <ListItem.Content>
          <ListItem.Title>{record.NotesDate}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))


function DaysScreen({ route,  navigation }) {
  const { data, error } = useAsync({ promiseFn: getRecordsFromDayId, dayRecordId: route.params.dayRecordId });
  if (error) return console.error(error);

  return (
    <View>
      <RecordList records={data || []} navigation={navigation}></RecordList>
    </View>
  );
}

export default DaysScreen;