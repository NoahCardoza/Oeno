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
  return (
    <View>
      <Card containerStyle={{marginBottom: 20}}>
        <Text>{record.RecordObservation}</Text>
      </Card>
        {
          record.RecordInputs.map(({ InputValue, InputTag }, i) => {
            return (
              <ListItem key={i} bottomDivider topDivider={i === 0}>
                <ListItem.Content>
                  <ListItem.Title>{InputValue}</ListItem.Title>
                </ListItem.Content>
                <Badge value={InputTag} textStyle={{ fontWeight: 'bold', fontSize: 15 }} badgeStyle={{ padding: 3, height: null }}/>
              </ListItem>
            );
          })
        }
    </View>
  );
}

const mapStateToProps = ({batches}) => ({ batches })



export default DaysScreen //connect()(DaysScreen);