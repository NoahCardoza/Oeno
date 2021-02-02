import React from 'react';
import { ListItem } from 'react-native-elements'

const BatchList = ({batches, navigation}) => batches.map(({id, title, days}) => (
  <ListItem
    key={id}
    bottomDivider
    onPress={() => navigation.push('Days', { days })}
  >
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))

export default BatchList;
