import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabsRoutes from './tabs.routes';
import ProfileRoutes from './profile.routes';

import ClientData from '../../pages/Client/ClientData';
import Services from '../../pages/Client/Services';
import Filters from '../../pages/Client/Filters';
import ViewService from '../../pages/Client/ViewService';

import Maps from '../../pages/Client/Maps';

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
        <Stack.Screen name="Services" component={Services} 
          options={{
            headerShown: true,  
            headerTitle: "Serviços"          
          }}
        />
        <Stack.Screen name="Filters" component={Filters} 
          options={{
            headerShown: true,  
            headerTitle: "Filtros"          
          }}
        />
        <Stack.Screen name="ViewService" component={ViewService} 
          options={{
            headerShown: true,  
            headerTitle: "Serviço"          
          }}
        />
        <Stack.Screen name="Maps" component={Maps} 
          options={{
            headerShown: true,  
            headerTitle: "Mapa"          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ClientRoutes;