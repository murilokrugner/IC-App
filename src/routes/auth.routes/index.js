import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

const Auth = createStackNavigator();

function AuthRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="SignIn">
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default AuthRoutes;