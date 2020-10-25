import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ClientData from '../../../pages/Client/ClientData';

const Stack = createStackNavigator();

function ProfileRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="ClientData">
        <Stack.Screen name="ClientData" component={ClientData} 
          options={{
            headerShown: true,
            headerTitle: "Meus dados"
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileRoutes;