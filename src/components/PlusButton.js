import React from 'react';
import { Icon } from 'react-native-elements'

const PlusButton = ({ onPress }) => (
  <Icon
    style={{ margin: 10}}
    name="add"
    color="#0A84FF"
    onPress={onPress}  
  />
)

export default PlusButton;