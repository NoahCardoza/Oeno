import React from 'react';
import { View, Text } from 'react-native';


import { getInputsWithTagFromRecordId } from '@/database';

import { Card, ListItem, Button, Icon } from 'react-native-elements'




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
  const inputs = getInputsWithTagFromRecordId(route.params.record.id)
  return (
    <View>
      <Card>
        <Text>{record.observation}</Text>
        <Text/> 
        <Card.Divider/>
        {
          inputs.map(({id, tag, value}) => {
            return (
              <View key={id}>
                <Text>{`${tag.name} ${value}`}</Text>
              </View>
            );
          })
        }
      </Card>
    </View>
  );
}

export default DaysScreen;