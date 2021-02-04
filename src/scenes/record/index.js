import React from 'react';
import { View, Text } from 'react-native';
import { useAsync } from "react-async"

import { getInputsWithTagFromNotesId } from '@/database';

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
  const { data, error } = useAsync({ promiseFn: getInputsWithTagFromNotesId, notesId: route.params.record.NotesId });

  if (error) {
    return console.error(error);
  }

  if(data) {
    return (
      <View>
        <Card>
          <Text>{record.NotesNotes}</Text>
          <Text/> 
          <Card.Divider/>
          {
            data.map(({TagId, TagName, Value, Color}) => {
              return (
                <ListItem key={TagId}>
                  <ListItem.Content>
                    <ListItem.Title>{Value}</ListItem.Title>
                  </ListItem.Content>
                  <Badge value={TagName} badgeStyle={{ backgroundColor: Color }}/>
                </ListItem>
              );
            })
          }
        </Card>
      </View>
    );
  }
  else {
    return (
      <View>
        <Card>
          <Text>{record.NotesNotes}</Text>
          <Text/> 
          <Card.Divider/>
        </Card>
      </View>
    );
  }
}

export default DaysScreen;