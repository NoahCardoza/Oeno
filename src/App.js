import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';



const isIOS = require('react-native').Platform.OS === 'ios';
import RootStackIOS from '@/navigations/index.ios';
import RootStackAndroid from '@/navigations/index.android';

export default function App() {
  if(isIOS) {
    return (
      <NavigationContainer>
        <RootStackIOS />
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <RootStackAndroid />
      </NavigationContainer>
    );
  }
}