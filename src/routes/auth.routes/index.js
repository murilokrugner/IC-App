import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import SignUpProvider from '../../pages/SignUpProvider';
import WhatUser from '../../pages/WhatUser';

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
        <Auth.Screen name="SignUp" component={SignUp} 
          options={{
            headerShown: true, 
            headerTitle:"Criar conta Cliente"          
          }}
        />
        <Auth.Screen name="SignUpProvider" component={SignUpProvider} 
          options={{
            headerShown: true, 
            headerTitle:"Criar conta Prestador"          
          }}
        />
        <Auth.Screen name="WhatUser" component={WhatUser} 
          options={{
            headerShown: true, 
            headerTitle:"Você é um?"          
          }}
        />
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default AuthRoutes;