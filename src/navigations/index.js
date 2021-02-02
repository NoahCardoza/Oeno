import React from 'react';


import { createStackNavigator } from '@react-navigation/stack';
import BatchsScreen from '@/scenes/batches';
import DaysScreen from '@/scenes/days';
import RecordsScreen from '@/scenes/records';
import RecordScreen from '@/scenes/record';


const Stack = createStackNavigator()

const RootStack = () => (
  <Stack.Navigator initialRouteName="Batches">
    <Stack.Screen
      name="Batches"
      component={BatchsScreen}
    />
    <Stack.Screen
      name="Days"
      component={DaysScreen}
    />
    <Stack.Screen
        name="Records"
        component={RecordsScreen}
    />
    <Stack.Screen
        name="Record"
        component={RecordScreen}
    />
  </Stack.Navigator>

)

export default RootStack;