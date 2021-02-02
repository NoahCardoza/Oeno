import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { getDaysFromBatchId } from '@/database';


const DayList = ({days, navigation}) => days.map(({id, date }) => (
  <ListItem
    key={id}
    bottomDivider
    onPress={() => navigation.push('Records', { dayId: id })}
  >
        <ListItem.Content>
          <ListItem.Title>{date}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))


function DaysScreen({ route,  navigation }) {
  const days = getDaysFromBatchId(route.params.batchId)
  return (
    <View>
      <DayList days={days} navigation={navigation}></DayList>
    </View>
  );
}

export default DaysScreen;