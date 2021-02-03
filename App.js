import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, View, Button, Alert } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BatchList from './components/BatchList';
import DayList from './components/DayList';

var SQLite = require('react-native-sqlite-storage');


const errCallback = (err) => {
  console.log("SQL Error: " + err);
}


const successCallback = () => {
  console.log("SQL executed fine");
}

const checkUsers = () => {
  let db = SQLite.openDatabase({name: 'OenoDB.sqlite3', createFromLocation: 1}, successCallback, errCallback);
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO Authors(AuthorName) VALUES (?)',
      ['Default'],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
          );
        } 
        else {
          Alert.alert('Registration Failed');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  });
}

const listUsers = () => {
  let db = SQLite.openDatabase({name: 'OenoDB.sqlite3', createFromLocation: 1}, successCallback, errCallback);
  db.transaction(function (tx) {
    tx.executeSql(
      'SELECT * FROM Authors',
      [],
      (tx, results) => {
        var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i));
          }
      },
      (err) => {
        console.log(err);
      }
    );
  });
}


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
      <Button
        onPress={checkUsers}
        title="Learn More"
        color="#841584"
      />
      <Button
        onPress={listUsers}
        title="Get list of users"
        color="#841584"
      />
      <Button
        onPress={checkUsers}
        title="Get list of users"
        color="#841584"
      />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
