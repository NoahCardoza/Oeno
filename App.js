import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BatchList from './components/BatchList';
import DayList from './components/DayList';

const batches = [
  {
    id: 1,
    title: 'Cabernet Sauvignon',
    days: [
      {
        id: 1,
        date: '01/15/21'
      },
      {
        id: 2,
        date: '01/16/21',
      }
    ]
  },
  {
    id: 2,
    title: 'Carignan',
    days: [
      {
        id: 3,
        date: '01/15/21'
      },
      {
        id: 4,
        date: '01/16/21',
      }
    ]
  },
];

function BatchesScreen({ navigation }) {
  return (
    <View>
      <BatchList batches={batches} navigation={navigation}></BatchList>
    </View>
  );
}

function DaysScreen({ route: {params: { days }}, navigation }) {
  return (
    <View>
      <DayList days={days}></DayList>
    </View>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Batches" >
        <Stack.Screen name="Batches" component={BatchesScreen}/>
        <Stack.Screen name="Days" component={DaysScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
