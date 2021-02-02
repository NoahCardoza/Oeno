import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import BatchList from './components/BatchList';

const batches = [
  {
    id: 1,
    title: 'Cabernet Sauvignon',
  },
  {
    id: 2,
    title: 'Carignan',
  },
];


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <BatchList style={styles.batchList} batches={batches}></BatchList>
        <StatusBar style="auto"></StatusBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
