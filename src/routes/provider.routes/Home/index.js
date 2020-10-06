import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProviderRoutes from '../Tab/index';
import EditCompleteServices from '../../../pages/Provider/ServicesProfileScreen/EditCompleteServices';
import AddTypesServices from '../../../pages/Provider/ServicesProfileScreen/AddTypesServices'

const Stack = createStackNavigator();

function HomeRoutesProvider() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
          >
        <Stack.Screen name="EditCompleteServices" component={EditCompleteServices} 
          options={{
            headerShown: true,
            headerTitle: "Editar serviço"
            
          }}
        />   
        <Stack.Screen name="AddTypesServices" component={AddTypesServices} 
          options={{
            headerShown: true,
            headerTitle: "Adicionar novo serviço"
            
          }}
        />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeRoutesProvider;