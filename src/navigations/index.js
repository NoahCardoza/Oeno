import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BatchesScreen, BatchesScreenOptions } from '@/scenes/batches';
import DaysScreen from '@/scenes/days';
import {RecordsScreen, RecordsScreenOptions } from '@/scenes/records';
import RecordScreen from '@/scenes/record';
import NewRecordScreen from '@/scenes/new-record';

const Stack = createStackNavigator()

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
      options={RecordsScreenOptions}
    />
    <Stack.Screen
      name="Record"
      component={RecordScreen}
    />
    <Stack.Screen
      name="New Record"
      component={NewRecordScreen}
    />
  </Stack.Navigator>

)

export default RootStack;