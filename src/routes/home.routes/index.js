import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabsRoutes from './tabs.routes';
import ProfileRoutes from './profile.routes';

import ClientData from '../../pages/Client/ClientData';

const Stack = createStackNavigator();

function ClientRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="TabsRoutes">
        <Stack.Screen name="TabsRoutes" component={TabsRoutes} 
        />
        <Stack.Screen name="ProfileRoutes" component={ProfileRoutes} 
        />
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

export default ClientRoutes;