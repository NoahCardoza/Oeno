import React from 'react';
import { ListItem } from 'react-native-elements'

const DayList = ({days}) => days.map(({id, date}) => (
    <ListItem key={id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{date}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  ))

export default ListAuthors;
