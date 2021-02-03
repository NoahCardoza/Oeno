import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useAsync } from "react-async"
import { getDaysFromBatchId } from '@/database';


const DayList = ({days, navigation}) => days.map(({DayRecordId, DayRecordDate}) => (
  <ListItem
    key={DayRecordId}
    bottomDivider
    onPress={() => navigation.push('Records', { dayRecordId: DayRecordId })}
  >
        <ListItem.Content>
          <ListItem.Title>{DayRecordDate}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))


function DaysScreen({ route,  navigation }) {
  const { data, error } = useAsync({ promiseFn: getDaysFromBatchId, batchId: route.params.batchId });
  if (error) return console.error(error);
  return (
    <View>
      <DayList days={data || []} navigation={navigation}></DayList>
    </View>
  );
}

export default DaysScreen;