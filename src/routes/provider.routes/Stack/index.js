import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CompleteRegister from '../../pages/Provider/CompleteRegister';
import AddTypesServices from '../../pages/Provider/AddTypesServices';
import ProviderRoutes from '../index';

const Stack = createStackNavigator();

function StackProviderRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="CompleteRegister">
        <Stack.Screen name="CompleteRegister" component={CompleteRegister} />
        <Stack.Screen name="AddTypesServices" component={AddTypesServices} />
        <Stack.Screen name="ProviderRoutes" component={ProviderRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackProviderRoutes;