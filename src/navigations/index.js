import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BatchesScreen, BatchesScreenOptions } from '@/scenes/batches';
import DaysScreen from '@/scenes/days';
import RecordsScreen from '@/scenes/records';
import RecordScreen from '@/scenes/record';
import { Icon } from 'react-native-elements'

// React.useState()

const Stack = createStackNavigator()

const AddNewListItem = ({ onPress }) => ({
  headerRight: () => (
      <Icon
        style={{ margin: 10}}
        name="add"
        color="#0A84FF"
        onPress={onPress}  
    />
  ),
})

const RootStack = () => (
  <Stack.Navigator initialRouteName="Batches">
    <Stack.Screen
      name="Batches"
      component={BatchesScreen}
      options={BatchesScreenOptions}

    />
    <Stack.Screen
      name="Days"
      component={DaysScreen}
    />
    <Stack.Screen
      name="Records"
      component={RecordsScreen}
      options={AddNewListItem({
        onPress: record => console.log(`New record: ${record}`)
      })}
    />
    <Stack.Screen
      name="Record"
      component={RecordScreen}
    />
  </Stack.Navigator>

)

export default RootStack;