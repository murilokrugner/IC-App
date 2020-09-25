import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/';

import AppUser from './hooks';

import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
      <AppUser>
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
          <Routes />
          <FlashMessage position="top"/>
        </View>
      </AppUser>
    </NavigationContainer>
  )
}

export default App;