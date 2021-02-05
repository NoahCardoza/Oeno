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
  const inputs = getInputsWithTagFromRecordId(route.params.record.id)
  return (
    <View>
      <Card containerStyle={{marginBottom: 20}}>
        <Text>{record.observation}</Text>
      </Card>
        {
          inputs.map(({id, tag, value}, i) => {
            return (
              <ListItem key={id} bottomDivider topDivider={i === 0}>
                <ListItem.Content>
                  <ListItem.Title>{value}</ListItem.Title>
                </ListItem.Content>
                <Badge value={tag.name} textStyle={{ fontWeight: 'bold', fontSize: 15 }} badgeStyle={{ padding: 3, height: null }}/>
              </ListItem>
            );
          })
        }
    </View>
  );
}

export default DaysScreen;