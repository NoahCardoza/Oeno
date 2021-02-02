import React from 'react';
import {Text} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'

const BatchList = ({batches}) => batches.map((batch, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{batch.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))

export default BatchList;
