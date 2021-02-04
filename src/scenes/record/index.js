import React from 'react';
import { View, Text } from 'react-native';


import { getInputsWithTagFromRecordId } from '@/database';

import { Card, ListItem, Badge } from 'react-native-elements'




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


function DaysScreen({ route, navigation }) {
  const { record } = route.params;
  console.log(route.params);
  const inputs = getInputsWithTagFromRecordId(route.params.record.DayRecordId)
  return (
    <View>
      <Card>
        <Text>{record.NotesNotes}</Text>
        <Text/> 
        <Card.Divider/>
        {
          inputs.map(({id, tag, value}) => {
            return (
              <ListItem key={id}>
                <ListItem.Content>
                  <ListItem.Title>{value}</ListItem.Title>
                </ListItem.Content>
                <Badge value={tag.name} badgeStyle={{ backgroundColor: tag.color }}/>
              </ListItem>
            );
          })
        }
      </Card>
    </View>
  );
}

export default DaysScreen;