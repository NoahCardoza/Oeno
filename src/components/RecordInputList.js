import React from 'react';
import { ListItem, Badge } from 'react-native-elements'

const RecordInputList = RecordInputs => RecordInputs.map(({ InputValue, InputTag }, i) => {
    return (
      <ListItem key={i} bottomDivider topDivider={i === 0}>
        <ListItem.Content>
          <ListItem.Title>{InputValue}</ListItem.Title>
        </ListItem.Content>
        <Badge value={InputTag} textStyle={{ fontWeight: 'bold', fontSize: 15 }} badgeStyle={{ padding: 3, height: null }}/>
      </ListItem>
    );
  })

export default RecordInputList;
