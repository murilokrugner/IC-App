import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CompleteRegister from '../../../pages/Provider/CompleteRegister'
import AddTypesServices from '../../../pages/Provider/AddTypesServices';
import CompleteServices from '../../../pages/Provider/CompleteServices';
import EditCompleteServices from '../../../pages/Provider/EditCompleteServices';
import ProviderRoutes from '../index';

const Stack = createStackNavigator();

function StackProviderRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="CompleteRegister">
        <Stack.Screen name="CompleteServices" component={CompleteServices} 
          options={{
            headerShown: true,
            headerTitle: "Complete os serviços"
            
          }}
        />
        <Stack.Screen name="CompleteRegister" component={CompleteRegister} 
          options={{
            headerShown: true,
            headerTitle: "Complete seu perfil"
            
          }}
        />
        <Stack.Screen name="AddTypesServices" component={AddTypesServices} 
          options={{
            headerShown: true,
            headerTitle: "Adicione seus serviços"
            
          }}
        />
        <Stack.Screen name="EditCompleteServices" component={EditCompleteServices} 
          options={{
            headerShown: true,
            headerTitle: "Editar serviço"
            
          }}
        />
        <Stack.Screen name="ProviderRoutes" component={ProviderRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackProviderRoutes;